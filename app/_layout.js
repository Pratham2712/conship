import { Stack } from "expo-router/stack";
import { Provider } from "react-redux";
import { store } from "./(redux)/store";
import { Text, View } from "react-native";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <View
                style={{
                  backgroundColor: "#fff",
                  marginTop: 60,
                  paddingBottom: 16,
                  marginLeft: 30,
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 35,
                    fontWeight: "bold",
                    borderBottomWidth: 0, // No border bottom
                  }}
                >
                  OptiPack3D
                </Text>
              </View>
            ),
            headerShown: true,
            title: "OptiPack3D",
            // headerStyle: {
            //   backgroundColor: "#fff",
            //   marginTop: 34,
            //   borderBottomWidth: 0,
            // },
            // headerTitleStyle: {
            //   color: "#333",
            //   fontSize: 30,
            //   fontWeight: "bold",
            // },
          }}
        />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="order/index" options={{ headerShown: true }} />
        <Stack.Screen
          name="order/more/[moreDetails]"
          options={{
            headerShown: true,
            title: "Load Details",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="order/[orderId]"
          options={{
            headerShown: true,
            title: "Order Details",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,
            },
          }}
        />
      </Stack>
    </Provider>
  );
}
