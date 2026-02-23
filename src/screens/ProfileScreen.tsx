import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { palette, fonts } from '../theme';

export default function ProfileScreen() {
  const { signOut, session, isGuest } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: palette.cream }]}>
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

      <Button
        mode="outlined"
        onPress={signOut}
        style={styles.signOutButton}
        textColor={palette.terracotta}
      >
        {isGuest ? 'Exit Guest Mode' : 'Sign Out'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  card: {
    backgroundColor: palette.warmWhite,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.border,
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
  signOutButton: {
    marginTop: 24,
    borderRadius: 20,
    borderColor: palette.terracotta,
  },
});
