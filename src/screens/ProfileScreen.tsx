import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, Button, Surface, TextInput, HelperText } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { palette, fonts, shadows } from '../theme';
import PWAInstallModal from '../components/PWAInstallModal';

export default function ProfileScreen() {
  const { signOut, session, isGuest, convertGuest } = useAuth();
  const [pwaModalVisible, setPwaModalVisible] = useState(false);

  // Guest conversion form state
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleConvert = async () => {
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

    try {
      await convertGuest(email, password, name || undefined);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: palette.cream }]}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Surface style={styles.card} elevation={0}>
        <View style={styles.avatarCircle}>
          <Text variant="headlineMedium" style={styles.avatarText}>
            {isGuest ? 'G' : (session?.user?.email?.charAt(0).toUpperCase() || '?')}
          </Text>
        </View>

        {isGuest ? (
          <>
            <Text variant="titleMedium" style={styles.name}>
              Guest User
            </Text>
            <Text variant="bodySmall" style={styles.subtitle}>
              Your data is saved but linked to this device session.
              {'\n'}Create an account to keep it permanently.
            </Text>

            {success ? (
              <View style={styles.successBox}>
                <Text variant="titleMedium" style={styles.successTitle}>
                  Account created!
                </Text>
                <Text variant="bodyMedium" style={styles.successMessage}>
                  Check your email at{' '}
                  <Text style={{ fontWeight: '600' }}>{email}</Text> to confirm.
                  {'\n'}Your tasks and goals have been preserved.
                </Text>
              </View>
            ) : !showForm ? (
              <Button
                mode="contained"
                onPress={() => setShowForm(true)}
                style={styles.convertButton}
                contentStyle={styles.convertButtonContent}
              >
                Create Account to Keep Your Data
              </Button>
            ) : (
              <View style={styles.formContainer}>
                <TextInput
                  label="Name (Optional)"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  mode="outlined"
                  outlineStyle={styles.inputOutline}
                  disabled={loading}
                />

                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError('');
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.input}
                  mode="outlined"
                  outlineStyle={styles.inputOutline}
                  disabled={loading}
                />

                <TextInput
                  label="Password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError('');
                  }}
                  secureTextEntry
                  style={styles.input}
                  mode="outlined"
                  outlineStyle={styles.inputOutline}
                  disabled={loading}
                />

                <TextInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setError('');
                  }}
                  secureTextEntry
                  style={styles.input}
                  mode="outlined"
                  outlineStyle={styles.inputOutline}
                  disabled={loading}
                />

                {error ? (
                  <HelperText type="error" visible={!!error}>
                    {error}
                  </HelperText>
                ) : null}

                <Button
                  mode="contained"
                  onPress={handleConvert}
                  loading={loading}
                  disabled={loading}
                  style={styles.submitButton}
                  contentStyle={styles.convertButtonContent}
                >
                  Create Account
                </Button>

                <Button
                  mode="text"
                  onPress={() => {
                    setShowForm(false);
                    setError('');
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  disabled={loading}
                  labelStyle={{ color: palette.inkLight }}
                >
                  Cancel
                </Button>
              </View>
            )}
          </>
        ) : (
          <>
            <Text variant="titleMedium" style={styles.name}>
              {session?.user?.user_metadata?.name || 'User'}
            </Text>
            <Text variant="bodySmall" style={styles.email}>
              {session?.user?.email}
            </Text>
          </>
        )}
      </Surface>

      {Platform.OS === 'web' && (
        <Button
          mode="contained-tonal"
          onPress={() => setPwaModalVisible(true)}
          style={styles.pwaButton}
          icon="cellphone-arrow-down"
          buttonColor={palette.sageSurface}
          textColor={palette.sageDark}
        >
          Get Mobile App
        </Button>
      )}

      <Button
        mode="outlined"
        onPress={signOut}
        style={styles.signOutButton}
        textColor={palette.terracotta}
      >
        {isGuest ? 'Exit Guest Mode' : 'Sign Out'}
      </Button>

      <PWAInstallModal
        visible={pwaModalVisible}
        onDismiss={() => setPwaModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  card: {
    backgroundColor: palette.warmWhite,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    ...shadows.medium,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: palette.sageSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: palette.sage,
    fontFamily: fonts.bold,
  },
  name: {
    color: palette.inkDark,
    fontFamily: fonts.bold,
    marginBottom: 4,
  },
  email: {
    color: palette.inkLight,
  },
  subtitle: {
    color: palette.inkLight,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 4,
  },
  convertButton: {
    marginTop: 20,
    borderRadius: 28,
  },
  convertButtonContent: {
    paddingVertical: 8,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  inputOutline: {
    borderRadius: 12,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 28,
  },
  successBox: {
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: palette.sageSurface,
    borderWidth: 1,
    borderColor: palette.sageLight,
    width: '100%',
  },
  successTitle: {
    marginBottom: 8,
    fontWeight: '600',
    color: palette.sageDark,
  },
  successMessage: {
    color: palette.inkMedium,
    lineHeight: 22,
  },
  pwaButton: {
    marginTop: 24,
    borderRadius: 20,
  },
  signOutButton: {
    marginTop: 12,
    borderRadius: 20,
    borderColor: palette.terracotta,
  },
});
