import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface Preference {
  id?: number;
  user_id?: number;
  category: string;
  source: string;
  author: string;
  created_at?: string;
  updated_at?: string;
}

const EditPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axiosInstance.get('/users/profile'); // Fetch full profile to get preferences
        setPreferences(response.data.data.preferences || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch preferences.');
      } finally {
        setLoading(false);
      }
    };
    fetchPreferences();
  }, []);

  const handlePreferenceChange = (index: number, field: keyof Preference, value: string) => {
    setPreferences(prev => {
      const newPreferences = [...prev];
      newPreferences[index] = { ...newPreferences[index], [field]: value };
      return newPreferences;
    });
  };

  const handleAddPreference = () => {
    setPreferences(prev => [
      ...prev,
      { category: '', source: '', author: '' }, // Add a new empty preference
    ]);
  };

  const handleRemovePreference = (indexToRemove: number) => {
    setPreferences(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Assuming a PATCH endpoint for preferences, similar to settings
      // You might need to adjust this endpoint based on your backend API
      await axiosInstance.patch('/users/preferences', { preferences });
      navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save preferences.');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading preferences...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full p-8 bg-gray-100 min-h-screen">
      <div className="mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-left">Edit Preferences</h2>
        <hr className="my-8 border-gray-300" />
        <form onSubmit={handleSave}>
          {preferences.length === 0 && !loading ? (
            <p className="text-gray-900 mb-4">No preferences set. Add one below!</p>
          ) : null}
          <div className="space-y-4 mb-8">
            {preferences.map((pref, index) => (
              <React.Fragment key={index}>
                <div className="p-4 rounded-md space-y-2">
                  <div className="flex items-center">
                    <label htmlFor={`pref-category-${index}`} className="text-gray-700 text-sm font-bold w-24 text-left">Category:</label>
                    <input
                      type="text"
                      id={`pref-category-${index}`}
                      value={pref.category}
                      onChange={(e) => handlePreferenceChange(index, 'category', e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor={`pref-source-${index}`} className="text-gray-700 text-sm font-bold w-24 text-left">Source:</label>
                    <input
                      type="text"
                      id={`pref-source-${index}`}
                      value={pref.source}
                      onChange={(e) => handlePreferenceChange(index, 'source', e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor={`pref-author-${index}`} className="text-gray-700 text-sm font-bold w-24 text-left">Author:</label>
                    <input
                      type="text"
                      id={`pref-author-${index}`}
                      value={pref.author}
                      onChange={(e) => handlePreferenceChange(index, 'author', e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-start mt-2 ml-24"> {/* Added ml-24 for alignment */} 
                    <button
                      type="button"
                      onClick={() => handleRemovePreference(index)}
                      className="bg-red-400 hover:bg-red-500 text-white py-1 px-2 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {index < preferences.length - 1 && <hr className="border-dotted border-gray-400 my-6" />}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-start space-x-4 mt-8 ml-24">
            <button
              type="button"
              onClick={handleAddPreference}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Preference
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPreferences;
