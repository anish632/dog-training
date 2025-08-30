#!/usr/bin/env python3
"""
Python backend service for handling Gemini AI interactions.
This provides the same functionality as the JavaScript geminiService.
"""

import os
import json
import asyncio
from typing import List, Dict, Any, Optional
import google.generativeai as genai
from dataclasses import dataclass


@dataclass
class TrainingSession:
    """Training session data structure."""
    session_title: str
    steps: List[str]
    tips: str


# Training plan type alias
TrainingPlan = List[TrainingSession]

# System instructions (same as JavaScript version)
SYSTEM_INSTRUCTION_TRAINER = (
    'You are a patient, encouraging, and professional service dog trainer specializing in '
    'assisting elderly handlers. Your language must be simple, clear, and always positive. '
    'Avoid jargon. Structure your training plans logically with short, actionable steps. '
    'Ensure all advice prioritizes the safety and well-being of both the handler and the dog.'
)

SYSTEM_INSTRUCTION_QA = (
    'You are a patient, encouraging, and professional service dog training assistant for an '
    'elderly person. Your language must be simple, clear, and always positive. You are '
    'answering a specific question about a training issue. Provide a concise, '
    'easy-to-understand, and actionable answer using positive reinforcement principles. '
    'Keep the response focused on the question and under 150 words.'
)

# Training plan schema for structured output
TRAINING_PLAN_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "sessionTitle": {
                "type": "string",
                "description": 'A brief, encouraging title for the training session, e.g., "Day 1: Getting Started".'
            },
            "steps": {
                "type": "array",
                "items": {"type": "string"},
                "description": "A list of 2-4 simple, actionable steps for the training session."
            },
            "tips": {
                "type": "string",
                "description": 'A helpful tip or a reminder for the session, e.g., "Keep it short and fun!"'
            }
        },
        "required": ["sessionTitle", "steps", "tips"]
    }
}


