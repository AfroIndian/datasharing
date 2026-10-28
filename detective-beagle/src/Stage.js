import React from 'react';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Pattern,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

const TAN = '#c98a4b';
const EAR = '#7a4a25';
const WHITE = '#f8f3ea';
const DARK = '#1f140c';
const COAT_LINE = '#5a3d22';
const BROW = '#5a3519';
const HAT_DARK = '#6b4a26';
const HAT_LINE = '#5a3d1e';

// Night-city skyline: [x, width, height], all buildings sit on y = 400.
const BUILDINGS = [
  [-50, 48, 150],
  [0, 42, 105],
  [44, 52, 170],
  [232, 44, 135],
  [278, 32, 185],
  [312, 48, 120],
];

const WINDOWS = BUILDINGS.flatMap(([bx, w, h], b) => {
  const lit = [];
  for (let wy = 400 - h + 10; wy < 385; wy += 16) {
    for (let wx = bx + 6; wx < bx + w - 8; wx += 12) {
      if ((wx * 7 + wy * 13 + b) % 5 < 2) lit.push([wx, wy]);
    }
  }
  return lit;
});

export default function Stage({ pose, notes }) {
  const { x, y, sway, head, earL, earR, armL, armR, legL, legR, tail, hat } = pose;
  const lift = Math.max(0, -y);

  return (
    <Svg width="100%" height="100%" viewBox="-50 0 400 420" preserveAspectRatio="xMidYMid meet">
      <Defs>
        <LinearGradient id="spot" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#fff6c8" stopOpacity="0.45" />
          <Stop offset="1" stopColor="#fff6c8" stopOpacity="0.06" />
        </LinearGradient>
        <Pattern id="tweed" patternUnits="userSpaceOnUse" width="10" height="10">
          <Rect width="10" height="10" fill="#8a6a3f" />
          <Path d="M0 5H10M5 0V10" stroke="#6b4f2a" strokeWidth="1.5" strokeOpacity="0.6" />
        </Pattern>
        <Pattern id="plaid" patternUnits="userSpaceOnUse" width="14" height="14">
          <Rect width="14" height="14" fill="#a0784a" />
          <Rect y="5" width="14" height="4" fill="#7d5a33" fillOpacity="0.7" />
          <Rect x="5" width="4" height="14" fill="#7d5a33" fillOpacity="0.7" />
          <Path d="M0 12H14M12 0V14" stroke="#c0392b" strokeWidth="0.8" strokeOpacity="0.6" />
        </Pattern>
      </Defs>

      {/* Scenery */}
      <Circle cx="300" cy="55" r="22" fill="#f5e9b8" />
      <Circle cx="292" cy="50" r="4" fill="#e3d49a" />
      <Circle cx="306" cy="63" r="3" fill="#e3d49a" />
      {BUILDINGS.map(([bx, w, h], i) => (
        <Rect key={`b${i}`} x={bx} y={400 - h} width={w} height={h} fill="#1f1b4a" />
      ))}
      {WINDOWS.map(([wx, wy], i) => (
        <Rect key={`w${i}`} x={wx} y={wy} width="5" height="7" fill="#ffd66b" fillOpacity="0.8" />
      ))}
      <Path d="M125 0L175 0L290 392L10 392Z" fill="url(#spot)" />
      <Ellipse cx="150" cy="390" rx="175" ry="22" fill="#2a2350" />
      <Ellipse cx={150 + x} cy="378" rx={60 - lift * 1.5} ry="8" fill="#000" fillOpacity="0.3" />

      {notes.map((n, i) => (
        <SvgText
          key={`n${i}`}
          x={n.x}
          y={n.y}
          fontSize={n.size}
          fill="#f4c95d"
          fillOpacity={n.opacity}
          fontWeight="bold"
        >
          {n.glyph}
        </SvgText>
      ))}

      {/* The beagle */}
      <G transform={`translate(${x} ${y}) rotate(${sway} 150 320)`}>
        <G transform={`rotate(${tail} 188 292)`}>
          <Path d="M188 292Q225 270 222 228" stroke={TAN} strokeWidth="12" strokeLinecap="round" fill="none" />
          <Circle cx="222" cy="224" r="8" fill={WHITE} />
        </G>

        <G transform={`rotate(${legL} 128 300)`}>
          <Rect x="116" y="292" width="24" height="74" rx="12" fill={TAN} />
          <Ellipse cx="124" cy="368" rx="19" ry="10" fill={WHITE} />
        </G>
        <G transform={`rotate(${legR} 172 300)`}>
          <Rect x="160" y="292" width="24" height="74" rx="12" fill={TAN} />
          <Ellipse cx="176" cy="368" rx="19" ry="10" fill={WHITE} />
        </G>

        {/* Tweed detective coat with lapels, belt and a red bow tie */}
        <Path d="M100 212Q150 194 200 212L212 305Q150 324 88 305Z" fill="url(#tweed)" stroke={COAT_LINE} strokeWidth="2" />
        <Path d="M132 203L150 258L168 203Z" fill={WHITE} />
        <Path d="M128 204L148 252L120 226Z" fill="#6b4f2a" />
        <Path d="M172 204L152 252L180 226Z" fill="#6b4f2a" />
        <Rect x="93" y="280" width="114" height="10" fill={COAT_LINE} />
        <Rect x="142" y="277" width="16" height="16" rx="2" fill="none" stroke="#e1b84b" strokeWidth="3" />
        <Path d="M150 210L137 202L137 218ZM150 210L163 202L163 218Z" fill="#c0392b" />
        <Circle cx="150" cy="210" r="4" fill="#962d22" />

        <G transform={`rotate(${armR} 195 218)`}>
          <Rect x="185" y="210" width="20" height="62" rx="10" fill="url(#tweed)" stroke={COAT_LINE} strokeWidth="1.5" />
          <Circle cx="195" cy="274" r="11" fill={WHITE} />
        </G>

        <G transform={`rotate(${armL} 105 218)`}>
          <Rect x="101" y="276" width="8" height="26" rx="3" fill="#4a2f1a" />
          <Circle cx="105" cy="318" r="20" fill="#bfe6ff" fillOpacity="0.5" stroke="#d4a017" strokeWidth="6" />
          <Path d="M93 312Q97 302 107 300" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" strokeOpacity="0.8" />
          <Rect x="95" y="210" width="20" height="62" rx="10" fill="url(#tweed)" stroke={COAT_LINE} strokeWidth="1.5" />
          <Circle cx="105" cy="274" r="11" fill={WHITE} />
        </G>

        <G transform={`rotate(${head} 150 200)`}>
          <Ellipse cx="150" cy="150" rx="48" ry="44" fill={TAN} />
          <Path d="M143 110Q150 106 157 110L163 160L137 160Z" fill={WHITE} />
          <Ellipse cx="150" cy="176" rx="31" ry="21" fill={WHITE} />
          <Path d="M118 132Q128 126 138 131" stroke={BROW} strokeWidth="3" strokeLinecap="round" fill="none" />
          <Path d="M162 131Q172 126 182 132" stroke={BROW} strokeWidth="3" strokeLinecap="round" fill="none" />
          <Circle cx="128" cy="146" r="7" fill={DARK} />
          <Circle cx="130.5" cy="143" r="2.3" fill="#fff" />
          <Circle cx="172" cy="146" r="7" fill={DARK} />
          <Circle cx="174.5" cy="143" r="2.3" fill="#fff" />
          <Circle cx="121" cy="170" r="6" fill="#ff9aa2" fillOpacity="0.5" />
          <Circle cx="179" cy="170" r="6" fill="#ff9aa2" fillOpacity="0.5" />
          <Path d="M144 184Q150 199 156 184Z" fill="#ff7a8a" />
          <Path
            d="M150 171L150 180M137 179Q143 187 150 180Q157 187 163 179"
            stroke={DARK}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <Ellipse cx="150" cy="164" rx="11" ry="8" fill={DARK} />
          <Ellipse cx="146" cy="161" rx="3.5" ry="2" fill="#fff" fillOpacity="0.6" />

          <G transform={`rotate(${earL} 108 128)`}>
            <Path d="M108 125Q82 135 84 185Q88 205 104 200Q114 175 116 135Z" fill={EAR} />
          </G>
          <G transform={`rotate(${earR} 192 128)`}>
            <Path d="M192 125Q218 135 216 185Q212 205 196 200Q186 175 184 135Z" fill={EAR} />
          </G>

          {/* Deerstalker hat */}
          <G transform={`translate(0 ${hat})`}>
            <Path d="M104 120Q106 72 150 68Q194 72 196 120Z" fill="url(#plaid)" stroke={HAT_LINE} strokeWidth="2" />
            <Path
              d="M150 68L150 120M127 73Q121 96 119 120M173 73Q179 96 181 120"
              stroke={HAT_LINE}
              strokeWidth="1.5"
              strokeOpacity="0.5"
              fill="none"
            />
            <Path d="M104 117Q150 142 196 117Q150 128 104 117Z" fill={HAT_DARK} />
            <Path d="M150 69Q138 55 131 65Q140 74 150 69ZM150 69Q162 55 169 65Q160 74 150 69Z" fill={HAT_DARK} />
            <Circle cx="150" cy="69" r="3.5" fill={HAT_LINE} />
          </G>
        </G>
      </G>
    </Svg>
  );
}
