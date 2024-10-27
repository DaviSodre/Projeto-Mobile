module.exports = {
    preset: 'react-native',
    setupFiles: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Para arquivos .js ou .jsx
      
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|expo|expo-linear-gradient|@expo|@react-navigation)/)',
    ],
  };
  