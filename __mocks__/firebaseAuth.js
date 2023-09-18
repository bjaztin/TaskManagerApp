// __mocks__/firebaseAuth.js

export const initializeApp = jest.fn();
export const initializeAuth = jest.fn();
export const getReactNativePersistence = jest.fn();
export const signInWithEmailAndPassword = jest
  .fn()
  .mockResolvedValue({ user: {} });


// const auth = jest.createMockFromModule("@react-native-firebase/auth");

// __mocks__/firebaseAuth.js

// const auth = jest.requireActual("@react-native-firebase/auth");

// // Mock the functions you need
// auth.signInWithEmailAndPassword = async (email, password) => {
//   if (email === "example@example.com" && password === "password") {
//     return {
//       user: {
//         uid: "123",
//         displayName: "John Doe",
//       },
//     };
//   } else {
//     throw new Error("Authentication failed");
//   }
// };

// auth.signOut = async () => {
//   return Promise.resolve();
// };

// auth.currentUser = () => ({
//   uid: "123",
//   displayName: "John Doe",
// });

// module.exports = auth;



