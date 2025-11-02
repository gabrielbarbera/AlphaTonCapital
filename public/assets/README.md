# Assets Organization

This directory contains all static assets for the AlphaTON Capital website.

## Structure

### `/icons/`

Used icons for the website:

- `Avatar Gradient Circle.png` - Footer icon
- `Avatar Gradient Icon.png` - Favicon and app icon

### `/logos/`

Company logo variants (currently using Primary Logo Horizontal.svg):

- `Primary Logo Horizontal.svg` - Main logo used in header
- Additional variants available for future use (Vertical, White, Secondary, Wordmark)

### `/partners/`

Strategic partner and investor logos:

- BitGo, DWFLABS, Kraken, Animoca Brands, Crypto.com, NASDAQ
- Alpha Sigma Capital, SkyBridge, Chardan, DNA, RSV

### `/leadership/`

Team member photos:

- `Brittany-Kaiser-1.jpg` - CEO, Board Member
- `Enzo-Villani-1.png` - CIO, Board Member
- `Yury-Mitin-1.png` - Partner, CBDO

### `/graphics/`

SVG illustrations used in components:

- `Our Edge.svg` - Used in "Our Edge" section
- `What We Do.svg` - Used in "What We Do" section

### `/media_kit/`

Marketing and branding assets (downloadable via `/media-kit` route):

- **AlphaTon Social Banners/** - Open Graph and Twitter Card images
  - `social.jpg` - Open Graph image
  - `Twitter header - 1.jpg` - Twitter Card image
- **apparel and banners/** - Merchandise mockups and banner templates
- **Backgrounds/** - Background image assets
- **Avatars and Icons/** - Complete set of avatar variants
- `media_kit.zip` - Complete media kit archive (served via API route)
- Various SVG exports and logo variants for branding guidelines

## Usage

When adding new assets:

1. Place them in the appropriate folder based on their purpose
2. Update component imports to use the new paths
