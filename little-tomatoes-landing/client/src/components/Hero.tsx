import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

/**
 * Hero Section - Playful Garden Whimsy Design
 * 
 * Design Notes:
 * - Asymmetric layout with hero image on the right
 * - Warm color palette with organic feel
 * - Large, bold Fredoka headlines with Poppins body text
 * - Calls-to-action with gradient backgrounds
 */

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#FFFBF7] via-[#FAE5D3] to-[#FFF5E6] overflow-hidden pt-20 md:pt-0">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FADBD8] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D5F5E3] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#FADBD8] px-4 py-2 rounded-full w-fit">
              <span className="text-2xl">🌱</span>
              <span className="text-sm font-semibold text-[#C0392B]">For Ages 2-5</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="display-large text-[#2C3E50] leading-tight">
                Growing Big <span className="text-[#C0392B]">Thinkers</span>
              </h1>
              <p className="body-large text-[#7F8C8D] max-w-md">
                Little Tomatoes is an AI-powered cognitive development platform that prepares children for gifted program entry through play-based learning.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3 pt-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl mt-1">🧠</span>
                <div>
                  <p className="font-semibold text-[#2C3E50]">Cognitive Skills</p>
                  <p className="text-sm text-[#7F8C8D]">Builds logical reasoning, pattern recognition, and problem-solving</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl mt-1">🎮</span>
                <div>
                  <p className="font-semibold text-[#2C3E50]">Play-Based Learning</p>
                  <p className="text-sm text-[#7F8C8D]">Every activity is designed as a joyful game, not a test</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl mt-1">📊</span>
                <div>
                  <p className="font-semibold text-[#2C3E50]">Parent Insights</p>
                  <p className="text-sm text-[#7F8C8D]">Track your child's development with HiCAP readiness scores</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="btn-primary">
                Start Free Trial
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative h-full hidden md:flex items-center justify-center animate-slide-in-right">
            <div className="relative w-full max-w-md aspect-square">
              {/* Floating decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#E8DAEF] rounded-full opacity-60 animate-bounce-gentle"></div>
              <div className="absolute -bottom-12 -left-8 w-40 h-40 bg-[#D5F5E3] rounded-full opacity-60" style={{ animation: "bounce-gentle 2s infinite", animationDelay: "1s" }}></div>

              {/* Hero Image */}
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/hero_veggie_valley_87e2ba47.png"
                alt="Veggie Valley - Little Tomatoes Characters"
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#C0392B]" />
        </div>
      </div>
    </section>
  );
}
