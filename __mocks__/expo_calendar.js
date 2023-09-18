import * as Calendar from "expo-calendar";

// jest.mock("expo-calendar", () => ({
//   requestCalendarPermissionsAsync: jest.fn(),
//   getCalendarsAsync: jest.fn(),
//   createEventAsync: jest.fn(),
//   deleteEventAsync: jest.fn(),
//   EntityTypes: {
//     EVENT: "event",
//   },
// }));

export const requestCalendarPermissionsAsync = jest.fn();
