import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, HelperText, useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { palette, fonts } from '../theme';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signInAsGuest } = useAuth();
  const theme = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setGuestLoading(true);
    setError('');
    try {
      await signInAsGuest();
    } catch (err: any) {
      setError(err.message || 'Failed to continue as guest');
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Branding */}
        <View style={styles.brandSection}>
          <Text variant="displaySmall" style={[styles.appName, { color: palette.inkDark }]}>
            <Text style={styles.appNameStrike}>TO</Text>
            {' '}DO
          </Text>
          <Text variant="bodyLarge" style={[styles.tagline, { color: palette.inkLight }]}>
            Don't organize tasks. Finish them.
          </Text>
        </View>

        {/* Guest CTA — primary action */}
        <Button
          mode="contained"
          onPress={handleGuest}
          loading={guestLoading}
          disabled={guestLoading || loading}
          style={styles.guestButton}
          contentStyle={styles.guestButtonContent}
          labelStyle={styles.guestButtonLabel}
        >
          Try the Experience
        </Button>
        <Text variant="bodySmall" style={[styles.guestSubtitle, { color: palette.inkFaint }]}>
          No account needed
        </Text>

        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: palette.sandDark }]} />
          <Text variant="bodySmall" style={[styles.dividerText, { color: palette.inkFaint }]}>
            or sign in
          </Text>
          <View style={[styles.dividerLine, { backgroundColor: palette.sandDark }]} />
        </View>

        {/* Sign in form */}
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

        {error ? (
          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>
        ) : null}

        <Button
          mode="contained-tonal"
          onPress={handleLogin}
          loading={loading}
          disabled={loading || guestLoading}
          style={styles.signInButton}
          contentStyle={styles.signInButtonContent}
        >
          Sign In
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('SignUp')}
          disabled={loading || guestLoading}
          labelStyle={{ color: palette.sage }}
        >
          Create an account
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontFamily: fonts.bold,
    fontSize: 56,
    letterSpacing: 8,
    marginBottom: 12,
  },
  appNameStrike: {
    textDecorationLine: 'line-through' as const,
    color: palette.inkLight,
  },
  tagline: {
    textAlign: 'center',
    letterSpacing: 0.3,
    fontFamily: fonts.regular,
  },
  guestButton: {
    borderRadius: 28,
    marginBottom: 8,
  },
  guestSubtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  guestButtonContent: {
    paddingVertical: 10,
  },
  guestButtonLabel: {
    fontSize: 16,
    fontFamily: fonts.medium,
    letterSpacing: 0.5,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  dividerText: {
    marginHorizontal: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  inputOutline: {
    borderRadius: 12,
  },
  signInButton: {
    borderRadius: 28,
    marginTop: 4,
    marginBottom: 12,
  },
  signInButtonContent: {
    paddingVertical: 6,
  },
});
