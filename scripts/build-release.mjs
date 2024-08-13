import * as fs from 'fs';

console.log('Making release in dist folder ...');
const distDir = 'dist';

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir);
fs.copyFileSync('release.json', `${distDir}/package.json`);

// Tokens
fs.mkdirSync(`${distDir}/theme-soho`);
fs.mkdirSync(`${distDir}/theme-terrazzo`);
fs.mkdirSync(`${distDir}/theme-soho/scss`);
fs.mkdirSync(`${distDir}/theme-terrazzo/scss`);
fs.mkdirSync(`${distDir}/theme-soho/css`);
fs.mkdirSync(`${distDir}/theme-terrazzo/css`);
fs.copyFileSync('tokens/theme-soho/scss/core.scss', `${distDir}/theme-soho/scss/core.scss`);
fs.copyFileSync('tokens/theme-soho/scss/theme-colors.scss', `${distDir}/theme-soho/scss/theme-colors.scss`);
fs.copyFileSync('tokens/theme-soho/scss/semantic-contrast.scss', `${distDir}/theme-soho/scss/semantic-contrast.scss`);
fs.copyFileSync('tokens/theme-soho/scss/semantic-dark.scss', `${distDir}/theme-soho/scss/semantic-dark.scss`);
fs.copyFileSync('tokens/theme-soho/scss/semantic-light.scss', `${distDir}/theme-soho/scss/semantic-light.scss`);
fs.copyFileSync('tokens/theme-terrazzo/scss/core.scss', `${distDir}/theme-terrazzo/scss/core.scss`);
fs.copyFileSync('tokens/theme-terrazzo/scss/theme-colors.scss', `${distDir}/theme-terrazzo/scss/theme-colors.scss`);
fs.copyFileSync('tokens/theme-terrazzo/css/ids-theme-tokens-default-light.css', `${distDir}/theme-terrazzo/css/ids-theme-tokens-default-light.css`);
fs.copyFileSync('tokens/theme-terrazzo/css/ids-theme-tokens-default-contrast.css', `${distDir}/theme-terrazzo/css/ids-theme-tokens-default-contrast.css`);
fs.copyFileSync('tokens/theme-terrazzo/css/ids-theme-tokens-default-dark.css', `${distDir}/theme-terrazzo/css/ids-theme-tokens-default-dark.css`);
fs.copyFileSync('tokens/theme-soho/css/ids-theme-tokens-default-light.css', `${distDir}/theme-soho/css/ids-theme-tokens-default-light.css`);
fs.copyFileSync('tokens/theme-soho/css/ids-theme-tokens-default-contrast.css', `${distDir}/theme-soho/css/ids-theme-tokens-default-contrast.css`);
fs.copyFileSync('tokens/theme-soho/css/ids-theme-tokens-default-dark.css', `${distDir}/theme-soho/css/ids-theme-tokens-default-dark.css`);

// Icon Fonts
fs.mkdirSync(`${distDir}/icon-fonts`);
fs.cpSync('icon-fonts', `${distDir}/icon-fonts`, { recursive: true });

// Fonts
fs.mkdirSync(`${distDir}/fonts`);
fs.cpSync('fonts', `${distDir}/fonts`, { recursive: true });

// Icons
fs.mkdirSync(`${distDir}/icons`);
fs.cpSync('icons', 'dist/icons', { recursive: true });

// Docs
fs.copyFileSync('README.md', `${distDir}/README.md`);
