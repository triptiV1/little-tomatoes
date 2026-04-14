import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, SafeAreaView, Dimensions, Image, ScrollView } from 'react-native';
import { CHARACTERS } from './types';

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
        <Animated.Image
          source={{ uri: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663412164345/mDeHhBqhgiLAcJPJuMJgTV/tommy_tomato_b8e48856.png' }}
          style={{ width: 220, height: 220, backgroundColor: 'transparent', transform: [{ translateY: bounceAnim }] }}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={[s.title, { paddingHorizontal: 28 }]}>Little Tomatoes</Text>
        <Text style={[s.tagline, { paddingHorizontal: 28 }]}>Growing big thinkers, one tomato at a time</Text>

        {/* Friends row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.friendsRow}
          style={s.friendsScroll}
        >
          {CHARACTERS.map((char) => (
            <View key={char.id} style={s.friendItem}>
              {char.imageUrl
                ? <Image source={{ uri: char.imageUrl }} style={s.friendImage} resizeMode="cover" />
                : <Text style={s.friendEmoji}>{char.emoji}</Text>}
              <Text style={s.friendName}>{char.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* CTA button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }], width: '100%', alignItems: 'center', paddingHorizontal: 28 }}>
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
    paddingTop: 60, paddingBottom: 40, gap: 12,
  },

  title: {
    fontSize: 34, fontWeight: '800', color: 'white', letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4,
  },
  tagline: { fontSize: 15, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 22, maxWidth: 280 },

  friendsScroll: { width: '100%' },
  friendsRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingVertical: 4 },
  friendItem: { alignItems: 'center', gap: 2 },
  friendEmoji: { fontSize: 22 },
  friendImage: { width: 40, height: 40, borderRadius: 20 },
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
