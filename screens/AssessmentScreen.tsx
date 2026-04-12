import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const QUESTIONS = [
  {
    question: 'Which comes next?',
    pattern: '🔴 🔵 🔴 🔵 🔴 ___',
    options: ['🔵', '🔴', '🟡', '🟢'],
    correct: '🔵',
  },
  {
    question: 'How many apples?',
    pattern: '🍎 🍎 🍎',
    options: ['2', '3', '4', '5'],
    correct: '3',
  },
  {
    question: 'What rhymes with CAT?',
    pattern: '',
    options: ['Dog', 'Hat', 'Ball', 'Fish'],
    correct: 'Hat',
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
  const q = QUESTIONS[questionIndex];
  const currentAnswer = answers[questionIndex];

  const selectAnswer = (option: string) => {
    const updated = [...answers];
    updated[questionIndex] = option;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      onComplete([...answers]);
    }
  };

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
          <Text style={as.questionText}>{q.question}</Text>
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
    backgroundColor: '#FFF5F5', borderRadius: 20, padding: 24,
    alignItems: 'center', marginBottom: 24,
    borderWidth: 1.5, borderColor: '#FADBD8',
  },
  questionText: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 12, textAlign: 'center' },
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
