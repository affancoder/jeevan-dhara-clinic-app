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
          headerShadowVisible: false,
        }}
      />

      {/* Sign Up */}
      <Stack.Screen
        name="sign"
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "",
          headerShadowVisible: false,
        }}
      />

      {/* Forgot Password */}
      <Stack.Screen
        name="forget"
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "",
          headerShadowVisible: false,
        }}
      />

      {/* Home */}
      <Stack.Screen
        name="home"
        options={{
          headerShown: true,
          headerBackVisible : false,
          headerShadowVisible: false,
          headerTitle:"",
        }}
      />

      {/* appointments */}
      <Stack.Screen
        name="MyAppointments"
        options={{
          headerShown: true,
          headerTitle: "Booked Appointments",
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
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerSearchBarOptions: {
            headerIconColor: "#000",
          },
        }}
      />
      {/* DoctorProfile */}
      <Stack.Screen
        name="DoctorProfile"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
