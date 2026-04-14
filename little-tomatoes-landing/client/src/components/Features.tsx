/**
 * Features Section - Playful Garden Whimsy Design
 * 
 * Design Notes:
 * - Asymmetric layout with alternating content/image
 * - Feature cards with character colors
 * - Warm, inviting color palette
 */

const features = [
  {
    title: "AI-Powered Adaptation",
    description: "The app learns from your child's responses and adjusts difficulty in real-time. Every session is perfectly calibrated to their current level.",
    icon: "🤖",
    color: "#2E86C1",
    lightColor: "#D6EAF8",
  },
  {
    title: "HiCAP Readiness Tracking",
    description: "Built on the cognitive domains assessed by HiCAP and gifted program evaluations. See exactly how your child's skills are developing.",
    icon: "📊",
    color: "#1E8449",
    lightColor: "#D5F5E3",
  },
  {
    title: "Growth System",
    description: "Watch your child's veggie friends grow from seeds to super veggies as they master skills. Visual progress keeps kids motivated.",
    icon: "🌱",
    color: "#D35400",
    lightColor: "#FAE5D3",
  },
  {
    title: "Parent Dashboard",
    description: "Understand your child's cognitive development with detailed progress reports, skill assessments, and HiCAP readiness scores.",
    icon: "👨‍👩‍👧",
    color: "#6C3483",
    lightColor: "#E8DAEF",
  },
];

export default function Features() {
  return (
    <section className="relative py-20 md:py-32 bg-[#F9F5F0]">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 animate-fade-in-up">
          <h2 className="section-title mb-4">Why Little Tomatoes?</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We're not just teaching facts—we're building the cognitive skills that matter for gifted program success.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 md:p-10 rounded-2xl bg-white border-2 transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                borderColor: feature.lightColor,
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
              }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className="headline-medium text-[#2C3E50] mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="body-medium text-[#7F8C8D]">
                {feature.description}
              </p>

              {/* Accent Line */}
              <div
                className="mt-6 h-1 w-12 rounded-full transition-all duration-300 group-hover:w-24"
                style={{ backgroundColor: feature.color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-24 text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="body-large text-[#7F8C8D] mb-6">
            Ready to help your child grow into a big thinker?
          </p>
          <button className="btn-primary">
            Start Your Free Trial Today
          </button>
        </div>
      </div>
    </section>
  );
}
