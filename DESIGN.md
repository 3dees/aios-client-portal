# AIOS Client Portal — Design Brief

**Tone & Purpose**: Premium AI operating system dashboard. Refined minimalism with sophisticated dark theme. Authoritative, professional, in-control.

**Visual Differentiation**: Cyan-teal accent color (278° hue, 15.5% chroma) signals active/interactive states. Status badges color-coded (emerald=active, amber=idle, red=offline). Structural zones deliberately elevated with borders.

## Color Palette (Dark Mode)

| Token | OKLCH | Role |
|-------|-------|------|
| background | 0.14 0 0 | Deep navy base |
| foreground | 0.96 0 0 | Bright white text (AA+ contrast) |
| card | 0.175 0 0 | Slightly elevated surfaces |
| primary/accent | 0.78 0.15 264 | Cyan-teal, interactive highlights |
| muted | 0.24 0 0 | Tertiary backgrounds |
| border | 0.26 0 0 | Subtle dividers |
| destructive | 0.62 0.22 24 | Error/offline states |
| chart-1 to -5 | Vibrant semantic colors | Data visualization |

## Typography

| Layer | Font | Weight | Size | Use |
|-------|------|--------|------|-----|
| Display | General Sans | 600–700 | 28–32px | Page titles, agent names |
| Body | DM Sans | 400–500 | 14–16px | Description, content, status |
| Mono | Geist Mono | 400–500 | 12–14px | Metrics, time, code snippets |

## Structural Zones

| Zone | Background | Treatment | Intent |
|------|------------|-----------|--------|
| Header | card (0.175 L) | border-b, elevated | Navigation anchor |
| Sidebar | sidebar (0.175 L) | minimal border, same as main | Section navigation |
| Main content | background (0.14 L) | card grid layout | Content hierarchy |
| Cards | card (0.175 L) | border-border/50, hover:lifted | Information blocks |
| Stats | card with accent ring | prominent padding, monospace value | Key metrics |
| Footer | muted/20 opacity | border-t divider | Secondary info |

## Shape Language

- **Radius**: 8px (0.5rem) consistent across buttons, cards, badges, inputs
- **Borders**: 1px solid, 50% opacity on muted border color for softness
- **Spacing**: 6px base unit; 24px gaps between major sections
- **Shadows**: subtle (2px 4px), elevated (4px 12px) for depth

## Component Patterns

- **Status Badges**: Inline pills with semantic background + border. Emerald/amber/red families.
- **Agent Cards**: 5px padding, border, hover shadow lift. Title + description + status badge.
- **Stat Cards**: Centered metric with label below, monospace value, trend indicator (✓ ↗ ↘).
- **Section Headers**: Flex between-center, border-b divider, underline accent color on hover.

## Motion & Interactions

- **Transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on bg, border, shadow
- **Hover**: border brightens, shadow lifts on cards and buttons
- **Focus**: ring-accent, 2px outline
- **Loading**: pulse opacity on stat card borders

## Content Zones

- **Six Agents Section**: Grid 3 cols (md:2, sm:1). Each card: title, status badge, brief description.
- **Five Layers Section**: Horizontal progress bar or stacked timeline. Context → Data → Intelligence → Automate → Build.
- **Results Dashboard**: 3 stat cards side-by-side (md:stacked). Metric name, current value, trend, target.
- **Daily Brief**: Full-width card, left-color-accent border, avatar + title + content.
- **Admin Panel**: Toggle-accessible modal or sidebar. Form inputs for agent status, metric values, brief text. Save/discard buttons.

## Anti-Patterns Avoided

- No purple gradients or generic AI aesthetic
- No default Tailwind shadows; custom `subtle` + `elevated`
- No uniform rounded corners; intentional 8px baseline
- No mixed color functions; pure OKLCH throughout
- No scattered animations; deliberate transition orchestration
