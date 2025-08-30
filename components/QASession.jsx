import React, { useState } from 'react';
import { getAnswer } from '../services/geminiService.js';
import Button from './common/Button.jsx';
import Spinner from './common/Spinner.jsx';
import { QuestionMarkIcon } from './icons/Icons.jsx';

const QASession = ({ onBack }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setAnswer('');

    try {
      const result = await getAnswer(question);
      setAnswer(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <QuestionMarkIcon className="w-12 h-12 text-sky-600" />
        <div>
          <h2 className="text-3xl font-bold">Ask a Question</h2>
          <p className="text-slate-600">Describe a problem you're facing, and we'll provide some helpful advice.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="question-input" className="block text-lg font-semibold text-slate-700">
          My question is:
        </label>
        <textarea
          id="question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., How can I stop my dog from jumping on visitors?"
          className="w-full h-32 p-3 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          disabled={loading}
        />
        <Button type="submit" text={loading ? 'Getting Answer...' : 'Ask for Help'} disabled={loading || !question.trim()} />
      </form>

      {loading && (
        <div className="flex flex-col items-center justify-center mt-6">
          <Spinner />
          <p className="mt-4 text-lg text-slate-600">Thinking...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 text-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-xl font-semibold text-red-700">Error</h3>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
      )}

      {answer && (
        <div className="mt-6 p-4 bg-slate-50 border-l-4 border-sky-500 rounded-r-md animate-fade-in">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Here's a suggestion:</h3>
          <p className="text-lg text-slate-700 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
      
      <div className="mt-8">
        <Button onClick={onBack} text="Back to Dashboard" variant="secondary" />
      </div>
    </div>
  );
};

export default QASession;
