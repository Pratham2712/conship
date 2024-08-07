import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import loadImg from "../../../assets/load.png";

const moreDetails = () => {
  const { moreDetails } = useLocalSearchParams();

  const data = useSelector((state) => state.rootReducer.mainSlice.data.order);
  const order = data.find((ele) => ele._id === moreDetails);

  // const [currentIndex, setCurrentIndex] = useState(0); // Track current index

  //const carouselRef = useRef(null); // Ref for programmatically controlling carousel

  const handleNextPress = () => {
    carouselRef.current?.snapToNext(); // Use ref to safely navigate to next
  };

  const handlePrevPress = () => {
    carouselRef.current?.snapToPrev(); // Use ref to safely navigate to previous
  };

  return (
    <View style={styles.container}>
      <Text>{order?.ordername}</Text>
      {/* {order?.load?.length > 1 && ( // Only render carousel if multiple loads
        <Carousel
          ref={carouselRef} // Assign ref for control
          data={order?.load?.map(
            (
              ele // Map images to Carousel data
            ) => (
              <View key={ele?._id} style={styles.carouselItem}>
                <Image source={loadImg} style={styles.image} />
                <Text>{ele?.loadname}</Text>
                <Text>{ele?.volume}</Text>
              </View>
            )
          )}
          sliderWidth={300} // Adjust slider width as needed
          renderItem={({ item }) => item} // Efficient rendering
          onSnapToItem={(index) => setCurrentIndex(index)} // Update current index
        />
      )}
      {order?.load?.length > 1 && ( // Conditionally render prev/next buttons
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePrevPress} style={styles.button}>
            <Text>Prev</Text>
          </TouchableOpacity>
          <Text style={styles.pageIndicator}>
            {currentIndex + 1}/{order?.load?.length}
          </Text>
          <TouchableOpacity onPress={handleNextPress} style={styles.button}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};

export default moreDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  carouselItem: {
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  pageIndicator: {
    fontSize: 16,
  },
});
