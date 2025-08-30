
import React from 'react';
import type { TrainingTopic } from '../types';
import { TRAINING_TOPICS } from '../constants';
import Card from './common/Card';
import { QuestionMarkIcon } from './icons/Icons';

interface DashboardProps {
  onSelectTraining: (topic: TrainingTopic) => void;
  onSelectQA: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectTraining, onSelectQA }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-lg text-slate-600">
          Ready for a training session? Select a topic below to get started, or ask a question if you need help.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {TRAINING_TOPICS.map((topic) => (
          <Card
            key={topic.id}
            title={topic.title}
            description={topic.description}
            icon={topic.icon}
            onClick={() => onSelectTraining(topic)}
          />
        ))}
        <Card
          title="Ask a Question"
          description="Have a specific problem? Get quick, expert advice for your training challenges."
          icon={QuestionMarkIcon}
          onClick={onSelectQA}
        />
      </div>
    </div>
  );
};

export default Dashboard;
