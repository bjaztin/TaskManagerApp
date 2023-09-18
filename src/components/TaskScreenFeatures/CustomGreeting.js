import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

const CustomGreeting = () => {
  const [customGreeting, setCustomGreeting] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const time = new Date();
    const hour = time.getHours();

    if (hour < 12) {
      setCustomGreeting("Good Morning");
    } else if (hour < 18) {
      setCustomGreeting("Good Afternoon");
    } else {
      setCustomGreeting("Good Evening");
    }
  }, []);


// To fetch the username of a logged-in user
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const userRef = doc(db, "users", userId);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUsername(userData.name);
          } else {
            console.log("User document not found.");
          }
        }
      } catch (error) {
        console.error("Error fetching username: ", error);
      }
    };

    fetchUsername();
  }, []);

    return (
      <View>
        <Text style={styles.textStyle}>
          {customGreeting}, {username}!
        </Text>
    
      </View>
    );

  };

export default CustomGreeting;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    color: "gray",
  },
});
