// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);

// module.exports = config;
// // metro.config.js
// module.exports = {
//   resolver: {
//     sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
//     assetExts: ['glb', 'gltf', 'png', 'jpg'],
//   },
// }


// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Extend the existing config with additional configurations
const { transformer, resolver } = config;

// Add support for SVG files
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

// Update the resolver to include SVG and other file extensions
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'), // Exclude 'svg' from assetExts
  sourceExts: [...resolver.sourceExts, 'svg', 'js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'], // Include 'svg' and other extensions in sourceExts
  assetExts: ['glb', 'gltf', 'png', 'jpg'],
};

module.exports = config;