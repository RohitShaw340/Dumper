import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "./src/Screens/Login";
import Admin_Login from "./src/Screens/Admin_Login";
import Dashboard from "./src/Screens/Admin/Dashboard";
import { useState } from "react";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";

import tw from "twrnc";
import { ToastProvider } from "react-native-toast-notifications";
import Map from "./src/Screens/Map";
import ShovelDashboard from "./src/Screens/Shovel/ShovelDashboard";
import DumperDashboard from "./src/Screens/Dumper/DumperDashboard";

import Worker from "./src/Screens/Admin/Worker";
import Vehicle from "./src/Screens/Admin/Vehicle";
import Logout from "./src/Screens/Logout";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState(null);

  const signout = () => {
    setUser(null);
  };

  if (user?.type == "Admin") {
    return (
      <ToastProvider offsetBottom={130} successColor="green">
        <SafeAreaView>
          <NavigationContainer>
            <View style={tw`w-full h-full flex flex-col`}>
              <Tab.Navigator
                backBehavior={"history"}
                screenOptions={{
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                  tabBarLabelStyle: { fontSize: 15, paddingBottom: 6 },
                  tabBarStyle: {
                    height: 70,
                    position: "fixed",
                    bottom: 0,
                  },
                }}
                initialRouteName="Dashboard"
              >
                <Tab.Screen
                  name="Dashboard"
                  // component={Dashboard}
                  options={{
                    headerRight: () => <Logout logout={signout} />,
                    tabBarLabel: "Dashboard",
                    tabBarIcon: ({ focused }) => {
                      return (
                        <Ionicons
                          name={focused ? "home" : "home-outline"}
                          size={30}
                          color={focused ? "tomato" : "gray"}
                        />
                      );
                    },
                  }}
                >
                  {(props) => (
                    <Dashboard {...props} userDetails={user} logout={signout} />
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Workers"
                  component={Worker}
                  options={{
                    tabBarLabel: "workers",
                    tabBarIcon: ({ focused }) => {
                      return (
                        <MaterialIcons
                          name="engineering"
                          size={30}
                          color={focused ? "tomato" : "gray"}
                        />
                      );
                    },
                  }}
                />
                <Tab.Screen
                  name="Vehicle"
                  component={Vehicle}
                  options={{
                    tabBarLabel: "Vehicle",
                    tabBarIcon: ({ focused }) => {
                      return (
                        <MaterialCommunityIcons
                          name="dump-truck"
                          size={30}
                          color={focused ? "tomato" : "gray"}
                        />
                      );
                    },
                  }}
                />

                <Tab.Screen
                  name="Map"
                  component={Map}
                  options={{
                    tabBarLabel: "Map",
                    tabBarIcon: ({ focused }) => {
                      return (
                        <Ionicons
                          name={focused ? "map" : "map-outline"}
                          size={30}
                          color={focused ? "tomato" : "gray"}
                        />
                      );
                    },
                  }}
                >
                  {/* {(props) => <Map {...props} vehicle={user?.vehicle} />} */}
                </Tab.Screen>
              </Tab.Navigator>
            </View>
          </NavigationContainer>
          <StatusBar style="light" backgroundColor="rgba(0, 0, 0, 0.6)" />
        </SafeAreaView>
      </ToastProvider>
    );
  } else if (user?.type == "Shovel" || user?.type == "Dumper") {
    console.log(user);
    return (
      <ToastProvider>
        <SafeAreaView>
          <NavigationContainer>
            <View style={tw`w-full h-full flex flex-col`}>
              {/* <View style={tw`h-90%`}> */}
              <Tab.Navigator
                screenOptions={{
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                  tabBarLabelStyle: { fontSize: 15, paddingBottom: 6 },
                  tabBarStyle: {
                    height: 70,
                    position: "fixed",
                    bottom: 0,
                  },
                }}
                initialRouteName="Dashboard"
              >
                <Tab.Screen
                  name="Dashboard"
                  // component={ShovelDashboard}
                  options={{
                    headerRight: () => <Logout logout={signout} />,
                    tabBarLabel: "Dashboard",
                    tabBarIcon: ({ focused }) => {
                      return (
                        <Ionicons
                          name={focused ? "home" : "home-outline"}
                          size={30}
                          color={focused ? "tomato" : "gray"}
                        />
                      );
                    },
                  }}
                >
                  {user?.type == "Shovel"
                    ? (props) => (
                        <ShovelDashboard
                          {...props}
                          userDetails={user}
                          logout={signout}
                        />
                      )
                    : (props) => (
                        <DumperDashboard
                          {...props}
                          userDetails={user}
                          logout={signout}
                        />
                      )}
                </Tab.Screen>
                <Tab.Screen
                  name="Map"
                  component={Map}
                  options={{
                    tabBarLabel: "Map",
                    tabBarIcon: ({ focused }) => {
                      return (
                        <Ionicons
                          name={focused ? "map" : "map-outline"}
                          size={30}
                          color={focused ? "tomato" : "gray"}
                        />
                      );
                    },
                  }}
                >
                  {/* {(props) => <Map {...props} vehicle={user?.vehicle} />} */}
                </Tab.Screen>
              </Tab.Navigator>
            </View>
          </NavigationContainer>
          <StatusBar style="light" backgroundColor="rgba(0, 0, 0, 0.6)" />
        </SafeAreaView>
      </ToastProvider>
    );
  }
  console.log("null");
  return (
    <ToastProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login">
              {(props) => <Login {...props} user={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Admin_Login">
              {(props) => <Admin_Login {...props} user={setUser} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" backgroundColor="rgba(0, 0, 0, 0.6)" />
      </SafeAreaView>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  but2: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    color: "white",
    width: 70,
    height: 30,
    margin: 10,
    backgroundColor: "#4D59F5",
  },
});
