import * as fs from 'fs';

console.log('Generating tokens ...');

const file = fs.readFileSync('tokens/export/figma-export-tokens.json');
const json = JSON.parse(file);
let cnt = 0;

const fixValue = (value) => {
  if (String(value).includes('{color.')) value = value.replaceAll('{color.', 'var(--ids-color-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('rgba')) {
    value = value.replaceAll(', 10)', ', 0.1)');
    value = value.replaceAll(', 20)', ', 0.2)');
    value = value.replaceAll(', 30)', ', 0.3)');
    value = value.replaceAll(', 40)', ', 0.4)');
    value = value.replaceAll(', 50)', ', 0.5)');
    value = value.replaceAll(', 60)', ', 0.6)');
    value = value.replaceAll(', 70)', ', 0.7)');
    value = value.replaceAll(', 80)', ', 0.8)');
    value = value.replaceAll(', 90)', ', 0.9)');
    value = value.replaceAll(', 100)', ', 1)');
  }

  if (String(value).includes('{space.')) value = value.replaceAll('{space.', 'var(--ids-space-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('{space.')) value = value.replaceAll('{space.', 'var(--ids-space-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('{border.')) value = value.replaceAll('{border.', 'var(--ids-border-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('{radius.')) value = value.replaceAll('{radius.', 'var(--ids-radius-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('{font.size.')) value = value.replaceAll('{font.size.', 'var(--ids-font-size-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('{opacity.')) value = value.replaceAll('{opacity.', 'var(--ids-opacity-').replaceAll('}', ')').replaceAll('.', '-');

  if (String(value).includes('{font.family.sans}')) value = value.replaceAll('{font.family.sans}', 'var(--ids-font-family-sans)');
  if (String(value).includes('{font.weight.regular}')) value = value.replaceAll('{font.weight.regular}', 'var(--ids-font-weight-regular)');
  if (String(value).includes('{font.weight.semibold}')) value = value.replaceAll('{font.weight.semibold}', 'var(--ids-font-weight-semibold)');
  if (String(value).includes('{font.weight.bold}')) value = value.replaceAll('{font.weight.bold}', 'var(--ids-font-weight-bold)');

  if (String(value).includes('Source Sans Pro')) {
    value = 'source sans pro, -apple-system, helvetica, arial';
  }
  return value;
};

const level1Skips = ['$scopes', '$type', '$libraryName', '$collectionName'];
const level2Skips = ['$scopes', '$type', '$libraryName', '$collectionName', '$value'];

const extractSection = (sectionName, sectionToken, title, addUnit, levels) => {
  let contents = title === '' ? '' : `  // ${title}\r\n`;
  for (const core of Object.entries(sectionName)) {
    if (levels === 1) {
      if (level1Skips.includes(core[0])) continue;
      if (core[0] === '$value') {
        contents += `  ${sectionToken}: ${fixValue(core[1])}${addUnit || ''};\r\n`;
        continue;
      }
      contents += `  ${sectionToken}-${core[0]}: ${fixValue(core[1].$value)}${addUnit || ''};\r\n`;
      cnt++;
    } else {
      for (const inner of Object.entries(core[1])) {
        if (level2Skips.includes(inner[0])) continue;
        contents += `  ${sectionToken}-${core[0]}-${inner[0]}: ${fixValue(inner[1].$value)}${addUnit || ''};\r\n`;
        cnt++;
      }
    }
  }
  return contents;
};

// Core Tokens - Soho
cnt = 0;
let coreTokenContents = ':root {\r\n';
coreTokenContents += extractSection(json[2].Core.modes.SoHo.color, '--ids-color', 'Colors', '', 2);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.breakpoint, '--ids-breakpoint', 'Breakpoints', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.border.radius, '--ids-border-radius', 'Border radii', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.border.width, '--ids-border-width', 'Border width', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.cursor, '--ids-cursor', 'Cursors', '', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.font.family, '--ids-font-family', 'Font family', '', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.font['line-height'], '--ids-font-line-height', 'Font size', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.font.size, '--ids-font-size', 'Font size', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.font.uppercase, '--ids-font-uppercase', 'Font uppercase', '', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.font.weight, '--ids-font-weight', 'Font weight', '', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.opacity, '--ids-opacity', 'Opacity', '', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo.space, '--ids-space', 'Space', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.SoHo['z-index'], '--ids-z-index', 'Z Index', '', 1);
coreTokenContents += '}\r\n';

console.log(`tokens/theme-soho/core.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-soho/core.scss', coreTokenContents);

// Core Tokens - Terrazzo
cnt = 0;
coreTokenContents = ':root {\r\n';
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.color, '--ids-color', 'Colors', '', 2);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.breakpoint, '--ids-breakpoint', 'Breakpoints', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.border.radius, '--ids-border-radius', 'Border radii', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.border.width, '--ids-border-width', 'Border width', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.cursor, '--ids-cursor', 'Cursors', '', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.font.family, '--ids-font-family', 'Font family', '', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.font['line-height'], '--ids-font-line-height', 'Font size', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.font.size, '--ids-font-size', 'Font size', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.font.uppercase, '--ids-font-uppercase', 'Font uppercase', '', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.font.weight, '--ids-font-weight', 'Font weight', '', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.opacity, '--ids-opacity', 'Opacity', '', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo.space, '--ids-space', 'Space', 'px', 1);
coreTokenContents += extractSection(json[2].Core.modes.Terrazzo['z-index'], '--ids-z-index', 'Z Index', '', 1);
coreTokenContents += '}\r\n';

console.log(`tokens/theme-terrazzo/core.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-terrazzo/core.scss', coreTokenContents);

// Theme Tokens - Soho
cnt = 0;
let themeTokenContents = ':root {\r\n';
themeTokenContents += extractSection(json[1].Theme.modes.Default.color.theme, '--ids-color-theme', 'Default theme colors', '', 1);
themeTokenContents += '}\r\n';

console.log(`tokens/theme-soho/theme-colors.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-soho/theme-colors.scss', themeTokenContents);

// Theme Tokens - Terrazzo
cnt = 0;
themeTokenContents = ':root {\r\n';
themeTokenContents += extractSection(json[1].Theme.modes.IndustryA.color.theme, '--ids-color-theme-industry-a', 'Industry A theme colors', '', 1);
themeTokenContents += extractSection(json[1].Theme.modes.IndustryB.color.theme, '--ids-color-theme-industry-b', 'Industry A theme colors', '', 1);
themeTokenContents += '}\r\n';

console.log(`tokens/theme-terrazzo/theme-colors.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-terrazzo/theme-colors.scss', themeTokenContents);

// Semantic Tokens - Soho
const extraSemanticTokensByTheme = (themeName, fileName) => {
  cnt = 0;
  // Colors
  let semanticTokenContents = ':root {\r\n';

  semanticTokenContents += '  // Accent colors\r\n';
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.accent.blue, '--ids-color-accent-blue', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.accent.green, '--ids-color-accent-green', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.accent.neutral, '--ids-color-accent-neutral', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.accent.orange, '--ids-color-accent-orange', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.accent.purple, '--ids-color-accent-purple', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.accent.red, '--ids-color-accent-red', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.accent.teal, '--ids-color-accent-teal', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.accent.yellow, '--ids-color-accent-yellow', '', '', 1);

  semanticTokenContents += '  // Background and Action colors\r\n';
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.action, '--ids-color-action', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.background, '--ids-color-background', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.border, '--ids-color-border', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.foreground, '--ids-color-foreground', '', '', 2);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.success, '--ids-color-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.caution, '--ids-color-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.warning, '--ids-color-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.error, '--ids-color-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.info, '--ids-color-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.action, '--ids-color-action', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].color.theme, '--ids-color-theme', '', '', 1);
  semanticTokenContents += extractSection(json[0].Color.modes[themeName].transparent, '--ids-color-transparent', '', '', 1);

  semanticTokenContents += '  // Chart Colors\r\n';
  semanticTokenContents += extractSection(json[3]['Data viz'].modes[themeName].color['dataviz'].accent, '--ids-dataviz-color-accent', '', '', 2);
  semanticTokenContents += extractSection(json[3]['Data viz'].modes[themeName].color['dataviz'].default, '--ids-dataviz-color-default', '', '', 1);
  semanticTokenContents += extractSection(json[3]['Data viz'].modes[themeName].color['dataviz'].density, '--ids-dataviz-color-density', '', '', 1);
  semanticTokenContents += extractSection(json[3]['Data viz'].modes[themeName].color['dataviz'].negative, '--ids-dataviz-color-negative', '', '', 1);
  semanticTokenContents += extractSection(json[3]['Data viz'].modes[themeName].color['dataviz'].neutral, '--ids-dataviz-color-neutral', '', '', 1);
  semanticTokenContents += extractSection(json[3]['Data viz'].modes[themeName].color['dataviz'].positive, '--ids-dataviz-color-positive', '', '', 1);
  semanticTokenContents += extractSection(json[3]['Data viz'].modes[themeName].color['dataviz'].secondary, '--ids-dataviz-color-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[3]['Data viz'].modes[themeName].color['dataviz'].sequential, '--ids-dataviz-color-sequential', '', '', 1);

  // Border and Space
  semanticTokenContents += extractSection(json[4].Space.modes.Value.space, '--ids-space', 'Space', '', 1);
  semanticTokenContents += extractSection(json[5].Border.modes.Value.border.radius, '--ids-border-radius', 'Radii', '', 1);
  semanticTokenContents += extractSection(json[5].Border.modes.Value.border.width, '--ids-border-width', 'Border Width', '', 1);

  // Fonts
  semanticTokenContents += extractSection(json[6].Font.modes.Default.font.family.default, '--ids-font-family-default', 'Font Family', '', 1);
  semanticTokenContents += extractSection(json[6].Font.modes.Default.font.weight, '--ids-font-weight', 'Font weight', '', 1);

  // Font Sizes
  semanticTokenContents += extractSection(json[6].Font.modes.Default.font.size, '--ids-font-size', 'Font size', '', 1);

  // Opacity
  semanticTokenContents += extractSection(json[7].Opacity.modes['Mode 1'].opacity, '--ids-opacity', 'Opacity', '', 1);

  semanticTokenContents += '}\r\n';
  console.log(`tokens/theme-soho/${fileName} ${cnt} tokens`);
  fs.writeFileSync(`tokens/theme-soho/${fileName}`, semanticTokenContents);
};

extraSemanticTokensByTheme('Light', 'semantic-light.scss');
extraSemanticTokensByTheme('Dark', 'semantic-dark.scss');
extraSemanticTokensByTheme('High Contrast', 'semantic-contrast.scss');
