import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { palette, fonts, shadows } from '../theme';
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
      {/* Back button — top left */}
      <View style={styles.backRow}>
        <Pressable onPress={onAbandon} style={styles.backButton}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={28}
            color={palette.inkLight}
          />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>

      {/* Timer content — centered */}
      <View style={styles.timerArea}>
        <Text variant="headlineSmall" style={styles.taskTitle}>
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

        <Text variant="bodySmall" style={styles.estimate}>
          your guess: {session.estimatedMinutes} min
        </Text>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          {isPaused ? (
            <Button
              mode="contained-tonal"
              onPress={handleResume}
              style={styles.pauseButton}
              icon="play"
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
              icon="pause"
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
  backRow: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingRight: 16,
  },
  backText: {
    color: palette.inkLight,
    fontFamily: fonts.medium,
    fontSize: 15,
    marginLeft: 2,
  },
  timerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
    color: palette.inkDark,
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: -0.3,
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
  estimate: {
    color: palette.inkFaint,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 40,
    paddingHorizontal: 32,
  },
  pauseButton: {
    borderRadius: 28,
    flex: 1,
  },
  doneButton: {
    borderRadius: 28,
    flex: 1,
  },
  doneLabel: {
    fontSize: 16,
  },
});
