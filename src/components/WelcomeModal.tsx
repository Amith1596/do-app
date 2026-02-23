import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Modal, Text, Button } from 'react-native-paper';
import { palette, fonts, spacing, radius, shadows } from '../theme';

interface WelcomeModalProps {
  visible: boolean;
  onDismiss: () => void;
  userName?: string;
}

export default function WelcomeModal({ visible, onDismiss, userName }: WelcomeModalProps) {
  const greeting = userName ? `Welcome, ${userName}!` : 'Welcome!';

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.greeting}>{greeting}</Text>

          <Text style={styles.headline}>
            You just took the first step toward a calmer, more focused way to get things done.
          </Text>

          <Text style={styles.philosophy}>
            Every feature is grounded in behavioral science — designed to make starting easier and finishing feel natural.
          </Text>

          <Text style={styles.body}>
            Try DO for just one week. Use it as your only task app. Your feedback would be
            invaluable — this is a real behavioral experiment and every bit of input helps
            make it better.
          </Text>

          <Text style={styles.subtext}>
            No streaks. No guilt. Just one task at a time, matched to your energy.
          </Text>

          <Button
            mode="contained"
            onPress={onDismiss}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}
          >
            Let's go
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: palette.warmWhite,
    overflow: 'hidden',
    ...shadows.lifted,
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  greeting: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: palette.sage,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  headline: {
    fontFamily: fonts.medium,
    fontSize: 17,
    color: palette.inkDark,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: palette.inkMedium,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  philosophy: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: palette.inkLight,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  subtext: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: palette.inkLight,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  button: {
    borderRadius: radius.full,
    backgroundColor: palette.sage,
    minWidth: 160,
  },
  buttonLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: palette.warmWhite,
    letterSpacing: 1,
  },
  buttonContent: {
    paddingVertical: spacing.xs,
  },
});
