import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { palette, fonts } from '../theme';
import { EnergyState } from '../types';

interface EnergySelectorProps {
  onSelect: (energy: EnergyState) => void;
}

interface EnergyOption {
  energy: EnergyState;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  subtitle: string;
  backgroundColor: string;
  iconColor: string;
}

const OPTIONS: EnergyOption[] = [
  {
    energy: 'low',
    icon: 'weather-night',
    label: 'Low',
    subtitle: 'Easy stuff only',
    backgroundColor: palette.energyLowBg,
    iconColor: palette.energyLow,
  },
  {
    energy: 'steady',
    icon: 'white-balance-sunny',
    label: 'Steady',
    subtitle: 'Ready for anything',
    backgroundColor: palette.energySteadyBg,
    iconColor: palette.energySteady,
  },
  {
    energy: 'wired',
    icon: 'lightning-bolt',
    label: 'Wired',
    subtitle: 'Bring on the hard stuff',
    backgroundColor: palette.energyWiredBg,
    iconColor: palette.energyWired,
  },
];

export default function EnergySelector({ onSelect }: EnergySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>How's your energy right now?</Text>

      <View style={styles.optionsContainer}>
        {OPTIONS.map((option) => (
          <Pressable
            key={option.energy}
            onPress={() => onSelect(option.energy)}
            style={({ pressed }) => [
              styles.pressable,
              pressed && styles.pressablePressed,
            ]}
          >
            <Surface
              style={[
                styles.card,
                { backgroundColor: option.backgroundColor },
              ]}
              elevation={1}
            >
              <MaterialCommunityIcons
                name={option.icon}
                size={32}
                color={option.iconColor}
              />
              <View style={styles.textContainer}>
                <Text style={styles.label}>{option.label}</Text>
                <Text style={styles.subtitle}>{option.subtitle}</Text>
              </View>
            </Surface>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  greeting: {
    fontSize: 26,
    fontFamily: fonts.bold,
    color: palette.inkDark,
    marginBottom: 48,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  optionsContainer: {
    width: '100%',
    gap: 16,
  },
  pressable: {
    borderRadius: 20,
  },
  pressablePressed: {
    opacity: 0.8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    minHeight: 80,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: palette.inkDark,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: palette.inkMedium,
    marginTop: 2,
  },
});
