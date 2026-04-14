/**
 * CTA Section - Playful Garden Whimsy Design
 * 
 * Design Notes:
 * - Warm gradient background
 * - Clear value proposition
 * - Strong call-to-action
 */

export default function CTA() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#C0392B] via-[#D35400] to-[#B7950B] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          {/* Headline */}
          <h2 className="display-medium text-white mb-6">
            Ready to Help Your Child Become a Big Thinker?
          </h2>

          {/* Description */}
          <p className="body-large text-white/90 mb-8 max-w-2xl mx-auto">
            Little Tomatoes offers a free trial so you can see how your child grows. No credit card required. Start today and watch the magic happen.
          </p>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-2xl mb-2">✨</p>
              <p className="text-white font-semibold">7-Day Free Trial</p>
              <p className="text-white/80 text-sm">Full access to all features</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-2xl mb-2">🔒</p>
              <p className="text-white font-semibold">No Credit Card</p>
              <p className="text-white/80 text-sm">Required to start</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-2xl mb-2">📱</p>
              <p className="text-white font-semibold">Works Everywhere</p>
              <p className="text-white/80 text-sm">iOS, Android, Web</p>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-[#C0392B] font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg">
              Start Free Trial
            </button>
            <button className="px-10 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white/10 transition-all duration-300 text-lg">
              Schedule Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 text-sm mb-4">Trusted by parents and educators</p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="text-white/60">
                <p className="font-bold text-lg">10K+</p>
                <p className="text-xs">Happy Families</p>
              </div>
              <div className="text-white/60">
                <p className="font-bold text-lg">4.9★</p>
                <p className="text-xs">App Rating</p>
              </div>
              <div className="text-white/60">
                <p className="font-bold text-lg">95%</p>
                <p className="text-xs">Retention Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
