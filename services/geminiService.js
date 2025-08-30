import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION_TRAINER, SYSTEM_INSTRUCTION_QA } from '../constants.js';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
