import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface UserSettings {
  theme: string;
  language: string;
  notifications_enabled: boolean;
  articles_per_page: number;
}

const themes = [
  'dark',
  'light',
  'monakai',
  'spacex',
  'dracula',
  'solaris',
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'Bengali' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'it', name: 'Italian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
];

const EditSettings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axiosInstance.get('/users/profile'); // Fetch full profile to get settings
        setSettings(response.data.data.settings || {});
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch settings.');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({
      ...(prev as UserSettings),
      [key]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await axiosInstance.patch('/users/settings', settings);
      navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save settings.');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading settings...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  if (!settings) {
    return <div className="flex items-center justify-center h-screen">No settings data found.</div>;
  }

  return (
    <div className="w-full p-8 bg-gray-100 min-h-screen">
      <div className="mx-auto bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-left">Edit Settings</h3>
        <hr className="my-8 border-gray-300" />
        <form onSubmit={handleSave}>
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <label htmlFor="theme" className="text-gray-700 text-sm font-bold w-48 text-left">Theme:</label>
              <select
                id="theme"
                value={settings.theme || ''}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="mt-1 block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {themes.map((themeOption) => (
                  <option key={themeOption} value={themeOption}>
                    {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="language" className="text-gray-700 text-sm font-bold w-48 text-left">Language:</label>
              <select
                id="language"
                value={settings.language || ''}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="mt-1 block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="notifications_enabled" className="text-gray-700 text-sm font-bold w-48 text-left">Notifications Enabled:</label>
              <input
                type="checkbox"
                id="notifications_enabled"
                checked={settings.notifications_enabled || false}
                onChange={(e) => handleSettingChange('notifications_enabled', e.target.checked)}
                                className="form-checkbox h-5 w-5 text-blue-600 mt-1 block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="articles_per_page" className="text-gray-700 text-sm font-bold w-48 text-left">Articles Per Page:</label>
              <input
                type="number"
                id="articles_per_page"
                value={settings.articles_per_page || ''}
                onChange={(e) => handleSettingChange('articles_per_page', parseInt(e.target.value))}
                className="mt-1 block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSettings;
