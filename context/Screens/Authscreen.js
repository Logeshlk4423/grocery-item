
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const GREEN = '#174D35';
const CREAM = '#FBF8F0';
const MUTED = '#7A837B';

export default function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('signin');
  const [role, setRole] = useState('Customer');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const isSignup = mode === 'signup';

  function validateForm() {
    if (isSignup && !name.trim()) {
      Alert.alert('Required', 'Please enter your full name.');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Required', 'Please enter your email.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return false;
    }

    if (isSignup && !/^\d{10}$/.test(phone.trim())) {
      Alert.alert(
        'Invalid phone',
        'Enter a valid 10-digit mobile number.'
      );
      return false;
    }

    if (password.length < 6) {
      Alert.alert(
        'Weak password',
        'Password must contain at least 6 characters.'
      );
      return false;
    }

    if (isSignup && password !== confirmPassword) {
      Alert.alert(
        'Password mismatch',
        'Both passwords must match.'
      );
      return false;
    }

    // Demo Admin credentials only.
    if (
      !isSignup &&
      role === 'Admin' &&
      (
        email.trim().toLowerCase() !== 'admin@freshmart.in' ||
        password !== 'Admin123!'
      )
    ) {
      Alert.alert(
        'Admin login failed',
        'Use the demo Admin credentials shown below.'
      );
      return false;
    }

    const user = {
      name: isSignup ? name.trim() : (
        role === 'Admin' ? 'FreshMart Admin' : 'FreshMart Customer'
      ),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role,
    };

    // Customer sign-in and sign-up are frontend demo flows.
    // Real accounts require a backend authentication service.
    onAuthenticated?.(user);

    return true;
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar backgroundColor={GREEN} barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandHeader}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>🌿</Text>
          </View>

          <Text style={styles.brand}>
            Fresh<Text style={styles.brandAccent}>Mart</Text>
          </Text>

          <Text style={styles.tagline}>
            நம்ம ஊரு • நம்ம மளிகை
          </Text>

          <Text style={styles.welcome}>
            Freshness at your doorstep.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>
            {isSignup ? 'Create account' : 'Vanakkam!'}
          </Text>

          <Text style={styles.description}>
            {isSignup
              ? 'Join FreshMart and shop your daily essentials.'
              : 'Sign in to continue shopping with FreshMart.'}
          </Text>

          <Text style={styles.label}>Choose account type</Text>

          <View style={styles.roleRow}>
            {['Customer', 'Admin'].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setRole(item)}
                style={[
                  styles.roleButton,
                  role === item && styles.roleActive,
                ]}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === item && styles.roleTextActive,
                  ]}
                >
                  {item === 'Customer' ? '🛒 Customer' : '🛡️ Admin'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {isSignup && (
            <>
              <Text style={styles.label}>Full name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#929A92"
                style={styles.input}
                autoCapitalize="words"
              />

              <Text style={styles.label}>Mobile number</Text>
              <TextInput
                value={phone}
                onChangeText={(value) =>
                  setPhone(value.replace(/\D/g, '').slice(0, 10))
                }
                placeholder="10-digit mobile number"
                placeholderTextColor="#929A92"
                keyboardType="phone-pad"
                maxLength={10}
                style={styles.input}
              />
            </>
          )}

          <Text style={styles.label}>Email address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#929A92"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Minimum 6 characters"
              placeholderTextColor="#929A92"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={styles.passwordInput}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          {isSignup && (
            <>
              <Text style={styles.label}>Confirm password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter password"
                placeholderTextColor="#929A92"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                style={styles.input}
              />
            </>
          )}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={validateForm}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryText}>
              {isSignup ? 'Create account →' : 'Sign In →'}
            </Text>
          </TouchableOpacity>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>
              {isSignup
                ? 'Already have an account? '
                : "Don't have an account? "}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setMode(isSignup ? 'signin' : 'signup');
                setPassword('');
                setConfirmPassword('');
              }}
            >
              <Text style={styles.link}>
                {isSignup ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          {!isSignup && role === 'Admin' && (
            <View style={styles.demoBox}>
              <Text style={styles.demoTitle}>
                Admin demo credentials
              </Text>
              <Text style={styles.demoText}>
                Email: admin@freshmart.in
              </Text>
              <Text style={styles.demoText}>
                Password: Admin123!
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.footer}>
          🌱 Fresh groceries • Honest prices • Namma Ooru
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: CREAM,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 25,
  },
  brandHeader: {
    backgroundColor: GREEN,
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  logo: {
    width: 65,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 35,
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 10,
  },
  brandAccent: {
    color: '#F6C84A',
  },
  tagline: {
    color: '#E1EDE3',
    fontSize: 13,
    marginTop: 5,
  },
  welcome: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: -15,
    borderRadius: 23,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E9E7DE',
    elevation: 3,
  },
  heading: {
    color: GREEN,
    fontSize: 25,
    fontWeight: '900',
  },
  description: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
    marginBottom: 18,
  },
  label: {
    color: '#27392D',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 7,
    marginTop: 12,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 11,
    alignItems: 'center',
    backgroundColor: '#F7F7F0',
    borderWidth: 1,
    borderColor: '#E9E7DE',
  },
  roleActive: {
    backgroundColor: '#E7F1E8',
    borderColor: GREEN,
  },
  roleText: {
    color: '#59645B',
    fontSize: 12,
    fontWeight: '700',
  },
  roleTextActive: {
    color: GREEN,
    fontWeight: '900',
  },
  input: {
    minHeight: 48,
    backgroundColor: '#FBFAF6',
    borderWidth: 1,
    borderColor: '#E7E6DD',
    borderRadius: 11,
    paddingHorizontal: 13,
    color: '#202A22',
    fontSize: 13,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E6DD',
    borderRadius: 11,
    backgroundColor: '#FBFAF6',
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 13,
    color: '#202A22',
    fontSize: 13,
  },
  showText: {
    color: GREEN,
    fontWeight: '800',
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: GREEN,
    borderRadius: 12,
    minHeight: 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 19,
  },
  switchText: {
    color: MUTED,
    fontSize: 12,
  },
  link: {
    color: GREEN,
    fontWeight: '900',
    fontSize: 12,
  },
  demoBox: {
    marginTop: 18,
    padding: 12,
    borderRadius: 11,
    backgroundColor: '#F0F5EA',
  },
  demoTitle: {
    color: GREEN,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 5,
  },
  demoText: {
    color: '#59645B',
    fontSize: 11,
    marginTop: 3,
  },
  footer: {
    color: MUTED,
    textAlign: 'center',
    fontSize: 10,
    marginTop: 22,
    paddingHorizontal: 10,
  },
});
