import * as Calendar from "expo-calendar";

//function to ask for calendar permission
export const getDefaultCalendarId = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status === "granted") {
   
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const defaultCalendar = calendars.find(
      (cal) => cal.allowsModifications && cal.type === "local"
    );

    if (defaultCalendar) {
      return defaultCalendar.id;
    } else {
  
      const firstAvailableCalendar = calendars.find(
        (cal) => cal.allowsModifications
      );
      return firstAvailableCalendar ? firstAvailableCalendar.id : null;
    }
  } else {
  
    console.log("Calendar permission not granted.");
    return null;
  }
};

//function to save event in the calendar
export const saveTaskToCalendar = async (task) => {
  const calendarId = await getDefaultCalendarId();
  let eventId = null; 

  if (calendarId) {
    const startDate = new Date(task.selectedDate);
    startDate.setHours(task.selectedTime.getHours());
    startDate.setMinutes(task.selectedTime.getMinutes());
    startDate.setSeconds(0);

    const endDate = new Date(task.selectedDate);
    endDate.setHours(task.selectedEndTime.getHours());
    endDate.setMinutes(task.selectedEndTime.getMinutes());
    endDate.setSeconds(0);

    const timeDifference = endDate.getTime() - startDate.getTime();
    console.log("timeDifference:", timeDifference);

    if (timeDifference < 0) {
      return null;
    } else {
      const eventDetails = {
        title: task.task,
        startDate: startDate.toISOString(), 
        endDate: endDate.toISOString(),
        notes: task.note, 
        url: task.url,
        image: task.selectedImage,
      };

      try {
        eventId = await Calendar.createEventAsync(calendarId, eventDetails);
        console.log("Event created with ID:", eventId);

        task.eventId = eventId;
      } catch (error) {
        console.error("Error creating event:", error);
      }

      return eventId;
    }
  }
};

//function to delete event in the calendar
export const deleteEventAsync = async (eventId) => {
  try {
    if (eventId) {
      await Calendar.deleteEventAsync(eventId);
      console.log("Event deleted from calendar successfully.");
    } else {
      console.warn("No eventId provided. Skipping calendar deletion.");
    }
  } catch (error) {
    console.error("Error deleting event from calendar:", error);
  }
};
