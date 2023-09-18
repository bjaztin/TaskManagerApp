import * as Haptics from "expo-haptics";
import { Alert } from "react-native";
import PropTypes from "prop-types";
import { auth, db } from "../../firebase";
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  saveTaskToCalendar,
  deleteEventAsync,
} from "./CalendarHelpers";

import { scheduleNotification } from "../utilities/Notification"

//Function to retrieve task
export const retrieveTask = async ({ setTaskItems }) => {
  
  const userId = auth.currentUser?.uid;
  if (userId) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userTasksRef = collection(userDocRef, "userTasks");
      const querySnapshot = await getDocs(userTasksRef);

      const tasksData = [];

      querySnapshot.forEach((doc) => {
        const {
          task,
          selectedEndTime,
          selectedDate,
          note,
          url,
          selectedImage,
          eventId,
        } = doc.data();

        const parsedSelectedTime = selectedEndTime?.toDate() || null;
        const parsedSelectedEndTime = selectedEndTime?.toDate() || null;
        const taskData = {
          id: doc.id,
          task,
          selectedTime: parsedSelectedTime,
          selectedEndTime: parsedSelectedEndTime,
          selectedDate,
          note,
          url,
          selectedImage,
          eventId,
        };
        tasksData.push(taskData);
      });

      setTaskItems(tasksData);
    } catch (error) {
      console.error("Error fetching tasks from Firestore:", error);
    }
  }
};
retrieveTask.propTypes = {
  setTaskItems: PropTypes.func.isRequired,
};

//function handle toggling of complete button
export const handleToggleComplete = async (
  documentId,
  setTaskItems,
  db,
  isComplete
) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

  const userId = auth.currentUser?.uid;
  if (userId) {
    const userTasksRef = collection(db, "users", userId, "userTasks");

    console.log("updating Firestore document with ID:", documentId);
    // Delete the document from Firestore
    await updateDoc(doc(userTasksRef, documentId), {
      isComplete: true,
    });
    console.log("Document updating successfully");
    console.log("documentId:", documentId);
  }

  // Update the local state
  setTaskItems((prevTaskItems) => {
    return prevTaskItems.map((item) => {
      if (item.id === documentId) {
        return {
          ...item,
          isComplete: isComplete,
        };
      }
      return item;
    });
  });
};

//function to handle adding of task
export const handleAddTask = async (
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
  _setSelectedDate,
  _setSelectedTime,
  _setSelectedEndTime,

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
) => {

  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  const timeDifference = selectedEndTime.getTime() - selectedTime.getTime();
  console.log("timeDifference:", timeDifference);

  if (timeDifference < 0) {
    // Show an alert for an invalid time
    Alert.alert(
      "Invalid Selected End Time",
      "The start time must be before the end time"
    );
    return null;
  }else{
    const newTaskId = Math.random().toString();

    const newTask = {
      id: newTaskId,
      task: task || "",
      note: note || "",
      url: url || "",
      isComplete: false,
      selectedDate: selectedDate,
      selectedTime: selectedTime || "",
      selectedEndTime: selectedEndTime === null ? null : selectedEndTime,
      selectedImage: selectedImage || "",
      eventId: "",
    };
    const eventId = await saveTaskToCalendar(newTask);
    newTask.eventId = eventId;

    await scheduleNotification(selectedTime, task);
   
    setTaskItems([...taskItems, newTask]);
    setNoteTaskItems([...noteTaskItems, note]);
    setUrlTaskItems([...urlTaskItems, url]);
    setDateTaskItems([...dateTaskItems, selectedDate]);
    setTimeTaskItems([...timeTaskItems, selectedTime]);
    setEndTimeTaskItems([...endTimeTaskItems, selectedEndTime]);
    setImageTaskItems([...imageTaskItems, selectedImage]);
    setCompletedTasks([...completedTasks, false]);

    setTask("");
    setNote("");
    setUrl("");
    setSelectedImage("");
    setIsOpen(false); 
    bottomSheetModalRef.current?.dismiss(); // Close the modal

    const userId = auth.currentUser?.uid;
    console.log("User ID", userId);

    const userTaskRef = await addDoc(
      collection(db, "users", userId, "userTasks"),
      {
        task: task,
        note: note,
        url: url,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        selectedEndTime: selectedEndTime,
        selectedImage: selectedImage,
        isComplete: false,
        eventId: eventId,
      }
    );
      // Updating the newTask with the Firestore document ID
      newTask.id = userTaskRef.id;
      console.log("Updated newTask:", newTask);
    }
  }

  //Function to handle deleting of task 
export const handleDeleteTask = async (
  taskToDelete,
  db,
  auth,
  setTaskItems
) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

  try {
    const userId = auth.currentUser?.uid;

    if (userId) {
      const userTasksRef = collection(db, "users", userId, "userTasks");

      console.log("Deleting Firestore document with ID:", taskToDelete.id);
      
      // Delete the document from Firestore
      await deleteDoc(doc(userTasksRef, taskToDelete.id));
      console.log("Document deleted successfully");

      // Updating the local state by filtering out the deleted task
      setTaskItems((prevTaskItems) =>
        prevTaskItems.filter((task) => task.id !== taskToDelete.id)
      );

      console.log("Deleting calendar event with ID:", taskToDelete.eventId);
      
      //Deleting the event in the calendar
      if (taskToDelete.eventId) {
        await deleteEventAsync(taskToDelete.eventId);
        console.log("Event deleted from calendar successfully");
      } else {
        console.warn(
          "Task does not have an associated eventId. Skipping calendar deletion."
        );
      }
    }
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};


