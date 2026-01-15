---
applyTo: "**/_sass/**,**/*.scss,**/_sass/**/_*.scss"
description: "SCSS guidance for subdomain: Genesis Ontological Design System usage, semantic mixins, and zero raw CSS policy."
---

# SCSS File Locations & Structure
- Subdomain SCSS lives under `/_sass/`.
- Component partials: `/_sass/aurelion/` for Aurelion-specific styles.
- All partials must use ontology mixins exclusively.

# Import Chain & Entry Points
- **PRIMARY**: Import `@import "ontology/index";` first in `_sass/_main.scss`
- The theme's ontology system provides all styling through semantic mixins.
- Subdomain entry: `_sass/_main.scss` imports ontology, then subdomain partials.

# Genesis Ontological Design System (MANDATORY)

## Three-Tier Architecture

**Tier 1: Content (HTML)**
- Defines WHAT the data is with semantic class names
- One semantic class per element
- No inline styles or style attributes

**Tier 2: Interface (Ontological Mixins)**
- Defines the ROLE of the content through semantic mixins
- NO raw CSS properties allowed in subdomain SCSS
- All styling comes from ontology engine

**Tier 3: Engine (Theme Repository)**
- Defines the LOOK (OKLCH, Bento, Glassmorphism)
- Lives in theme repository `_sass/ontology/_engines.scss`
- Subdomains never touch this layer

## Six Ontological Categories (Required)

Use these mixins exclusively - **ZERO raw CSS properties allowed**:

### 1. `genesis-environment($logic)` - Layout Organization
- `'distributed'` - Autonomous entities in responsive Bento grid
- `'focused'` - Single column for deep reading (max 70ch, centered)
- `'associative'` - Network layout with flexbox
- `'chronological'` - Time-linear vertical stream
- `'manifest'` - High-density dashboard (12-column grid)

### 2. `genesis-entity($nature)` - Visual Presence
- `'primary'` - Main content (active glassmorphism, elevated)
- `'secondary'` - Supporting context (lighter glass)
- `'imperative'` - System-critical urgent (pulsing neon border)
- `'latent'` - Dormant/inactive content (dimmed)
- `'aggregate'` - Container for multiple items
- `'ancestral'` - Archived/historical data

### 3. `genesis-cognition($intent)` - Information Type
- `'axiom'` - Foundational headlines (2-3.5rem, bold)
- `'discourse'` - Standard body prose (1-1.125rem, readable)
- `'protocol'` - Technical/code content (monospace)
- `'gloss'` - Minor annotations (0.8-0.875rem, muted)
- `'motive'` - Persuasive/instructional text (semibold, accent)
- `'quantum'` - Tags/chips/micro-content (tiny, uppercase)

### 4. `genesis-synapse($vector)` - Interaction
- `'navigate'` - Portal to different page (link)
- `'execute'` - Local state change (primary action button)
- `'inquiry'` - Request for more data (search, secondary action)
- `'destructive'` - Permanent removal (danger button)
- `'social'` - Social sharing connection

### 5. `genesis-state($condition)` - Temporal State
- `'stable'` - Content in equilibrium (normal state)
- `'evolving'` - Currently updating (animated progress)
- `'deprecated'` - No longer verified (strikethrough)
- `'locked'` - Immutable, requires clearance (blur effect)
- `'simulated'` - Projected data, not live (dashed border)

### 6. `genesis-atmosphere($vibe)` - Sensory Texture
- `'neutral'` - Standard system transparency
- `'ethereal'` - High-transparency, light focus
- `'void'` - Deep-space, high-contrast
- `'vibrant'` - High-energy, data-saturated

## SCSS Rules (MANDATORY)

**ZERO Raw CSS Properties:**
Subdomain SCSS files MUST NOT contain:
- ❌ `margin`, `padding`, `display`, `color`, `font-size`, `background`
- ❌ Any unit values: `px`, `rem`, `em`, `%`
- ❌ Any color values: `#hex`, `rgb()`, `oklch()`
- ❌ Any raw CSS properties whatsoever

**Only use ontological mixins** - All styling comes from the engine layer.

❌ **WRONG:**
```scss
.my-card {
  padding: 2rem;
  background: #1a1a2e;
  border-radius: 12px;
}
```

✅ **CORRECT:**
```scss
.my-card {
  @include genesis-entity('primary');
}
```

## Example Usage

```scss
---
---
@import "ontology/index";

.poetry-showcase {
  @include genesis-environment('distributed');  // Grid layout
  @include genesis-atmosphere('ethereal');      // Light theme
  
  .poem-card {
    @include genesis-entity('primary');         // Glassmorphism card
    
    .poem-title {
      @include genesis-cognition('axiom');      // Headline typography
    }
    
    .poem-excerpt {
      @include genesis-cognition('discourse');  // Body text
    }
    
    .read-more {
      @include genesis-synapse('navigate');     // Navigation link
    }
  }
}
```

# Theming & Variables
- Use ontology tokens automatically provided by mixins.
- Do NOT introduce custom variables - use semantic mixins instead.
- Color/spacing handled by ontology engine.

# Best Practices
- Think semantically: map HTML meaning to ontology roles.
- Use only ontological mixins in subdomain SCSS.
- Keep component styles scoped to logical semantic classes.
- Never use raw CSS properties.

# Automation & Linting
- Run stylelint in CI with the shared config.
- Verify zero raw CSS properties in subdomain SCSS files.

# Do Not
- Do not use raw CSS properties in subdomain SCSS.
- Do not copy theme `_sass` files into subdomain.
- Do not create custom color variables.

## Structural Checks & SCSS Scans
- **Zero raw CSS enforcement:** Scan for any CSS properties in subdomain SCSS.
- **Component mapping:** Each HTML component should map to appropriate ontology mixins.
- **No `@extend`:** Never use `@extend` - use mixins only.

## Enforcement & Linting
- **Stylelint in CI:** Enforce zero raw CSS policy.
- **Ontology mixin usage:** All styling through semantic mixins only.
