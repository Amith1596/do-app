import React, { useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Portal, Modal, Button, Text, Surface } from 'react-native-paper';
import { palette, fonts, shadows } from '../theme';

interface PWAInstallModalProps {
  visible: boolean;
  onDismiss: () => void;
}

type DetectedPlatform = 'ios' | 'android' | 'both';

function detectMobilePlatform(): DetectedPlatform {
  if (Platform.OS !== 'web') return 'both';

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'both';
}

interface StepProps {
  number: number;
  text: string;
}

function Step({ number, text }: StepProps) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <Text variant="bodyMedium" style={styles.stepText}>
        {text}
      </Text>
    </View>
  );
}

export default function PWAInstallModal({ visible, onDismiss }: PWAInstallModalProps) {
  const platform = useMemo(() => detectMobilePlatform(), []);

  const showIOS = platform === 'ios' || platform === 'both';
  const showAndroid = platform === 'android' || platform === 'both';

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text variant="titleLarge" style={styles.heading}>
          Get DO on Your Phone
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Install DO as an app on your home screen — no app store needed.
        </Text>

        {showIOS && (
          <Surface style={styles.platformCard} elevation={0}>
            <Text variant="titleSmall" style={styles.platformTitle}>
              iPhone / iPad (Safari)
            </Text>
            <Step number={1} text="Open this page in Safari" />
            <Step number={2} text={'Tap the Share button \u{1F881} (box with arrow)'} />
            <Step number={3} text='Scroll down and tap "Add to Home Screen"' />
            <Step number={4} text='Tap "Add"' />
          </Surface>
        )}

        {showAndroid && (
          <Surface style={styles.platformCard} elevation={0}>
            <Text variant="titleSmall" style={styles.platformTitle}>
              Android (Chrome)
            </Text>
            <Step number={1} text="Open this page in Chrome" />
            <Step number={2} text={'Tap the three-dot menu (\u22EE) in the top right'} />
            <Step number={3} text='Tap "Add to Home Screen" or "Install App"' />
            <Step number={4} text='Tap "Add"' />
          </Surface>
        )}

        <View style={styles.noteContainer}>
          <Text variant="bodySmall" style={styles.noteText}>
            This creates an app icon on your home screen that opens DO in full-screen mode — no browser bar.
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={onDismiss}
          style={styles.gotItButton}
          labelStyle={styles.gotItLabel}
          buttonColor={palette.sage}
        >
          Got it
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: palette.warmWhite,
    padding: 24,
    margin: 20,
    borderRadius: 24,
    maxHeight: '85%',
    ...shadows.lifted,
  },
  heading: {
    color: palette.inkDark,
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: palette.inkMedium,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.regular,
  },
  platformCard: {
    backgroundColor: palette.cream,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    ...shadows.soft,
  },
  platformTitle: {
    color: palette.inkDark,
    fontFamily: fonts.bold,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.sageSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  stepNumberText: {
    color: palette.sage,
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  stepText: {
    color: palette.inkMedium,
    fontFamily: fonts.regular,
    flex: 1,
    lineHeight: 22,
    paddingTop: 1,
  },
  noteContainer: {
    backgroundColor: palette.sageSurface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    marginTop: 4,
  },
  noteText: {
    color: palette.sageDark,
    fontFamily: fonts.regular,
    textAlign: 'center',
    lineHeight: 18,
  },
  gotItButton: {
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  gotItLabel: {
    color: '#FFFFFF',
    fontFamily: fonts.medium,
  },
});
