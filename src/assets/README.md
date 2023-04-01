# Assets

The `.*.dev.svg` are the editor-friendly versions of the SVG files. They can be updated by your tool of choice (e.g., by the Inkscape).

The `*.svg` are prod-friendly versions: all the extra info but geometry is stripped (no editor metadata, no default styles, etc.).

The SVGs contain raw geometry, so the best practice is to set the `<svg fill="currentColor" ...>` and then to style them via CSS.
