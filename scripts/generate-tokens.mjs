import * as fs from 'fs';

console.log('Generating tokens ...');

const file = fs.readFileSync('tokens/export/figma-export-tokens.json');
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

// Core Tokens - Soho
cnt = 0;
let coreTokenContents = ':root { \n';
coreTokenContents += extractSection(json[2]._Core.modes.Soho.border.radius, '--ids-border-radius', 'Border radii', 'px', 1);
coreTokenContents += extractSection(json[2]._Core.modes.Soho.border.width, '--ids-border-width', 'Border width', 'px', 1);
coreTokenContents += extractSection(json[2]._Core.modes.Soho.spacing, '--ids-spacing', 'Spacing', 'px', 1);
coreTokenContents += extractSection(json[2]._Core.modes.Soho.color, '--ids-color', 'Colors', '', 2);
coreTokenContents += '} \n';

console.log(`tokens/theme-soho/core.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-soho/core.scss', coreTokenContents);

// Core Tokens - Terrazzo
cnt = 0;
coreTokenContents = ':root { \n';
coreTokenContents += extractSection(json[2]._Core.modes.Terrazzo.border.radius, '--ids-border-radius', 'Border radii', 'px', 1);
coreTokenContents += extractSection(json[2]._Core.modes.Terrazzo.border.width, '--ids-border-width', 'Border width', 'px', 1);
coreTokenContents += extractSection(json[2]._Core.modes.Terrazzo.spacing, '--ids-spacing', 'Spacing', 'px', 1);
coreTokenContents += extractSection(json[2]._Core.modes.Terrazzo.color, '--ids-color', 'Colors', '', 2);
coreTokenContents += '} \n';

console.log(`tokens/theme-terrazzo/core.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-terrazzo/core.scss', coreTokenContents);

// Theme Tokens - Soho
cnt = 0;
let themeTokenContents = ':root { \n';
themeTokenContents += extractSection(json[1]._Theme.modes.Soho.color, '--ids-color', 'Theme colors', '', 2);
themeTokenContents += '} \n';

console.log(`tokens/theme-soho/theme-colors.scss ${cnt} tokens`);
fs.writeFileSync('tokens/theme-soho/theme-colors.scss', themeTokenContents);

// Semantic Tokens - Soho
let extraSemanticTokensByTheme = (themeName, fileName) => {
  cnt = 0;
  // Colors
  let semanticTokenContents = ':root { \n';
  semanticTokenContents += '  // Icon colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.action, '--ids-color-icon-action', '', '', 2);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.on, '--ids-color-icon-on', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.info, '--ids-color-icon-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.caution, '--ids-color-icon-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.error, '--ids-color-icon-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.warning, '--ids-color-icon-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.success, '--ids-color-icon-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.default, '--ids-color-icon-inverse-default', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.secondary, '--ids-color-icon-inverse-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon['inverse-default'], '--ids-color-icon-inverse-default', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon['inverse-disabled'], '--ids-color-icon-inverse-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon['inverse-tertiary'], '--ids-color-icon-inverse-tertiary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon['inverse-secondary'], '--ids-color-icon-inverse-secondary', '', '', 1);
  semanticTokenContents += '  // Accent colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.theme, '--ids-color-accent-theme', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.red, '--ids-color-accent-red', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.blue, '--ids-color-accent-blue', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.teal, '--ids-color-accent-teal', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.gray, '--ids-color-accent-gray', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.purple, '--ids-color-accent-purple', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.green, '--ids-color-accent-green', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.orange, '--ids-color-accent-orange', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.yellow, '--ids-color-accent-yellow', '', '', 1);
  semanticTokenContents += '  // Chart Colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.charts.density, '--ids-color-charts-density', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.charts.qualitative, '--ids-color-charts-qualitative', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.charts.sequential, '--ids-color-charts-sequential', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.charts.status, '--ids-color-charts-status', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.charts.binary, '--ids-color-charts-binary', '', '', 1);
  semanticTokenContents += '  // Icon colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.action, '--ids-color-text-action', '', '', 2);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.on, '--ids-color-text-on', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.info, '--ids-color-text-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.caution, '--ids-color-text-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.error, '--ids-color-text-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.warning, '--ids-color-text-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.success, '--ids-color-text-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.default, '--ids-color-text-inverse-default', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.secondary, '--ids-color-text-inverse-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text['inverse-default'], '--ids-color-text-inverse-default', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text['inverse-disabled'], '--ids-color-text-inverse-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text['inverse-tertiary'], '--ids-color-text-inverse-tertiary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text['inverse-secondary'], '--ids-color-text-inverse-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.disabled, '--ids-color-text-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.tertiary, '--ids-color-text-tertiary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.secondary, '--ids-color-text-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.default, '--ids-color-text-default', '', '', 1);
  semanticTokenContents += '  // Surface colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.action, '--ids-color-surface-action', '', '', 2);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.info, '--ids-color-surface-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.elevated, '--ids-color-surface-elevated', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.error, '--ids-color-surface-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.default, '--ids-color-surface-default', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.success, '--ids-color-surface-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.warning, '--ids-color-surface-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.caution, '--ids-color-surface-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.inverse, '--ids-color-surface-inverse', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.neutral, '--ids-color-surface-neutral', '', '', 1);
  semanticTokenContents += '  // Status colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.warning, '--ids-color-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.caution, '--ids-color-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.neutral, '--ids-color-neutral', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.error, '--ids-color-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.info, '--ids-color-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.success, '--ids-color-success', '', '', 1);
  semanticTokenContents += '  // Border colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.action, '--ids-color-border-action', '', '', 2);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.warning, '--ids-color-border-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.strongest, '--ids-color-border-strongest', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.inverse, '--ids-color-border-inverse', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.disabled, '--ids-color-border-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.weakest, '--ids-color-border-weakest', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.info, '--ids-color-border-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.caution, '--ids-color-border-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.error, '--ids-color-border-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.success, '--ids-color-border-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.default, '--ids-color-border-default', '', '', 1);

  // Radius and Spacing
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].radius, '--ids-radius', 'Radii', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].spacing, '--ids-spacing', 'Space', '', 1);
  semanticTokenContents += '} \n';

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
  let semanticTokenContents = ':root { \n';
  semanticTokenContents += '  // Icon colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.action, '--ids-color-icon-action', '', '', 2);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.on, '--ids-color-icon-on', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.info, '--ids-color-icon-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.caution, '--ids-color-icon-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.error, '--ids-color-icon-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.warning, '--ids-color-icon-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.success, '--ids-color-icon-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.default, '--ids-color-icon-inverse-default', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon.secondary, '--ids-color-icon-inverse-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon['inverse-default'], '--ids-color-icon-inverse-default', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon['inverse-disabled'], '--ids-color-icon-inverse-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon['inverse-tertiary'], '--ids-color-icon-inverse-tertiary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.icon['inverse-secondary'], '--ids-color-icon-inverse-secondary', '', '', 1);
  semanticTokenContents += '  // Accent colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.theme, '--ids-color-accent-theme', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.red, '--ids-color-accent-red', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.blue, '--ids-color-accent-blue', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.teal, '--ids-color-accent-teal', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.gray, '--ids-color-accent-gray', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.purple, '--ids-color-accent-purple', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.green, '--ids-color-accent-green', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.orange, '--ids-color-accent-orange', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.accent.yellow, '--ids-color-accent-yellow', '', '', 1);
  semanticTokenContents += '  // Chart Colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.charts.density, '--ids-color-charts-density', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.charts.qualitative, '--ids-color-charts-qualitative', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.charts.sequential, '--ids-color-charts-sequential', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.charts.status, '--ids-color-charts-status', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.charts.binary, '--ids-color-charts-binary', '', '', 1);
  semanticTokenContents += '  // Icon colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.action, '--ids-color-text-action', '', '', 2);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.on, '--ids-color-text-on', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.info, '--ids-color-text-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.caution, '--ids-color-text-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.error, '--ids-color-text-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.warning, '--ids-color-text-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.success, '--ids-color-text-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.default, '--ids-color-text-inverse-default', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.secondary, '--ids-color-text-inverse-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text['inverse-default'], '--ids-color-text-inverse-default', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text['inverse-disabled'], '--ids-color-text-inverse-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text['inverse-tertiary'], '--ids-color-text-inverse-tertiary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text['inverse-secondary'], '--ids-color-text-inverse-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.disabled, '--ids-color-text-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.tertiary, '--ids-color-text-tertiary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.secondary, '--ids-color-text-secondary', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.text.default, '--ids-color-text-default', '', '', 1);
  semanticTokenContents += '  // Surface colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.action, '--ids-color-surface-action', '', '', 2);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.info, '--ids-color-surface-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.elevated, '--ids-color-surface-elevated', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.error, '--ids-color-surface-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.default, '--ids-color-surface-default', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.success, '--ids-color-surface-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.warning, '--ids-color-surface-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.caution, '--ids-color-surface-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.inverse, '--ids-color-surface-inverse', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.surface.neutral, '--ids-color-surface-neutral', '', '', 1);
  semanticTokenContents += '  // Status colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.warning, '--ids-color-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.caution, '--ids-color-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.neutral, '--ids-color-neutral', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.error, '--ids-color-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.info, '--ids-color-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.success, '--ids-color-success', '', '', 1);
  semanticTokenContents += '  // Border colors\n';
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.action, '--ids-color-border-action', '', '', 2);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.warning, '--ids-color-border-warning', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.strongest, '--ids-color-border-strongest', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.inverse, '--ids-color-border-inverse', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.disabled, '--ids-color-border-disabled', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.weakest, '--ids-color-border-weakest', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.info, '--ids-color-border-info', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.caution, '--ids-color-border-caution', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.error, '--ids-color-border-error', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.success, '--ids-color-border-success', '', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].color.border.default, '--ids-color-border-default', '', '', 1);

  // Radius and Spacing
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].radius, '--ids-radius', 'Radii', '', 1);
  semanticTokenContents += extractSection(json[0].Semantic.modes[themeName].spacing, '--ids-spacing', 'Space', '', 1);
  semanticTokenContents += '} \n';

  console.log(`tokens/theme-soho/${fileName} ${cnt} tokens`);
  fs.writeFileSync(`tokens/theme-soho/${fileName}`, semanticTokenContents);
};

extraSemanticTokensByTheme('Light', 'semantic-light.scss');
extraSemanticTokensByTheme('Dark', 'semantic-dark.scss');
extraSemanticTokensByTheme('High Contrast', 'semantic-contrast.scss');
