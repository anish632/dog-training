import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION_TRAINER, SYSTEM_INSTRUCTION_QA } from '../constants.js';

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
const isApiKeyAvailable = !!API_KEY;

let ai = null;
if (isApiKeyAvailable) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const trainingPlanSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      sessionTitle: {
        type: Type.STRING,
        description: 'A brief, encouraging title for the training session, e.g., "Day 1: Getting Started".',
      },
      steps: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: 'A list of 2-4 simple, actionable steps for the training session.',
      },
      tips: {
        type: Type.STRING,
        description: 'A helpful tip or a reminder for the session, e.g., "Keep it short and fun!"',
      },
    },
    required: ["sessionTitle", "steps", "tips"],
  },
};

export const getTrainingPlan = async (prompt) => {
  if (!isApiKeyAvailable) {
    // Return demo training plan when API key is not available
    return [
      {
        sessionTitle: "Day 1: Getting Started",
        steps: [
          "Start with short 5-minute sessions",
          "Use high-value treats your dog loves",
          "Practice in a quiet, familiar environment",
          "End on a positive note"
        ],
        tips: "Keep it short and fun! Your dog learns better when they're enjoying themselves."
      },
      {
        sessionTitle: "Day 2: Building Consistency", 
        steps: [
          "Repeat yesterday's exercises",
          "Add one new simple command",
          "Practice twice today with breaks",
          "Reward immediately when they succeed"
        ],
        tips: "Consistency is key - practice a little bit every day rather than long sessions."
      },
      {
        sessionTitle: "Day 3: Adding Challenges",
        steps: [
          "Practice in a slightly busier environment",
          "Increase session time to 7-8 minutes",
          "Introduce mild distractions",
          "Celebrate all progress, even small wins"
        ],
        tips: "Every dog learns at their own pace. Be patient and encouraging!"
      }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_TRAINER,
        responseMimeType: 'application/json',
        responseSchema: trainingPlanSchema,
        temperature: 0.5,
      },
    });
    
    const jsonText = response.text.trim();
    const plan = JSON.parse(jsonText);
    return plan;
  } catch (error) {
    console.error('Error fetching training plan:', error);
    throw new Error('Failed to generate a training plan. Please try again.');
  }
};

export const getAnswer = async (question) => {
  if (!isApiKeyAvailable) {
    // Return demo answer when API key is not available
    return `This is a demo version of the Dog Training Assistant. To get personalized AI-powered answers, please:

1. Clone this repository locally
2. Get a free API key from Google AI Studio (https://ai.google.dev/)
3. Create a .env.local file with: GEMINI_API_KEY=your_key_here
4. Run the app locally with: npm run dev

For your question about "${question}", here's some general advice: Focus on positive reinforcement, be consistent with training, keep sessions short and fun, and always end on a successful note. Every dog learns differently, so be patient and celebrate small victories!`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Here is the user's question: "${question}"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_QA,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error('Error fetching answer:', error);
    throw new Error('Failed to get an answer. Please try again.');
  }
};
