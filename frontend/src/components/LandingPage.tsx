import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div>
      <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to NewsFeed</h2>
        <p className="text-md md:text-lg text-gray-700">Your daily source of curated news.</p>
      </main>
    </div>
  );
};

export default LandingPage;
