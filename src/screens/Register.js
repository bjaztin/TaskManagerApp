import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${myUserUid}`), {
          email: user,
          name: name,
        }).then(() => {
          console.log("user successfully created");
          navigation.navigate("BottomTab");
        });
      })
      .catch((error) => {
        console.log("Sign up failed: ", error);
        setErrorMessage("Invalid user credentials/Email is already in use");
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionText}>Create Account</Text>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          testID="name"
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          style={styles.input}
        />

        <TextInput
          testID="email"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          testID="password"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          testID="signup"
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subText}>
        Already with Taskly?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
          <Text style={styles.signUpText}>Sign In</Text>
        </TouchableOpacity>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
    top: 22,
    textAlign: "center",
  },
  signUpText: {
    top: 2,
    fontWeight: "bold",
  },
  successText: {
    color: "green",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    bottom: 60,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
