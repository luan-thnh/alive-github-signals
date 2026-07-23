# v1.3.3 — Responsive Profile Composition

## Fixed

- Language Orbit no longer applies CSS transform animation to ring circles.
- Ring coordinates and `rotate(angle cx cy)` remain fixed in every SVG renderer.
- Animation now comes from endpoint nodes, scan beams, pulses, and signal traces.
- This prevents orbit geometry from shifting under GitHub Camo.

## Branding

- Replaced the landing mark with the animated luanthnh portfolio mark.
- Added line drawing, fill breathing, a scanning highlight, and a pulsing core.

## Recommended README composition

GitHub profile tables do not collapse responsively. Use one SVG per row with
`width="100%"` and wide endpoint dimensions such as `1200x430`.
