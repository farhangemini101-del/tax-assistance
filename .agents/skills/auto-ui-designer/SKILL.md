---
name: auto-ui-designer
description: Professional UI/UX design intelligence skill for Antigravity. Automatically activates when creating, redesigning, or refining user interfaces, landing pages, components, layouts, cards, modals, dashboards, or responsive designs.
---

# Auto UI/UX Designer & Frontend Engineering Skill

This skill enforces modern, world-class UI/UX design standards across all frontend components and pages.

## Core Design Principles

### 1. Visual Hierarchy & Spacing
- **60-30-10 Rule**: 60% dominant neutral background, 30% structural secondary tone, 10% high-energy accent/brand color (e.g., amber, emerald, electric blue).
- **Consistent Grid Spacing**: Use standard 4px/8px modular scale (`gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8`, `gap-12`).
- **Whitespace & Breathing Room**: Never crowd content. Ensure ample padding inside cards (`p-5` to `p-8`) and page sections (`py-16` to `py-24`).

### 2. Typography & Text Hygiene
- **No Awkward Word Wrapping**: Always add `whitespace-nowrap` to compact navigation links, status pills, badges, and action buttons.
- **Fluid Typography**: Use clear hierarchy (`text-3xl sm:text-4xl lg:text-5xl font-black` for Hero headers, `text-xl font-bold` for card titles, `text-xs sm:text-sm text-slate-500` for body copy).
- **Line Clamping**: Use `line-clamp-2` or `line-clamp-3` on card descriptions to maintain uniform card heights.

### 3. Modern Micro-Interactions & Elevation
- **Card Depth**: Combine subtle borders with delicate shadow elevations:
  ```html
  border border-slate-200/80 bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300
  ```
- **Interactive State**: Add subtle hover transforms (`transform hover:-translate-y-0.5 active:translate-y-0`).
- **Interactive Glassmorphism**: When using dark or floating surfaces, apply `backdrop-blur-md` or `backdrop-blur-xl` with semi-transparent backgrounds (`bg-slate-900/90 border border-slate-700/80`).

### 4. Responsiveness & Mobile Polish
- Design mobile-first (`flex-col md:flex-row`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
- Ensure all interactive elements have touch targets of at least 44x44px on mobile devices.
- Prevent horizontal page overflow (`overflow-x-hidden` on main wrappers).

### 5. Form & State Design
- Provide visual feedback for all states: **Default**, **Hover**, **Focus**, **Active**, **Loading/Disabled**, and **Error**.
- Include clear placeholder text, label associations, and instant validation indicators.
