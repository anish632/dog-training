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
    // Return detailed demo training plan based on the topic
    if (prompt.includes('loose-leash') || prompt.includes('leash')) {
      return [
        {
          sessionTitle: "Day 1: Foundation - Teaching Position and Focus",
          steps: [
            "Start indoors with your dog on a 6-foot leash. Hold the leash in your right hand if dog walks on your left side.",
            "Hold high-value treats (small pieces of chicken, cheese, or training treats) in your left hand at your dog's nose level.",
            "Take 3-5 slow steps forward while saying 'with me' in a cheerful voice. Keep treats visible to your dog.",
            "The moment your dog walks beside you without pulling (leash has slack), immediately say 'yes!' and give a treat.",
            "If your dog pulls ahead, stop walking immediately. Wait for them to look back at you, then restart.",
            "Practice for only 5-10 minutes. End when your dog successfully walks 3 steps without pulling."
          ],
          tips: "Position is everything! Your dog should be able to see your leg as their 'boundary line.' Keep treats at their nose level to maintain focus."
        },
        {
          sessionTitle: "Day 2: Building Duration and Adding the Cue",
          steps: [
            "Begin each session with 2-3 successful short sequences from Day 1 to warm up.",
            "Gradually increase walking distance to 10-15 steps before treating, but only if leash stays loose.",
            "Introduce the verbal cue 'heel' or 'with me' consistently. Say it once, then start walking.",
            "If your dog forgets and pulls, use the 'tree technique': become completely still like a tree until they return to position.",
            "Practice direction changes: turn left (dog follows), turn right (dog adjusts), and practice stopping.",
            "Always end with your dog in the correct position by your side, give treat and praise."
          ],
          tips: "Timing is crucial! Reward the exact moment the leash becomes loose, not after your dog has already started pulling again."
        },
        {
          sessionTitle: "Day 3: Outdoor Practice with Controlled Distractions",
          steps: [
            "Move training to your front yard or a quiet area outside with minimal distractions.",
            "Start with a 3-minute warm-up of indoor exercises to remind your dog of the rules.",
            "Walk in straight lines first, maintaining 'payment schedule': treat every 5-10 steps of loose leash walking.",
            "Introduce mild distractions: other scents, sounds, or visual stimuli. If dog pulls toward distraction, redirect with treat and praise.",
            "Practice the 'check-in': when your dog looks up at you voluntarily while walking, immediately reward with jackpot (3-4 treats).",
            "End session by walking back inside with loose leash - this reinforces that good walking gets them where they want to go."
          ],
          tips: "Outdoor success takes time! If your dog struggles outside, go back to indoor practice for a few more days. Better to build confidence than create frustration."
        },
        {
          sessionTitle: "Day 4: Adding Real-World Challenges",
          steps: [
            "Begin with 2 minutes of successful indoor or yard practice to set up for success.",
            "Take a 10-minute walk in your neighborhood during a quiet time (avoid peak dog-walking hours initially).",
            "Use the 'penalty yards' technique: if dog pulls, immediately back up 3-5 steps, then resume forward progress only when leash is loose.",
            "Practice stopping at curbs and having your dog automatically sit beside you (introduce 'wait' command).",
            "Carry extra high-value rewards for when your dog chooses to focus on you instead of distractions.",
            "If your dog pulls consistently, reduce distance and increase reward frequency - they're not ready for this level yet."
          ],
          tips: "Real-world training is graduation day! Some dogs need weeks of indoor practice first. Don't rush the process - solid foundations create reliable behaviors."
        },
        {
          sessionTitle: "Day 5: Perfecting and Maintaining the Behavior",
          steps: [
            "Test your dog's understanding: start walk without showing treats, but have them readily available to reward good choices.",
            "Practice 'proofing': walk past mild distractions (other dogs at distance, interesting smells, people) while maintaining loose leash.",
            "Introduce variable reward schedule: reward excellent loose-leash walking randomly rather than every few steps.",
            "Practice emergency stops: if your dog suddenly pulls (seeing another dog, squirrel, etc.), they should respond to your stop immediately.",
            "End with a 'free time' cue like 'go sniff' where you give permission for your dog to explore on a longer leash as a reward.",
            "Establish this as your new normal: every walk starts with loose-leash expectation, always have treats for the first few weeks."
          ],
          tips: "Maintenance is key! Even after your dog 'gets it,' continue to reward good choices regularly. A loose leash should always mean good things happen!"
        }
      ];
    } else if (prompt.includes('balance') || prompt.includes('assistance')) {
      return [
        {
          sessionTitle: "Day 1: Building Trust and Basic Positioning",
          steps: [
            "Start with your dog in a calm, focused state. Have them sit or stand on your left side.",
            "Hold a treat near your dog's nose level and take one slow step forward, saying 'steady' in a calm, confident voice.",
            "Gently place your left hand on your dog's back/shoulders (not pushing down) while taking 2-3 slow steps.",
            "If your dog stays in position beside you, immediately reward with treat and gentle praise 'good steady.'",
            "Practice having your dog stand still while you lightly rest your hand on their back for 5-10 seconds.",
            "Gradually increase to 3-5 steps with light hand contact. Your dog should move smoothly with you, not rush ahead or lag behind."
          ],
          tips: "This is about partnership, not the dog supporting your weight yet. Focus on your dog staying calmly beside you while you maintain light contact."
        },
        {
          sessionTitle: "Day 2: Introducing Light Pressure and the 'Brace' Position",
          steps: [
            "With your dog standing calmly beside you, place your hand on their back and apply very gentle downward pressure (like petting firmly).",
            "Say 'brace' and count to 3, then release pressure and reward. Your dog should remain still and stable.",
            "Practice the approach: have your dog sit, you approach from the side, and they should remain in position as you get ready to use them for support.",
            "Walk 5-10 steps with your hand maintaining light contact on their back/shoulders. Gradually add slight pressure as you walk.",
            "Teach the 'position' cue: your dog should move to your left side and stand parallel to you when you say 'position.'",
            "Practice on different surfaces (carpet, hardwood, grass) so your dog learns to adjust their stance for stability."
          ],
          tips: "Never put your full weight on your dog yet! This week is about teaching them to be a stable, predictable partner who won't move unexpectedly."
        },
        {
          sessionTitle: "Day 3: Building Strength and Stability",
          steps: [
            "Start each session with 'position' cue and reward your dog for correct placement beside you.",
            "Practice the 'brace and hold': apply moderate pressure to your dog's back while they remain stationary for 10-15 seconds.",
            "Introduce movement with support: take 10-15 slow steps while maintaining steady contact and slight pressure on your dog's back.",
            "Practice transitions: sitting to standing, standing to walking, all while your dog maintains their position and braced stance.",
            "Work on 'emergency brace': if you feel unsteady, your dog should immediately stop and hold position when you say 'steady' firmly.",
            "Practice having your dog provide support while you bend down (to pick something up) - they should remain rock solid."
          ],
          tips: "Your dog is learning to be your mobile support system. Consistency in your cues and hand placement helps them understand exactly what you need."
        },
        {
          sessionTitle: "Day 4: Real-World Application and Safety",
          steps: [
            "Practice near furniture or walls initially, so you have backup support while your dog learns.",
            "Work on uneven surfaces: gentle slopes, curbs, different textures. Your dog should adjust their position to keep you stable.",
            "Introduce the 'careful' cue for when you need extra stability (getting up from chair, navigating stairs).",
            "Practice duration bracing: your dog should hold steady position for 30+ seconds while you maintain balance.",
            "Work on directional cues: 'left,' 'right,' 'forward,' 'back' so your dog can help guide you where you need to go.",
            "Practice the 'release' cue: when you no longer need support, your dog should know they can relax but stay nearby."
          ],
          tips: "Safety first! Always practice new skills near support structures. Your dog should never be your only support until they're completely reliable."
        },
        {
          sessionTitle: "Day 5: Advanced Skills and Emergency Responses",
          steps: [
            "Practice complex scenarios: getting up from low chairs, walking on different surfaces, managing gentle slopes.",
            "Work on 'counterbalance': your dog learns to lean slightly away from you when you need to shift weight.",
            "Practice 'find support': if you need additional stability, your dog should guide you to nearest wall, chair, or railing.",
            "Introduce 'slow time': your dog should automatically reduce pace when they sense you need more careful movement.",
            "Practice 'hold position' for extended periods: your dog should maintain brace even if distractions occur around them.",
            "Work on public access behavior: your dog should provide support while ignoring people, other animals, food, and environmental distractions."
          ],
          tips: "Advanced balance assistance requires a very well-trained, physically strong dog. Always consult with a professional service dog trainer for safety verification."
        }
      ];
    } else {
      // Generic detailed plan for other behaviors
      return [
        {
          sessionTitle: "Day 1: Foundation Building",
          steps: [
            "Begin in a quiet, familiar environment with minimal distractions",
            "Keep training sessions to 5-10 minutes maximum to maintain focus",
            "Use your dog's favorite high-value treats (tiny pieces work best)",
            "Practice basic attention exercises: call your dog's name and reward when they look at you",
            "Introduce the core behavior in its simplest form with clear, consistent cues",
            "End each session on a successful note, even if it's a small win"
          ],
          tips: "Foundation training is like building a house - take time to make it solid. Rushing leads to confusion and bad habits."
        },
        {
          sessionTitle: "Day 2: Adding Structure and Consistency",
          steps: [
            "Start with a quick review of yesterday's successful behaviors",
            "Introduce more specific cues and hand signals along with verbal commands",
            "Practice the behavior 8-10 times with breaks between repetitions",
            "Begin adding mild criteria: longer duration, better positioning, or more precision",
            "Use a consistent reward schedule: every successful attempt gets immediate reward",
            "Document what works best for your individual dog (timing, treats, environment)"
          ],
          tips: "Consistency in your timing, cues, and rewards helps your dog understand exactly what you want. Keep a training log if helpful."
        },
        {
          sessionTitle: "Day 3: Building Reliability",
          steps: [
            "Practice in 2-3 different locations within your home to start generalizing the behavior",
            "Increase the number of successful repetitions before treating (but start small - maybe 2-3 behaviors)",
            "Add mild distractions: other family members nearby, TV on low volume, or toys visible",
            "Practice having your dog maintain the behavior for slightly longer periods",
            "Introduce a release cue like 'okay' or 'free' so your dog knows when the exercise is finished",
            "Reward both the correct behavior AND the proper response to your release cue"
          ],
          tips: "Reliability comes from practice in various situations. Don't increase difficulty too quickly - better to have many easy successes than one difficult failure."
        },
        {
          sessionTitle: "Day 4: Real-World Application",
          steps: [
            "Move training to more challenging environments: front yard, quiet street, or different rooms",
            "Practice with realistic distractions that your dog will encounter in daily life",
            "Work on maintaining the behavior even when exciting things happen around you",
            "Practice the behavior as part of your daily routine, not just during 'training time'",
            "Begin varying your reward schedule: sometimes treat, sometimes praise, sometimes play",
            "Test your dog's understanding by asking for the behavior without showing treats first"
          ],
          tips: "Real-world application shows whether your dog truly understands the behavior or just performs it in specific training contexts."
        },
        {
          sessionTitle: "Day 5: Mastery and Maintenance",
          steps: [
            "Practice the behavior in various real-life situations throughout your normal day",
            "Work on immediate response: your dog should perform the behavior quickly and reliably when cued",
            "Introduce random reward schedule: reward excellent performances, ignore mediocre ones, re-cue poor ones",
            "Practice emergency application: when you really need this behavior, it should be reliable even under stress",
            "Combine this behavior with other skills your dog knows to create behavior chains",
            "Establish a maintenance schedule: brief practice sessions to keep the behavior sharp long-term"
          ],
          tips: "Mastery means your dog chooses to perform the behavior reliably because they understand it benefits both of you. Keep practicing regularly to maintain skills!"
        }
      ];
    }
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
