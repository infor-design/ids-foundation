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

  if (String(value).includes('{spacing.')) value = value.replaceAll('{spacing.', 'var(--ids-spacing-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('{space.')) value = value.replaceAll('{space.', 'var(--ids-space-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('{border.')) value = value.replaceAll('{border.', 'var(--ids-border-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('{radius.')) value = value.replaceAll('{radius.', 'var(--ids-radius-').replaceAll('}', ')').replaceAll('.', '-');
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
coreTokenContents += extractSection(json[2]._Core.modes.Soho.border.radius, '--ids-border-radius', 'Border radii', 'px', 1);
coreTokenContents += extractSection(json[2]._Core.modes.Soho.space, '--ids-space', 'Spacing', 'px', 1);
coreTokenContents += extractSection(json[2]._Core.modes.Soho.color, '--ids-color', 'Colors', '', 2);
coreTokenContents += '}\r\n';

console.log(`tokens/theme-soho/core.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-soho/core.scss', coreTokenContents);

// Core Tokens - Terrazzo
cnt = 0;
coreTokenContents = ':root {\r\n';
coreTokenContents += extractSection(json[2]._Core.modes.Terrazzo.border.radius, '--ids-radius', 'Border radii', 'px', 1);
coreTokenContents += extractSection(json[2]._Core.modes.Terrazzo.space, '--ids-spacing', 'Spacing', 'px', 1);
coreTokenContents += extractSection(json[2]._Core.modes.Terrazzo.color, '--ids-color', 'Colors', '', 2);
coreTokenContents += '}\r\n';

console.log(`tokens/theme-terrazzo/core.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-terrazzo/core.scss', coreTokenContents);

// Theme Tokens - Soho
cnt = 0;
let themeTokenContents = ':root {\r\n';
themeTokenContents += extractSection(json[1]._Theme.modes.Soho.color, '--ids-color', 'Theme colors', '', 2);
themeTokenContents += '}\r\n';

console.log(`tokens/theme-soho/theme-colors.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-soho/theme-colors.scss', themeTokenContents);

// Semantic Tokens - Soho
let extraSemanticTokensByTheme = (themeName, fileName) => {
  cnt = 0;
  // Colors
  let semanticTokenContents = ':root {\r\n';
  semanticTokenContents += '  // Surface colors\r\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.background, '--ids-color-background', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.foreground, '--ids-color-foreground', '', '', 2);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border, '--ids-color-border', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.action, '--ids-color-action', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.success, '--ids-color-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.caution, '--ids-color-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.warning, '--ids-color-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.error, '--ids-color-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.info, '--ids-color-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.action, '--ids-color-action', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.theme, '--ids-color-theme', '', '', 1);

  semanticTokenContents += '  // Accent colors\r\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.blue, '--ids-color-accent-blue', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.green, '--ids-color-accent-green', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.gray, '--ids-color-accent-gray', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.orange, '--ids-color-accent-orange', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.purple, '--ids-color-accent-purple', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.red, '--ids-color-accent-red', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.teal, '--ids-color-accent-teal', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.yellow, '--ids-color-accent-yellow', '', '', 1);
  semanticTokenContents += '  // Chart Colors\r\n';
  semanticTokenContents += extractSection(json[4]['Data Viz'].modes[themeName].color['dataviz'].accent, '--ids-dataviz-color-accent', '', '', 2);
  semanticTokenContents += extractSection(json[4]['Data Viz'].modes[themeName].color['dataviz'].sequential, '--ids-dataviz-color-sequential', '', '', 1);
  semanticTokenContents += extractSection(json[4]['Data Viz'].modes[themeName].color['dataviz'].density, '--ids-dataviz-color-density', '', '', 1);

  // Radius and Spacing
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].border.radius, '--ids-border-radius', 'Radii', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].space, '--ids-spacing', 'Space', '', 1);
  semanticTokenContents += '}\r\n';

  console.log(`tokens/theme-soho/${fileName} ${cnt} tokens`);
  fs.writeFileSync(`tokens/theme-soho/${fileName}`, semanticTokenContents);
};

extraSemanticTokensByTheme('Light', 'semantic-light.scss');
extraSemanticTokensByTheme('Dark', 'semantic-dark.scss');
extraSemanticTokensByTheme('High Contrast', 'semantic-contrast.scss');

// Semantic Tokens - Soho
extraSemanticTokensByTheme = (themeName, fileName) => {
  cnt = 0;
  // Colors
  let semanticTokenContents = ':root {\r\n';

  semanticTokenContents += '  // Surface colors\r\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.background, '--ids-color-background', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.foreground, '--ids-color-foreground', '', '', 2);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border, '--ids-color-border', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.action, '--ids-color-action', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.success, '--ids-color-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.caution, '--ids-color-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.warning, '--ids-color-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.error, '--ids-color-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.info, '--ids-color-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.action, '--ids-color-action', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.theme, '--ids-color-theme', '', '', 1);

  semanticTokenContents += '  // Accent colors\r\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.blue, '--ids-color-accent-blue', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.green, '--ids-color-accent-green', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.gray, '--ids-color-accent-gray', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.orange, '--ids-color-accent-orange', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.purple, '--ids-color-accent-purple', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.red, '--ids-color-accent-red', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.teal, '--ids-color-accent-teal', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.yellow, '--ids-color-accent-yellow', '', '', 1);
  semanticTokenContents += '  // Chart Colors\r\n';
  semanticTokenContents += extractSection(json[4]['Data Viz'].modes[themeName].color['dataviz'].accent, '--ids-dataviz-color-accent', '', '', 2);
  semanticTokenContents += extractSection(json[4]['Data Viz'].modes[themeName].color['dataviz'].sequential, '--ids-dataviz-color-sequential', '', '', 1);
  semanticTokenContents += extractSection(json[4]['Data Viz'].modes[themeName].color['dataviz'].density, '--ids-dataviz-color-density', '', '', 1);

  // Radius and Spacing
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].border.radius, '--ids-border-radius', 'Radii', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].space, '--ids-space', 'Space', '', 1);
  semanticTokenContents += '}\r\n';

  console.log(`tokens/theme-soho/${fileName} ${cnt} tokens`);
  fs.writeFileSync(`tokens/theme-soho/${fileName}`, semanticTokenContents);
};

extraSemanticTokensByTheme('Light', 'semantic-light.scss');
extraSemanticTokensByTheme('Dark', 'semantic-dark.scss');
extraSemanticTokensByTheme('High Contrast', 'semantic-contrast.scss');
