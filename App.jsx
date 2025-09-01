import React, { useState } from 'react';
import { View } from './constants.js';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import TrainingModule from './components/TrainingModule.jsx';
import QASession from './components/QASession.jsx';

const App = () => {
  const [currentView, setCurrentView] = useState(View.Dashboard);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const navigateToTraining = (topic) => {
    setSelectedTopic(topic);
    setCurrentView(View.Training);
  };

  const navigateToQA = () => {
    setSelectedTopic(null);
    setCurrentView(View.QA);
  };

  const navigateToDashboard = () => {
    setSelectedTopic(null);
    setCurrentView(View.Dashboard);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.Training:
        return selectedTopic && <TrainingModule topic={selectedTopic} onBack={navigateToDashboard} />;
      case View.QA:
        return <QASession onBack={navigateToDashboard} />;
      case View.Dashboard:
      default:
        return <Dashboard onSelectTraining={navigateToTraining} onSelectQA={navigateToQA} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Header />
      {!process.env.GEMINI_API_KEY && !process.env.API_KEY && !import.meta.env.VITE_GEMINI_API_KEY && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mx-4 sm:mx-6 md:mx-8 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">
                <strong>Demo Mode:</strong> This is a demo version with sample content. 
                For full AI-powered features, run locally with your own API key.
                {' '}
                <a href="https://github.com/anish632/dog-training" className="underline hover:text-yellow-600">
                  Get setup instructions →
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
      <main className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Your faithful companion, one step at a time.</p>
      </footer>
    </div>
  );
};

export default App;
