module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|expo-status-bar|expo-haptics|firebase/app|firebase/firestore|firebase/auth|expo-av|expo-calendar|expo-notifications|expo-image-picker|@firebase/rules-unit-testing|@firebase/database-compat|<rootDir>/__mocks__/audioMock.js/.*)",
    "^.+\\.mp3$",
  ],
  moduleNameMapper: {
    "^@expo/vector-icons$": "<rootDir>/__mocks__/expo_vector_icons.js",
    "\\.(mp3)$": "<rootDir>/__mocks__/audioMock.js",
    "^firebase/app$": "<rootDir>/__mocks__/firebaseApp.js",
    "^firebase/auth$": "<rootDir>/__mocks__/firebaseAuth.js",
    "^firebase/firestore$": "<rootDir>/__mocks__/firebaseFirestore.js",
    "^@react-native-async-storage/async-storage$":
      "<rootDir>/__mocks__/@react-native-async-storage/async-storage.js",
    "^expo-av$": "<rootDir>/__mocks__/expo_av.js",
    "^expo-calendar$": "<rootDir>/__mocks__/expo_calendar.js",
    "^expo-notifications$": "<rootDir>/__mocks__/expo_notifications.js",
  },
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
  ],
  modulePathIgnorePatterns: ["<rootDir>/packages/"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "mp3"],
  moduleDirectories: ["./node_modules", "src"],
  cacheDirectory: ".jest/cache",
};
