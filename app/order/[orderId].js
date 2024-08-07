import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useSelector } from "react-redux";
import load from "../../assets/load.png";

const orderId = () => {
  const { orderId } = useLocalSearchParams();
  const router = useRouter();

  const data = useSelector((state) => state.rootReducer.mainSlice.data.order);
  const order = data.find((ele) => ele._id === orderId);

  const handleBackPress = () => {
    router.back();
  };

  const handleMoreDetailsPress = () => {
    router.push({
      pathname: `order/more/${orderId}`,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{order?.ordername}</Text>
      <Image source={load} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Link href={`order/more/${orderId}`}>
            <Text style={styles.buttonText}>Back</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleMoreDetailsPress}
        >
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default orderId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
