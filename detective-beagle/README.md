# Detective Beagle 🔍🐶

A small Android + iOS app (Expo / React Native) starring a dancing detective beagle.

## What it looks like

A night-time city stage under a warm spotlight, with a moon, a skyline of lit windows,
and music notes drifting up both sides. Centre stage is the beagle:

- **Classic beagle colouring**: tan head with a white blaze down the face, white muzzle,
  big dark eyes with highlights, a shiny black nose, rosy cheeks and a happy open-mouthed grin.
- **Long, floppy chocolate-brown ears** that flap to the beat.
- **A plaid deerstalker hat** (the Sherlock Holmes hat), with a front visor and the ear flaps tied in a bow on top.
- **A tweed detective coat** with lapels, a belt with a brass buckle, and a red bow tie.
- **A brass magnifying glass** held in one paw. The other paw waves in the air.
- **A wagging white-tipped tail.**

Open `preview.html` in any browser to watch it dance. It uses the same artwork and dance math as the app.

## Features

- Three dance moves:
  - **Groove**: bouncing, alternating leg kicks, paw waving in the air.
  - **Twist**: low, swinging hips and ears flying.
  - **Sleuth Shuffle**: creeping side to side with the magnifying glass up, looking for clues.
- Tap the beagle to find a clue. A speech bubble pops up ("Elementary, my dear walker.") and the clue counter goes up.
- Pause and resume the dance.

Everything is drawn in vector SVG (`react-native-svg`), so it stays sharp on every phone and tablet.
There are no image assets to manage.

## Run it

```bash
cd detective-beagle
npm install
npx expo install --fix   # aligns package versions with your installed Expo SDK
npx expo start
```

Then scan the QR code with **Expo Go** on Android or iOS, or press `a` / `i` to open an emulator or simulator.
Press `w` for a web version.

To build store-ready binaries, use EAS: `npx eas build -p android` and `npx eas build -p ios`.
Before you publish, change the `bundleIdentifier` and `package` in `app.json` from `com.example.detectivebeagle`.

## Code layout

| File | Purpose |
| --- | --- |
| `App.js` | Screen layout, animation clock, move buttons, tap-for-clues |
| `src/Stage.js` | The SVG beagle and scenery, posed from a `pose` object |
| `src/dance.js` | Pure functions mapping time → pose for each dance move, plus the music notes |
| `preview.html` | Standalone browser preview with the same art and motion |
