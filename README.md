# Overview

Contains base tokens, font files and foundational assets for the Ids design system.

## Design Tokens

Design tokens are pieces of data that represent foundational styles in the design system. They simplify the way product teams interpret and apply the design language, resulting in more cohesive, scalable interfaces. Find more info in the [design system](https://design.infor.com/foundations/design-tokens/). This guide just covers how to use them in the context of this repo and things like exporting / consuming.

### Types

Tokens are categorized by whichever foundational style that’s applied.

| Token       |                               |Example         |Status         |
|-------------|-------------------------------|----------------|----------------|
|**color**    |Defines fills for backgrounds, text, icons, and borders |`$color-surface-secondary`| Included |
|**radius**   |Defines border radii for surfaced  for backgrounds, text, icons, and borders |`$radius-02`| Included |
|**spacing**  |Defines scalable padding and margin units for grids and layouts  |`$space-05`| Included |
|**font**     |Defines typography attributes like font families, weights, sizes, and line height |`$font-size-label`| Future |
|**border**   |Defines stroke widths, styles, and radiuses  |`$border-style-dashed`| Future |
|**size**     |Defines other reusable values for heights, widths, and breakpoints  |`$size-70`| Future |
|**shadow**   |Defines box shadow properties like offsets, blur, and color |`$shadow-error`| Future |
|**motion**   |Defines animations during certain interaction states  |`$motion-ease`| Future |

### Mapped Components

Only Atoms are mapped presently in the code and only for spacing, radius, and color

- Avatar (Images)
- Buttons
- Badge
- Card
- Checkbox
- Image
- Input
- Stats
- Link
- Popup
- Progress Indicator
- Radios
- Separator
- Splitter
- Tab
- Tag
- Text Area
- Toast
- Tooltip

## Using the tokens

At the moment we have sass files for the tokens which are css variables. We may provide other formats as needed. To use the components either:

1. Take the core, semantic files from https://github.com/infor-design/ids-foundation/tree/main/tokens/theme-soho (Component tokens https://github.com/infor-design/enterprise-wc/tree/main/src/themes/default in the source)
2. Use the npm package https://www.npmjs.com/package/ids-foundation

## Tasks for Developers in this repo

### Generating Tokens

1. Open file https://www.figma.com/file/7xMSXwCpK3eq4uGqkDDDav/%5BIDS%5D-Design-Tokens?type=design&node-id=16-646&mode=design&t=HyMBBDpSqYNqIHGk-0
2. On the Design tab on the right panel, click "Local Variables" to see the tokens
3. On the bottom of that panel Click "Variables Pro"
4. Click Export then check all collections
5. Click Export
6. Copy the JSON file to the tokens/theme-soho folder and call it figma-export-tokens.json (name used in the scripts)
7. Select all text and format the JSON
8. Run `node scripts/generate-tokens.mjs` and use output

### Designs with Tokens

Newest:
https://www.figma.com/file/7xMSXwCpK3eq4uGqkDDDav/%5BIDS%5D-Design-Tokens?type=design&node-id=16-646&mode=design&t=HyMBBDpSqYNqIHGk-0

Explorations (Newer):
https://www.figma.com/file/vZbJ659UdOMYr7pm86qT0r/Design-System%3A-V5?node-id=16%3A646&mode=dev

Older Version:
https://www.figma.com/file/7Fl52jRJUDVJawJB8IXQri/IDS-Variables-component-library?node-id=21%3A3517&mode=dev

Anatomy Diagram (a bit outdated):
https://www.figma.com/file/43QPfoE7ke2uCTnfGxrsAr/Token-Anatomy-Figma?type=design&node-id=0-1&mode=design&t=G9qyYHHZl0qSlNhK-0

### Generating Icons

1. Go to https://pages.workers.design.infor.com/
2. Run Job `design-system-dry-run` as a dry run (as if releasing that)
3. Copy the zip from (example) https://infor-design-assets-downloads.s3.amazonaws.com/archives/dry-run-dist-4.16.2.zip
4. Take the theme-new/icons/default part and copy it to the icons standard folder
5. Take the theme-new/icons/old/empty part and copy it to the icons empty folder

### Icon Fonts

To generate the icon font:

1. export from https://www.figma.com/file/NYzUbtJYc4aFh9f4LKjiUN/IDS-System-Icons%3A-5.0?node-id=111%3A11855&mode=dev
2. import into https://icomoon.io then export from there.
3. Copy into icon-fonts/v5
4. Massage contents (files renamed / styles cleaned up / and only woff is used)
5. Add double back slash

Alternative formats:

```css
  src:  url('fonts/IDS-V5.eot?m5pnz1');
  src:  url('fonts/IDS-V5.eot?m5pnz1#iefix') format('embedded-opentype'),
    url('fonts/IDS-V5.ttf?m5pnz1') format('truetype'),
    url('fonts/IDS-V5.woff?m5pnz1') format('woff'),
```

### Publish Steps

- bump version (release.json and package.json)
- check change log
- `npm run build && npm run publish:npm:dry-run`
- then `npm run build && npm run publish:npm`
