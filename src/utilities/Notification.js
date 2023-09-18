import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

export const PushNotification = async () => {
  const { status } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
  if (status === "granted") {
    console.log("Notification permissions granted");
  } else {
    console.log("Notification permissions denied");
  }
  return null;
};

export const scheduleNotification = async (selectedTime, task) => {
  const notificationTrigger = selectedTime;
  try {
    if (notificationTrigger >= 0) {
      // Schedule the notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: `${task}`,
          sound: "default",
        },
        trigger: {
          date: notificationTrigger,
        },
        shouldPlaySound: true,
      });
    }
  } catch (error) {
    console.error("Failed to schedule notification:", error);

    Alert.alert(
      "Task has been added",
      "To schedule the notification, select a later time"
    );
  }
};
