import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Splash / Initial Screen */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      {/* Login */}
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "",
        }}
      />

      {/* Sign Up */}
      <Stack.Screen
        name="sign"
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "",
        }}
      />

      {/* Forgot Password */}
      <Stack.Screen
        name="forget"
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "",
        }}
      />

      {/* Home */}
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />

      {/* appointments */}
      <Stack.Screen
        name="appointments"
        options={{
          headerShown: true,
          headerTitle: "Book Appointments",
          headerTitleAlign: "center",
        }}
      />

      {/* Notifications */}
      <Stack.Screen
        name="notifications"
        options={{
          headerShown: true,
          headerTitle: "Notifications",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitle: "Profile",
          headerTitleAlign: "center",
        }}
      />

      {/* Doctor Categories */}
      <Stack.Screen
        name="DoctorCategories"
        options={{
          headerShown: true,
          headerTitle: "Doctor Categories",
          headerTitleAlign : "center",
          headerSearchBarOptions : {
            headerIconColor: "#000",
          }, 
        }}
      />

      
    </Stack>
  );
}
