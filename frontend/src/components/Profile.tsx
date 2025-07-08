import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

interface Preference {
  id?: number;
  user_id?: number;
  category: string;
  source: string;
  author: string;
  created_at?: string;
  updated_at?: string;
}

interface UserProfile {
  id?: number;
  name: string;
  email: string;
  settings: Record<string, any> | null; // Settings can be an object or null
  preferences: Preference[]; // Preferences is an array of Preference objects
  created_at?: string;
  updated_at?: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/users/profile');
      setProfile(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch profile data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading profile...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="flex items-center justify-center h-screen">No profile data found.</div>;
  }

  return (
    <div className="w-full p-8 bg-gray-100 min-h-screen">
      <div className="mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Profile Section */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-left">Profile</h3>
          <hr className="my-8 border-gray-300" />
          <div className="space-y-4">
            <div className="flex items-center">
              <p className="text-gray-700 text-sm font-bold w-24 text-left">Name:</p>
              <p className="text-gray-900 text-lg flex-1 text-left">{profile.name}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-700 text-sm font-bold w-24 text-left">Email:</p>
              <p className="text-gray-900 text-lg flex-1 text-left">{profile.email}</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-baseline mb-4">
            <h3 className="text-2xl font-semibold text-left">Settings</h3>
            <Link
              to="/profile/edit-settings"
              className="ml-4  text-blue-600 hover:underline text-sm font-medium"
            >
              Edit
            </Link>
          </div>
          <hr className="my-8 border-gray-300" />
          {
            profile.settings ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <p className="text-gray-700 text-sm font-bold w-48 text-left">Theme:</p>
                  <p className="text-gray-900 text-lg flex-1 text-left">{profile.settings.theme}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-700 text-sm font-bold w-48 text-left">Language:</p>
                  <p className="text-gray-900 text-lg flex-1 text-left">{profile.settings.language}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-700 text-sm font-bold w-48 text-left">Notifications enabled:</p>
                  <p className="text-gray-900 text-lg flex-1 text-left">{profile.settings.notifications_enabled? 'Yes' : 'No'}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-700 text-sm font-bold w-48 text-left">Articles per page:</p>
                  <p className="text-gray-900 text-lg flex-1 text-left">{profile.settings.articles_per_page}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-900">No settings available.</p>
            )
          }
        </section>

        <section>
          <div className="flex items-baseline mb-4">
            <h3 className="text-2xl font-semibold text-left">Preferences</h3>
            <Link
              to="/profile/edit-preferences"
              className="ml-4 text-blue-600 hover:underline text-sm font-medium"
            >
              Edit
            </Link>
          </div>
          <hr className="my-8 border-gray-300" />
          {
            profile.preferences && profile.preferences.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <p className="text-gray-700 text-sm font-bold w-24 text-left">Category:</p>
                  <div className="flex flex-wrap gap-2 flex-1">
                    {profile.preferences.map((pref, index) => pref.category && (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {pref.category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-700 text-sm font-bold w-24 text-left">Source:</p>
                  <div className="flex flex-wrap gap-2 flex-1">
                    {profile.preferences.map((pref, index) => pref.source && (
                      <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {pref.source}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-700 text-sm font-bold w-24 text-left">Author:</p>
                  <div className="flex flex-wrap gap-2 flex-1">
                    {profile.preferences.map((pref, index) => pref.author && (
                      <span key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {pref.author}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-900">No preferences set.</p>
            )
          }
        </section>
      </div>
    </div>
  );
};

export default Profile;
