import React from 'react';
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, SafeAreaView,
} from 'react-native';

export default function ChildProfileScreen({
  onBack, childName, setChildName, selectedAge, setSelectedAge, onContinue,
}: {
  onBack: () => void;
  childName: string;
  setChildName: (v: string) => void;
  selectedAge: number | null;
  setSelectedAge: (v: number) => void;
  onContinue: () => void;
}) {
  return (
    <SafeAreaView style={cp.screen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={cp.scroll} keyboardShouldPersistTaps="handled">

          <View style={cp.topBar}>
            <TouchableOpacity onPress={onBack} style={cp.backBtn}>
              <Text style={cp.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={cp.logoSmall}>🍅</Text>
            <View style={{ width: 40 }} />
          </View>

          <Text style={cp.title}>Who's learning?</Text>
          <Text style={cp.subtitle}>Tell us about your little thinker</Text>

          <View style={cp.fieldGroup}>
            <Text style={cp.label}>Child's Name</Text>
            <TextInput
              style={cp.input}
              placeholder="e.g. Mia"
              placeholderTextColor="#bbb"
              autoCapitalize="words"
              autoCorrect={false}
              value={childName}
              onChangeText={setChildName}
            />
          </View>

          <View style={cp.fieldGroup}>
            <Text style={cp.label}>Age</Text>
            <View style={cp.ageRow}>
              {[2, 3, 4, 5].map((age) => (
                <TouchableOpacity
                  key={age}
                  style={[cp.ageBtn, selectedAge === age && cp.ageBtnSelected]}
                  onPress={() => setSelectedAge(age)}
                  activeOpacity={0.8}
                >
                  <Text style={[cp.ageBtnText, selectedAge === age && cp.ageBtnTextSelected]}>
                    {age}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={cp.button} activeOpacity={0.85} onPress={onContinue}>
            <Text style={cp.buttonText}>Let's Go! 🌱</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const cp = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },
  scroll: { flexGrow: 1, paddingHorizontal: 28, paddingBottom: 40 },

  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginBottom: 32 },
  backBtn: { width: 40, padding: 4 },
  backArrow: { fontSize: 26, color: '#C0392B', fontWeight: '600' },
  logoSmall: { fontSize: 32 },

  title: { fontSize: 28, fontWeight: '800', color: '#C0392B', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#999', marginBottom: 32 },

  fieldGroup: { marginBottom: 28 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 8 },
  input: {
    borderWidth: 1.5, borderColor: '#E0E0E0', borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#222', backgroundColor: '#FAFAFA',
  },

  ageRow: { flexDirection: 'row', gap: 12 },
  ageBtn: {
    flex: 1, paddingVertical: 16, borderRadius: 14,
    borderWidth: 1.5, borderColor: '#E0E0E0', backgroundColor: 'white',
    alignItems: 'center',
  },
  ageBtnSelected: { backgroundColor: '#C0392B', borderColor: '#C0392B' },
  ageBtnText: { fontSize: 20, fontWeight: '700', color: '#999' },
  ageBtnTextSelected: { color: 'white' },

  button: {
    backgroundColor: '#C0392B', borderRadius: 40, paddingVertical: 18,
    alignItems: 'center', marginTop: 8,
    shadowColor: '#C0392B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  buttonText: { color: 'white', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },
});
