
import React, { useState } from 'react';
import { View, TrainingTopic } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TrainingModule from './components/TrainingModule';
import QASession from './components/QASession';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [selectedTopic, setSelectedTopic] = useState<TrainingTopic | null>(null);

  const navigateToTraining = (topic: TrainingTopic) => {
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
