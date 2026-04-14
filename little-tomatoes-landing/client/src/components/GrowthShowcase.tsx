/**
 * Growth Showcase Component - Playful Garden Whimsy Design
 * 
 * Design Notes:
 * - Interactive character growth progression
 * - Click to view each character's 5 growth stages
 * - Smooth animations between stages
 * - Educational and engaging for kids
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CharacterGrowth {
  name: string;
  emoji: string;
  color: string;
  stages: {
    name: string;
    image: string;
    description: string;
  }[];
}

const charactersGrowth: CharacterGrowth[] = [
  {
    name: "Tommy Tomato",
    emoji: "🍅",
    color: "#C0392B",
    stages: [
      {
        name: "Seed",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/tommy_stage1_seed-mMryKYGJ3DvGjp8tV2Tig3.webp",
        description: "Just planted! Full of potential.",
      },
      {
        name: "Sprout",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/tommy_stage2_sprout-RhL82W7WsqB3BvGrV4Gmmr.webp",
        description: "Breaking through! Growth has begun.",
      },
      {
        name: "Small",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/tommy_stage3_small-FtjceKi5w3iuoizpCLfGen.webp",
        description: "Learning and growing every day!",
      },
      {
        name: "Full Grown",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/tommy_stage4_full-ish4jHyXR4zZzfmmmSjD9J.webp",
        description: "Ready for adventure!",
      },
      {
        name: "Super Tomato",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/tommy_stage5_super-Q5E8W55EKtk98Xj3MrJ8vy.webp",
        description: "A true problem-solving hero!",
      },
    ],
  },
  {
    name: "Carrie Carrot",
    emoji: "🥕",
    color: "#D35400",
    stages: [
      {
        name: "Seed",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/carrie_stage1_seed-niXfj7FJFvzFxKZax8Tgcs.webp",
        description: "Just planted! Full of potential.",
      },
      {
        name: "Sprout",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/carrie_stage2_sprout-64uaaiQJ8d7yvK9LS5YKU2.webp",
        description: "Breaking through! Growth has begun.",
      },
      {
        name: "Small",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/carrie_stage3_small-fWJ6Dd85Y6MdAvaK8JyT35.webp",
        description: "Learning and growing every day!",
      },
      {
        name: "Full Grown",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/carrie_stage4_full-nt6cDAUwWrvnh268JdYMer.webp",
        description: "Ready to encourage others!",
      },
      {
        name: "Super Carrot",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/carrie_stage5_super-LWqgnJqhULhg7wq6Husqc9.webp",
        description: "An inspiring resilience champion!",
      },
    ],
  },
  {
    name: "Egie Eggplant",
    emoji: "🍆",
    color: "#6C3483",
    stages: [
      {
        name: "Seed",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/egie_stage1_seed-dXDFEvCdKrYm2LnD6PvidF.webp",
        description: "Just planted! Full of potential.",
      },
      {
        name: "Sprout",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/egie_stage2_sprout-28uWvLBZtzBTktvpDvLc2L.webp",
        description: "Breaking through! Growth has begun.",
      },
      {
        name: "Small",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/egie_stage3_small-LUysv8TjvXKJwpvj5LUoAB.webp",
        description: "Learning and growing every day!",
      },
      {
        name: "Full Grown",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/egie_stage4_full-E4YtFLytxV5idUjPL8phEb.webp",
        description: "A thoughtful pattern master!",
      },
      {
        name: "Super Eggplant",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/egie_stage5_super-3ftmRwzZTnXGG3b3gfxyhE.webp",
        description: "A spatial thinking genius!",
      },
    ],
  },
  {
    name: "Potato Pete",
    emoji: "🥔",
    color: "#B7950B",
    stages: [
      {
        name: "Seed",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/pete_stage1_seed-EeFpHoz4nCuf3JBUbbSKaJ.webp",
        description: "Just planted! Full of potential.",
      },
      {
        name: "Sprout",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/pete_stage2_sprout-WfGc5suBXMqQAJNR7hrL8V.webp",
        description: "Breaking through! Growth has begun.",
      },
      {
        name: "Small",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/pete_stage3_small-iPkqEUB7WGtL4EqDQ28Qu8.webp",
        description: "Learning and growing every day!",
      },
      {
        name: "Full Grown",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/pete_stage4_full-7rTsabmxrhW68fdoXSEHdr.webp",
        description: "A lovable memory builder!",
      },
      {
        name: "Super Potato",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/pete_stage5_super-nyjMnkY2X6AtiuAQJyRLC6.webp",
        description: "A sequencing superstar!",
      },
    ],
  },
  {
    name: "Ollie Onion",
    emoji: "🧅",
    color: "#7D6608",
    stages: [
      {
        name: "Seed",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/ollie_stage1_seed-GGxeDXQgoaUMkR3ij2ZS8z.webp",
        description: "Just planted! Full of potential.",
      },
      {
        name: "Sprout",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/ollie_stage2_sprout-Dn7s5QHkeZG37GDP6E253Y.webp",
        description: "Breaking through! Growth has begun.",
      },
      {
        name: "Small",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/ollie_stage3_small-k8vsKYJZHT4TgRUzSWW7xu.webp",
        description: "Learning and growing every day!",
      },
      {
        name: "Full Grown",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/ollie_stage4_full-UoDns8QRofEjKDfZ3haTPF.webp",
        description: "A dramatic wordsmith!",
      },
      {
        name: "Super Onion",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/ollie_stage5_super-aJK4EC5grBE23LzqKSJmc7.webp",
        description: "A vocabulary virtuoso!",
      },
    ],
  },
  {
    name: "Celly Celery",
    emoji: "🌿",
    color: "#1E8449",
    stages: [
      {
        name: "Seed",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/celly_stage1_seed-6KTxoi9yJh3XKJ24XTHdsU.webp",
        description: "Just planted! Full of potential.",
      },
      {
        name: "Sprout",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/celly_stage2_sprout-JxStNaB5txVKyT6dhuhAeB.webp",
        description: "Breaking through! Growth has begun.",
      },
      {
        name: "Small",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/celly_stage3_small-QUysqzgzEuU5hx7PmpwZ2N.webp",
        description: "Learning and growing every day!",
      },
      {
        name: "Full Grown",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/celly_stage4_full-6UdNvwGYJKpe6W2m2QSkAj.webp",
        description: "A speedy quick-thinker!",
      },
      {
        name: "Super Celery",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/celly_stage5_super-7A5RB49YLNMp54SJ5PS47S.webp",
        description: "A lightning-fast champion!",
      },
    ],
  },
  {
    name: "Oliver Okra",
    emoji: "🫑",
    color: "#2E86C1",
    stages: [
      {
        name: "Seed",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/oliver_stage1_seed-8vuZM8Az9Ui5wdBjJYo26f.webp",
        description: "Just planted! Full of potential.",
      },
      {
        name: "Sprout",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/oliver_stage2_sprout-J3F8oVNmKhD7WFhcjMTtAG.webp",
        description: "Breaking through! Growth has begun.",
      },
      {
        name: "Small",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/oliver_stage3_small-3NDRtKnvrcYpdSQSdVmTEn.webp",
        description: "Learning and growing every day!",
      },
      {
        name: "Full Grown",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/oliver_stage4_full-iPT3uqBNgjdcNWW42UxZmn.webp",
        description: "A methodical number master!",
      },
      {
        name: "Super Okra",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/oliver_stage5_super-Z2SkuzQznRtpDGvxoWb4eJ.webp",
        description: "A quantitative reasoning wizard!",
      },
    ],
  },
];

export default function GrowthShowcase() {
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  const character = charactersGrowth[selectedCharacter];
  const stage = character.stages[currentStage];

  const nextStage = () => {
    if (currentStage < character.stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-[#FFF9E6] to-white overflow-hidden">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="display-medium text-[#2C3E50] mb-4">
            Watch Your Veggie Friends Grow
          </h2>
          <p className="body-large text-[#7F8C8D] max-w-2xl mx-auto">
            Every character grows through 5 stages as your child learns and progresses. Click on a character to see their incredible transformation!
          </p>
        </div>

        {/* Main Growth Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Character Selection */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-[#2C3E50] mb-4">The Veggie Squad</h3>
            <div className="space-y-2">
              {charactersGrowth.map((char, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCharacter(idx);
                    setCurrentStage(0);
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 ${
                    selectedCharacter === idx
                      ? "bg-white text-white shadow-lg scale-105"
                      : "bg-white/50 text-[#2C3E50] hover:bg-white/80"
                  }`}
                  style={
                    selectedCharacter === idx
                      ? { backgroundColor: char.color, color: "white" }
                      : {}
                  }
                >
                  <span className="text-2xl">{char.emoji}</span>
                  <span>{char.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Growth Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
              {/* Stage Image */}
              <div className="mb-6 h-80 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                <img
                  src={stage.image}
                  alt={`${character.name} - ${stage.name}`}
                  className="w-full h-full object-contain p-4 animate-scale-in"
                />
              </div>

              {/* Stage Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">
                  Stage {currentStage + 1}: {stage.name}
                </h3>
                <p className="text-[#7F8C8D] italic">{stage.description}</p>
              </div>

              {/* Stage Progress */}
              <div className="mb-6">
                <div className="flex gap-2 justify-center">
                  {character.stages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx <= currentStage ? "bg-[#D35400] w-8" : "bg-gray-300 w-2"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={prevStage}
                  disabled={currentStage === 0}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-[#2C3E50]" />
                </button>

                <button
                  onClick={nextStage}
                  disabled={currentStage === character.stages.length - 1}
                  className="p-3 rounded-full bg-gradient-to-r from-[#C0392B] to-[#D35400] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Milestones Info */}
        <div className="bg-gradient-to-r from-[#FFF9E6] to-[#FAE5D3] rounded-xl p-8 border-2 border-[#D35400]/20">
          <h3 className="text-xl font-bold text-[#2C3E50] mb-4">🌱 The 5 Growth Stages</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {["🌾 Seed", "🌱 Sprout", "🌿 Small", "🌳 Full Grown", "⭐ Super"].map(
              (stage, idx) => (
                <div key={idx} className="text-center">
                  <p className="font-semibold text-[#2C3E50]">{stage}</p>
                  <p className="text-sm text-[#7F8C8D] mt-1">
                    {idx === 0 && "Starting out"}
                    {idx === 1 && "Early learning"}
                    {idx === 2 && "Building skills"}
                    {idx === 3 && "Confident"}
                    {idx === 4 && "Mastery!"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D35400] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1E8449] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
    </section>
  );
}
