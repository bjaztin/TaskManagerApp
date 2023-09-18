import { Alert } from "react-native";
import { PushNotification, scheduleNotification } from "../../src/utilities/Notification"; 
import * as Notifications from "expo-notifications";

jest.mock("expo-notifications", () => ({
  requestPermissionsAsync: jest.fn().mockResolvedValue({ status: "granted" }),
  scheduleNotificationAsync: jest.fn().mockResolvedValue(),
}));

describe("Notifications Compoenent", () => {
  test("Grant notification permission", async () => {
    const result = await PushNotification();
    expect(result).toBeNull();
  });
});

describe("Schedule Notification", () => {
  test("When the selected time is valid, trigger the notification", async () => {
    const selectedStartTime = new Date();
    const task = "This is the task";

    const result = await scheduleNotification(selectedStartTime, task);
    expect(result).toBeUndefined();
  });

  test("When the selected time is invaild to tigger the notification, show an alert", async () => {
    jest
      .spyOn(Notifications, "scheduleNotificationAsync")
      .mockImplementation(() =>
        Promise.reject(new Error("Failed to schedule"))
      );

    const selectedStartTime = new Date();
    
    const task = "This is the task";

    const alert = jest.spyOn(Alert, "alert");

    await scheduleNotification(selectedStartTime, task);

    expect(alert).toHaveBeenCalledWith(
      "Task has been added",
      "To schedule the notification, select a later time"
    );
  });
});
