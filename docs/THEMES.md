# Alive Interface theme system

The visual system intentionally avoids rounded generic SaaS cards. Every
composition uses editorial hierarchy, technical labels, hard geometry, signal
lines and a controlled grid.

## Presets

### `alive`

- Background: `#090B0E`
- Paper: `#F3F0EA`
- Acid signal: `#C8FF4D`

### `paper`

Off-white editorial surface with dark technical typography and an olive signal.

### `cobalt`

Deep navy, electric cyan and violet signal fields.

### `ember`

Warm black, orange-red signal and amber annotations.

### `mono`

Strict black and off-white for maximum neutrality.

## Custom palette

All colors are URL-safe hex values without `#`:

```text
/api/signal?username=luan-thnh&bg=050505&text=F5F2EA&accent=FF3D00&border=30231F
```

Accepted fields: `bg`, `surface`, `text`, `muted`, `border`, `accent`, `accent2`.
Three-character hex values are expanded automatically. Alpha bytes are stripped
because renderers derive controlled opacity variants from the base colors.

## Motion

Add `animate=true` to enable small SVG-native animations such as status pulses,
terminal cursor blinking and signal drift. Static output remains the default for
maximum README compatibility and reduced-motion safety.
