
export interface Voice {
  name: string;
  description: string;
}

export interface VoiceGroup {
  label: string;
  voices: Voice[];
}

export const VOICE_GROUPS: VoiceGroup[] = [
  {
    label: 'Bright Voices',
    voices: [
      { name: 'Zephyr', description: 'Bright' },
      { name: 'Kore', description: 'Female - Firm' },
      { name: 'Orus', description: 'Male - Firm' },
      { name: 'Autonoe', description: 'Female - Bright' },
      { name: 'Umbriel', description: 'Male - Easy-going' },
      { name: 'Erinome', description: 'Female - Clear' },
      { name: 'Laomedeia', description: 'Female - Upbeat' },
      { name: 'Schedar', description: 'Male - Even' },
      { name: 'Achird', description: 'Male - Friendly' },
      { name: 'Sadachbia', description: 'Male - Lively' },
    ],
  },
  {
    label: 'Upbeat Voices',
    voices: [
      { name: 'Puck', description: 'Upbeat' },
      { name: 'Fenrir', description: 'Male - Excitable' },
      { name: 'Aoede', description: 'Female - Breezy' },
      { name: 'Enceladus', description: 'Male - Breathy' },
      { name: 'Algieba', description: 'Male - Smooth' },
      { name: 'Algenib', description: 'Male - Gravelly' },
      { name: 'Achernar', description: 'Female - Soft' },
      { name: 'Gacrux', description: 'Female - Mature' },
      { name: 'Zubenelgenubi', description: 'Male - Casual' },
      { name: 'Sadaltager', description: 'Male - Knowledgeable' },
    ],
  },
  {
    label: 'Informative Voices',
    voices: [
      { name: 'Charon', description: 'Informative' },
      { name: 'Leda', description: 'Female - Youthful' },
      { name: 'Callirrhoe', description: 'Female - Easy-going' },
      { name: 'Iapetus', description: 'Male - Clear' },
      { name: 'Despina', description: 'Female - Smooth' },
      { name: 'Rasalgethi', description: 'Male - Informative' },
      { name: 'Alnilam', description: 'Male - Firm' },
      { name: 'Pulcherrima', description: 'Female - Forward' },
      { name: 'Vindemiatrix', description: 'Female - Gentle' },
      { name: 'Sulafat', description: 'Female - Warm' },
    ],
  },
];
