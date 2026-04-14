export type Character = {
  id: string;
  emoji: string;
  name: string;
  color: string;
  domain: string;
  imageUrl: string | null;
};

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/';

export const CHARACTERS: Character[] = [
  { id: 'tommy',  emoji: '🍅', name: 'Tommy',       color: '#C0392B', domain: 'Logical Reasoning',       imageUrl: CDN + 'tommy_tomato_b8e48856.png' },
  { id: 'egie',   emoji: '🍆', name: 'Egie',        color: '#6C3483', domain: 'Pattern Recognition',     imageUrl: CDN + 'egie_eggplant-gMVhwSoJWJ33rZaduL4M5Y.webp' },
  { id: 'pete',   emoji: '🥔', name: 'Pete',        color: '#B7950B', domain: 'Working Memory',          imageUrl: CDN + 'pete_potato-dmkdDsUkCLDfRhSeb8cjKB.webp' },
  { id: 'ollie',  emoji: '🧅', name: 'Ollie',       color: '#7D6608', domain: 'Verbal Reasoning',        imageUrl: CDN + 'ollie_onion-TBguFYMuJBe2Ti75nr9SYp.webp' },
  { id: 'celly',  emoji: '🥬', name: 'Celly',       color: '#1E8449', domain: 'Processing Speed',        imageUrl: CDN + 'celly_celery-fJUpZLhbEGahvrMCgtpD4e.webp' },
  { id: 'oliver', emoji: '🌿', name: 'Okra Oliver', color: '#2E86C1', domain: 'Quantitative Reasoning',  imageUrl: CDN + 'oliver_okra-2eWSBGiKzwqzRZXj6PhoNK.webp' },
  { id: 'carrie', emoji: '🥕', name: 'Carrie',      color: '#D35400', domain: 'Resilience & EQ',         imageUrl: CDN + 'carrie_carrot_688879a2.png' },
  { id: 'ada',    emoji: '🥑', name: 'Ada',         color: '#27AE60', domain: 'AI Thinking',             imageUrl: 'https://res.cloudinary.com/dygplllqo/image/upload/f_auto,q_auto/Cute_avocado_with_glowing_orb_pit_yiv88t' },
];
