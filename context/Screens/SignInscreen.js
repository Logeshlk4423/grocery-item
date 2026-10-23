// screens/SignInScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer'); // Customer or Admin

  const handleSignIn = () => {
    // Basic Form Validation
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'தயவுசெய்து Email மற்றும் Password ஐ உள்ளிடவும்!');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Validation Error', 'சரியான Email முகவரியை உள்ளிடவும்!');
      return;
    }

    Alert.alert('Success', `Entering Zero-G Space as ${role}!`);
    navigation.replace('MainApp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.floatingPod}>
        <Text style={styles.logo}>🌌 FreshMart</Text>
        <Text style={styles.tagline}>Anti-Gravity Grocery Experience</Text>

        {/* Role Toggle Selector */}
        <View style={styles.roleToggle}>
          <TouchableOpacity 
            style={[styles.roleBtn, role === 'Customer' && styles.activeRole]} 
            onPress={() => setRole('Customer')}
          >
            <Text style={[styles.roleText, role === 'Customer' && styles.activeRoleText]}>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.roleBtn, role === 'Admin' && styles.activeRole]} 
            onPress={() => setRole('Admin')}
          >
            <Text style={[styles.roleText, role === 'Admin' && styles.activeRoleText]}>Admin</Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Access Email"
          placeholderTextColor="#62728D"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password Key"
          placeholderTextColor="#62728D"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Action Button */}
        <TouchableOpacity style={styles.launchBtn} onPress={handleSignIn}>
          <Text style={styles.launchBtnText}>LAUNCH APP ({role.toUpperCase()})</Text>
        </TouchableOpacity>

        {/* Switch to Sign Up */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.switchBox}>
          <Text style={styles.switchText}>New Explorer? <Text style={styles.highlight}>Create Account</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0D17', justifyContent: 'center', padding: 20 },
  floatingPod: {
    backgroundColor: '#161B2E',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 163, 0.3)',
    shadowColor: '#00FFA3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  logo: { fontSize: 32, fontWeight: '900', color: '#00FFA3', textAlign: 'center' },
  tagline: { fontSize: 13, color: '#8E9BAE', textAlign: 'center', marginTop: 4, marginBottom: 24 },
  roleToggle: {
    flexDirection: 'row',
    backgroundColor: '#0B0D17',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  roleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  activeRole: { backgroundColor: '#00FFA3' },
  roleText: { color: '#8E9BAE', fontWeight: 'bold' },
  activeRoleText: { color: '#0B0D17' },
  input: {
    backgroundColor: '#0B0D17',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#242C44',
  },
  launchBtn: {
    backgroundColor: '#00FFA3',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  launchBtnText: { color: '#0B0D17', fontSize: 15, fontWeight: '900' },
  switchBox: { marginTop: 20, alignItems: 'center' },
  switchText: { color: '#8E9BAE', fontSize: 13 },
  highlight: { color: '#00FFA3', fontWeight: 'bold' },
});