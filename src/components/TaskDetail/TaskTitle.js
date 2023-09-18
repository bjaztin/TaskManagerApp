import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TaskTitle = ({ isComplete, task }) => {

  return (
    <View>
      {task && (
        <Text
          style={[
            styles.itemText,
            isComplete ? styles.completedTaskTitle : null,
          ]}
        >
          {task}
        </Text>
      )}
    
    </View>
  );
};

export default TaskTitle;

const styles = StyleSheet.create({
  itemText: {
    maxWidth: "100%",
    fontSize: 22,
    color: "#f1f1f1",
  },
  divider: {
    backgroundColor: "#dfe6e9",
  },
  completedTaskTitle: {
    color: "gray",
  },
});
