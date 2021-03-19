import React, { useState, useEffect, useRef } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => (time > 9 ? time : `0${time}`);

export const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const [millis, setMillis] = useState(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    const timeLeft = millis - 1000;
    onProgress(timeLeft / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    color: 'white',
    fontWeight: 'bold',
    padding: spacing.xxl,
    textAlign: 'center',
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
