import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const OnBoarding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo and App name */}
      <View style={styles.logoTitle}>
        <Image source={require("../../assets/icon.png")} style={styles.logo} />
        <Text style={styles.title}>Daily</Text>
      </View>

      {/* Tagline */}
      <Text testID="Taskly" style={styles.tagline}>
        Manage your {"\n"}task and fulfill your day with{" "}
        <Text style={styles.taglineHighlight}>Daily</Text>
      </Text>

      {/* Welcome Image with subtitle*/}
      <Image
        source={require("../../assets/welcomePhoto.png")}
        style={styles.welcomePhoto}
      />
      <Text style={styles.subTitle}>
        Efficient task management at your fingertips
      </Text>

      {/* Get started button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          testID="getStarted"
          style={styles.onBoardingButton}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 30,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F2F0E7",
  },
  logoTitle: {
    flexDirection: "row",
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    color: "#3C6E00",
    fontWeight: "bold",
    paddingTop: 12,
    paddingLeft: 4,
    flexDirection: "row",
  },
  tagline: {
    fontSize: 30,
    color: "#1E1E1E",
    fontWeight: "bold",
    paddingTop: 30,
  },
  taglineHighlight: {
    color: "#3C6E00",
  },
  welcomePhoto: {
    width: "100%",
    height: "45%",
    top: 20,
  },
  subTitle: {
    fontSize: 14,
    color: "#1E1E1E",
    paddingTop: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  onBoardingButton: {
    backgroundColor: "#D58258",
    width: "60%",
    height: 50,
    marginBottom:30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
