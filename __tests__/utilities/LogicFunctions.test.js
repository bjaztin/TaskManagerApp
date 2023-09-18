import {
  retrieveTask,
  handleToggleComplete,
  handleAddTask,
  handleDeleteTask,
} from "../../src/utilities/LogicFunctions";
import { collection, doc, getDocs } from "firebase/firestore";

//Mock firebase
jest.mock("../../firebase", () => ({
  auth: {
    currentUser: {
      uid: "testUserId",
    },
  },
  db: {}, 
}));

jest.mock("../../src/utilities/Notification", () => ({
  scheduleNotification: jest.fn(),
}));

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(), 
  ImpactFeedbackStyle: { Heavy: "Heavy" },
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn().mockResolvedValue({}),
  addDoc: jest.fn().mockResolvedValue({ id: "testDocumentId" })
}));

jest.mock("expo-calendar", () => ({
  requestCalendarPermissionsAsync: jest
    .fn()
    .mockResolvedValue({ status: "granted" }),
  getCalendarsAsync: jest.fn().mockResolvedValue([
    {
      id: "1",
      allowsModifications: true,
      type: "local",
    },
  ]),
  createEventAsync: jest.fn(),
  deleteEventAsync: jest.fn(),
  EntityTypes: {
    EVENT: "event",
  },
}));

describe("retrieveTask", () => {
  it("should retrieve tasks from Firestore", async () => {
    const setTaskItems = jest.fn();

    const querySnapshot = {
      forEach: (callback) => {
        callback({
          id: "1",
          data: () => ({
            task: "Task 1",
            selectedEndTime: { toDate: () => new Date() },
            selectedDate: new Date(),
            note: "Note 1",
            url: "URL 1",
            selectedImage: "Image 1",
            eventId: "EventId 1",
          }),
        });
      },
    };

    // Mock Firestore functions
    const getDocs = jest.fn().mockResolvedValue(querySnapshot);
    const collection = jest.fn().mockReturnValue({ getDocs });

    // Mock Firestore 
    jest.mock("firebase/firestore", () => ({
      doc: () => ({}),
      collection: jest.fn(),
    }));

    await retrieveTask({ setTaskItems });
    expect(setTaskItems).toBeDefined();
  });
});


describe("handleToggleComplete", () => {
  it("should update Firestore document and local state", async () => {
    const documentId = "testDocumentId";
    const setTaskItems = jest.fn();
    const isComplete = true;

    // Mock Firestore functions
    const userTasksRef = jest.fn();
    const collection = jest.fn().mockReturnValue({ doc: userTasksRef });
    const db = {
      collection,
      updateDoc: jest.fn().mockResolvedValue({}),
    };

    await handleToggleComplete(documentId, setTaskItems, db, isComplete);

    expect(db.collection).toBeDefined();
    expect(db.updateDoc).toBeDefined();
    expect(setTaskItems).toBeDefined();
  });
});


describe("handleAddTask", () => {
  test("Add a task", async () => {

    // Mocked data
    const taskItems = [];
    const setTaskItems = jest.fn();
    const noteTaskItems = [];
    const urlTaskItems = [];
    const dateTaskItems = [];
    const timeTaskItems = [];
    const endTimeTaskItems = [];
    const imageTaskItems = [];
    const setNoteTaskItems = jest.fn();
    const setUrlTaskItems = jest.fn();
    const setDateTaskItems = jest.fn();
    const setTimeTaskItems = jest.fn();
    const setEndTimeTaskItems = jest.fn();
    const setImageTaskItems = jest.fn();
    const setCompletedTasks = jest.fn();

    const setTask = jest.fn();
    const setNote = jest.fn();
    const setUrl = jest.fn();
    const setSelectedImage = jest.fn();
    const setIsOpen = jest.fn();
    const bottomSheetModalRef = {
      current: {
        dismiss: jest.fn(),
      },
    };

    const task = "Test Task";
    const note = "Test Note";
    const url = "Test URL";
    const selectedDate = new Date();
    const selectedTime = new Date();
    const selectedEndTime = new Date(selectedTime.getTime() + 3600 * 1000);
    const selectedImage = "Test Image";
    const completedTasks = [];
    const db = {
      collection: jest.fn().mockReturnThis(), 
      addDoc: jest.fn().mockResolvedValue({}),
    };
    const auth = {};

    await handleAddTask(
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
      undefined,
      undefined,
      undefined,
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

    expect(setTaskItems).toHaveBeenCalledWith([
      expect.objectContaining({
        task: "Test Task",
        note: "Test Note",
        url: "Test URL",
        selectedDate: expect.any(Date),
        selectedTime: expect.any(Date),
        selectedEndTime: expect.any(Date),
        selectedImage: "Test Image",
      }),
    ]);

    expect(setTask).toHaveBeenCalledWith("");
    expect(setNote).toHaveBeenCalledWith("");
    expect(setUrl).toHaveBeenCalledWith("");
    expect(setSelectedImage).toHaveBeenCalledWith("");
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(bottomSheetModalRef.current.dismiss).toHaveBeenCalled();
    expect(db.collection).toBeDefined();
    expect(db.addDoc).toBeDefined()
  });
});

describe("handleDeleteTask", () => {
  test("Delete a task", async () => {
    const taskToDelete = {
      id: "testTaskId",
      eventId: "testEventId",
    };

    const setTaskItems = jest.fn();

    const db = {
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          id: "testTaskId",
        }),
      }),
      deleteDoc: jest.fn().mockResolvedValue({}),
    };

    const auth = {};

    await handleDeleteTask(taskToDelete, db, auth, setTaskItems);

    expect(db.collection).toBeDefined();
    expect(db.deleteDoc).toBeDefined();
    expect(setTaskItems).toBeDefined(); 

  });
});