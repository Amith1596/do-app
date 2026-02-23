import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Portal, Modal, Text } from 'react-native-paper';
import { palette, shadows } from '../theme';

interface TimePickerModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (minutes: number) => void;
}

const TIME_OPTIONS = [
  { label: '5', unit: 'min', value: 5, subtitle: 'Quick win' },
  { label: '15', unit: 'min', value: 15, subtitle: 'A focused burst' },
  { label: '30', unit: 'min', value: 30, subtitle: 'Deep work' },
  { label: '60', unit: 'min', value: 60, subtitle: 'Full session' },
];

export default function TimePickerModal({ visible, onDismiss, onSelect }: TimePickerModalProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <Text variant="titleLarge" style={styles.title}>
          How much time do you have?
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          I'll find the best task for your window
        </Text>
        <View style={styles.grid}>
          {TIME_OPTIONS.map((opt) => (
            <Pressable
              key={opt.value}
              onPress={() => onSelect(opt.value)}
              style={styles.timeCard}
            >
              <View style={styles.timeCardInner}>
                <Text style={styles.timeNumber}>{opt.label}</Text>
                <Text style={styles.timeUnit}>{opt.unit}</Text>
                <Text style={styles.timeSubtitle}>{opt.subtitle}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={onDismiss} style={styles.cancelArea}>
          <Text style={styles.cancelText}>Never mind</Text>
        </Pressable>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: palette.warmWhite,
    padding: 28,
    margin: 20,
    borderRadius: 24,
    ...shadows.lifted,
  },
  title: {
    textAlign: 'center',
    color: palette.inkDark,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    color: palette.inkLight,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  timeCard: {
    width: '47%',
    backgroundColor: palette.cream,
    borderRadius: 16,
    ...shadows.soft,
  },
  timeCardInner: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  timeNumber: {
    fontSize: 32,
    fontWeight: '300',
    color: palette.sage,
    letterSpacing: -1,
  },
  timeUnit: {
    fontSize: 13,
    color: palette.inkLight,
    marginTop: -2,
  },
  timeSubtitle: {
    fontSize: 11,
    color: palette.inkFaint,
    marginTop: 6,
    letterSpacing: 0.3,
  },
  cancelArea: {
    marginTop: 20,
    alignItems: 'center',
    padding: 8,
  },
  cancelText: {
    color: palette.inkFaint,
    fontSize: 14,
  },
});
