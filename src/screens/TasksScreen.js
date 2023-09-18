import "react-native-gesture-handler";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";

import { BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import { Divider } from "react-native-elements";
import React, { useRef, useState, useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";


import { handleToggleComplete,handleAddTask,handleDeleteTask,retrieveTask} from "../utilities/LogicFunctions";
import { PushNotification } from "../utilities/Notification"
import { getDefaultCalendarId } from "../utilities/CalendarHelpers"

import CustomGreeting from "../components/TaskScreenFeatures/CustomGreeting";
import TaskDetails from "../components/TaskDetail/TaskDetails";
import AddDate from "../components/TaskScreenFeatures/AddDate";
import AddImage from "../components/TaskScreenFeatures/AddImage";
import ImagePreview from "../components/TaskScreenFeatures/ImagePreview";
import SetTime from "../components/TaskScreenFeatures/SetTime";
import SetEndTime from "../components/TaskScreenFeatures/SetEndTime";
import SignOut from "../components/TaskScreenFeatures/SignOut";

const TasksScreen = ({ route }) => {

  const [task, setTask] = useState("");
  const [note, setNote] = useState("");
  const [url, setUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const [taskItems, setTaskItems] = useState([]);
  const [urlTaskItems, setUrlTaskItems] = useState([]);
  const [noteTaskItems, setNoteTaskItems] = useState([]);
  const [timeTaskItems, setTimeTaskItems] = useState([]);
  const [endTimeTaskItems, setEndTimeTaskItems] = useState([]);
  const [dateTaskItems, setDateTaskItems] = useState([]);
  const [imageTaskItems, setImageTaskItems] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["80%"];

  useEffect(() => {
    const requestPermission = async () => {
      await PushNotification();
    };
    const getDefaultCalendar = async () => {
      await getDefaultCalendarId();
    };

    requestPermission();
    getDefaultCalendar();
  }, []);

  useEffect(() => {
    retrieveTask({ setTaskItems });
  }, []);

  useEffect(() => {
    if (
      route.params?.openBottomSheetModal &&
      route.params.title &&
      route.params.resourceId
    ) {
      const videoId = route.params.resourceId.videoId;
      const url = `https://www.youtube.com/watch?v=${videoId}`;

      openBottomSheetModal(
        setTask(""),
        setNote(route.params.title),
        setUrl(url),
        setSelectedImage("")
      );
    }
  }, [route.params]);

  const openBottomSheetModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setSelectedDate(new Date().toISOString().split("T")[0]);
    setSelectedTime(new Date());
    setSelectedEndTime(new Date());
    bottomSheetModalRef.current.present();
    console.log("bottomSheetModalRef.current: ", bottomSheetModalRef.current);
    setIsOpen(true);
  };

  const handleAddTaskPressed = () => {
    handleAddTask(
      taskItems,
      setTaskItems,
      noteTaskItems,
      urlTaskItems,
      dateTaskItems,
      timeTaskItems,
      endTimeTaskItems,
      imageTaskItems,

      setNoteTaskItems,
      setUrlTaskItems,
      setDateTaskItems,
      setTimeTaskItems,
      setEndTimeTaskItems,
      setImageTaskItems,
      setCompletedTasks,

      setTask,
      setNote,
      setUrl,

      setSelectedImage,
      setSelectedDate,
      setSelectedTime,
      setSelectedEndTime,

      task,
      note,
      url,
      selectedDate,
      selectedTime,
      selectedEndTime,
      selectedImage,
      completedTasks,
      setIsOpen,
      bottomSheetModalRef,
      db,
      auth
    );
  };

  const handleToggleCompletePressed = async (index) => {
    const documentId = taskItems[index].id;
    console.log("Document ID:", documentId);
    const newIsComplete = !taskItems[index].isComplete;

    await handleToggleComplete(
      documentId,
      setTaskItems,
      db,
      auth,
      newIsComplete
    );
    // const completedTasks = taskItems.filter((task) => task.isComplete);
  };

const handleSelectedDateChange = (date) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDate(date);
  };

  const handleSelectedTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSelectedEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };

  const handleSelectedImage = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const handleImagePress = (imageUrl) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedImage(imageUrl);
    setImagePreviewVisible(true);
  };

  const deleteTask = async (taskToDelete) => {
    console.log("Deleting task:", taskToDelete);
    handleDeleteTask(taskToDelete, db, auth, setTaskItems);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isOpen ? "gray" : "#F2F0E7" },
        ]}
      >
        <View style={styles.signOutIcon}>
          <SignOut />
        </View>

        <View
          style={[
            styles.headerContainer,
            { backgroundColor: isOpen ? "gray" : "#F2F0E7" },
          ]}
        >
          <CustomGreeting />
          <Text style={styles.sectionTitle}>Your Tasks</Text>
        </View>

        {/* Render the tasks */}
        <ScrollView style={styles.itemsContainer}>
          {taskItems?.map((item, index) => {
            return (
              <TaskDetails
                key={item.id}
                item={item}
                isComplete={item.isComplete}
                onToggleComplete={() => handleToggleCompletePressed(index)}
                onDelete={() =>
                  deleteTask({ id: item.id, eventId: item.eventId })
                }
                selectedDate={item.selectedDate}
                onSelectedDateChange={(date) =>
                  handleSelectedDateChange(date, item.id)
                }
                selectedTime={item.selectedTime}
                onSelectedTimeChange={(time) => handleSelectedTimeChange(time)}
                selectedEndTime={item.selectedEndTime}
                onSelectedEndTimeChange={(time) =>
                  handleSelectedEndTimeChange(time)
                }
                selectedImage={item.selectedImage}
                onImagePress={() => handleImagePress(item.selectedImage)}
              />
            );
          })}
        </ScrollView>

        <View style={styles.subContainer}>
          <TouchableOpacity
            testID="newTaskButton"
            style={styles.newTaskButton}
            onPress={openBottomSheetModal}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="add" size={40} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* BottomSheet modal */}
        <BottomSheetModalProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={{ backgroundColor: "#F2F0E7" }}
              onDismiss={() => {
                setIsOpen(false);
                setSelectedImage("");
                setTask("");
                setNote("");
                setUrl("");
              }}
            >
              <ScrollView>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalHeader}>Add New Task</Text>

                  <View style={styles.inputTasks}>
                    <TextInput
                      testID="Title"
                      style={styles.inputTitle}
                      placeholder="Title"
                      value={task}
                      onChangeText={(task) => setTask(task)}
                    ></TextInput>
                    <Divider style={{ backgroundColor: "#dfe6e9" }} />
                    <TextInput
                      testID="Notes"
                      style={styles.inputNotes}
                      placeholder="Notes"
                      value={note}
                      onChangeText={(note) => setNote(note)}
                    ></TextInput>
                    <Divider style={{ backgroundColor: "#dfe6e9" }} />
                    <TextInput
                      testID="URL"
                      style={styles.inputUrl}
                      placeholder="URL"
                      value={url}
                      onChangeText={(url) => setUrl(url)}
                    ></TextInput>
                    <AddImage
                      selectedImage={selectedImage}
                      onSelectedImage={handleSelectedImage}
                    />
                  </View>

                  <AddDate
                    selectedDate={selectedDate}
                    onSelectedDateChange={handleSelectedDateChange}
                  />
                  <SetTime
                    selectedTime={selectedTime}
                    onSelectedTimeChange={handleSelectedTimeChange}
                  />
                  <SetEndTime
                    selectedEndTime={selectedEndTime}
                    onSelectedEndTimeChange={handleSelectedEndTimeChange}
                  />
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={handleAddTaskPressed}
                  >
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </BottomSheetModal>
          </KeyboardAvoidingView>
        </BottomSheetModalProvider>
        <ImagePreview
          imageUrl={selectedImage}
          visible={imagePreviewVisible}
          onClose={() => setImagePreviewVisible(false)}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F0E7",
    paddingBottom: "30%",
  },
  signOutIcon: {
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
    right: 30,
  },
  headerContainer: {
    top: "2%",
    left: 30,
    backgroundColor: "#F2F0E7",
  },
  sectionTitle: {
    paddingTop: 8,
    fontSize: 36,
    color: "#3C6E00",
  },
  itemsContainer: {
    marginTop: "8%",
    paddingLeft: 10,
    paddingRight: 20,
    marginBottom: 60,
    zIndex:0
  },
  subContainer: {
    flexDirection:"row",
    justifyContent: "flex-end",
    transform: [{ translateY: 670 }],
    right:50,
    position:'absolute'
  },
  newTaskButton: {
    backgroundColor: "#D58258",
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  buttonText: {
    color: "black",
    fontSize: 14,
    top: 10,
    paddingRight: 10,
  },
  iconContainer: {
    paddingTop: 2,
    paddingLeft:2,
    alignItems: "center",
  },
  modalContainer: {
    padding: 10,
    paddingBottom: 100,
  },
  modalHeader: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    color: "black",
  },
  inputTasks: {
    padding: 10,
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  inputTitle: {
    width: "100%",
    height: 30,
    color: "black",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
  inputNotes: {
    width: "100%",
    height: 40,
    color: "black",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
  inputUrl: {
    width: "100%",
    height: 40,
    color: "black",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
  applyButton: {
    padding: 16,
    backgroundColor: "#D58258",
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
