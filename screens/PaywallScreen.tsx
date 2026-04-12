import React, { useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, Animated, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function PaywallScreen({
  childName, onSubscribe, onDismiss,
}: {
  childName: string;
  onSubscribe: () => void;
  onDismiss: () => void;
}) {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -14, duration: 850, useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 850, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={pw.screen}>
      {/* Red glow at top */}
      <View style={pw.glow} />

      <ScrollView contentContainerStyle={pw.scroll} showsVerticalScrollIndicator={false}>

        {/* Bouncing Tommy */}
        <Animated.Text style={[pw.tommyEmoji, { transform: [{ translateY: bounceAnim }] }]}>
          🍅
        </Animated.Text>

        <Text style={pw.title}>Keep Growing!</Text>
        <Text style={pw.subtitle}>{childName || 'Your child'} is on a roll!</Text>

        {/* Free tier card */}
        <View style={pw.freeCard}>
          <Text style={pw.freeLabel}>Free</Text>
          <Text style={pw.freeDesc}>3 activities per day</Text>
        </View>

        {/* Premium card */}
        <View style={pw.premiumCard}>
          <View style={pw.premiumHeader}>
            <View style={pw.premiumBadge}>
              <Text style={pw.premiumBadgeText}>Premium</Text>
            </View>
            <View style={pw.popularTag}>
              <Text style={pw.popularTagText}>⭐ Most Popular</Text>
            </View>
          </View>

          <Text style={pw.price}>$14.99<Text style={pw.priceSub}>/month</Text></Text>
          <Text style={pw.annual}>$99/year — save 45%</Text>

          <View style={pw.divider} />

          {[
            'Unlimited daily activities',
            'All 7 characters unlocked',
            'Weekly AI progress reports',
            'HiCAP Readiness Certificate',
            'Offline mode',
          ].map((benefit) => (
            <View key={benefit} style={pw.benefitRow}>
              <Text style={pw.checkmark}>✓</Text>
              <Text style={pw.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity style={pw.trialBtn} activeOpacity={0.88} onPress={onSubscribe}>
          <Text style={pw.trialBtnText}>Start 7-Day Free Trial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={pw.dismissLink} onPress={onDismiss}>
          <Text style={pw.dismissText}>Maybe later</Text>
        </TouchableOpacity>

        <Text style={pw.legal}>Cancel anytime · Billed monthly</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const pw = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#1a0a0a' },
  glow: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 260,
    borderBottomLeftRadius: width, borderBottomRightRadius: width,
    backgroundColor: 'rgba(192,57,43,0.18)',
  },
  scroll: { paddingHorizontal: 24, paddingBottom: 48, alignItems: 'center' },

  tommyEmoji: { fontSize: 90, marginTop: 32, marginBottom: 12 },

  title: { fontSize: 32, fontWeight: '800', color: 'white', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 28 },

  freeCard: {
    width: '100%', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16, paddingVertical: 14, paddingHorizontal: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 14,
  },
  freeLabel: { fontSize: 15, fontWeight: '700', color: 'rgba(255,255,255,0.5)' },
  freeDesc: { fontSize: 14, color: 'rgba(255,255,255,0.4)' }, // keep in sync with FREE_LIMIT in App.tsx

  premiumCard: {
    width: '100%', borderWidth: 2, borderColor: '#C0392B',
    borderRadius: 20, padding: 22, marginBottom: 28,
    backgroundColor: 'rgba(192,57,43,0.1)',
    shadowColor: '#C0392B', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5, shadowRadius: 20, elevation: 10,
  },
  premiumHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  premiumBadge: {
    backgroundColor: '#C0392B', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 4,
  },
  premiumBadgeText: { color: 'white', fontSize: 13, fontWeight: '800' },
  popularTag: {
    backgroundColor: 'rgba(255,215,0,0.15)', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(255,215,0,0.4)',
  },
  popularTagText: { color: '#FFD700', fontSize: 12, fontWeight: '700' },

  price: { fontSize: 36, fontWeight: '800', color: 'white', marginBottom: 4 },
  priceSub: { fontSize: 18, fontWeight: '500', color: 'rgba(255,255,255,0.6)' },
  annual: { fontSize: 13, color: '#27AE60', fontWeight: '600', marginBottom: 16 },

  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 16 },

  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  checkmark: { fontSize: 16, color: '#27AE60', fontWeight: '800', width: 20 },
  benefitText: { fontSize: 14, color: 'white', fontWeight: '500' },

  trialBtn: {
    width: '100%', backgroundColor: 'white', borderRadius: 40,
    paddingVertical: 18, alignItems: 'center', marginBottom: 14,
    shadowColor: '#fff', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 6,
  },
  trialBtnText: { color: '#C0392B', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },

  dismissLink: { paddingVertical: 8, marginBottom: 12 },
  dismissText: { color: 'rgba(255,255,255,0.6)', fontSize: 15 },

  legal: { fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center' },
});
