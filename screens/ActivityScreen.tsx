import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Character } from './types';

const { width } = Dimensions.get('window');
const OPTION_WIDTH = (width - 28 * 2 - 12) / 2;

const ACTIVITIES: Record<string, { question: string; options: string[]; correct: string }[]> = {
  tommy: [
    { question: '🐱 The cat is hungry. What should we do?', options: ['Feed the cat 🍽️', 'Go to sleep 😴', 'Play outside ⚽', 'Read a book 📚'], correct: 'Feed the cat 🍽️' },
    { question: '🌧️ It is raining outside. What do you need?', options: ['Sunglasses 😎', 'An umbrella ☂️', 'A swimsuit 🩱', 'Flip flops 🩴'], correct: 'An umbrella ☂️' },
    { question: '🔑 You lost your toy. What is the best first step?', options: ['Cry and give up 😢', 'Ask a friend to help look 🤝', 'Buy a new one 🛒', 'Forget about it 🤷'], correct: 'Ask a friend to help look 🤝' },
    { question: '🌱 A plant is drooping. What does it probably need?', options: ['More sunlight ☀️', 'Water 💧', 'Music 🎵', 'A hug 🤗'], correct: 'Water 💧' },
    { question: '🎂 You have 4 cookies and eat 1. How many are left?', options: ['2', '3', '5', '4'], correct: '3' },
  ],
  egie: [
    { question: 'What comes next? 🔴 🔵 🔴 🔵 🔴 ___', options: ['🔵', '🟡', '🔴', '🟢'], correct: '🔵' },
    { question: 'What comes next? ⬆️ ⬇️ ⬆️ ⬇️ ___', options: ['⬅️', '⬆️', '⬇️', '➡️'], correct: '⬆️' },
    { question: 'Which shape fits the pattern? 🔺 🔷 🔺 🔷 ___', options: ['🔺', '🔷', '🟥', '🔵'], correct: '🔺' },
    { question: 'What comes next? 1 2 1 2 1 ___', options: ['3', '1', '2', '0'], correct: '2' },
    { question: 'Which is different? 🍎 🍎 🍊 🍎', options: ['First 🍎', 'Second 🍎', '🍊', 'Last 🍎'], correct: '🍊' },
  ],
  pete: [
    { question: '🐘 Remember these: 🐶 🌟 🍕. What was second?', options: ['🐶', '🌟', '🍕', '🎈'], correct: '🌟' },
    { question: 'I said: red, blue, green. What was first?', options: ['Blue', 'Green', 'Red', 'Yellow'], correct: 'Red' },
    { question: '🔢 3 + 2 = ? (no peeking!)', options: ['4', '5', '6', '7'], correct: '5' },
    { question: 'Remember: 🏠 🚗 🌈. What was last?', options: ['🏠', '🚗', '🌈', '⭐'], correct: '🌈' },
    { question: 'I said: cat, dog, fish. How many words?', options: ['2', '3', '4', '5'], correct: '3' },
  ],
  ollie: [
    { question: 'What rhymes with CAT?', options: ['Dog 🐕', 'Hat 🎩', 'Ball ⚽', 'Fish 🐟'], correct: 'Hat 🎩' },
    { question: 'Which word means the opposite of BIG?', options: ['Tall', 'Small', 'Wide', 'Long'], correct: 'Small' },
    { question: 'What rhymes with MOON?', options: ['Star ⭐', 'Sun ☀️', 'Spoon 🥄', 'Cloud ☁️'], correct: 'Spoon 🥄' },
    { question: 'Which word describes a HAPPY feeling?', options: ['Sad 😢', 'Angry 😡', 'Joyful 😄', 'Tired 😴'], correct: 'Joyful 😄' },
    { question: 'What rhymes with HOUSE?', options: ['Tree 🌳', 'Mouse 🐭', 'Car 🚗', 'Flower 🌸'], correct: 'Mouse 🐭' },
  ],
  celly: [
    { question: '⚡ Quick! Which is fastest?', options: ['Turtle 🐢', 'Snail 🐌', 'Cheetah 🐆', 'Elephant 🐘'], correct: 'Cheetah 🐆' },
    { question: '⚡ Quick! Count the stars: ⭐⭐⭐⭐', options: ['3', '4', '5', '6'], correct: '4' },
    { question: '⚡ Quick! What color is the sky?', options: ['Green', 'Red', 'Blue', 'Purple'], correct: 'Blue' },
    { question: '⚡ Quick! Which animal says MOO?', options: ['Dog 🐕', 'Cat 🐱', 'Cow 🐄', 'Duck 🦆'], correct: 'Cow 🐄' },
    { question: '⚡ Quick! 2 + 2 = ?', options: ['3', '4', '5', '6'], correct: '4' },
  ],
  oliver: [
    { question: '🫑 Count the veggies: 🥦🥦🥦🥦🥦', options: ['3', '4', '5', '6'], correct: '5' },
    { question: 'If you have 3 apples and get 2 more, how many?', options: ['4', '5', '6', '7'], correct: '5' },
    { question: 'Which group has MORE? 🍎🍎🍎 or 🍊🍊?', options: ['🍊🍊', '🍎🍎🍎', 'Same', 'Neither'], correct: '🍎🍎🍎' },
    { question: 'I have 6 grapes and eat 2. How many left?', options: ['3', '4', '5', '6'], correct: '4' },
    { question: 'Which number is biggest?', options: ['3', '7', '5', '2'], correct: '7' },
  ],
  carrie: [
    { question: '🥕 Your tower fell down. What do you do?', options: ['Give up 😤', 'Build it again! 💪', 'Cry forever 😭', 'Blame someone else 👉'], correct: 'Build it again! 💪' },
    { question: 'A friend is sad. What helps most?', options: ['Ignore them 🙈', 'Laugh at them 😂', 'Give a hug 🤗', 'Take their toy 😈'], correct: 'Give a hug 🤗' },
    { question: 'You made a mistake. What should you say?', options: ['Nothing 🤐', '"It\'s not my fault!" 😤', '"I\'m sorry" 🥺', '"Whatever" 🙄'], correct: '"I\'m sorry" 🥺' },
    { question: 'You did something hard! How do you feel?', options: ['Bored 😑', 'Proud 🌟', 'Scared 😨', 'Silly 🤪'], correct: 'Proud 🌟' },
    { question: 'It\'s OK to feel sad sometimes. What helps?', options: ['Hide your feelings 😶', 'Talk to someone you trust 💬', 'Never feel sad again', 'Scream forever 😱'], correct: 'Talk to someone you trust 💬' },
  ],
};

