import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user credentials", userCredential);
        const user = userCredential.user;
        console.log("user details", user);
        navigation.navigate("BottomTab");
      })

      .catch((error) => {
        console.log("Sign in failed: ", error);
        setErrorMessage("Email/password are incorrect");
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionText}>Sign In</Text>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          testID="email-input"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          testID="password-input"
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
          testID="login-button"
        >
          <Text style={styles.buttonText}>LogIn</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subText}>
        Don't have an account yet?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F0E7",
  },
  inputContainer: {
    width: "70%",
    padding: 10,
  },
  input: {
    padding: 10,
    marginBottom: 28,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  buttonContainer: {
    width: "40%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D58258",
    borderRadius: 50,
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  sectionTitle: {
    bottom: 10,
    alignItems: "center",
  },
  sectionText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subText: {
    top: 15,
    textAlign: "center",
  },
  signUpText: {
    top: 3,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});