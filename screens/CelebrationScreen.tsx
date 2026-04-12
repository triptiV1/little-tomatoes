import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  Animated, Dimensions,
} from 'react-native';
import { Character } from './types';

const { width: SW, height: SH } = Dimensions.get('window');

const EMOJIS = ['⭐', '🌟', '✨', '💫'];
const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FF9A9E', '#C0392B', '#F39C12'];
const TARGET_STARS = 3;
const RING_SIZE = 140;

// Generated once at module load — stable random properties per session
const CONFETTI_DATA = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * SW,
  isEmoji: i % 2 === 0,
  emoji: EMOJIS[i % EMOJIS.length],
  color: COLORS[i % COLORS.length],
  size: 10 + Math.random() * 20,
  duration: 1800 + Math.random() * 2200,
  delay: Math.random() * 1600,
  startRot: Math.floor(Math.random() * 360),
  totalRot: (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 3)) * 360,
}));

export default function CelebrationScreen({
  character, childName, onContinue,
}: {
  character: Character;
  childName: string;
  onContinue: () => void;
}) {
  // ── ALL REFS FIRST ────────────────────────────────────────────────────────────
  const bgFlash      = useRef(new Animated.Value(0)).current;
  const charScale    = useRef(new Animated.Value(0)).current;
  const ring1        = useRef(new Animated.Value(0)).current;
  const ring2        = useRef(new Animated.Value(0)).current;
  const ring3        = useRef(new Animated.Value(0)).current;
  const pointsAnim   = useRef(new Animated.Value(0)).current;
  const wobbleAnim   = useRef(new Animated.Value(0)).current;
  const continuePulse = useRef(new Animated.Value(1)).current;
  const streakPulse  = useRef(new Animated.Value(1)).current;
  const starBounce   = useRef(new Animated.Value(1)).current;
  const confettiAnims = useRef(CONFETTI_DATA.map(() => new Animated.Value(0))).current;

  // ── STATE ─────────────────────────────────────────────────────────────────────
  const [starCount, setStarCount] = useState(0);

  // ── STARTUP ANIMATIONS ────────────────────────────────────────────────────────
  useEffect(() => {
    // Background flash: dark green ↔ gold × 3, then settle
    Animated.sequence([
      Animated.timing(bgFlash, { toValue: 1, duration: 110, useNativeDriver: false }),
      Animated.timing(bgFlash, { toValue: 0, duration: 110, useNativeDriver: false }),
      Animated.timing(bgFlash, { toValue: 1, duration: 110, useNativeDriver: false }),
      Animated.timing(bgFlash, { toValue: 0, duration: 110, useNativeDriver: false }),
      Animated.timing(bgFlash, { toValue: 1, duration: 110, useNativeDriver: false }),
      Animated.timing(bgFlash, { toValue: 0.12, duration: 700, useNativeDriver: false }),
    ]).start();

    // Character spring-explosion: 0 → overshoot → settle 1.2
    Animated.spring(charScale, {
      toValue: 1.2,
      tension: 55,
      friction: 3,
      useNativeDriver: true,
    }).start();

    // Radiating rings — each loops with 450ms offset
    const startRing = (anim: Animated.Value, delay: number) => {
      setTimeout(() => {
        Animated.loop(
          Animated.timing(anim, { toValue: 1, duration: 1400, useNativeDriver: true })
        ).start();
      }, delay);
    };
    startRing(ring1, 0);
    startRing(ring2, 450);
    startRing(ring3, 900);

    // "+5 points!" floats up, fades, resets
    Animated.loop(
      Animated.sequence([
        Animated.timing(pointsAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.delay(700),
        Animated.timing(pointsAnim, { toValue: 0, duration: 1, useNativeDriver: true }),
        Animated.delay(700),
      ])
    ).start();

    // "AMAZING!" rotation wobble
    Animated.loop(
      Animated.sequence([
        Animated.timing(wobbleAnim, { toValue: 1,    duration: 110, useNativeDriver: true }),
        Animated.timing(wobbleAnim, { toValue: -1,   duration: 110, useNativeDriver: true }),
        Animated.timing(wobbleAnim, { toValue: 0.5,  duration: 90,  useNativeDriver: true }),
        Animated.timing(wobbleAnim, { toValue: -0.5, duration: 90,  useNativeDriver: true }),
        Animated.timing(wobbleAnim, { toValue: 0,    duration: 80,  useNativeDriver: true }),
        Animated.delay(2400),
      ])
    ).start();

    // Continue button pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(continuePulse, { toValue: 1.06, duration: 650, useNativeDriver: true }),
        Animated.timing(continuePulse, { toValue: 1,    duration: 650, useNativeDriver: true }),
      ])
    ).start();

    // 🔥 streak pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(streakPulse, { toValue: 1.4, duration: 450, useNativeDriver: true }),
        Animated.timing(streakPulse, { toValue: 0.85, duration: 450, useNativeDriver: true }),
      ])
    ).start();

    // Confetti — staggered start, each loops at its own speed
    confettiAnims.forEach((anim, i) => {
      setTimeout(() => {
        Animated.loop(
          Animated.timing(anim, { toValue: 1, duration: CONFETTI_DATA[i].duration, useNativeDriver: true })
        ).start();
      }, CONFETTI_DATA[i].delay);
    });

    // Stars tick up one by one
    const timers = Array.from({ length: TARGET_STARS }, (_, i) =>
      setTimeout(() => setStarCount(i + 1), 650 + i * 380)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── STAR BOUNCE when each one ticks in ────────────────────────────────────────
  useEffect(() => {
    if (starCount > 0) {
      starBounce.setValue(1.8);
      Animated.spring(starBounce, {
        toValue: 1,
        friction: 4,
        tension: 90,
        useNativeDriver: true,
      }).start();
    }
  }, [starCount]);

  // ── INTERPOLATIONS ────────────────────────────────────────────────────────────
  const bgColor = bgFlash.interpolate({
    inputRange: [0, 1],
    outputRange: ['#0a1a0a', '#c8a800'],
  });

  const ring1Scale   = ring1.interpolate({ inputRange: [0, 1], outputRange: [0.7, 2.6] });
  const ring1Opacity = ring1.interpolate({ inputRange: [0, 0.25, 1], outputRange: [0, 0.55, 0] });
  const ring2Scale   = ring2.interpolate({ inputRange: [0, 1], outputRange: [0.7, 2.6] });
  const ring2Opacity = ring2.interpolate({ inputRange: [0, 0.25, 1], outputRange: [0, 0.55, 0] });
  const ring3Scale   = ring3.interpolate({ inputRange: [0, 1], outputRange: [0.7, 2.6] });
  const ring3Opacity = ring3.interpolate({ inputRange: [0, 0.25, 1], outputRange: [0, 0.55, 0] });

  const pointsY       = pointsAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -100] });
  const pointsOpacity = pointsAnim.interpolate({ inputRange: [0, 0.15, 0.65, 1], outputRange: [0, 1, 1, 0] });
  const pointsScale   = pointsAnim.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0.5, 1.2, 1] });

  const wobbleRotate = wobbleAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  return (
    <Animated.View style={[{ flex: 1 }, { backgroundColor: bgColor }]}>
      <SafeAreaView style={{ flex: 1 }}>

        {/* ── Confetti layer ─────────────────────────────────────────────────── */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {CONFETTI_DATA.map((item, i) => {
            const translateY = confettiAnims[i].interpolate({
              inputRange: [0, 1],
              outputRange: [-60, SH + 60],
            });
            const opacity = confettiAnims[i].interpolate({
              inputRange: [0, 0.07, 0.88, 1],
              outputRange: [0, 1, 1, 0],
            });
            const rotate = confettiAnims[i].interpolate({
              inputRange: [0, 1],
              outputRange: [`${item.startRot}deg`, `${item.startRot + item.totalRot}deg`],
            });
            return (
              <Animated.View
                key={item.id}
                style={[cel.confettiPiece, { left: item.x, opacity, transform: [{ translateY }, { rotate }] }]}
              >
                {item.isEmoji ? (
                  <Text style={{ fontSize: item.size }}>{item.emoji}</Text>
                ) : (
                  <View style={{
                    width: item.size, height: item.size,
                    borderRadius: item.size / 2, backgroundColor: item.color,
                  }} />
                )}
              </Animated.View>
            );
          })}
        </View>

        {/* ── Main content ───────────────────────────────────────────────────── */}
        <View style={cel.content}>

          {/* Hero: rings + character + floating points */}
          <View style={cel.heroWrapper}>
            <Animated.View style={[cel.ring, { transform: [{ scale: ring3Scale }], opacity: ring3Opacity, borderColor: character.color }]} />
            <Animated.View style={[cel.ring, { transform: [{ scale: ring2Scale }], opacity: ring2Opacity, borderColor: '#FFD700' }]} />
            <Animated.View style={[cel.ring, { transform: [{ scale: ring1Scale }], opacity: ring1Opacity, borderColor: 'white' }]} />

            <Animated.Text style={[cel.charEmoji, { transform: [{ scale: charScale }] }]}>
              {character.emoji}
            </Animated.Text>

            <Animated.View style={[cel.pointsBadge, { opacity: pointsOpacity, transform: [{ translateY: pointsY }, { scale: pointsScale }] }]}>
              <Text style={cel.pointsText}>+5 points!</Text>
            </Animated.View>
          </View>

          {/* "AMAZING!" */}
          <Animated.Text style={[cel.amazingText, { transform: [{ rotate: wobbleRotate }] }]}>
            AMAZING!
          </Animated.Text>

          {/* Subtitle */}
          <Text style={cel.subtitle}>
            {childName || 'You'} is a STAR THINKER! 🧠
          </Text>

          {/* Stars row */}
          <View style={cel.starsRow}>
            {Array.from({ length: TARGET_STARS }, (_, i) => (
              <Animated.Text
                key={i}
                style={[
                  cel.starEmoji,
                  i >= starCount ? cel.starDim : null,
                  i === starCount - 1 ? { transform: [{ scale: starBounce }] } : null,
                ]}
              >
                ⭐
              </Animated.Text>
            ))}
          </View>

          {/* Streak */}
          <View style={cel.streakRow}>
            <Animated.Text style={[cel.streakEmoji, { transform: [{ scale: streakPulse }] }]}>🔥</Animated.Text>
            <Text style={cel.streakLabel}>4 day streak!</Text>
          </View>
        </View>

        {/* ── Bottom: Continue ───────────────────────────────────────────────── */}
        <View style={cel.bottom}>
          <Animated.View style={{ transform: [{ scale: continuePulse }] }}>
            <TouchableOpacity style={cel.continueBtn} activeOpacity={0.88} onPress={onContinue}>
              <Text style={cel.continueBtnText}>Continue 🌱</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

      </SafeAreaView>
    </Animated.View>
  );
}

