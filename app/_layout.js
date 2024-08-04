import { Stack } from "expo-router/stack";
import { Provider } from "react-redux";
import { store } from "./(redux)/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            title: "Conship ->",
            headerStyle: { backgroundColor: "#0D1117" },
            headerTitleStyle: {
              color: "#007BFF",
              fontSize: 30,
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
