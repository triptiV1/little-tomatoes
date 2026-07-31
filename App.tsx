import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { Character } from './screens/types';

import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import ChildProfileScreen from './screens/ChildProfileScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import VeggieValleyScreen from './screens/VeggieValleyScreen';
import ActivityScreen from './screens/ActivityScreen';
import ParentDashboardScreen from './screens/ParentDashboardScreen';
import PaywallScreen from './screens/PaywallScreen';
import CelebrationScreen from './screens/CelebrationScreen';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [childName, setChildName] = useState('');
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null, null, null]);
  const [readinessScore, setReadinessScore] = useState(0);
  // skillPcts[i] maps to CHARACTERS[i] — indices: tommy=0,egie=1,pete=2,ollie=3,celly=4,oliver=5,carrie=6,ada=7
  const [skillPcts, setSkillPcts] = useState<number[]>([50, 50, 50, 50, 50, 50, 50, 50]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [activitiesUsedToday, setActivitiesUsedToday] = useState(0);
  const FREE_LIMIT = 3;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -15, duration: 800, useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  if (screen === 'signup') {
    return (
      <SignUpScreen
        onBack={() => setScreen('welcome')}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onContinue={() => setScreen('childProfile')}
      />
    );
  }

  if (screen === 'childProfile') {
    return (
      <ChildProfileScreen
        onBack={() => setScreen('signup')}
        childName={childName}
        setChildName={setChildName}
        selectedAge={selectedAge}
        setSelectedAge={setSelectedAge}
        onContinue={() => { setQuestionIndex(0); setAnswers([null, null, null, null, null]); setScreen('assessment'); }}
      />
    );
  }

  if (screen === 'assessment') {
    return (
      <AssessmentScreen
        onBack={() => setScreen('childProfile')}
        childName={childName}
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        answers={answers}
        setAnswers={setAnswers}
        onComplete={(finalAnswers) => {
          const q1 = finalAnswers[0] === '🔵';
          const q2 = finalAnswers[1] === '4';
          const q3 = finalAnswers[2] === 'Foot 🦶';
          const q4 = finalAnswers[3] === 'Pizza 🍕';
          const q5 = finalAnswers[4] === 'Try another color 🖍️';
          const correct = [q1, q2, q3, q4, q5].filter(Boolean).length;
          
          // Age-normed CogAT scoring mimicking Washington State Early Entrance / Gifted APR
          let score = 50; 
          const age = selectedAge || 4;
          
          if (correct === 0) {
            score = age === 3 ? 30 : (age === 4 ? 20 : 10);
          } else if (correct === 1) {
            score = age === 3 ? 50 : (age === 4 ? 40 : 30);
          } else if (correct === 2) {
            score = age === 3 ? 70 : (age === 4 ? 60 : 50);
          } else if (correct === 3) {
            score = age === 3 ? 88 : (age === 4 ? 78 : 68);
          } else if (correct === 4) {
            score = age === 3 ? 97 : (age === 4 ? 90 : 80);
          } else if (correct === 5) {
            score = age === 3 ? 99 : (age === 4 ? 98 : 96);
          }
          
          setReadinessScore(score);
          
          const getSkillPct = (isCorrect: boolean) => {
            return isCorrect ? (age === 3 ? 95 : (age === 4 ? 85 : 75)) : (age === 3 ? 50 : (age === 4 ? 40 : 30));
          };
          
          setSkillPcts([
            50,                     // Tommy (Logical)
            getSkillPct(q1),        // Egie (Pattern)
            getSkillPct(q4),        // Pete (Memory)
            getSkillPct(q3),        // Ollie (Verbal)
            50,                     // Celly (Speed)
            getSkillPct(q2),        // Oliver (Quantitative)
            getSkillPct(q5),        // Carrie (Resilience)
            50,                     // Ada (AI Thinking)
          ]);
          setScreen('veggieValley');
        }}
      />
    );
  }

  if (screen === 'veggieValley') {
    return (
      <VeggieValleyScreen
        childName={childName}
        readinessScore={readinessScore}
        onSelectCharacter={(char) => {
          if (activitiesUsedToday >= FREE_LIMIT) {
            setScreen('paywall');
          } else {
            setSelectedCharacter(char);
            setScreen('activity');
          }
        }}
        onOpenParent={() => setScreen('parentDashboard')}
      />
    );
  }

  if (screen === 'activity' && selectedCharacter) {
    return (
      <ActivityScreen
        character={selectedCharacter}
        onBack={() => {
          setActivitiesUsedToday((n) => n + 1);
          setScreen('veggieValley');
        }}
        onComplete={() => {
          setActivitiesUsedToday((n) => n + 1);
          setScreen('celebration');
        }}
      />
    );
  }

  if (screen === 'celebration' && selectedCharacter) {
    return (
      <CelebrationScreen
        character={selectedCharacter}
        childName={childName}
        onContinue={() => setScreen('veggieValley')}
      />
    );
  }

  if (screen === 'paywall') {
    return (
      <PaywallScreen
        childName={childName}
        onSubscribe={() => setScreen('veggieValley')}
        onDismiss={() => setScreen('veggieValley')}
      />
    );
  }

  if (screen === 'parentDashboard') {
    return (
      <ParentDashboardScreen
        childName={childName}
        readinessScore={readinessScore}
        skillPcts={skillPcts}
        onBack={() => setScreen('veggieValley')}
      />
    );
  }

  return (
    <WelcomeScreen
      bounceAnim={bounceAnim}
      pulseAnim={pulseAnim}
      onStart={() => setScreen('signup')}
    />
  );
}
