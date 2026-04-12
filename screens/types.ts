export type Character = {
  id: string;
  emoji: string;
  name: string;
  color: string;
  domain: string;
};

export const CHARACTERS: Character[] = [
  { id: 'tommy',  emoji: '🍅', name: 'Tommy',       color: '#C0392B', domain: 'Logical Reasoning' },
  { id: 'egie',   emoji: '🍆', name: 'Egie',        color: '#6C3483', domain: 'Pattern Recognition' },
  { id: 'pete',   emoji: '🥔', name: 'Pete',        color: '#B7950B', domain: 'Working Memory' },
  { id: 'ollie',  emoji: '🧅', name: 'Ollie',       color: '#7D6608', domain: 'Verbal Reasoning' },
  { id: 'celly',  emoji: '🥬', name: 'Celly',       color: '#1E8449', domain: 'Processing Speed' },
  { id: 'oliver', emoji: '🌿', name: 'Okra Oliver', color: '#2E86C1', domain: 'Quantitative Reasoning' },
  { id: 'carrie', emoji: '🥕', name: 'Carrie',      color: '#D35400', domain: 'Resilience & EQ' },
];
