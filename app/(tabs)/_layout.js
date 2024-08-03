const { Tabs } = require("expo-router");
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#007BFF" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <AntDesign name="CodeSandbox" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-box" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