export default function ActivityScreen({
  character, onBack, onComplete,
}: {
  character: Character;
  onBack: () => void;
  onComplete: () => void;
}) {
  const [activityIndex, setActivityIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const activities = ACTIVITIES[character.id] ?? ACTIVITIES.tommy;
  const activity = activities[activityIndex];
  const total = activities.length;
  const isCorrect = selectedOption === activity.correct;

  const handleNext = () => {
    if (activityIndex < total - 1) {
      setActivityIndex(activityIndex + 1);
      setSelectedOption(null);
      setChecked(false);
    } else {
      onComplete();
    }
  };

  return (
    <SafeAreaView style={ac.screen}>
      <View style={[ac.banner, { backgroundColor: character.color }]} />

      <View style={ac.topBar}>
        <TouchableOpacity onPress={onBack} style={ac.backBtn}>
          <Text style={ac.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={ac.topCenter}>
          <Text style={ac.charEmoji}>{character.emoji}</Text>
          <Text style={ac.charName}>{character.name}</Text>
        </View>
        <Text style={ac.activityCount}>Activity {activityIndex + 1} of {total}</Text>
      </View>

      <ScrollView contentContainerStyle={ac.scroll} keyboardShouldPersistTaps="handled">
        <View style={ac.card}>
          <Text style={ac.cardLabel}>{character.name} says:</Text>
          <Text style={ac.questionText}>{activity.question}</Text>
        </View>

        <View style={ac.grid}>
          {activity.options.map((opt) => {
            const isSelected = selectedOption === opt;
            return (
              <TouchableOpacity
                key={opt}
                style={[ac.optionBtn, isSelected && { backgroundColor: character.color, borderColor: character.color }]}
                activeOpacity={0.8}
                onPress={() => { if (!checked) setSelectedOption(opt); }}
              >
                <Text style={[ac.optionText, isSelected && ac.optionTextSelected]}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedOption !== null && !checked && (
          <TouchableOpacity
            style={[ac.checkBtn, { backgroundColor: character.color }]}
            activeOpacity={0.85}
            onPress={() => setChecked(true)}
          >
            <Text style={ac.checkBtnText}>Check Answer</Text>
          </TouchableOpacity>
        )}

        {checked && (
          <View style={[ac.feedbackBanner, { backgroundColor: isCorrect ? '#27AE60' : '#E67E22' }]}>
            <Text style={ac.feedbackText}>
              {isCorrect ? 'Amazing thinking! ⭐' : 'Good try! Think again 💪'}
            </Text>
          </View>
        )}

        {checked && (
          <TouchableOpacity
            style={[ac.nextBtn, { backgroundColor: character.color }]}
            activeOpacity={0.85}
            onPress={handleNext}
          >
            <Text style={ac.nextBtnText}>
              {activityIndex < total - 1 ? 'Next Activity →' : 'Back to Garden 🌱'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const ac = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },
  banner: { position: 'absolute', top: 0, left: 0, right: 0, height: 140 },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, zIndex: 1,
  },
  backBtn: { width: 40, padding: 4 },
  backArrow: { fontSize: 26, color: 'white', fontWeight: '600' },
  topCenter: { alignItems: 'center' },
  charEmoji: { fontSize: 28 },
  charName: { fontSize: 13, fontWeight: '700', color: 'white' },
  activityCount: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: '600', textAlign: 'right', width: 80 },

  scroll: { paddingHorizontal: 28, paddingTop: 16, paddingBottom: 48 },

  card: {
    backgroundColor: '#FFF5F5', borderRadius: 20, padding: 24,
    marginBottom: 24, borderWidth: 1.5, borderColor: '#FADBD8',
  },
  cardLabel: { fontSize: 12, color: '#aaa', fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  questionText: { fontSize: 20, fontWeight: '800', color: '#222', lineHeight: 30 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  optionBtn: {
    width: OPTION_WIDTH, paddingVertical: 18, paddingHorizontal: 12,
    borderRadius: 16, borderWidth: 1.5, borderColor: '#E0E0E0',
    backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', minHeight: 70,
  },
  optionText: { fontSize: 15, fontWeight: '600', color: '#444', textAlign: 'center' },
  optionTextSelected: { color: 'white' },

  checkBtn: {
    borderRadius: 40, paddingVertical: 18, alignItems: 'center', marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6,
  },
  checkBtnText: { color: 'white', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },

  feedbackBanner: {
    borderRadius: 16, paddingVertical: 16, paddingHorizontal: 20,
    alignItems: 'center', marginBottom: 16,
  },
  feedbackText: { color: 'white', fontSize: 18, fontWeight: '800' },

  nextBtn: {
    borderRadius: 40, paddingVertical: 18, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6,
  },
  nextBtnText: { color: 'white', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },
});
