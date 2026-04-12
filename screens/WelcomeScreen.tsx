import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({
  bounceAnim,
  pulseAnim,
  onStart,
}: {
  bounceAnim: Animated.Value;
  pulseAnim: Animated.Value;
  onStart: () => void;
}) {
  return (
    <SafeAreaView style={s.screen}>
      <View style={s.content}>

        {/* Tommy Tomato */}
        <Animated.View style={[s.tommyWrapper, { transform: [{ translateY: bounceAnim }] }]}>
          <View style={s.stemBase}>
            <View style={s.stem} />
            <View style={s.leaf} />
          </View>
          <View style={s.body}>
            <View style={s.eyesRow}>
              <View style={s.eye}><View style={s.pupil} /><View style={s.eyeShine} /></View>
              <View style={s.eye}><View style={s.pupil} /><View style={s.eyeShine} /></View>
            </View>
            <View style={s.cheeksRow}>
              <View style={s.cheek} />
              <View style={s.cheek} />
            </View>
            <View style={s.smileWrapper}>
              <View style={s.smile} />
            </View>
          </View>
          <View style={s.root} />
        </Animated.View>

        {/* Title */}
        <Text style={s.title}>Little Tomatoes</Text>
        <Text style={s.tagline}>Growing big thinkers, one tomato at a time</Text>

        {/* Friends row */}
        <View style={s.friendsRow}>
          {[
            { e: '🍅', n: 'Tommy' }, { e: '🍆', n: 'Egie' }, { e: '🥔', n: 'Pete' },
            { e: '🧅', n: 'Ollie' }, { e: '🥬', n: 'Celly' }, { e: '🌿', n: 'Oliver' }, { e: '🥕', n: 'Carrie' },
          ].map((f) => (
            <View key={f.n} style={s.friendItem}>
              <Text style={s.friendEmoji}>{f.e}</Text>
              <Text style={s.friendName}>{f.n}</Text>
            </View>
          ))}
        </View>

        {/* CTA button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }], width: '100%', alignItems: 'center' }}>
          <TouchableOpacity style={s.button} activeOpacity={0.85} onPress={onStart}>
            <Text style={s.buttonText}>Start Growing 🌱</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Sign in */}
        <TouchableOpacity style={s.signInLink}>
          <Text style={s.signInText}>Already a parent? Sign in</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#C0392B' },
  content: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 28, paddingTop: 60, paddingBottom: 40, gap: 12,
  },

  tommyWrapper: { alignItems: 'center', marginBottom: 8 },

  stemBase: { alignItems: 'center', marginBottom: -10, zIndex: 2 },
  stem: { width: 10, height: 26, backgroundColor: '#2E7D32', borderRadius: 5 },
  leaf: {
    position: 'absolute', top: 6, left: 8,
    width: 32, height: 18, backgroundColor: '#388E3C',
    borderRadius: 14, transform: [{ rotate: '-35deg' }],
  },

  body: {
    width: 170, height: 170, borderRadius: 85, backgroundColor: '#E74C3C',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35, shadowRadius: 14, elevation: 12, zIndex: 1,
  },

  eyesRow: { flexDirection: 'row', gap: 22, marginBottom: 8, marginTop: -8 },
  eye: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  pupil: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#1a0a0a', transform: [{ translateX: 2 }, { translateY: 2 }] },
  eyeShine: { position: 'absolute', top: 6, left: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: 'white' },

  cheeksRow: { flexDirection: 'row', gap: 60, position: 'absolute', bottom: 42 },
  cheek: { width: 26, height: 18, borderRadius: 13, backgroundColor: 'rgba(255,180,180,0.45)' },

  smileWrapper: { width: 60, height: 22, overflow: 'hidden', alignItems: 'center', marginTop: 4 },
  smile: {
    width: 52, height: 52, borderRadius: 26, borderWidth: 4, borderColor: '#922B21',
    borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent',
    marginTop: -16,
  },

  root: { width: 20, height: 10, backgroundColor: '#6D4C41', borderRadius: 10, marginTop: 4 },

  title: {
    fontSize: 34, fontWeight: '800', color: 'white', letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4,
  },
  tagline: { fontSize: 15, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 22, maxWidth: 280 },

  friendsRow: { flexDirection: 'row', gap: 8, marginVertical: 4 },
  friendItem: { alignItems: 'center', gap: 2 },
  friendEmoji: { fontSize: 22 },
  friendName: { fontSize: 9, color: 'rgba(255,255,255,0.75)', fontWeight: '600' },

  button: {
    backgroundColor: 'white', paddingHorizontal: 48, paddingVertical: 18,
    borderRadius: 40, width: width * 0.78, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 6,
  },
  buttonText: { color: '#C0392B', fontSize: 18, fontWeight: '800', letterSpacing: 0.3 },

  signInLink: { marginTop: 4, padding: 8 },
  signInText: { color: 'rgba(255,255,255,0.65)', fontSize: 14, textDecorationLine: 'underline' },
});
