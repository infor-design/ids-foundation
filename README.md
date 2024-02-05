# Overview

Contains base tokens, font files and foundational assets for the Ids design system.

## Design Tokens

Design tokens are pieces of data that represent foundational styles in the design system. They simplify the way product teams interpret and apply the design language, resulting in more cohesive, scalable interfaces. Find more info in the [design system](https://design.infor.com/foundations/design-tokens/). This guide just covers how to use them in the context of this repo and things like exporting / consuming.

### Types

Tokens are categorized by whichever foundational style that’s applied. 

| Token       |                               |Example         |Status         |
|-------------|-------------------------------|----------------|----------------|
|**color**    |Defines fills for backgrounds, text, icons, and borders |`$color-surface-secondary`| Included |
|**radius**   |Defines border radii for surfaced  for backgrounds, text, icons, and borders |`$border-radius-02`| Included |
|**spacing**  |Defines scalable padding and margin units for grids and layouts  |`$space-05`| Included |
|**font**     |Defines typography attributes like font families, weights, sizes, and line height |`$font-size-label`| Future |
|**border**   |Defines stroke widths, styles, and radiuses  |`$border-style-dashed`| Future |
|**size**     |Defines other reusable values for heights, widths, and breakpoints  |`$size-70`| Future |
|**shadow**   |Defines box shadow properties like offsets, blur, and color |`$shadow-error`| Future |
|**motion**   |Defines animations during certain interaction states  |`$motion-ease`| Future |

## Generating Tokens

1. Open file https://www.figma.com/file/LzcXsS59nyn2N1bSP3qotu/%F0%9F%9A%A7-IDS-Tokens?type=design&node-id=0-1&mode=design&t=TJ5lvXnRcY9fcvAK-0
2. On the Design tab on the right panel, click "Local Variables" to see the tokens
3. On the bottom of that panel Click "Variables Pro"
4. Click Export then check all 3 collections
5. Click Export 
6. Copy the JSON file to the tokens/theme-soho folder and call it figma-export-tokens.json (name used in the scripts)
7. Select all text and format the JSON
8. Run `node scripts/generate-tokens.mjs` and use output 

## Designs with Tokens

This file contains the components and shows the mapping
https://www.figma.com/file/7Fl52jRJUDVJawJB8IXQri/IDS-Variables-component-library?node-id=21%3A3517&mode=dev

## Icon Fonts

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
    url('fonts/IDS-V5.svg?m5pnz1#IDS-V5') format('svg');
``` 
