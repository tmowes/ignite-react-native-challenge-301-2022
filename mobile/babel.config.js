/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@models': './src/models',
            '@pages': './src/pages',
            '@routes': './src/routes',
            '@services': './src/services',
            '@storages': './src/storages',
            '@styles': './src/styles',
            '@utils': './src/utils',
          },
        },
      ],
      'inline-dotenv',
      'react-native-reanimated/plugin',
    ],
  }
}
