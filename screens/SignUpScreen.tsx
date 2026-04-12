import React from 'react';
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, SafeAreaView,
} from 'react-native';

export default function SignUpScreen({
  onBack, email, setEmail, password, setPassword, onContinue,
}: {
  onBack: () => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  onContinue: () => void;
}) {
  return (
    <SafeAreaView style={su.screen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={su.scroll} keyboardShouldPersistTaps="handled">

          <View style={su.topBar}>
            <TouchableOpacity onPress={onBack} style={su.backBtn}>
              <Text style={su.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={su.logoSmall}>🍅</Text>
            <View style={{ width: 40 }} />
          </View>

          <Text style={su.title}>Create Account</Text>
          <Text style={su.subtitle}>Let's get you started!</Text>

          <View style={su.fieldGroup}>
            <Text style={su.label}>Parent Email</Text>
            <TextInput
              style={su.input}
              placeholder="you@example.com"
              placeholderTextColor="#bbb"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={su.fieldGroup}>
            <Text style={su.label}>Password</Text>
            <TextInput
              style={su.input}
              placeholder="Min. 8 characters"
              placeholderTextColor="#bbb"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={su.button} activeOpacity={0.85} onPress={onContinue}>
            <Text style={su.buttonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={su.legal}>
            By continuing you agree to our{' '}
            <Text style={su.legalLink}>Terms & Privacy Policy</Text>
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const su = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },
  scroll: { flexGrow: 1, paddingHorizontal: 28, paddingBottom: 40 },

  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginBottom: 32 },
  backBtn: { width: 40, padding: 4 },
  backArrow: { fontSize: 26, color: '#C0392B', fontWeight: '600' },
  logoSmall: { fontSize: 32 },

  title: { fontSize: 28, fontWeight: '800', color: '#C0392B', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#999', marginBottom: 32 },

  fieldGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 8 },
  input: {
    borderWidth: 1.5, borderColor: '#E0E0E0', borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#222', backgroundColor: '#FAFAFA',
  },

  button: {
    backgroundColor: '#C0392B', borderRadius: 40, paddingVertical: 18,
    alignItems: 'center', marginTop: 8, marginBottom: 24,
    shadowColor: '#C0392B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  buttonText: { color: 'white', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },

  legal: { fontSize: 12, color: '#aaa', textAlign: 'center', lineHeight: 18 },
  legalLink: { color: '#C0392B', textDecorationLine: 'underline' },
});
