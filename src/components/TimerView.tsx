import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { palette, fonts } from '../theme';
import { TimerSession } from '../types';

interface TimerViewProps {
  session: TimerSession;
  onDone: (actualSeconds: number) => void;
  onAbandon: () => void;
}

function formatSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  return `${mm}:${ss}`;
}

export default function TimerView({ session, onDone, onAbandon }: TimerViewProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(() => {
    return Math.floor((Date.now() - session.startedAt.getTime()) / 1000);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const start = session.startedAt.getTime();
      setElapsedSeconds(Math.floor((now - start) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [session.startedAt]);

  const estimatedSeconds = session.estimatedMinutes * 60;
  const overEstimate = elapsedSeconds > estimatedSeconds;
  const timerColor = overEstimate ? palette.golden : palette.sage;

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.taskTitle}>
        {session.taskTitle}
      </Text>

      <Text style={[styles.timer, { color: timerColor }]}>
        {formatSeconds(elapsedSeconds)}
      </Text>
      <Text variant="bodySmall" style={styles.estimate}>
        your guess: {session.estimatedMinutes} min
      </Text>

      <Button
        mode="contained"
        onPress={() => onDone(elapsedSeconds)}
        style={styles.doneButton}
        labelStyle={styles.doneLabel}
        buttonColor={palette.sage}
        textColor="#FFFFFF"
      >
        Done!
      </Button>

      <View style={styles.bottomRow}>
        <Button
          mode="text"
          onPress={onAbandon}
          textColor={palette.inkLight}
          style={styles.subtleButton}
        >
          Pause
        </Button>
        <Button
          mode="text"
          onPress={onAbandon}
          textColor={palette.inkFaint}
          style={styles.subtleButton}
        >
          Not now
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.cream,
  },
  taskTitle: {
    color: palette.inkDark,
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: -0.3,
  },
  timer: {
    fontSize: 72,
    fontFamily: fonts.light,
    letterSpacing: 6,
  },
  estimate: {
    color: palette.inkFaint,
    marginTop: 8,
  },
  doneButton: {
    marginTop: 40,
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  doneLabel: {
    fontSize: 18,
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  subtleButton: {
    marginHorizontal: 8,
  },
});
