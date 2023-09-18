import {
  getDefaultCalendarId,
  saveTaskToCalendar,
  deleteEventAsync,
} from "../../src/utilities/CalendarHelpers";
import * as Calendar from "expo-calendar";

jest.mock("expo-calendar", () => ({
  requestCalendarPermissionsAsync: jest.fn(),
  getCalendarsAsync: jest.fn(),
  createEventAsync: jest.fn(),
  deleteEventAsync: jest.fn(),
  EntityTypes: {
    EVENT: "event",
  },
}));

describe("CalendarHelpers component", () => {
  test("Render calendar ID when permission is granted ", async () => {
    Calendar.requestCalendarPermissionsAsync.mockResolvedValueOnce({
      status: "granted",
    });

    Calendar.getCalendarsAsync.mockResolvedValueOnce([
      { id: "calendar 1", allowsModifications: true, type: "local" },
    ]);

    const result = await getDefaultCalendarId();

    expect(result).toEqual("calendar 1");
  });
  test("Create an event Id and save the event in the calendar", async () => {
    const eventDetails = {
      selectedDate: new Date(),
      selectedTime: new Date(),
      selectedEndTime: new Date(),
      task: "This is task",
      note: "This is note",
      url: "This is Url",
      selectedPhoto: "This is photo",
    };

    Calendar.requestCalendarPermissionsAsync.mockResolvedValueOnce({
      status: "granted",
    });
    Calendar.getCalendarsAsync.mockResolvedValueOnce([
      { id: "calendar 1", allowsModifications: true, type: "local" },
    ]);

    Calendar.createEventAsync.mockResolvedValueOnce("eventID");

    const eventId = await saveTaskToCalendar(eventDetails);
    expect(eventId).toEqual("eventID");
  });
  test("Delete event in the calendar", async () => {
    const eventDetails = {
      selectedDate: new Date(),
      selectedTime: new Date(),
      selectedEndTime: new Date(),
      task: "This is the task",
      note: "This is the note",
      url: "This is the Url",
      selectedPhoto: "This is the photo",
    };

    Calendar.requestCalendarPermissionsAsync.mockResolvedValueOnce({
      status: "granted",
    });
    Calendar.getCalendarsAsync.mockResolvedValueOnce([
      { id: "calendar 1", allowsModifications: true, type: "local" },
    ]);

    Calendar.deleteEventAsync.mockResolvedValueOnce(true);

    await deleteEventAsync(eventDetails);
  });
});
