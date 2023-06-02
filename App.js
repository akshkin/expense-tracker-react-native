import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import ManageExpenses from "./screens/ManageExpenses";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function RenderBottomTabs() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Recent Expenses" component={RecentExpenses} />
      <BottomTabs.Screen name="All Expenses" component={AllExpenses} />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Expenses Overview"
            component={RenderBottomTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Manage Expenses" component={ManageExpenses} />
          {/* <Stack.Screen name="All Expenses" component={AllExpenses} />
          <Stack.Screen name="Recent Expenses" component={RecentExpenses} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
