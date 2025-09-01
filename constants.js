import { LeashIcon, BalanceIcon, AlertIcon, HelpIcon } from './components/icons/Icons.jsx';

// View enum equivalent
export const View = {
  Dashboard: 'DASHBOARD',
  Training: 'TRAINING',
  QA: 'QA',
};

export const TRAINING_TOPICS = [
  {
    id: 'leash',
    title: 'Loose-Leash Walking',
    description: 'Teach your dog to walk calmly by your side without pulling on the leash.',
    icon: LeashIcon,
    prompt: `Generate a detailed, step-by-step training plan for an elderly person to teach their service dog loose-leash walking. The dog currently pulls. The plan should be broken down into 5 progressive daily sessions, with each session containing 6-8 very specific steps that include: exact positioning (which hand holds leash/treats, where dog should be), precise timing (when to reward, when to stop), specific techniques (like 'tree method', 'penalty yards'), troubleshooting common problems, and detailed explanations of what the dog should be doing at each moment. Include specific verbal cues, hand positions, treat delivery timing, and what to do if the dog makes mistakes. Each tip should address potential challenges elderly handlers might face.`,
  },
  {
    id: 'balance',
    title: 'Balance Assistance',
    description: 'Train your dog to provide gentle support and help you maintain balance while walking.',
    icon: BalanceIcon,
    prompt: `Generate a comprehensive, step-by-step training plan for an elderly person to teach their service dog balance assistance (light bracing). Break this into 5 progressive daily sessions with 6-8 detailed steps each. Include: exact body positioning for both handler and dog, specific weight distribution techniques, safety protocols, how to teach the dog proper bracing stance, precise timing for pressure application, specific verbal cues like 'brace', 'steady', 'position', how to practice getting up/down with dog support, surface training (carpet, hardwood, outdoor), troubleshooting when dog moves unexpectedly, and emergency procedures. Address physical limitations elderly handlers may have and provide alternatives for different mobility levels. Include detailed explanations of how much weight the dog can safely support and warning signs of dog fatigue or strain.`,
  },
  {
    id: 'fall_detection',
    title: 'Fall Alert Training',
    description: 'Teach your dog to recognize signs of a potential fall and provide an alert.',
    icon: AlertIcon,
    prompt: `Generate a detailed, step-by-step training plan for an elderly person to teach their service dog fall alert detection. Break into 5 progressive daily sessions with 6-8 specific steps each. Include: how to teach the dog to recognize physical cues (swaying, dizziness, unsteady gait, reaching for support), specific alert behaviors to train (nudging, pawing, barking, positioning), exact positioning training (where dog should be when alerting), timing training (immediate response to instability signs), how to practice simulated unsteadiness safely, reward timing for correct alerts, how to differentiate between normal movement and concerning instability, specific verbal cues like 'watch me', 'alert', distance training (alerting from across room), and how to avoid false alerts. Include safety considerations for the elderly person during training simulation and detailed explanations of what physical signs the dog should learn to recognize. Address how to train this without actually putting the handler at risk.`,
  },
  {
    id: 'fall_help',
    title: 'Help After a Fall',
    description: 'Train your dog to perform helpful tasks if you have fallen, like fetching a phone.',
    icon: HelpIcon,
    prompt: `Generate a comprehensive, step-by-step training plan for an elderly person to teach their service dog post-fall assistance tasks. Break into 5 progressive daily sessions with 6-8 detailed steps each. Include: specific object retrieval training (phone, medical alert device, water bottle), exact retrieval cues like 'fetch phone', 'bring help', proper delivery technique (gently to hand, not dropping), comfort positioning training (lying beside person, providing warmth), how to train 'stay close' vs 'get help' commands, barrier-opening skills (doors, cabinets), how to practice safely simulating fall scenarios, specific verbal cues and hand signals, distance training (retrieving from other rooms), multiple object discrimination (phone vs remote vs medicine), timing training (immediate response to fall scenario), and comfort behaviors (deep pressure therapy, staying calm). Include detailed safety protocols for training simulation, how to make objects easily accessible for elderly handlers, and backup communication strategies. Address different mobility scenarios and provide alternatives based on handler's physical capabilities.`
  },
];

export const SYSTEM_INSTRUCTION_TRAINER =
  'You are an expert service dog trainer specializing in detailed training protocols for elderly handlers. Provide comprehensive, step-by-step instructions that include: exact body positioning, precise timing, specific verbal cues, hand positions, treat delivery techniques, troubleshooting common problems, safety considerations, and what to do when things go wrong. Each step should be detailed enough that someone could follow it without prior training experience. Include specific measurements (distances, timing), equipment needed, environmental considerations, and progressive difficulty levels. Address physical limitations elderly handlers may face and provide adaptive techniques. Always prioritize safety for both handler and dog, and provide clear warnings about when to seek professional help.';
  
export const SYSTEM_INSTRUCTION_QA = 'You are an expert service dog training consultant specializing in helping elderly handlers. Provide detailed, practical answers that include specific techniques, exact positioning, timing, and step-by-step solutions. Include troubleshooting tips, safety considerations, and alternative approaches for different physical capabilities. Your responses should be comprehensive enough to actually solve the problem, not just general advice. Include specific verbal cues, hand positions, environmental modifications, and what to do if the suggested technique doesn\'t work. Address potential challenges elderly handlers might face and provide adaptive solutions. Keep responses focused but thorough - aim for 200-300 words with actionable detail.';