const cel = StyleSheet.create({
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  bottom:  { paddingHorizontal: 28, paddingBottom: 36 },

  confettiPiece: { position: 'absolute', top: 0 },

  heroWrapper: {
    alignItems: 'center', justifyContent: 'center',
    width: RING_SIZE * 2.6, height: RING_SIZE * 2.6,
    marginBottom: 8,
  },
  ring: {
    position: 'absolute',
    width: RING_SIZE, height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 3,
  },
  charEmoji: { fontSize: 96, zIndex: 10 },

  pointsBadge: { position: 'absolute', top: '8%', zIndex: 20 },
  pointsText: {
    fontSize: 24, fontWeight: '900', color: '#FFD700',
    textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4,
  },

  amazingText: {
    fontSize: 48, fontWeight: '900', color: '#FFD700',
    letterSpacing: 3, marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: { width: 0, height: 3 }, textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 17, color: 'rgba(255,255,255,0.92)', fontWeight: '700',
    textAlign: 'center', marginBottom: 24, lineHeight: 24,
  },

  starsRow: { flexDirection: 'row', gap: 14, marginBottom: 18 },
  starEmoji: { fontSize: 38 },
  starDim: { opacity: 0.2 },

  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  streakEmoji: { fontSize: 30 },
  streakLabel: { fontSize: 16, color: 'rgba(255,255,255,0.85)', fontWeight: '700' },

  continueBtn: {
    backgroundColor: 'white', borderRadius: 40, paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#fff', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 14, elevation: 8,
  },
  continueBtnText: { color: '#C0392B', fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
});