class GeminiService:
    """Service class for interacting with Google's Gemini AI."""
    
    def __init__(self):
        """Initialize the Gemini service."""
        api_key = os.getenv('GEMINI_API_KEY') or os.getenv('API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY or API_KEY environment variable not set")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    async def get_training_plan(self, prompt: str) -> TrainingPlan:
        """
        Generate a training plan based on the given prompt.
        
        Args:
            prompt: The training prompt/topic description
            
        Returns:
            List of TrainingSession objects
            
        Raises:
            Exception: If the API call fails or response is invalid
        """
        try:
            # Configure generation parameters
            generation_config = genai.types.GenerationConfig(
                temperature=0.5,
                response_mime_type="application/json"
            )
            
            # Generate content with system instruction
            response = await asyncio.to_thread(
                self.model.generate_content,
                prompt,
                generation_config=generation_config,
                system_instruction=SYSTEM_INSTRUCTION_TRAINER
            )
            
            # Parse the JSON response
            json_text = response.text.strip()
            plan_data = json.loads(json_text)
            
            # Convert to TrainingSession objects
            training_plan = []
            for session_data in plan_data:
                session = TrainingSession(
                    session_title=session_data['sessionTitle'],
                    steps=session_data['steps'],
                    tips=session_data['tips']
                )
                training_plan.append(session)
            
            return training_plan
            
        except json.JSONDecodeError as e:
            print(f'JSON parsing error: {e}')
            raise Exception('Failed to parse training plan response.')
        except Exception as e:
            print(f'Error fetching training plan: {e}')
            raise Exception('Failed to generate a training plan. Please try again.')
    
    async def get_answer(self, question: str) -> str:
        """
        Get an answer to a specific training question.
        
        Args:
            question: The user's question about dog training
            
        Returns:
            The AI's response as a string
            
        Raises:
            Exception: If the API call fails
        """
        try:
            # Configure generation parameters
            generation_config = genai.types.GenerationConfig(
                temperature=0.7
            )
            
            # Format the question
            formatted_question = f'Here is the user\'s question: "{question}"'
            
            # Generate content with system instruction
            response = await asyncio.to_thread(
                self.model.generate_content,
                formatted_question,
                generation_config=generation_config,
                system_instruction=SYSTEM_INSTRUCTION_QA
            )
            
            return response.text
            
        except Exception as e:
            print(f'Error fetching answer: {e}')
            raise Exception('Failed to get an answer. Please try again.')


# Global service instance
_gemini_service: Optional[GeminiService] = None


def get_gemini_service() -> GeminiService:
    """Get or create the global Gemini service instance."""
    global _gemini_service
    if _gemini_service is None:
        _gemini_service = GeminiService()
    return _gemini_service


# Convenience functions (async)
async def get_training_plan(prompt: str) -> TrainingPlan:
    """Generate a training plan based on the given prompt."""
    service = get_gemini_service()
    return await service.get_training_plan(prompt)


async def get_answer(question: str) -> str:
    """Get an answer to a specific training question."""
    service = get_gemini_service()
    return await service.get_answer(question)


# Synchronous versions for easier integration
def get_training_plan_sync(prompt: str) -> TrainingPlan:
    """Synchronous version of get_training_plan."""
    return asyncio.run(get_training_plan(prompt))


def get_answer_sync(question: str) -> str:
    """Synchronous version of get_answer."""
    return asyncio.run(get_answer(question))


# Training topics (Python version of JavaScript constants)
TRAINING_TOPICS = [
    {
        'id': 'leash',
        'title': 'Loose-Leash Walking',
        'description': 'Teach your dog to walk calmly by your side without pulling on the leash.',
        'prompt': (
            'Generate a simple, step-by-step training plan for an elderly person to teach their '
            'service dog loose-leash walking. The dog currently pulls. The plan should be broken '
            'down into 5 short, daily sessions. Use clear, simple language and focus on positive '
            'reinforcement techniques like using treats and praise.'
        )
    },
    {
        'id': 'balance',
        'title': 'Balance Assistance',
        'description': 'Train your dog to provide gentle support and help you maintain balance while walking.',
        'prompt': (
            'Generate a simple, step-by-step training plan for an elderly person to teach their '
            'service dog how to provide balance assistance (light bracing). The plan should be '
            'broken down into 5 short, daily sessions. Emphasize safety for both the handler and '
            'the dog. Use clear, simple language and positive reinforcement.'
        )
    },
    {
        'id': 'fall_detection',
        'title': 'Fall Alert Training',
        'description': 'Teach your dog to recognize signs of a potential fall and provide an alert.',
        'prompt': (
            'Generate a simple, step-by-step training plan for an elderly person to teach their '
            'service dog how to detect signs of impending falls (like dizziness or swaying) and '
            'provide an alert (like a nudge or bark). Break it down into 5 short, daily sessions. '
            'Use clear, simple language and positive reinforcement. Note: This is for alerting, '
            'not physical prevention.'
        )
    },
    {
        'id': 'fall_help',
        'title': 'Help After a Fall',
        'description': 'Train your dog to perform helpful tasks if you have fallen, like fetching a phone.',
        'prompt': (
            'Generate a simple, step-by-step training plan for an elderly person to teach their '
            'service dog how to help after a fall. Focus on two key tasks: fetching a specific '
            'object (like a phone) and staying close to provide comfort. Break it down into 5 '
            'short, daily sessions. Use clear, simple language and positive reinforcement.'
        )
    }
]


if __name__ == '__main__':
    """Example usage of the Gemini service."""
    import sys
    
    async def main():
        try:
            service = get_gemini_service()
            
            if len(sys.argv) > 1:
                question = ' '.join(sys.argv[1:])
                print(f"Question: {question}")
                answer = await service.get_answer(question)
                print(f"Answer: {answer}")
            else:
                # Test with a sample training plan
                print("Generating sample training plan...")
                topic = TRAINING_TOPICS[0]  # Loose-leash walking
                plan = await service.get_training_plan(topic['prompt'])
                
                print(f"\nTraining Plan for: {topic['title']}")
                print("=" * 50)
                
                for i, session in enumerate(plan, 1):
                    print(f"\nSession {i}: {session.session_title}")
                    print("-" * 30)
                    for step in session.steps:
                        print(f"• {step}")
                    print(f"\n💡 Tip: {session.tips}")
                    
        except Exception as e:
            print(f"Error: {e}")
    
    asyncio.run(main())
