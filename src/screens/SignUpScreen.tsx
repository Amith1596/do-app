import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { Text, TextInput, Button, HelperText, useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { palette, fonts } from '../theme';

export default function SignUpScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const { signUp } = useAuth();
  const theme = useTheme();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setShowEmailConfirmation(false);

    try {
      await signUp(email, password, name);
      setShowEmailConfirmation(true);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      setShowEmailConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.brandSection}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text variant="displaySmall" style={[styles.title, { color: palette.inkDark }]}>
            Join DO
          </Text>
          <Text variant="bodyLarge" style={[styles.subtitle, { color: palette.inkLight }]}>
            Don't organize tasks. Finish them.
          </Text>
        </View>

        <TextInput
          label="Name (Optional)"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
          outlineStyle={styles.inputOutline}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          mode="outlined"
          outlineStyle={styles.inputOutline}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          outlineStyle={styles.inputOutline}
        />

        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          outlineStyle={styles.inputOutline}
        />

        {error ? (
          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>
        ) : null}

        {showEmailConfirmation ? (
          <View style={[styles.successBox, { backgroundColor: palette.sageSurface, borderColor: palette.sageLight }]}>
            <Text variant="titleMedium" style={[styles.successTitle, { color: palette.sageDark }]}>
              Account Created
            </Text>
            <Text variant="bodyMedium" style={[styles.successMessage, { color: palette.inkMedium }]}>
              Check your email at{' '}
              <Text style={{ fontWeight: '600' }}>{email}</Text> to confirm.
            </Text>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Login')}
              style={styles.backButton}
            >
              Back to Login
            </Button>
          </View>
        ) : null}

        <Button
          mode="contained"
          onPress={handleSignUp}
          loading={loading}
          disabled={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Create Account
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          disabled={loading}
          labelStyle={{ color: palette.sage }}
        >
          Already have an account? Sign In
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 32,
    justifyContent: 'center',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 18,
    marginBottom: 12,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: fonts.bold,
    letterSpacing: 4,
  },
  subtitle: {
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  inputOutline: {
    borderRadius: 12,
  },
  button: {
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 28,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  successBox: {
    padding: 20,
    borderRadius: 16,
    marginVertical: 16,
    borderWidth: 1,
  },
  successTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  successMessage: {
    marginBottom: 12,
    lineHeight: 22,
  },
  backButton: {
    marginTop: 8,
    borderRadius: 20,
  },
});
