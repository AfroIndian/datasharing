// Pure animation math: given a time in seconds, return how every body part
// of the beagle should be posed. Angles are in degrees, offsets in SVG units.

export const MOVES = [
  { key: 'groove', label: 'Groove' },
  { key: 'twist', label: 'Twist' },
  { key: 'shuffle', label: 'Sleuth Shuffle' },
];

const TAU = Math.PI * 2;

export function getPose(t, move) {
  switch (move) {
    case 'twist': {
      const p = t * TAU * 1.2;
      const s = Math.sin(p);
      return {
        x: 0,
        y: 6 - Math.abs(Math.sin(2 * p)) * 6,
        sway: s * 14,
        head: -s * 12,
        earL: s * 25,
        earR: s * 25,
        armL: 80 + s * 40,
        armR: -80 + s * 40,
        legL: s * 12,
        legR: s * 12,
        tail: Math.sin(4 * p) * 35,
        hat: 0,
      };
    }
    case 'shuffle': {
      // Side-to-side creep with the magnifying glass held up, searching for clues.
      const p = t * TAU * 0.8;
      const s2 = Math.sin(2 * p);
      return {
        x: Math.sin(p) * 30,
        y: -Math.abs(s2) * 8,
        sway: -Math.cos(p) * 5,
        head: Math.sin(p) * 8,
        earL: -s2 * 12,
        earR: -s2 * 12,
        armL: 140 + s2 * 8,
        armR: -30 + s2 * 20,
        legL: s2 * 18,
        legR: s2 * 18,
        tail: Math.sin(3 * p) * 25,
        hat: -Math.abs(s2) * 3,
      };
    }
    default: {
      // Groove: bounce on the beat, alternate leg kicks, wave a paw in the air.
      const p = t * TAU;
      const s = Math.sin(p);
      return {
        x: 0,
        y: -Math.abs(s) * 14,
        sway: s * 6,
        head: Math.sin(p + 0.6) * 10,
        earL: -s * 18,
        earR: -s * 18,
        armL: 95 + s * 25,
        armR: -140 + Math.sin(2 * p) * 25,
        legL: Math.max(0, s) * 25,
        legR: -Math.max(0, -s) * 25,
        tail: Math.sin(3 * p) * 30,
        hat: -Math.max(0, Math.sin(p + 1)) * 5,
      };
    }
  }
}

// Music notes drifting up either side of the stage.
export function getNotes(t) {
  return [0, 1, 2, 3, 4].map((i) => {
    const ph = (t * 0.35 + i / 5) % 1;
    return {
      x: (i % 2 ? 250 : 30) + Math.sin(ph * 6 + i) * 18,
      y: 360 - ph * 300,
      opacity: Math.sin(ph * Math.PI),
      glyph: i % 2 ? '♫' : '♪',
      size: 22 + (i % 3) * 6,
    };
  });
}
