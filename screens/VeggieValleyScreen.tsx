import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native';
import { Character, CHARACTERS } from './types';

const { width } = Dimensions.get('window');
const PATCH_WIDTH = (width - 28 * 2 - 12) / 2;

const SCORE_MESSAGES: Record<number, string> = {
  25: "Let's start growing!",
  45: 'Good start!',
  65: 'Keep growing!',
  85: 'Amazing thinker!',
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 21) return 'Good evening';
  return 'Good night';
}

export default function VeggieValleyScreen({
  childName, readinessScore, onSelectCharacter, onOpenParent,
}: {
  childName: string;
  readinessScore: number;
  onSelectCharacter: (char: Character) => void;
  onOpenParent: () => void;
}) {
  return (
    <SafeAreaView style={vv.screen}>
      <View style={vv.header}>
        <View style={vv.topBar}>
          <Text style={vv.greeting}>{getGreeting()}, {childName}! 👋</Text>
          <View style={vv.topRight}>
            <Text style={vv.streak}>🔥 3</Text>
            <TouchableOpacity onPress={onOpenParent} style={vv.lockBtn}>
              <Text style={vv.lockIcon}>🔒</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={vv.scoreCard}>
          <Text style={vv.scoreLabel}>HiCAP Readiness</Text>
          <View style={vv.scoreRow}>
            <Text style={vv.scoreNumber}>{readinessScore}</Text>
            <Text style={vv.scoreOutOf}>/100</Text>
          </View>
          <Text style={vv.scoreSubtitle}>{SCORE_MESSAGES[readinessScore]} 🌱</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={vv.scroll} showsVerticalScrollIndicator={false}>
        <Text style={vv.sectionTitle}>Your Garden</Text>
        <View style={vv.grid}>
          {CHARACTERS.map((char) => (
            <TouchableOpacity
              key={char.id}
              style={[vv.patch, { backgroundColor: char.color }]}
              activeOpacity={0.85}
              onPress={() => onSelectCharacter(char)}
            >
              {char.imageUrl
                ? <Image source={{ uri: char.imageUrl }} style={vv.patchImage} />
                : <Text style={vv.patchEmoji}>{char.emoji}</Text>}
              <Text style={vv.patchName}>{char.name}</Text>
              <Text style={vv.patchDomain}>{char.domain}</Text>
              <View style={vv.stageBadge}>
                <Text style={vv.stageBadgeText}>🌱 Seed</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={vv.activitiesBar}>
          <View style={vv.activitiesLeft}>
            <Text style={vv.activitiesTitle}>Today's Activities</Text>
            <Text style={vv.activitiesRemaining}>2 remaining</Text>
          </View>
          <View style={vv.progressTrack}>
            <View style={vv.progressFill} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const vv = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#1a472a' },
  header: { paddingHorizontal: 28, paddingTop: 20 },
  scroll: { paddingHorizontal: 28, paddingTop: 16, paddingBottom: 40 },

  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  greeting: { fontSize: 17, fontWeight: '700', color: 'white', flex: 1 },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  streak: { fontSize: 16, fontWeight: '700', color: 'white' },
  lockBtn: { padding: 4 },
  lockIcon: { fontSize: 20 },

  scoreCard: {
    backgroundColor: 'white', borderRadius: 20, padding: 20,
    marginBottom: 24, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 6,
  },
  scoreLabel: { fontSize: 12, color: '#999', fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 },
  scoreRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  scoreNumber: { fontSize: 56, fontWeight: '800', color: '#C0392B', lineHeight: 64 },
  scoreOutOf: { fontSize: 20, color: '#bbb', fontWeight: '600', marginBottom: 8 },
  scoreSubtitle: { fontSize: 14, color: '#27AE60', fontWeight: '600' },

  sectionTitle: { fontSize: 20, fontWeight: '800', color: 'white', marginBottom: 14 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  patch: {
    width: PATCH_WIDTH, borderRadius: 18, padding: 16,
    alignItems: 'flex-start', minHeight: 140,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 5,
  },
  patchEmoji: { fontSize: 38, marginBottom: 8 },
  patchImage: { width: 80, height: 80, marginBottom: 8 },
  patchName: { fontSize: 16, fontWeight: '800', color: 'white', marginBottom: 2 },
  patchDomain: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '500', marginBottom: 10 },

  stageBadge: {
    position: 'absolute', bottom: 12, right: 12,
    backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  stageBadgeText: { fontSize: 10, color: 'white', fontWeight: '700' },

  activitiesBar: {
    backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 16,
    padding: 16, gap: 10,
  },
  activitiesLeft: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  activitiesTitle: { fontSize: 14, fontWeight: '700', color: 'white' },
  activitiesRemaining: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  progressTrack: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 },
  progressFill: { height: 8, width: '33%', backgroundColor: '#C0392B', borderRadius: 4 },
});
