import React from 'react';
import { TRAINING_TOPICS } from '../constants.js';
import Card from './common/Card.jsx';
import { QuestionMarkIcon } from './icons/Icons.jsx';

const Dashboard = ({ onSelectTraining, onSelectQA }) => {
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
