import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router/build/exports";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUserLoginThunk } from "../(redux)/authSlice";

const profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.replace("auth/register");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const userName = useSelector(
    (state) => state.rootReducer.authSlice.data.userInfo.username
  );

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("token");
  //       if (token) {
  //         const data = { token: token };
  //         dispatch(checkUserLoginThunk(data));
  //       }
  //     } catch (error) {
  //       console.error("Error checking token:", error);
  //     }
  //   };

  //   checkToken();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>{userName}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D1117",
  },
  profileText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  logoutButton: {
    width: "80%",
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
