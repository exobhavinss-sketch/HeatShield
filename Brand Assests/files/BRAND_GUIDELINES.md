# HeatShield Brand Guidelines

**Urban Heat Exposure Analysis & Cooling Intelligence Platform**
MIT Vishwaprayag University (MIT-VPU) · Team TF-141 · Furqan Bagwan, Aman Shaikh, Bhavin Shankur

## 1. Brand concept
HeatShield turns urban temperature and environmental data into insight that helps people prioritise where cooling action should be assessed first. The identity is calm, scientific and credible: navy as the analytical anchor, orange for heat, teal for cooling. Tagline (optional): *Understand Heat. Enable Change.*

## 2. Logo meaning
- **Shield**: protection from urban heat.
- **Orange sun with dashed halo**: heat exposure; the dashes echo sensor or data sampling.
- **Teal terrain with contour lines**: cooling, green space and topographic analysis.
- Wordmark: "Heat" in orange, "Shield" in navy (light backgrounds) or white (dark backgrounds).

## 3. Colours
| Role | Name | HEX |
|---|---|---|
| Primary | Deep Navy | `#142D4B` |
| Heat accent | Heat Orange | `#F07835` |
| Secondary heat | Warm Amber | `#F4B942` |
| Cooling accent | Cooling Teal | `#2A9D8F` |
| Neutral | White | `#FFFFFF` |
| Surface | Light Background | `#F4F7FA` |
| Text | Dark Text | `#202A35` |

Usage ratio: roughly 60% navy/neutrals, 25% orange, 15% teal/amber. Do not use all accents equally. On dark backgrounds the shield uses a lifted navy (`#1C3F66`) with a white outline so it stays visible. Orange text on white falls below WCAG AA for small text, so use it for large display text only.

## 4. Typography
The delivered wordmark is converted to outlines (DejaVu Sans Condensed Bold), so it renders identically everywhere. For product UI and documents use **Inter** (fallback: Segoe UI, Helvetica, Arial): Inter 700 for headings, Inter 400/500 for body, JetBrains Mono for data labels and code.

## 5. Clear space and minimum size
- Clear space: the width of the sun disc (about 38% of icon width) on all sides of any logo.
- Minimum size: horizontal logo 120 px wide; stacked logo 90 px wide; icon-only 16 px (a 16 px PNG is supplied).
- Below 24 px, use the icon only.

## 6. Background usage
- **Light/white backgrounds:** `heatshield-logo-primary` / `-light`.
- **Navy, charcoal or photographic dark backgrounds:** `heatshield-logo-dark`.
- **Single colour (print, stamps, fax):** `heatshield-icon-mono.svg` (shield navy, interior knocked out). Recolour to black or white as needed.

## 7. Incorrect usage
Do not stretch or rotate the logo; recolour the sun or terrain; add gradients, shadows or glows; swap the orange/navy wordmark colours; place the light logo on dark backgrounds or the reverse; crowd the logo inside the clear space; re-set the wordmark in another typeface; add university seals inside the mark.

## 8. Banner usage
| File | Size | Use |
|---|---|---|
| `heatshield-website-banner.png` | 1920×1080 | Landing-page hero. Keep text left; the right side is decoration and may crop. |
| `heatshield-github-banner.png` | 1600×500 | Top of README. Logo and title sit in the left safe area. |
| `heatshield-presentation-banner.png` | 1920×1080 | Title slide, with institution, team and course context. |
| `heatshield-social-banner.png` | 1500×500 | Project showcase / social header (3:1). |

Each banner has an editable `.svg` source. The heat grid, skyline and trees are **abstract illustrations**, not measured data, and must never be labelled with real temperatures or Solapur results. When real charts are added to the project, place them in separate figures, not in the banner.

## 9. Web dashboard usage
- Header: horizontal logo, 32–40 px tall, on navy (`#142D4B`) with the dark logo, or on `#F4F7FA` with the light logo.
- Sidebar collapsed state: icon-only mark.
- Colour roles in the UI: navy for chrome and primary text, orange for hotspots/alerts, amber for moderate values, teal for cool areas and positive/cooling actions. Heat maps should run teal → amber → orange.

## 10. Favicon and app icon
- Browser tab: `heatshield-icon-32.png` (and `-16.png`), or `heatshield-icon.svg` with `<link rel="icon" type="image/svg+xml">`.
- Apple touch icon: `heatshield-icon-180.png`.
- Social avatar / GitHub org image: `heatshield-icon.png` (1024 px wide) placed on a navy square with generous padding.
- PWA/app icon: the icon centred on a `#142D4B` rounded square with at least 15% padding.

## 11. Files produced
- **SVG (editable, no external dependencies, text converted to outlines):** logo-primary, logo-light, logo-dark, logo-stacked, logo-stacked-dark, icon, icon-mono, and all four banners.
- **PNG (rasterised from the SVGs):** logo-primary, logo-dark, logo-stacked, icon (1024), icon 16/32/180, and all four banners at their stated sizes.
- Transparent-background PNGs: logo-primary, logo-stacked and icon. The dark logo PNG includes its navy background.
