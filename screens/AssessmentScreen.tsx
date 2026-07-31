import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Audio } from 'expo-av';

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

const AUDIO_ASSETS: Record<string, any> = {
  q1: require('../assets/audio/q1.mp3'),
  q2: require('../assets/audio/q2.mp3'),
  q3: require('../assets/audio/q3.mp3'),
  q4: require('../assets/audio/q4.mp3'),
  q5: require('../assets/audio/q5.mp3'),
  '🔵': require('../assets/audio/opt_blue_circle.mp3'),
  '🔴': require('../assets/audio/opt_red_circle.mp3'),
  '🟡': require('../assets/audio/opt_yellow_circle.mp3'),
  '🟢': require('../assets/audio/opt_green_circle.mp3'),
  '2': require('../assets/audio/opt_2.mp3'),
  '3': require('../assets/audio/opt_3.mp3'),
  '4': require('../assets/audio/opt_4.mp3'),
  '5': require('../assets/audio/opt_5.mp3'),
  'Foot 🦶': require('../assets/audio/opt_foot.mp3'),
  'Head 👤': require('../assets/audio/opt_head.mp3'),
  'Finger ☝️': require('../assets/audio/opt_finger.mp3'),
  'Arm 💪': require('../assets/audio/opt_arm.mp3'),
  'Pizza 🍕': require('../assets/audio/opt_pizza.mp3'),
  'Car 🚗': require('../assets/audio/opt_car.mp3'),
  'Star 🌟': require('../assets/audio/opt_star.mp3'),
  'Balloon 🎈': require('../assets/audio/opt_balloon.mp3'),
  'Try another color 🖍️': require('../assets/audio/opt_try_color.mp3'),
  'Cry and scream 😢': require('../assets/audio/opt_cry.mp3'),
  'Stop drawing 🙅': require('../assets/audio/opt_stop.mp3'),
  'Throw it away 🗑️': require('../assets/audio/opt_throw.mp3'),
  yay: require('../assets/audio/yay.mp3'),
  good_try: require('../assets/audio/good_try.mp3'),
};

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
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const playSound = async (source: any) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      if (source) {
        const { sound } = await Audio.Sound.createAsync(source);
        soundRef.current = sound;
        await sound.playAsync();
      }
    } catch (e) {
      console.log('Error playing audio asset:', e);
    }
  };

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const selectAnswer = async (option: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const updated = [...answers];
    updated[questionIndex] = option;
    setAnswers(updated);
    
    // 1. Play option voiceover (e.g. "Foot")
    await playSound(AUDIO_ASSETS[option]);
    
    // Wait a brief moment for the option voice to finish
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 2. Play feedback voiceover ("Yay" or "Good Try")
    const isCorrect = option === q.correct;
    await playSound(isCorrect ? AUDIO_ASSETS.yay : AUDIO_ASSETS.good_try);
    
    // Wait for the feedback voice to finish
    await new Promise(resolve => setTimeout(resolve, 1400));
    
    setIsProcessing(false);

    // 3. Auto-advance to the next question
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      onComplete(updated);
    }
  };

  useEffect(() => {
    // Speak the question automatically
    playSound(AUDIO_ASSETS[`q${questionIndex + 1}`]);
  }, [questionIndex]);

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
        <Text style={as.title}>Let's see what {childName || "your child"} knows!</Text>
        <Text style={as.subtitle}>Answer 3 quick questions</Text>

        <View style={as.card}>
          <View style={as.questionRow}>
            <Text style={as.questionText}>{q.question}</Text>
            <TouchableOpacity
              onPress={() => playSound(AUDIO_ASSETS[`q${questionIndex + 1}`])}
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
              onPress={() => { if (!isProcessing) selectAnswer(option); }}
              activeOpacity={0.8}
            >
              <Text style={[as.optionText, currentAnswer === option && as.optionTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


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
