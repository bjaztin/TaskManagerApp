import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import TaskTitle from "./TaskTitle";
import TaskNote from "./TaskNote";
import TaskUrl from "./TaskUrl";
import TaskImage from "./TaskImage";
import TaskDate from "./TaskDate";
import TaskTime from "./TaskTime";
import TaskCompleteButton from "./TaskCompleteButton";
import TaskTagIcon from "./TaskTagIcon";
import SwipeAction from "./SwipeAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskDetails = ({
  item,
  onDelete,
  selectedDate,
  selectedTime,
  selectedEndTime,
  selectedImage,
  onImagePress,
  setIsTagPickerVisible,
  onToggleComplete,
}) => {
  const { task, note, url } = item;
  const [isComplete, setIsComplete] = useState(false);
  const [selectTag, setSelectedTag] = useState("label-outline");

  useEffect(() => {
    // Load the UI state from AsyncStorage when the component mounts
    const loadToggleState = async () => {
      try {
        const savedToggleState = await AsyncStorage.getItem(
          `completedTask${item.id}`
        );
        if (savedToggleState !== null) {
          setIsComplete(JSON.parse(savedToggleState));
        }
      } catch (error) {
        console.error("Error loading UI state from AsyncStorage:", error);
      }
    };

    loadToggleState();
  }, [item.id]);

  const handleToggleComplete = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    setIsComplete(!isComplete);

    // Save the new completion status to AsyncStorage
    try {
      await AsyncStorage.setItem(
        `completedTask${item.id}`,
        JSON.stringify(!isComplete)
      );
    } catch (error) {
      console.error("Error saving completion status to AsyncStorage:", error);
    }

    onToggleComplete(item.id, !isComplete);
  };

  return (
    <SwipeAction onDelete={onDelete}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.itemsContainer}>
            <View style={styles.header}>
              <TaskTagIcon
                item={item}
                setSelectedTag={setSelectedTag}
                isComplete={isComplete}
                setIsTagPickerVisible={setIsTagPickerVisible}
              />
              <TaskCompleteButton
                isComplete={isComplete}
                onPress={() => handleToggleComplete(item.id)}
                style={styles.completeButton}
                testID="completeButton"
              />
            </View>

            <TaskTitle task={task} isComplete={isComplete} item={item.id} />
            <TaskNote note={note} isComplete={isComplete} />
            <TaskUrl url={url} isComplete={isComplete} />

            <View style={styles.dateTimeContainer}>
              <TaskDate selectedDate={selectedDate} isComplete={isComplete} />

              <TaskTime
                selectedTime={selectedTime}
                selectedEndTime={selectedEndTime}
                isComplete={isComplete}
              />
            </View>
            <TaskImage
              selectedImage={selectedImage}
              isComplete={isComplete}
              onImagePress={onImagePress}
            />
          </View>
        </View>
      </View>
    </SwipeAction>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  item: {
    margin: 10,
    paddingLeft:8,
    paddingBottom:40,
    padding: 30,
    flexDirection: "column",
    backgroundColor: "#435334",
    borderRadius: 30,
  },
  header:{
  alignItems:"flex-end",
  },
  itemLeft: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 22,
  },
  itemsContainer: {
    width: "100%",
  },

  dateTimeContainer: {
    flexDirection: "row",
    color: "#404040",
  },

  completedTaskTitle: {
    color: "lightgray",
  },
  completedTask: {
    color: "lightgray",
  },
  completeButton: {
    marginRight: 15,
    opacity: 0.8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
