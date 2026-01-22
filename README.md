# icon-decorator
The Icon Decorator is a lightweight, dependency-free Web Component designed to overlay badges (decorators) on icons

## Files
- `script.js` — Web Component implementation (`<icon-decorator>`).
- `demo.html` — Interactive demo and playground.

## Usage
Include the script and use the component with slots:

```html
<script src="script.js"></script>

<icon-decorator position="bottom-right" offset="3px" size-ratio="0.5" cutout-border="2px">
  <span slot="icon" class="material-symbols-outlined">mail</span>
  <div slot="decorator" class="notif-badge">2</div>
</icon-decorator>
```

## Attributes
- `position` — One of: `top-left`, `top-right`, `bottom-left`, `bottom-right` (default `bottom-right`).
- `offset` — Distance from the host edge for both the mask origin and the badge position (CSS length, default `3px`).
- `size-ratio` — Scale of the decorator relative to the host icon (e.g. `0.5`).
- `cutout-border` — Extra border for the mask cutout (CSS length, default `2px`).
- `decorator-padding` — Padding inside the decorator element (CSS length).

These map to CSS custom properties inside the component (e.g. `--scale`, `--offset`, `--cutout-border`).

## Slots
- `slot="icon"`: The main icon (any inline element or `<img>`).
- `slot="decorator"`: The badge/decorator content (badge, dot, icon, number...).

## Styling tips
- Use CSS variables on the `icon-decorator` host to change sizes globally, e.g. `icon-decorator { --icon-size: 48px; }`.
- Decorator content is a regular DOM element — you can style it with classes or inline styles.
- To disable selection inside the component the host uses `user-select: none` in shadow styles.

## Demo / Playground
Open `demo.html` in your browser to explore variants and the interactive playground. Use the built-in controls to change position, offset, size, cutout border, icon color and decorator color.

## Semantic color presets
The demo includes quick presets for common semantic colors: `error`, `success`, `info`, and `warn`.

## No-background badge
The demo includes a "No Background" variant showing a badge with transparent background (outline only).

## Accessibility
- Badges are placed as decorative content (the demo uses `aria-hidden` on the internal container). If the badge conveys important information (unread count), expose it to assistive tech appropriately in your markup.

## License
MIT License

