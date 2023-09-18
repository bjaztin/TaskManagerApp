import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const PomodoroScreen = () => {
  const intervals = [
    { name: "Focus", duration: 25 },
    { name: "Short Break", duration: 5 },
    { name: "Focus", duration: 25 },
    { name: "Long Break", duration: 10 },
  ];

  const [currentInterval, setCurrentInterval] = useState(0);
  const [minutes, setMinutes] = useState(intervals[currentInterval].duration);
  const [seconds, setSeconds] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [mode, setMode] = useState("Focus");

  const [pingSound, setPingSound] = useState();
  const [bellSound, setBellSound] = useState();

  useEffect(() => {
    async function loadPingSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/pingSound.mp3")
      );
      setPingSound(sound);
    }

    loadPingSound();

    return () => {
      if (pingSound) {
        pingSound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    async function loadBellSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/bellSound.mp3")
      );
      setBellSound(sound);
    }

    loadBellSound();

    return () => {
      if (bellSound) {
        bellSound.unloadAsync();
      }
    };
  }, []);

  const handleIntervalCompletion = () => {
    console.log("Transitioning to the next interval!");

    const nextInterval =
      currentInterval === intervals.length - 1 ? 0 : currentInterval + 1;
    const nextMode = intervals[nextInterval].name;

    setCurrentInterval(nextInterval);
    setMinutes(intervals[nextInterval].duration);
    setSeconds(0);
    setMode(nextMode);

    if (nextInterval === 0) {
      // All intervals are complete
      Alert.alert("Congratulations!", "Session is complete!");
      console.log("All intervals are complete");
      setIsStart(false); 
      if (bellSound) {
        bellSound.replayAsync(); 
      }
      Vibration.vibrate();
    } else {
    }
  };

  useEffect(() => {

    let interval;

    if (isStart && (minutes >= 0 || seconds >= 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            handleIntervalCompletion();
            if (pingSound) {
              pingSound.replayAsync(); // Play the ping sound
            }
            Vibration.vibrate();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (
      !isStart &&
      (minutes !== intervals[currentInterval].duration || seconds !== 0)
    ) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isStart, minutes, seconds, currentInterval]);

  const toggleTimer = () => {
    setIsStart(!isStart);
  };

  const resetTimer = () => {
    setIsStart(false);
    setCurrentInterval(0);
    setMinutes(intervals[0].duration);
    setSeconds(0);
    setMode("Focus");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: mode === "Focus" ? "#74886c" : "#4c7e80" },
      ]}
    >
      <Text style={styles.intervalName}>{intervals[currentInterval].name}</Text>
      <Text style={styles.roundInterval}>
        Round {currentInterval + 1}/{intervals.length}
      </Text>

      <Text testID="timerValue" style={styles.timer}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Text>
      <TouchableOpacity
        testID="toggleButtons"
        style={[
          styles.buttonStartContainer,
          (style = {
            backgroundColor: mode === "Focus" ? "#66765f" : "#426e70",
          }),
        ]}
        onPress={toggleTimer}
      >
        <Ionicons name={isStart ? "pause" : "play"} size={22} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonResetContainer}
        onPress={resetTimer}
        testID="resetTimer"
      >
        <Text style={styles.buttonResetText}>Cancel my session</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PomodoroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ce7878",
  },
  intervalName: {
    fontSize: 30,
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    top: "15%",
    left: "10%",
  },
  roundInterval: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
    position: "absolute",
    top: "20%",
    left: "10%",
  },
  timer: {
    fontSize: 80,
    color: "white",
    fontWeight: "800",
  },
  progressBarContainer: {
    marginTop: 10,
  },
  buttonStartContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#c45b5b",
    borderRadius: 60,
    width: "15%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonResetContainer: {
    top: 50,
    padding: 12,
    alignItems: "center",
  },
  buttonResetText: {
    color: "white",
    fontSize: 16,
  },
  stepContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
