import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { palette, fonts } from '../theme';
import { MomentumData } from '../types';

interface MomentumMeterProps {
  momentum: MomentumData;
  onPress?: () => void;
}

const FILL_COLORS: Record<MomentumData['level'], string> = {
  starting: palette.inkFaint,
  building: palette.sage,
  rolling: palette.golden,
  unstoppable: palette.terracotta,
};

const SPARKLINE_MAX_HEIGHT = 16;
const SPARKLINE_MIN_HEIGHT = 2;
const SPARKLINE_BAR_WIDTH = 4;
const SPARKLINE_GAP = 3;

const MomentumMeter: React.FC<MomentumMeterProps> = ({ momentum, onPress }) => {
  const { completedLast7Days, dailyCounts, level, label } = momentum;
  const fillPercent = Math.min(100, (completedLast7Days / 10) * 100);
  const fillColor = FILL_COLORS[level];

  const maxCount = Math.max(...dailyCounts, 1);

  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Surface style={styles.surface}>
        <View style={styles.headerRow}>
          <Text style={styles.label} variant="labelLarge">
            {label}
          </Text>
          <Text style={styles.count} variant="labelMedium">
            {completedLast7Days} this week
          </Text>
        </View>

        <View style={styles.track}>
          <View style={[styles.fill, { width: `${fillPercent}%`, backgroundColor: fillColor }]} />
        </View>

        <View style={styles.sparklineContainer}>
          {[...dailyCounts].reverse().map((count, index) => {
            const barHeight =
              count === 0
                ? SPARKLINE_MIN_HEIGHT
                : SPARKLINE_MIN_HEIGHT +
                  ((count / maxCount) * (SPARKLINE_MAX_HEIGHT - SPARKLINE_MIN_HEIGHT));
            const barColor = count === 0 ? palette.sageLight : palette.sage;

            return (
              <View
                key={index}
                style={[
                  styles.sparklineBar,
                  {
                    height: barHeight,
                    backgroundColor: barColor,
                    marginLeft: index === 0 ? 0 : SPARKLINE_GAP,
                  },
                ]}
              />
            );
          })}
        </View>
      </Surface>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  surface: {
    borderRadius: 16,
    backgroundColor: palette.warmWhite,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: palette.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: palette.inkDark,
    fontFamily: fonts.bold,
  },
  count: {
    color: palette.inkMedium,
    fontFamily: fonts.medium,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.sand,
    overflow: 'hidden',
    marginBottom: 8,
  },
  fill: {
    height: 6,
    borderRadius: 3,
  },
  sparklineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sparklineBar: {
    width: SPARKLINE_BAR_WIDTH,
    borderRadius: 2,
  },
});

export default MomentumMeter;
