import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import icon from "../assets/icon-image.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router/build/hooks";
import { useDispatch } from "react-redux";
import { checkUserLoginThunk } from "./(redux)/authSlice";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          dispatch(checkUserLoginThunk({ token: token }));
          router.push("(tabs)");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.icon} source={icon} />
        <Text style={styles.welcomeText}>Welcome</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.push("auth/register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D1117",
    height: "100%",
  },
  icon: {
    width: 350,
    height: 300,
    marginBottom: 20,
    marginTop: 0,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 50,
    color: "#fff",
  },
  buttonContainer: {
    width: "80%",
    backgroundColor: "#007BFF",
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 15,
  },
});
