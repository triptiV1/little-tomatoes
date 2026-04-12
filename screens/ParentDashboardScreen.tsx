import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { CHARACTERS } from './types';

export default function ParentDashboardScreen({
  childName, readinessScore, skillPcts, onBack,
}: {
  childName: string;
  readinessScore: number;
  skillPcts: number[];
  onBack: () => void;
}) {
  const SKILL_ROWS = CHARACTERS.map((c, i) => ({ ...c, pct: skillPcts[i] ?? 50 }));
  const initial = childName ? childName[0].toUpperCase() : '?';

  return (
    <SafeAreaView style={pd.screen}>
      <ScrollView contentContainerStyle={pd.scroll} showsVerticalScrollIndicator={false}>

        <View style={pd.topBar}>
          <TouchableOpacity onPress={onBack} style={pd.backBtn}>
            <Text style={pd.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={pd.title}>Parent Dashboard</Text>
          <Text style={pd.lockRight}>🔒</Text>
        </View>

        <View style={pd.avatarSection}>
          <View style={pd.avatarCircle}>
            <Text style={pd.avatarLetter}>{initial}</Text>
          </View>
          <Text style={pd.childNameText}>{childName || 'Your child'}</Text>
        </View>

        <View style={pd.scoreCard}>
          <Text style={pd.scoreCardLabel}>HiCAP Readiness Score</Text>
          <Text style={pd.scoreCardNumber}>{readinessScore}</Text>
          <View style={pd.progressTrack}>
            <View style={[pd.progressFill, { width: `${readinessScore}%` as any }]} />
          </View>
          <Text style={pd.scoreCardSub}>Updated today</Text>
        </View>

        <Text style={pd.sectionTitle}>Skill Breakdown</Text>
        <View style={pd.skillsCard}>
          {SKILL_ROWS.map((row, idx) => (
            <View key={row.id} style={[pd.skillRow, idx < SKILL_ROWS.length - 1 && pd.skillRowBorder]}>
              <Text style={pd.skillEmoji}>{row.emoji}</Text>
              <View style={pd.skillMid}>
                <Text style={pd.skillName}>{row.domain}</Text>
                <View style={pd.skillTrack}>
                  <View style={[pd.skillFill, { width: `${row.pct}%` as any, backgroundColor: row.color }]} />
                </View>
              </View>
              <Text style={pd.skillPct}>{row.pct}%</Text>
            </View>
          ))}
        </View>

        <Text style={pd.sectionTitle}>Weekly Summary</Text>
        <View style={pd.summaryCard}>
          <Text style={pd.summaryHeadline}>
            {childName || 'Your child'} completed <Text style={pd.summaryBold}>3 activities</Text> this week
          </Text>
          <Text style={pd.summaryBody}>
            Strongest area: Pattern Recognition 🍆{'\n'}
            Keep encouraging daily practice — consistency is everything at this age!
          </Text>
          <View style={pd.summaryStats}>
            <View style={pd.statBox}>
              <Text style={pd.statNum}>3</Text>
              <Text style={pd.statLabel}>Activities</Text>
            </View>
            <View style={pd.statDivider} />
            <View style={pd.statBox}>
              <Text style={pd.statNum}>🔥 3</Text>
              <Text style={pd.statLabel}>Day streak</Text>
            </View>
            <View style={pd.statDivider} />
            <View style={pd.statBox}>
              <Text style={pd.statNum}>12 min</Text>
              <Text style={pd.statLabel}>Avg session</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const pd = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },
  scroll: { paddingHorizontal: 24, paddingBottom: 48 },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 0, paddingTop: 16, paddingBottom: 12,
    marginBottom: 4,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  backBtn: { width: 36, padding: 4 },
  backArrow: { fontSize: 26, color: '#C0392B', fontWeight: '600' },
  title: { fontSize: 17, fontWeight: '800', color: '#222' },
  lockRight: { fontSize: 20, width: 36, textAlign: 'right' },

  avatarSection: { alignItems: 'center', paddingVertical: 28 },
  avatarCircle: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: '#C0392B',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#C0392B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  avatarLetter: { fontSize: 40, fontWeight: '800', color: 'white' },
  childNameText: { marginTop: 12, fontSize: 22, fontWeight: '800', color: '#222' },

  scoreCard: {
    backgroundColor: 'white', borderRadius: 20, padding: 24,
    marginBottom: 28, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 6,
    borderWidth: 1, borderColor: '#F5F5F5',
  },
  scoreCardLabel: { fontSize: 12, fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  scoreCardNumber: { fontSize: 64, fontWeight: '800', color: '#C0392B', lineHeight: 72 },
  progressTrack: { width: '100%', height: 10, backgroundColor: '#F0F0F0', borderRadius: 5, marginTop: 12, overflow: 'hidden' },
  progressFill: { height: 10, backgroundColor: '#C0392B', borderRadius: 5 },
  scoreCardSub: { marginTop: 8, fontSize: 12, color: '#bbb', fontWeight: '500' },

  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#222', marginBottom: 12 },

  skillsCard: {
    backgroundColor: 'white', borderRadius: 20, marginBottom: 28,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4,
    borderWidth: 1, borderColor: '#F5F5F5', overflow: 'hidden',
  },
  skillRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  skillRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F8F8F8' },
  skillEmoji: { fontSize: 22, width: 32 },
  skillMid: { flex: 1, gap: 6 },
  skillName: { fontSize: 13, fontWeight: '600', color: '#444' },
  skillTrack: { height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, overflow: 'hidden' },
  skillFill: { height: 6, borderRadius: 3 },
  skillPct: { fontSize: 13, fontWeight: '700', color: '#aaa', width: 36, textAlign: 'right' },

  summaryCard: {
    backgroundColor: '#F8F8F8', borderRadius: 20, padding: 20, marginBottom: 28,
  },
  summaryHeadline: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 10 },
  summaryBold: { fontWeight: '800', color: '#222' },
  summaryBody: { fontSize: 13, color: '#888', lineHeight: 20, marginBottom: 16 },
  summaryStats: { flexDirection: 'row', alignItems: 'center' },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statNum: { fontSize: 16, fontWeight: '800', color: '#C0392B' },
  statLabel: { fontSize: 11, color: '#aaa', fontWeight: '500' },
  statDivider: { width: 1, height: 32, backgroundColor: '#E0E0E0' },
});
