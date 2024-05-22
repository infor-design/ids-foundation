# Overview

Contains base tokens, semantic tokens, font files and foundational assets for IDS.

## Design Tokens

Design tokens are pieces of data that represent foundational styles in the design system. They simplify the way product teams interpret and apply the design language, resulting in more cohesive, scalable interfaces. Find more info in the [design system](https://design.infor.com/foundations/design-tokens/). This guide just covers how to use them in the context of this repo and things like exporting / consuming.

### Types

Tokens are categorized by whichever foundational style that’s applied.

| Token       |                               |Example         |Status         |
|-------------|-------------------------------|----------------|----------------|
|**color**    |Defines fills for backgrounds, text, icons, and borders |`color-background-default`| Included |
|**radius**   |Defines border radii for surfaced  for backgrounds, text, icons, and borders |`border-radius-xs`| Included |
|**spacing**  |Defines scalable padding and margin units for grids and layouts  |`space-xl`| Included |
|**font**     |Defines typography attributes like font families, weights, sizes, and line height |`font-size-label`| Future |
|**border**   |Defines stroke widths, styles, and radiuses  |`border-style-dashed`| Future |
|**size**     |Defines other reusable values for heights, widths, and breakpoints  |`size-70`| Future |
|**shadow**   |Defines box shadow properties like offsets, blur, and color |`shadow-error`| Future |
|**motion**   |Defines animations during certain interaction states  |`motion-ease`| Future |

### Mapped Components

Only Atoms are mapped presently in the code and only for spacing, radius, and color.

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

### Using the Tokens

At the moment, we have Sass files for the tokens, provided as CSS variables. We may provide other formats as needed. 

To use the components:

1. Take the core and semantic tokens from [/ids-foundation](https://github.com/infor-design/ids-foundation/tree/main/tokens/theme-soho). View [component tokens](https://github.com/infor-design/enterprise-wc/tree/main/src/themes/default) in @infor-design/enterprise-wc.
2. Use the [npm package](https://www.npmjs.com/package/ids-foundation).
