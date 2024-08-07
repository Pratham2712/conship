import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk } from "../(redux)/mainSlice";
import { Link } from "expo-router";

const tabHome = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.rootReducer.mainSlice.data.order);
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Load plans assigned to you today!</Text>
      <View style={styles.ordersContainer}>
        {orders?.map((ele) => (
          <Link
            key={ele?._id}
            href={`order/${ele?._id}`}
            style={styles.orderItem}
          >
            <Text style={styles.orderText}>{ele?.ordername}</Text>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default tabHome;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  ordersContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  orderItem: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  orderText: {
    fontSize: 18,
    color: "#333",
  },
});
