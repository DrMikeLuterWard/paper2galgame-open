import React, { useState } from 'react';
import { GameSettings } from '../types';
import { useI18n, LANGUAGES } from '../i18n';

interface SettingsScreenProps {
  currentSettings: GameSettings;
  onSave: (settings: GameSettings) => void;
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ currentSettings, onSave, onBack }) => {
  const { t, lang, setLang } = useI18n();
  const [settings, setSettings] = useState<GameSettings>(currentSettings);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white/60 backdrop-blur-md p-8 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gal-pink/10 -z-10"></div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border-2 border-gal-pink">
        <h2 className="text-3xl font-bold text-center text-gal-pink-dark mb-8 flex items-center justify-center gap-3">
          <i className="fas fa-cog animate-spin-slow"></i>
          {t.settings.title}
        </h2>

        <div className="space-y-8">

          {/* Interface Language Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4 border-b-2 border-gray-100 pb-2">
              <i className="fas fa-language text-gal-blue mr-2"></i>
              {t.settings.language}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {LANGUAGES.map(({ code, label }) => (
                <SettingOption
                  key={code}
                  label={label}
                  selected={lang === code}
                  onClick={() => setLang(code)}
                />
              ))}
            </div>
          </div>

          {/* Detail Level Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4 border-b-2 border-gray-100 pb-2">
              <i className="fas fa-book-reader text-gal-blue mr-2"></i>
              {t.settings.depth}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SettingOption
                label={t.settings.depthBrief}
                desc={t.settings.depthBriefDesc}
                selected={settings.detailLevel === 'brief'}
                onClick={() => setSettings({...settings, detailLevel: 'brief'})}
              />
              <SettingOption
                label={t.settings.depthDetailed}
                desc={t.settings.depthDetailedDesc}
                selected={settings.detailLevel === 'detailed'}
                onClick={() => setSettings({...settings, detailLevel: 'detailed'})}
              />
              <SettingOption
                label={t.settings.depthAcademic}
                desc={t.settings.depthAcademicDesc}
                selected={settings.detailLevel === 'academic'}
                onClick={() => setSettings({...settings, detailLevel: 'academic'})}
              />
            </div>
          </div>

          {/* Personality Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4 border-b-2 border-gray-100 pb-2">
              <i className="fas fa-heart text-gal-pink mr-2"></i>
              {t.settings.mood}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SettingOption
                label={t.settings.moodTsundere}
                desc={t.settings.moodTsundereDesc}
                selected={settings.personality === 'tsundere'}
                onClick={() => setSettings({...settings, personality: 'tsundere'})}
              />
              <SettingOption
                label={t.settings.moodGentle}
                desc={t.settings.moodGentleDesc}
                selected={settings.personality === 'gentle'}
                onClick={() => setSettings({...settings, personality: 'gentle'})}
              />
              <SettingOption
                label={t.settings.moodStrict}
                desc={t.settings.moodStrictDesc}
                selected={settings.personality === 'strict'}
                onClick={() => setSettings({...settings, personality: 'strict'})}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500 mt-4 border border-gray-200">
            <i className="fas fa-info-circle mr-1"></i>{' '}
            {t.settings.note}
          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-full font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {t.settings.cancel}
          </button>
          <button
            onClick={() => onSave(settings)}
            className="px-8 py-2 rounded-full font-bold bg-gal-pink text-white hover:bg-gal-pink-dark shadow-md transform hover:scale-105 transition-all"
          >
            {t.settings.save}
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingOption: React.FC<{ label: string; desc?: string; selected: boolean; onClick: () => void }> = ({ label, desc, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
      ${selected
        ? 'border-gal-pink bg-pink-50 text-gal-pink-dark shadow-md scale-105'
        : 'border-gray-200 hover:border-gal-pink/50 hover:bg-white text-gray-600'
      }
    `}
  >
    <div className="font-bold text-lg mb-1">{label}</div>
    {desc && <div className="text-xs opacity-80">{desc}</div>}
  </button>
);
