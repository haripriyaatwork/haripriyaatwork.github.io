# Communicate Portfolio — Design Direction

## Three stylistic approaches

### Theme Name: Editorial Signal
Very Brief Intro: A dark magazine-inspired portfolio that treats communication as a visual signal: bold type, sharp cropping, rose-pink emphasis, and tactile image-led storytelling.
Probability: 0.07

### Theme Name: Quiet Paper Studio
Very Brief Intro: A warm archival direction built from ivory paper, ink-black typography, red marks, and slow editorial pacing, evoking a thoughtful independent publishing studio.
Probability: 0.03

### Theme Name: Soft Broadcast
Very Brief Intro: A warmer digital direction with blurred gradients, broadcast-inspired labels, and optimistic coral accents, balancing personality with a polished creator profile.
Probability: 0.08

## Selected approach: Editorial Signal

### Design Movement
Contemporary editorial art direction with influences from independent magazines, cultural criticism, and campaign identity systems.

### Core Principles
1. **Signal over decoration:** Every visual accent should clarify hierarchy, voice, or movement.
2. **Asymmetrical confidence:** Layouts should feel intentionally composed rather than centered and predictable.
3. **Contrast with warmth:** Charcoal-black surfaces and cream type are sharpened by rose-pink and burgundy accents.
4. **Proof through artifacts:** Projects are presented as tangible communication systems, not generic service cards.

### Color Philosophy
Black and charcoal create the focus of a late-night studio and make the work feel considered. Warm ivory avoids sterile white. Rose-pink is the ownable signal color: it marks the moments where ideas become visible, while burgundy adds depth and human warmth.

### Layout Paradigm
A vertical editorial canvas with an anchored left rail, oversized headlines, offset content blocks, and project cards that alternate between full-bleed imagery and dense caption panels. On smaller screens, the rail becomes a compact top bar while the asymmetric rhythm remains through offsets and crop choices.

### Signature Elements
- Thin rose-pink rules and capsule labels used as editorial marginalia.
- Oversized italic words partially cropped at viewport edges.
- A small signal-mark icon repeated as a page marker and favicon.

### Interaction Philosophy
Interactions should feel like handling an editorial object: subtle, tactile, and responsive. Hover states reveal more context through image zoom, caption shifts, and color changes rather than loud popovers. Navigation should always keep the user oriented.

### Animation
Use restrained 180–260ms transitions with cubic-bezier(0.23, 1, 0.32, 1). Page sections enter with small upward translations and opacity changes; project images scale gently on hover; the signal mark rotates a few degrees on hover. Respect prefers-reduced-motion.

### Typography System
Use **Space Grotesk** for display headlines and navigation, with **DM Sans** for readable body copy. Headlines use tight tracking, heavy weights, and occasional italic emphasis. Metadata is uppercase, small, and letter-spaced. Avoid Inter.

### Brand Essence
A communication portfolio for a strategist and creator who turns scattered ideas into signals people can feel and act on. Personality: incisive, warm, restless.

### Brand Voice
Headlines are direct, specific, and slightly provocative. CTAs are invitations to collaborate, never generic conversion language. Microcopy is concise and human.

Example lines:
- “Stop posting. Start communicating.”
- “Bring me the messy version. We’ll find the signal.”

### Wordmark & Logo
The wordmark is set in a tight custom lockup with the first “O” replaced by the signal mark. The icon is two interlocking speech forms cut by a diagonal line, representing the shift from conversation to direction.

### Signature Brand Color
**Signal Rose — #D85B78**, used sparingly as a visual cue for emphasis, active states, rules, and key calls to action.

## Page architecture

- **Home:** Hero portrait, positioning statement, selected work, short process, collaboration CTA.
- **Work:** Full portfolio index with filter-like tags, featured case studies, and project metadata.
- **About:** Personal point of view, capabilities, working principles, and selected experience.
- **Contact:** Direct collaboration invitation, contact details, short inquiry form, and social links.
- **Project detail routes:** Reusable case-study layout for “Signal / Noise” and “The Archive Project.”

## Content assumptions

The portfolio is presented as a polished concept for a communication strategist and creator. Project descriptions are clearly framed as portfolio case-study content rather than customer reviews or testimonials. Contact actions are front-end interactions only and do not submit to a backend.
