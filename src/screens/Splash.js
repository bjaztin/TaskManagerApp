import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/auth";
import { auth } from "../../firebase";

const Splash = ({ navigation }) => {
  const [sound, setSound] = useState();

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/openingSound.mp3")
      );

      await setSound(sound);

      if (sound) {
        await sound.playAsync();
        const soundStatus = await sound.getStatusAsync();

        if (soundStatus && soundStatus.isLoaded) {
        }
      }
    } catch (error) {
      console.error("Error loading or playing audio:", error);
    }
  };
  const stopSound = async () => {
    if (sound) {

      await sound.stopAsync();
      await sound.unloadAsync();
    }
  };

  useEffect(() => {
    playSound();

    const unsubscribe = navigation.addListener("beforeRemove", () => {
      stopSound();
    });

    return () => {
      if (sound) {
        unsubscribe();
        stopSound();
      }
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
      
        await AsyncStorage.setItem("userLoggedIn", "true").then(() => {
          setTimeout(() => {
            stopSound();
            navigation.navigate("BottomTab");
          }, 6000);
        });
      } else {
        await AsyncStorage.removeItem("userLoggedIn");
        setTimeout(() => {
          stopSound();
          navigation.navigate("OnBoarding");
        }, 6000);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#fff"
        hidden={false}
      />
      <Image
        source={require("../../assets/icon.png")}
        style={styles.logo}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F0E7",
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoTitle: {
    paddingTop: 6,
    fontSize: 28,
    fontWeight: "bold",
    color: "#3C6E00",
  },
});
