// __mocks__/firebaseAuth.js

export const initializeApp = jest.fn();
export const initializeAuth = jest.fn();
export const getReactNativePersistence = jest.fn();
export const signInWithEmailAndPassword = jest
  .fn()
  .mockResolvedValue({ user: {} });




