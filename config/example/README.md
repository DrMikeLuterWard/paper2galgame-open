# Config

The working settings live in the `config/` folder and are **not** committed to
git (see `.gitignore`). This `config/example/` folder holds the templates, which
are safe to commit.

## First run

Copy the templates from `example/` one level up (into `config/`) and fill in your
own values:

**Windows (PowerShell):**
```powershell
Copy-Item config/example/api.ts       config/api.ts
Copy-Item config/example/character.ts config/character.ts
```

**Linux / macOS:**
```bash
cp config/example/api.ts       config/api.ts
cp config/example/character.ts config/character.ts
```

Then open `config/api.ts` and `config/character.ts` and fill in your values.

## What's where

| File                  | What it configures                                          |
|-----------------------|-------------------------------------------------------------|
| `config/api.ts`       | Provider, server URL, API key, model, sampler params        |
| `config/character.ts` | Name, emotion sprites, title sprite, background, persona prompt |

> The app won't start until `config/api.ts` and `config/character.ts` exist —
> that's expected, just copy the templates as shown above.
