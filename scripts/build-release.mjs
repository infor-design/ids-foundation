import * as fs from 'fs';

console.log('Making release in dist folder ...');
const distDir = 'dist';

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir);
fs.copyFileSync('release.json', `${distDir}/package.json`);

// Tokens
fs.mkdirSync(`${distDir}/theme-soho`);
fs.mkdirSync(`${distDir}/theme-terrazzo`);
fs.copyFileSync('tokens/theme-soho/core.scss', `${distDir}/theme-soho/core.scss`);
fs.copyFileSync('tokens/theme-soho/theme-colors.scss', `${distDir}/theme-soho/theme-colors.scss`);
fs.copyFileSync('tokens/theme-soho/semantic-contrast.scss', `${distDir}/theme-soho/semantic-contrast.scss`);
fs.copyFileSync('tokens/theme-soho/semantic-dark.scss', `${distDir}/theme-soho/semantic-dark.scss`);
fs.copyFileSync('tokens/theme-soho/semantic-light.scss', `${distDir}/theme-soho/semantic-light.scss`);

// Icons
fs.mkdirSync(`${distDir}/icons`);
fs.copyFileSync('icon-fonts/v5/fonts/ids-icons.woff', `${distDir}/icons/ids-icons.woff`);
fs.copyFileSync('icon-fonts/v5/icon-styles.css', `${distDir}/icons/icon-styles.css`);
fs.copyFileSync('icon-fonts/v5/icon-list.json', `${distDir}/icons/icon-list.json`);

// Future
// fs.copyFileSync('tokens/theme-terrazzo/*.scss', `${distDir}/theme-terrazzo/`);
