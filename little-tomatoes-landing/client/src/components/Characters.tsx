/**
 * Characters Section - Playful Garden Whimsy Design
 * 
 * Design Notes:
 * - Asymmetric grid layout with character cards
 * - Each character has their own color and skill domain
 * - Hover animations that lift and rotate cards
 * - Wave divider to separate from previous section
 */

const characters = [
  {
    name: "Tommy Tomato",
    emoji: "🍅",
    color: "#C0392B",
    lightColor: "#FADBD8",
    skill: "Problem Solving",
    domain: "Logical Reasoning",
    description: "The brave adventurer who never gives up. Tommy teaches kids it's safe to try.",
    catchphrase: "Let's figure it out together!",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/tommy_tomato_b8e48856.png",
  },
  {
    name: "Egie the Eggplant",
    emoji: "🍆",
    color: "#6C3483",
    lightColor: "#E8DAEF",
    skill: "Pattern Recognition",
    domain: "Spatial Thinking",
    description: "The calm thinker who loves puzzles. Egie speaks slowly and deliberately.",
    catchphrase: "I see a pattern here...",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/egie_eggplant-gMVhwSoJWJ33rZaduL4M5Y.webp",
  },
  {
    name: "Potato Pete",
    emoji: "🥔",
    color: "#B7950B",
    lightColor: "#FCF3CF",
    skill: "Working Memory",
    domain: "Sequencing",
    description: "The lovably forgetful memory king. Pete teaches that memory is a skill you can practice.",
    catchphrase: "Wait... let me remember!",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/pete_potato-dmkdDsUkCLDfRhSeb8cjKB.webp",
  },
  {
    name: "Ollie the Onion",
    emoji: "🧅",
    color: "#7D6608",
    lightColor: "#FDFBD4",
    skill: "Verbal Reasoning",
    domain: "Vocabulary",
    description: "The dramatic wordsmith who loves big words and makes vocabulary feel like an adventure.",
    catchphrase: "Ooh, I know just the word for that!",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/ollie_onion-TBguFYMuJBe2Ti75nr9SYp.webp",
  },
  {
    name: "Celly the Celery",
    emoji: "🌿",
    color: "#1E8449",
    lightColor: "#D5F5E3",
    skill: "Processing Speed",
    domain: "Quick Thinking",
    description: "The energetic speedster who teaches that fast thinking is a skill and it's fun to be quick.",
    catchphrase: "Quick quick quick — what's the answer?!",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/celly_celery-fJUpZLhbEGahvrMCgtpD4e.webp",
  },
  {
    name: "Oliver the Okra",
    emoji: "🫑",
    color: "#2E86C1",
    lightColor: "#D6EAF8",
    skill: "Quantitative Reasoning",
    domain: "Number Sense",
    description: "The methodical builder who gets excited about numbers and patterns in quantity.",
    catchphrase: "Let's count it out!",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/oliver_okra-2eWSBGiKzwqzRZXj6PhoNK.webp",
  },
  {
    name: "Carrie the Carrot",
    emoji: "🥕",
    color: "#D35400",
    lightColor: "#FAE5D3",
    skill: "Emotional Intelligence",
    domain: "Resilience",
    description: "The warm encourager who never lets anyone give up. Carrie celebrates every tiny win.",
    catchphrase: "You've got this — try again!",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/carrie_carrot_688879a2.png",
  },
];

export default function Characters() {
  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Wave Divider Top */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 md:h-32">
          <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="#FFFBF7" />
        </svg>
      </div>

      <div className="container relative z-10 pt-12 md:pt-20">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 animate-fade-in-up">
          <h2 className="section-title mb-4">Meet the Veggie Squad</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Seven unique characters, each representing a different cognitive skill. Watch them grow as your child learns!
          </p>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {characters.map((character, index) => (
            <div
              key={character.name}
              className="character-card bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                borderColor: `${character.lightColor}`,
              }}
            >
              {/* Character Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="headline-medium text-[#2C3E50] mb-1">{character.name}</h3>
                  <p className="text-sm font-semibold" style={{ color: character.color }}>
                    {character.skill}
                  </p>
                </div>
                <span className="text-4xl">{character.emoji}</span>
              </div>

              {/* Character Image (if available) */}
              {character.image && (
                <div className="mb-4 h-56 flex items-center justify-center bg-gradient-to-br from-white to-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              )}

              {/* Character Description */}
              <p className="body-medium text-[#7F8C8D] mb-4">
                {character.description}
              </p>

              {/* Domain Badge */}
              <div className="mb-4 inline-block px-3 py-1 rounded-full text-sm font-semibold" style={{
                backgroundColor: character.lightColor,
                color: character.color,
              }}>
                {character.domain}
              </div>

              {/* Catchphrase */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm italic text-[#7F8C8D]">
                  "{character.catchphrase}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave Divider Bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 md:h-32">
          <path d="M0,50 Q300,100 600,50 T1200,50 L1200,0 L0,0 Z" fill="#F9F5F0" />
        </svg>
      </div>
    </section>
  );
}
