
import React, { useState, useEffect } from 'react';
import type { TrainingTopic, TrainingPlan } from '../types';
import { getTrainingPlan } from '../services/geminiService';
import Button from './common/Button';
import Spinner from './common/Spinner';

interface TrainingModuleProps {
  topic: TrainingTopic;
  onBack: () => void;
}

const TrainingModule: React.FC<TrainingModuleProps> = ({ topic, onBack }) => {
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedPlan = await getTrainingPlan(topic.prompt);
        setPlan(fetchedPlan);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [topic.prompt]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <topic.icon className="w-12 h-12 text-sky-600" />
        <div>
          <h2 className="text-3xl font-bold">{topic.title}</h2>
          <p className="text-slate-600">{topic.description}</p>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner />
          <p className="mt-4 text-lg text-slate-600">Creating your personalized training plan...</p>
        </div>
      )}

      {error && (
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-xl font-semibold text-red-700">Oops! Something went wrong.</h3>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      )}

      {plan && (
        <div className="space-y-6">
          {plan.map((session, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <h3 className="text-xl font-bold text-sky-700 mb-3">{session.sessionTitle}</h3>
              <ul className="space-y-2 list-disc list-inside text-lg">
                {session.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-slate-700">{step}</li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-sky-50 border-l-4 border-sky-300 rounded-r-md">
                  <p className="font-semibold text-sky-800">
                    <span className="font-bold">Remember:</span> {session.tips}
                  </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Button onClick={onBack} text="Back to Dashboard" />
      </div>
    </div>
  );
};

export default TrainingModule;
