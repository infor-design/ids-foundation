import * as fs from 'fs';

console.log('Generating tokens ...');

const file = fs.readFileSync('tokens/theme-soho/figma-export-tokens.json');
const json = JSON.parse(file);
let cnt = 0;

const fixValue = (value) => {
  if (String(value).includes('{color.')) value = value.replaceAll('{color.', 'var(--ids-color-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('{spacing.')) value = value.replaceAll('{spacing.', 'var(--ids-spacing-').replaceAll('}', ')').replaceAll('.', '-');
  if (String(value).includes('{border.')) value = value.replaceAll('{border.', 'var(--ids-border-').replaceAll('}', ')').replaceAll('.', '-');
  return value;
};

const level1Skips = ['$scopes', '$type', '$libraryName', '$collectionName'];
const level2Skips = ['$scopes', '$type', '$libraryName', '$collectionName', '$value'];

const extractSection = (sectionName, sectionToken, title, addUnit, levels) => {
  let contents = title === '' ? '' : `  // ${title} \n`;
  for (const core of Object.entries(sectionName)) {
    if (levels === 1) {
      if (level1Skips.includes(core[0])) continue;
      if (core[0] === '$value') {
        contents += `  ${sectionToken}: ${fixValue(core[1])}${addUnit || ''};\n`;
        continue;
      }
      contents += `  ${sectionToken}-${core[0]}: ${fixValue(core[1].$value)}${addUnit || ''};\n`;
      cnt++;
    } else {
      for (const inner of Object.entries(core[1])) {
        if (level2Skips.includes(inner[0])) continue;
        contents += `  ${sectionToken}-${core[0]}-${inner[0]}: ${fixValue(inner[1].$value)}${addUnit || ''};\n`;
        cnt++;
      }
    }
  }
  return contents;
};

// Core Tokens
cnt = 0;
let coreTokenContents = ':root { \n';
coreTokenContents += extractSection(json[0].Core.modes.Default.border.radius, '--ids-border-radius', 'Border radii', 'px', 1);
coreTokenContents += extractSection(json[0].Core.modes.Default.border.width, '--ids-border-width', 'Border width', 'px', 1);
coreTokenContents += extractSection(json[0].Core.modes.Default.spacing, '--ids-spacing', 'Spacing', 'px', 1);
coreTokenContents += extractSection(json[0].Core.modes.Default.color, '--ids-color', 'Colors', '', 2);
coreTokenContents += '} \n';

console.log(`tokens/theme-soho/core.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-soho/core.scss', coreTokenContents);

// // Theme Tokens
cnt = 0;
let themeTokenContents = ':root { \n';
themeTokenContents += extractSection(json[1].Theme.modes.Soho.color, '--ids-color', 'Theme colors', '', 2);
themeTokenContents += '} \n';

console.log(`tokens/theme-soho/theme-colors.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-soho/theme-colors.scss', themeTokenContents);

// // Semantic Tokens (Light)
const extraSemanticTokensByTheme = (themeName, fileName) => {
  cnt = 0;
  let semanticTokenContents = ':root { \n';
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.accent, '--ids-color-accent', 'Accent colors', '', 2);
  semanticTokenContents += '  // Accent colors (roots)\n';
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.caution, '--ids-color-accent-blue', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.danger, '--ids-color-accent-grey', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.default, '--ids-color-accent-green', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.disabled, '--ids-color-accent-orange', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.info, '--ids-color-accent-purple', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.secondary, '--ids-color-accent-red', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.success, '--ids-color-accent-teal', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.success, '--ids-color-accent-yellow', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.action, '--ids-color-border-action', 'Border colors (action)', '', 2);
  semanticTokenContents += '  // Border colors (status)\n';
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.caution, '--ids-color-border-caution', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.danger, '--ids-color-border-danger', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.default, '--ids-color-border-default', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.disabled, '--ids-color-border-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.info, '--ids-color-border-info', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.inverse, '--ids-color-border-inverse', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.strongest, '--ids-color-border-strongest', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.success, '--ids-color-border-success', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.warning, '--ids-color-border-warning', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.border.weakest, '--ids-color-border-weakest', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.charts, '--ids-color-charts', 'Chart colors', '', 2);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.action, '--ids-color-icon-action', 'Icon colors (action)', '', 2);
  semanticTokenContents += '  // Icon colors (on text)\n';
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.on.action, '--ids-color-icon-on-action', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.on.caution, '--ids-color-icon-on-caution', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.on.danger, '--ids-color-icon-on-danger', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.on.info, '--ids-color-icon-on-info', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.on.neutral, '--ids-color-icon-on-neutral', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.on.success, '--ids-color-icon-on-success', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.on.warning, '--ids-color-icon-on-warning', '', '', 1);
  semanticTokenContents += '  // Icon colors (status)\n';
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.caution, '--ids-color-icon-caution', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.danger, '--ids-color-icon-danger', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.default, '--ids-color-icon-default', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.disabled, '--ids-color-icon-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.info, '--ids-color-icon-info', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.secondary, '--ids-color-icon-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.success, '--ids-color-icon-success', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.tertiary, '--ids-color-icon-tertiary', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.icon.warning, '--ids-color-icon-warning', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.surface.action, '--ids-color-surface-action', 'Surface colors (action)', '', 2);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.surface.caution, '--ids-color-surface-caution', 'Surface colors (caution)', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.surface.danger, '--ids-color-surface-danger', 'Surface colors (danger)', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.surface.default, '--ids-color-surface-default', 'Surface colors (default)', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.surface.elevated, '--ids-color-surface-elevated', 'Surface colors (elevated)', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.surface.info, '--ids-color-surface-info', 'Surface colors (info)', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.surface.inverse, '--ids-color-surface-inverse', 'Surface colors (inverse)', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.surface.neutral, '--ids-color-surface-neutral', 'Surface colors (neutral)', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.surface.success, '--ids-color-surface-success', 'Surface colors (success)', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.surface.warning, '--ids-color-surface-warning', 'Surface colors (warning)', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.action, '--ids-color-text-action', 'Text colors (action)', '', 2);
  semanticTokenContents += '  // Text colors (on backgrounds)\n';
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.on.action, '--ids-color-text-on-action', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.on.caution, '--ids-color-text-on-caution', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.on.danger, '--ids-color-text-on-danger', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.on.info, '--ids-color-text-on-info', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.on.neutral, '--ids-color-text-on-neutral', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.on.success, '--ids-color-text-on-success', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.on.warning, '--ids-color-text-on-warning', '', '', 1);
  semanticTokenContents += '  // Text colors (status and state)\n';
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.caution, '--ids-color-text-caution', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.danger, '--ids-color-text-danger', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.default, '--ids-color-text-default', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.info, '--ids-color-text-info', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.disabled, '--ids-color-text-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.secondary, '--ids-color-text-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.success, '--ids-color-text-success', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.tertiary, '--ids-color-text-tertiary', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].color.text.warning, '--ids-color-text-warning', '', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].spacing, '--ids-spacing', 'Spacing', '', 1);
  semanticTokenContents += extractSection(json[2].Semantic.modes[themeName].radius, '--ids-radius', 'Radius', '', 1);
  semanticTokenContents += '} \n';

  console.log(`tokens/theme-soho/${fileName} ${cnt} tokens`);
  fs.writeFileSync(`tokens/theme-soho/${fileName}`, semanticTokenContents);
};

extraSemanticTokensByTheme('Light', 'semantic-light.scss');
extraSemanticTokensByTheme('Dark', 'semantic-dark.scss');
extraSemanticTokensByTheme('High Contrast', 'semantic-contrast.scss');
