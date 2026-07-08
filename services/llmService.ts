//import { GoogleGenAI, Type } from "@google/genai";
import { PaperAnalysisResponse, DialogueLine, GameSettings } from "../types";
import { apiConfig } from "../config/api";
import { characterConfig } from "../config/character";

import * as pdfjs from 'pdfjs-dist';
(pdfjs as any).GlobalWorkerOptions.workerSrc = new URL('../node_modules/pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href;




type TextContent = {
	items: Array<{ str: string }>;
};

// Helper to convert File to Base64
const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      const base64Content = base64Data.split(',')[1];
      resolve({
        inlineData: {
          data: base64Content,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

async function getFileAsBuffer(file: File): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			if (event.target?.result) {
				resolve(event.target.result as ArrayBuffer);
			} else {
				reject(new Error('Failed to read file.'));
			}
		};
		reader.onerror = () => {
			reject(new Error('Failed to read file.'));
		};
		reader.readAsArrayBuffer(file);
	});
}

export async function convertPDFToText(file: File): Promise<string> {
	/*if (!browser) {
		throw new Error('PDF processing is only available in the browser');
	}*/

	try {
		const buffer = await getFileAsBuffer(file);
    
		const pdf = await pdfjs.getDocument(buffer).promise;
   
		const numPages = pdf.numPages;

		const textContentPromises: Promise<TextContent>[] = [];

		for (let i = 1; i <= numPages; i++) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			textContentPromises.push(pdf.getPage(i).then((page: any) => page.getTextContent()));
		}

		const textContents = await Promise.all(textContentPromises);
		const textItems = textContents.flatMap((textContent: TextContent) =>
			textContent.items.map((item) => item.str ?? '')
		);

		return textItems.join('\n');
	} catch (error) {
		console.error('Error converting PDF to text:', error);
		throw new Error(
			`Failed to convert PDF to text: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
}

export async function convertPDFToImage(file: File, scale: number = 0.5): Promise<string[]> {


	try {
		const buffer = await getFileAsBuffer(file);
		const doc = await pdfjs.getDocument(buffer).promise;
		const pages: Promise<string>[] = [];

		for (let i = 1; i <= doc.numPages; i++) {
			const page = await doc.getPage(i);
			const viewport = page.getViewport({ scale });
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			canvas.width = viewport.width;
			canvas.height = viewport.height;

			if (!ctx) {
				throw new Error('Failed to get 2D context from canvas');
			}

			const task = page.render({
				canvasContext: ctx,
				viewport: viewport,
				canvas: canvas
			});
      pages.push(
        task.promise.then(() => {
          return canvas.toDataURL('image/png');
        })
      );
		}

		return await Promise.all(pages);
	} catch (error) {
		console.error('Error converting PDF to images:', error);
		throw new Error(
			`Failed to convert PDF to images: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
}



export const analyzePaper = async (file: File, settings: GameSettings): Promise<PaperAnalysisResponse> => {

  // API settings (URL, key, model) live in config/api.ts
  // Character (prompt, persona) lives in config/character.ts

  const filePart = await convertPDFToText(file);

  // Build the system prompt from the persona template, substituting the
  // chosen personality and depth for the placeholders.
  const personalityInstruction = characterConfig.personalityInstructions[settings.personality];
  const detailInstruction = characterConfig.detailInstructions[settings.detailLevel];

  const prompt = characterConfig.systemPrompt
    .replace('{{personality}}', personalityInstruction)
    .replace('{{detail}}', detailInstruction)
    .replace('{{language}}', characterConfig.outputLanguage);

 const messages = [
    {
      role: "system",
      content: prompt // system instructions (persona prompt)
    },
    {
      role: "user",
      content: `请根据以下论文内容进行讲解:\n\n${filePart}`}
  ];
  try {
    console.log(messages);
 const response = await fetch(`${apiConfig.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiConfig.apiKey}`
    },
    body: JSON.stringify({
      ...(apiConfig.samplers ?? {}), // extra sampler params from config/api.ts
      model: apiConfig.model,
      messages: messages,
      response_format: { type: "json_object" } // requires a model that supports JSON mode
    })
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`HTTP ${response.status} ${response.statusText}: ${body.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || content.length === 0) {
    throw new Error("API returned no message content.");
  }
  console.log("API raw content:", content);

  // Parse the returned JSON string into our DialogueLine format.
  try {
    return JSON.parse(content);
  } catch {
    throw new Error(
      "Model output was not valid JSON — it was most likely truncated. " +
      "Increase the server context size (--ctx-size) or lower the analysis depth."
    );
  }

  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error("Error analyzing paper:", error);
    // Fallback script — surfaces the real reason in-game so it can be debugged.
    return {
      title: "API Error",
      script: [
        {
          speaker: characterConfig.name,
          text: "呜... 主殿，连结彼岸的通道似乎被干扰了（API Request Failed）。",
          emotion: "shy"
        },
        {
          speaker: characterConfig.name,
          text: reason,
          emotion: "angry"
        }
      ]
    };
  }
};