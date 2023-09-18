import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const TaskCompleteButton = ({ isComplete, onPress }) => {

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        testID="completeButton"
        style={[
          styles.unCheckedButton,
          isComplete ? styles.checkedButton : styles.unCheckedButton,
        ]}
        onPress={onPress}
      >
        {isComplete ? (
          <View style={styles.checkedButton}>
            <MaterialIcons name="check" size={20} color="white" />
          </View>
        ) : (
          <View style={styles.unCheckedButton}></View>
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TaskCompleteButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "flex-end",
    flexDirection: "row",
    top: 20,
    right: 30,
    zIndex: 1, 
  },
  unCheckedButton: {
    width: 40,
    height: 40,
    backgroundColor: "lightgray",
    opacity: 0.3,
    borderRadius: 20,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  checkedButton: {
    width: 40,
    height: 40,
    backgroundColor: "#D58258",
    borderRadius: 20,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});