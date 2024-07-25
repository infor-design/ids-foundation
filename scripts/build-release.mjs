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
fs.copyFileSync('tokens/theme-terrazzo/core.scss', `${distDir}/theme-terrazzo/core.scss`);
fs.copyFileSync('tokens/theme-terrazzo/theme-colors.scss', `${distDir}/theme-terrazzo/theme-colors.scss`);

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
