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
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);
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
        onContinue={() => { setQuestionIndex(0); setAnswers([null, null, null]); setScreen('assessment'); }}
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
          const q2 = finalAnswers[1] === '3';
          const q3 = finalAnswers[2] === 'Hat';
          const correct = [q1, q2, q3].filter(Boolean).length;
          setReadinessScore([25, 45, 65, 100][correct]);
          // Q1→egie(1) Pattern Recognition, Q2→oliver(5) Quantitative, Q3→ollie(3) Verbal
          // Tested: correct=85%, wrong=40%. Untested: 50%
          setSkillPcts([50, q1 ? 85 : 40, 50, q3 ? 85 : 40, 50, q2 ? 85 : 40, 50]);
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
