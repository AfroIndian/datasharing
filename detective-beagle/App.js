import React, { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Stage from './src/Stage';
import { MOVES, getNotes, getPose } from './src/dance';

const LINES = [
  'Woof! A clue! 🔍',
  'Elementary, my dear walker.',
  'The bone is in the garden!',
  'I smell a mystery...',
  'Case closed. Let’s dance!',
];

// Seconds since the dance started, advanced every animation frame while running.
function useClock(running) {
  const [t, setT] = useState(0);
  const elapsed = useRef(0);

  useEffect(() => {
    if (!running) return undefined;
    const start = Date.now() - elapsed.current * 1000;
    let frame;
    const tick = () => {
      elapsed.current = (Date.now() - start) / 1000;
      setT(elapsed.current);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  return t;
}

export default function App() {
  const [move, setMove] = useState('groove');
  const [playing, setPlaying] = useState(true);
  const [clues, setClues] = useState(0);
  const [bubble, setBubble] = useState(null);
  const bubbleTimer = useRef(null);
  const t = useClock(playing);

  useEffect(() => () => clearTimeout(bubbleTimer.current), []);

  const onTapBeagle = () => {
    setClues((c) => c + 1);
    setBubble(LINES[Math.floor(Math.random() * LINES.length)]);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), 1800);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Detective Beagle</Text>
        <Text style={styles.subtitle}>The Case of the Missing Groove</Text>
      </View>

      <Pressable style={styles.stage} onPress={onTapBeagle} accessibilityLabel="Tap the beagle to find a clue">
        <Stage pose={getPose(t, move)} notes={getNotes(t)} />
        {bubble && (
          <View style={styles.bubble} pointerEvents="none">
            <Text style={styles.bubbleText}>{bubble}</Text>
          </View>
        )}
      </Pressable>

      <Text style={styles.clues}>🔍 Clues found: {clues}</Text>

      <View style={styles.moves}>
        {MOVES.map((m) => (
          <Pressable
            key={m.key}
            onPress={() => setMove(m.key)}
            style={[styles.pill, move === m.key && styles.pillActive]}
          >
            <Text style={[styles.pillText, move === m.key && styles.pillTextActive]}>{m.label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={() => setPlaying((p) => !p)} style={styles.play}>
        <Text style={styles.playText}>{playing ? '❚❚  Pause' : '▶  Dance'}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const GOLD = '#f4c95d';

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#15123a', paddingBottom: 16 },
  header: { alignItems: 'center', paddingTop: 24 },
  title: { color: GOLD, fontSize: 32, fontWeight: '800', letterSpacing: 0.5 },
  subtitle: { color: '#b9b3e6', fontSize: 15, fontStyle: 'italic', marginTop: 4 },
  stage: { flex: 1, marginHorizontal: 8 },
  bubble: {
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
    backgroundColor: '#fffdf5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleText: { color: '#2b1a10', fontSize: 16, fontWeight: '700' },
  clues: { color: '#e8e4ff', textAlign: 'center', fontSize: 16, marginBottom: 12 },
  moves: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16 },
  pill: {
    borderWidth: 1.5,
    borderColor: GOLD,
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  pillActive: { backgroundColor: GOLD },
  pillText: { color: GOLD, fontWeight: '700', fontSize: 15 },
  pillTextActive: { color: '#15123a' },
  play: {
    alignSelf: 'center',
    marginTop: 14,
    backgroundColor: '#2e2870',
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  playText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
