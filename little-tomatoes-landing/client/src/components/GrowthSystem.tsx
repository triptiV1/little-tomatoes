/**
 * Growth System Section - Playful Garden Whimsy Design
 * 
 * Design Notes:
 * - Visual progression timeline
 * - Character growth stages
 * - Warm, celebratory color palette
 */

const growthStages = [
  {
    stage: "Seed",
    emoji: "🌱",
    title: "Just Started",
    description: "Your child begins their journey. Characters appear as tiny seeds full of potential.",
    color: "#B7950B",
  },
  {
    stage: "Sprout",
    emoji: "🌿",
    title: "First Activities",
    description: "After 5 activities completed, characters sprout above ground. First personality animations appear!",
    color: "#1E8449",
  },
  {
    stage: "Small Veggie",
    emoji: "🥬",
    title: "50% Mastery",
    description: "Halfway there! Characters reach half size and get their signature accessories.",
    color: "#2E86C1",
  },
  {
    stage: "Full Grown",
    emoji: "🍅",
    title: "80% Mastery",
    description: "Fully developed! Characters reach full size with all animations unlocked. Garden becomes lush.",
    color: "#C0392B",
  },
  {
    stage: "Super Veggie",
    emoji: "⭐",
    title: "95%+ Mastery",
    description: "Champion! Golden glow and special crown. Parents receive HiCAP Readiness Certificate.",
    color: "#D35400",
  },
];

export default function GrowthSystem() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-[#F9F5F0] to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8DAEF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D5F5E3] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 animate-fade-in-up">
          <h2 className="section-title mb-4">Watch Them Grow</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Every character grows as your child masters skills. It's the perfect visual representation of learning progress.
          </p>
        </div>

        {/* Growth Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#C0392B] via-[#D35400] to-[#1E8449] rounded-full"></div>

          {/* Growth Stages */}
          <div className="space-y-12 md:space-y-16">
            {growthStages.map((item, index) => (
              <div
                key={item.stage}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-bold" style={{ color: item.color }}>
                          STAGE {growthStages.indexOf(item) + 1}
                        </p>
                        <h3 className="headline-medium text-[#2C3E50]">{item.title}</h3>
                      </div>
                    </div>
                    <p className="body-medium text-[#7F8C8D]">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-2xl z-10 bg-white"
                    style={{
                      borderColor: item.color,
                      backgroundColor: `${item.color}15`,
                    }}
                  >
                    {item.emoji}
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 md:mt-24 bg-gradient-to-r from-[#FADBD8] to-[#FAE5D3] rounded-2xl p-8 md:p-12 text-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <p className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-3">
            Every milestone is celebrated!
          </p>
          <p className="body-large text-[#7F8C8D]">
            Confetti, music, and character celebrations make learning feel like winning. Your child will be motivated to keep growing.
          </p>
        </div>
      </div>
    </section>
  );
}
