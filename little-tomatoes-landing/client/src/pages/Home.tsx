import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Characters from "@/components/Characters";
import Features from "@/components/Features";
import GrowthSystem from "@/components/GrowthSystem";
import GrowthShowcase from "@/components/GrowthShowcase";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/**
 * Home Page - Little Tomatoes Landing Page
 * 
 * Design: Playful Garden Whimsy
 * - Warm, organic aesthetic with digital polish
 * - Asymmetric layouts and character-driven storytelling
 * - Organic wave dividers and playful animations
 * - Typography: Fredoka (headlines) + Poppins (body)
 * 
 * Sections:
 * 1. Hero - Main value proposition with hero image
 * 2. Characters - Meet the Veggie Squad
 * 3. Features - Why Little Tomatoes
 * 4. Growth System - Watch them grow
 * 5. CTA - Call to action
 * 6. Footer - Navigation and legal
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16 md:pt-20">
        <Hero />
        <Characters />
        <Features />
        <GrowthShowcase />
        <GrowthSystem />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
