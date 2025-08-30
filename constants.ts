
import type { TrainingTopic } from './types';
import { LeashIcon, BalanceIcon, AlertIcon, HelpIcon } from './components/icons/Icons';

export const TRAINING_TOPICS: TrainingTopic[] = [
  {
    id: 'leash',
    title: 'Loose-Leash Walking',
    description: 'Teach your dog to walk calmly by your side without pulling on the leash.',
    icon: LeashIcon,
    prompt: `Generate a simple, step-by-step training plan for an elderly person to teach their service dog loose-leash walking. The dog currently pulls. The plan should be broken down into 5 short, daily sessions. Use clear, simple language and focus on positive reinforcement techniques like using treats and praise.`,
  },
  {
    id: 'balance',
    title: 'Balance Assistance',
    description: 'Train your dog to provide gentle support and help you maintain balance while walking.',
    icon: BalanceIcon,
    prompt: `Generate a simple, step-by-step training plan for an elderly person to teach their service dog how to provide balance assistance (light bracing). The plan should be broken down into 5 short, daily sessions. Emphasize safety for both the handler and the dog. Use clear, simple language and positive reinforcement.`,
  },
  {
    id: 'fall_detection',
    title: 'Fall Alert Training',
    description: 'Teach your dog to recognize signs of a potential fall and provide an alert.',
    icon: AlertIcon,
    prompt: `Generate a simple, step-by-step training plan for an elderly person to teach their service dog how to detect signs of impending falls (like dizziness or swaying) and provide an alert (like a nudge or bark). Break it down into 5 short, daily sessions. Use clear, simple language and positive reinforcement. Note: This is for alerting, not physical prevention.`,
  },
  {
    id: 'fall_help',
    title: 'Help After a Fall',
    description: 'Train your dog to perform helpful tasks if you have fallen, like fetching a phone.',
    icon: HelpIcon,
    prompt: `Generate a simple, step-by-step training plan for an elderly person to teach their service dog how to help after a fall. Focus on two key tasks: fetching a specific object (like a phone) and staying close to provide comfort. Break it down into 5 short, daily sessions. Use clear, simple language and positive reinforcement.`
  },
];

export const SYSTEM_INSTRUCTION_TRAINER =
  'You are a patient, encouraging, and professional service dog trainer specializing in assisting elderly handlers. Your language must be simple, clear, and always positive. Avoid jargon. Structure your training plans logically with short, actionable steps. Ensure all advice prioritizes the safety and well-being of both the handler and the dog.';
  
export const SYSTEM_INSTRUCTION_QA = 'You are a patient, encouraging, and professional service dog training assistant for an elderly person. Your language must be simple, clear, and always positive. You are answering a specific question about a training issue. Provide a concise, easy-to-understand, and actionable answer using positive reinforcement principles. Keep the response focused on the question and under 150 words.';
