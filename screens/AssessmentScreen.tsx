import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');

const QUESTIONS = [
  {
    question: 'Which comes next in the pattern?',
    pattern: '🔴 🔵 🔴 🔵 🔴 ___',
    options: ['🔵', '🔴', '🟡', '🟢'],
    correct: '🔵',
  },
  {
    question: 'If you have 3 apples and get 1 more, how many do you have?',
    pattern: '🍎 🍎 🍎 + 🍎',
    options: ['2', '3', '4', '5'],
    correct: '4',
  },
  {
    question: 'A glove goes on a hand. A shoe goes on a...',
    pattern: '🧤 ➔ ✋ | 👟 ➔ ?',
    options: ['Foot 🦶', 'Head 👤', 'Finger ☝️', 'Arm 💪'],
    correct: 'Foot 🦶',
  },
  {
    question: 'Pete shows you: 🚗 🍕 🌟. What was in the middle?',
    pattern: '🚗 ➔ ? ➔ 🌟',
    options: ['Pizza 🍕', 'Car 🚗', 'Star 🌟', 'Balloon 🎈'],
    correct: 'Pizza 🍕',
  },
  {
    question: 'Your crayon breaks while drawing. What should you do?',
    pattern: '🖍️ ➔ 💔',
    options: ['Try another color 🖍️', 'Cry and scream 😢', 'Stop drawing 🙅', 'Throw it away 🗑️'],
    correct: 'Try another color 🖍️',
  },
];


export default function AssessmentScreen({
  onBack, childName, questionIndex, setQuestionIndex, answers, setAnswers, onComplete,
}: {
  onBack: () => void;
  childName: string;
  questionIndex: number;
  setQuestionIndex: (v: number) => void;
  answers: (string | null)[];
  setAnswers: (v: (string | null)[]) => void;
  onComplete: (answers: (string | null)[]) => void;
}) {
  const [voiceId, setVoiceId] = React.useState<string | undefined>(undefined);
  const q = QUESTIONS[questionIndex];
  const currentAnswer = answers[questionIndex];

  // Helper to remove emojis for clean voice speaking
  const cleanText = (text: string) => {
    return text.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").trim();
  };

  // Query premium voices on mount
  useEffect(() => {
    async function loadVoices() {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        const englishVoices = voices.filter(v => v.language.startsWith('en'));
        const bestVoice = englishVoices.find(v => 
          v.name.toLowerCase().includes('premium') || 
          v.name.toLowerCase().includes('enhanced') || 
          v.name.toLowerCase().includes('samantha')
        ) || englishVoices[0];
        if (bestVoice) setVoiceId(bestVoice.identifier);
      } catch (e) {
        console.log('Error loading voices:', e);
      }
    }
    loadVoices();
  }, []);

  const selectAnswer = (option: string) => {
    const updated = [...answers];
    updated[questionIndex] = option;
    setAnswers(updated);
    
    // Read selected option out loud in a cheerful pitch
    Speech.stop();
    Speech.speak(cleanText(option), { voice: voiceId, rate: 0.85, pitch: 1.15 });
  };

  const handleNext = () => {
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      onComplete([...answers]);
    }
  };

  useEffect(() => {
    // Speak the question text automatically in a toddler-friendly speed and pitch
    Speech.stop();
    Speech.speak(q.question, { voice: voiceId, rate: 0.85, pitch: 1.15 });
    return () => {
      Speech.stop();
    };
  }, [questionIndex, voiceId]);

  return (
    <SafeAreaView style={as.screen}>
      <View style={as.topBar}>
        <TouchableOpacity onPress={onBack} style={as.backBtn}>
          <Text style={as.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={as.logoSmall}>🍅</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={as.progressRow}>
        {QUESTIONS.map((_, i) => (
          <View key={i} style={[as.dot, i === questionIndex && as.dotActive]} />
        ))}
      </View>

      <View style={as.content}>
        <Text style={as.title}>Let's see what {childName || 'your child'} knows!</Text>
        <Text style={as.subtitle}>Answer 3 quick questions</Text>

        <View style={as.card}>
          <View style={as.questionRow}>
            <Text style={as.questionText}>{q.question}</Text>
            <TouchableOpacity
              onPress={() => Speech.speak(q.question, { rate: 0.85 })}
              style={as.speakerBtn}
              activeOpacity={0.8}
            >
              <Text style={as.speakerText}>🔊</Text>
            </TouchableOpacity>
          </View>
          {q.pattern ? <Text style={as.pattern}>{q.pattern}</Text> : null}
        </View>

        <View style={as.grid}>
          {q.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[as.optionBtn, currentAnswer === option && as.optionBtnSelected]}
              onPress={() => selectAnswer(option)}
              activeOpacity={0.8}
            >
              <Text style={[as.optionText, currentAnswer === option && as.optionTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {currentAnswer !== null && (
          <TouchableOpacity style={as.nextBtn} onPress={handleNext} activeOpacity={0.85}>
            <Text style={as.nextBtnText}>
              {questionIndex < QUESTIONS.length - 1 ? 'Next →' : 'See Results 🌱'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const as = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },

  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 28, paddingTop: 16 },
  backBtn: { width: 40, padding: 4 },
  backArrow: { fontSize: 26, color: '#C0392B', fontWeight: '600' },
  logoSmall: { fontSize: 32 },

  progressRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 16, marginBottom: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E0E0E0' },
  dotActive: { backgroundColor: '#C0392B', width: 28, borderRadius: 5 },

  content: { flex: 1, paddingHorizontal: 28, paddingTop: 16, paddingBottom: 40 },

  title: { fontSize: 22, fontWeight: '800', color: '#C0392B', marginBottom: 4, lineHeight: 30 },
  subtitle: { fontSize: 14, color: '#999', marginBottom: 28 },

  card: {
    backgroundColor: '#FFF5F5', borderRadius: 20, padding: 20,
    alignItems: 'center', marginBottom: 24,
    borderWidth: 1.5, borderColor: '#FADBD8',
  },
  questionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 },
  questionText: { fontSize: 18, fontWeight: '700', color: '#333', textAlign: 'center', maxWidth: '80%' },
  speakerBtn: {
    backgroundColor: '#C0392B', width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#C0392B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3,
  },
  speakerText: { color: 'white', fontSize: 16 },
  pattern: { fontSize: 28, textAlign: 'center', lineHeight: 40 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  optionBtn: {
    width: (width - 56 - 12) / 2,
    paddingVertical: 20, borderRadius: 16,
    borderWidth: 1.5, borderColor: '#E0E0E0',
    backgroundColor: 'white', alignItems: 'center',
  },
  optionBtnSelected: { backgroundColor: '#C0392B', borderColor: '#C0392B' },
  optionText: { fontSize: 26, fontWeight: '700', color: '#555' },
  optionTextSelected: { color: 'white' },

  nextBtn: {
    backgroundColor: '#C0392B', borderRadius: 40, paddingVertical: 18,
    alignItems: 'center', marginTop: 24,
    shadowColor: '#C0392B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  nextBtnText: { color: 'white', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },
});
