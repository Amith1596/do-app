import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  const [isPaused, setIsPaused] = useState(false);
  const totalPausedMsRef = useRef(0);
  const pausedAtRef = useRef<number | null>(null);

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(() => {
    return Math.floor((Date.now() - session.startedAt.getTime()) / 1000);
  });

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const start = session.startedAt.getTime();
      const activeMs = now - start - totalPausedMsRef.current;
      setElapsedSeconds(Math.floor(activeMs / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [session.startedAt, isPaused]);

  const handlePause = useCallback(() => {
    pausedAtRef.current = Date.now();
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    if (pausedAtRef.current) {
      totalPausedMsRef.current += Date.now() - pausedAtRef.current;
      pausedAtRef.current = null;
    }
    setIsPaused(false);
  }, []);

  const handleDone = useCallback(() => {
    // If paused, account for the current pause duration
    if (isPaused && pausedAtRef.current) {
      totalPausedMsRef.current += Date.now() - pausedAtRef.current;
    }
    const activeMs = Date.now() - session.startedAt.getTime() - totalPausedMsRef.current;
    onDone(Math.floor(activeMs / 1000));
  }, [isPaused, session.startedAt, onDone]);

  const estimatedSeconds = session.estimatedMinutes * 60;
  const overEstimate = elapsedSeconds > estimatedSeconds;
  const timerColor = isPaused
    ? palette.inkFaint
    : overEstimate
      ? palette.golden
      : palette.sage;

  return (
    <View style={styles.container}>
      {/* Timer content */}
      <View style={styles.timerArea}>
        <Text variant="titleMedium" style={styles.motivational}>
          You're on it! You guessed {session.estimatedMinutes} min. Let's see.
        </Text>

        <Text variant="bodyMedium" style={styles.taskTitle}>
          {session.taskTitle}
        </Text>

        <Text style={[styles.timer, { color: timerColor }]}>
          {formatSeconds(elapsedSeconds)}
        </Text>

        {isPaused && (
          <Text variant="labelMedium" style={styles.pausedLabel}>
            PAUSED
          </Text>
        )}

        {/* Action buttons — all three in one row */}
        <View style={styles.actionRow}>
          <Button
            mode="text"
            onPress={onAbandon}
            style={styles.cancelButton}
            labelStyle={styles.cancelLabel}
            compact
          >
            Cancel
          </Button>

          {isPaused ? (
            <Button
              mode="contained-tonal"
              onPress={handleResume}
              style={styles.pauseButton}
              textColor={palette.sage}
              buttonColor={palette.sageSurface}
            >
              Resume
            </Button>
          ) : (
            <Button
              mode="contained-tonal"
              onPress={handlePause}
              style={styles.pauseButton}
              textColor={palette.inkMedium}
              buttonColor={palette.sand}
            >
              Pause
            </Button>
          )}

          <Button
            mode="contained"
            onPress={handleDone}
            style={styles.doneButton}
            labelStyle={styles.doneLabel}
            buttonColor={palette.sage}
            textColor="#FFFFFF"
          >
            Done!
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  motivational: {
    color: palette.inkDark,
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
    paddingHorizontal: 32,
  },
  taskTitle: {
    color: palette.inkLight,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  timer: {
    fontSize: 72,
    fontFamily: fonts.light,
    letterSpacing: 6,
  },
  pausedLabel: {
    color: palette.inkFaint,
    letterSpacing: 3,
    marginTop: 8,
    fontFamily: fonts.bold,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 40,
    paddingHorizontal: 24,
  },
  cancelButton: {
    borderRadius: 28,
  },
  cancelLabel: {
    color: palette.inkLight,
    fontSize: 15,
  },
  pauseButton: {
    borderRadius: 28,
    paddingHorizontal: 8,
  },
  doneButton: {
    borderRadius: 28,
    paddingHorizontal: 8,
  },
  doneLabel: {
    fontSize: 16,
  },
});
