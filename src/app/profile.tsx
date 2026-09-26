import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Stack, router } from "expo-router";
import {
  UserRound,
  LockKeyhole,
  CalendarDays,
  Star,
  CircleHelp,
  LogOut,
  ChevronRight,
  Pencil,
} from "lucide-react-native";

const profileData = {
  name: "Suresh Kumar",
  phone: "+91 98765 43210",
  email: "suresh.kumar@gmail.com",

  // Backend-ready
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
};

const profileOptions = [
  {
    id: "personal",
    title: "Personal Information",
    icon: UserRound,
  },
  {
    id: "password",
    title: "Change Password",
    icon: LockKeyhole,
  },
  {
    id: "appointments",
    title: "My Appointments",
    icon: CalendarDays,
  },
  {
    id: "feedback",
    title: "My Feedback",
    icon: Star,
  },
  {
    id: "support",
    title: "Support & Help",
    icon: CircleHelp,
  },
];

export default function Profile() {
  const handleOptionPress = (id: string) => {
    /*
    |--------------------------------------------------------------------------
    | BACKEND / ROUTING READY
    |--------------------------------------------------------------------------
    | Later you can connect these to your actual pages:
    |
    | personal      -> /PersonalInformation
    | password      -> /ChangePassword
    | appointments  -> /MyAppointments
    | feedback      -> /Feedback
    | support       -> /Support
    |--------------------------------------------------------------------------
    */

    switch (id) {
      case "personal":
        // router.push("/PersonalInformation");
        break;

      case "password":
        // router.push("/ChangePassword");
        break;

      case "appointments":
        router.push("/MyAppointments");
        break;

      case "feedback":
        // router.push("/Feedback");
        break;

      case "support":
        // router.push("/Support");
        break;

      default:
        break;
    }
  };

  const handleLogout = () => {
    /*
    Later backend:
      await logoutUser();
      router.replace("/login");
    */

    // router.replace("/login");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "My Profile",
          headerTitleAlign: "center",
          headerTintColor: "#183B6B",
          headerShadowVisible: false,
          headerBackTitle: "",
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ----------------------------------------------------------------
            PROFILE IMAGE
        ---------------------------------------------------------------- */}

        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: profileData.profileImage,
              }}
              style={styles.avatar}
            />

            {/* Edit icon */}
            <Pressable
              style={styles.editButton}
              onPress={() => {
                /*
                Later:
                  open image picker
                  upload image to backend
                */
              }}
            >
              <Pencil
                size={10}
                color="#FFFFFF"
                strokeWidth={2.5}
              />
            </Pressable>
          </View>

          {/* Name */}
          <Text style={styles.name}>
            {profileData.name}
          </Text>

          {/* Phone */}
          <Text style={styles.phone}>
            {profileData.phone}
          </Text>

          {/* Email */}
          <Text style={styles.email}>
            {profileData.email}
          </Text>
        </View>

        {/* ----------------------------------------------------------------
            PROFILE OPTIONS
        ---------------------------------------------------------------- */}

        <View style={styles.optionsContainer}>
          {profileOptions.map((item) => {
            const Icon = item.icon;

            return (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.optionRow,
                  pressed && styles.optionPressed,
                ]}
                onPress={() =>
                  handleOptionPress(item.id)
                }
              >
                <View style={styles.optionIcon}>
                  <Icon
                    size={17}
                    color="#30445F"
                    strokeWidth={1.8}
                  />
                </View>

                <Text style={styles.optionText}>
                  {item.title}
                </Text>

                <ChevronRight
                  size={17}
                  color="#7F8A98"
                  strokeWidth={1.8}
                />
              </Pressable>
            );
          })}
        </View>

        {/* ----------------------------------------------------------------
            LOGOUT
        ---------------------------------------------------------------- */}

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutPressed,
          ]}
          onPress={handleLogout}
        >
          <LogOut
            size={18}
            color="#E53935"
            strokeWidth={1.9}
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  /*
  |--------------------------------------------------------------------------
  | MAIN
  |--------------------------------------------------------------------------
  */

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    paddingHorizontal: 12,
    paddingTop: 7,
    paddingBottom: 30,
  },

  /*
  |--------------------------------------------------------------------------
  | PROFILE
  |--------------------------------------------------------------------------
  */

  profileSection: {
    alignItems: "center",
    paddingTop: 1,
    paddingBottom: 9,
  },

  avatarWrapper: {
    width: 76,
    height: 76,
    position: "relative",
    marginBottom: 5,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#E9EEF2",
  },

  editButton: {
    position: "absolute",
    right: -1,
    bottom: 1,

    width: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: "#2563EB",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#172B4D",
    marginTop: 1,
  },

  phone: {
    fontSize: 15,
    color: "#697586",
    marginTop: 3,
  },

  email: {
    fontSize: 15,
    color: "#697586",
    marginTop: 2,
  },

  /*
  |--------------------------------------------------------------------------
  | OPTIONS
  |--------------------------------------------------------------------------
  */

  optionsContainer: {
    marginTop: 1,
  },

  optionRow: {
    height: 50,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E4E8EC",

    borderRadius: 9,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,

    marginBottom: 5,
  },

  optionPressed: {
    opacity: 0.65,
  },

  optionIcon: {
    width: 24,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  optionText: {
    flex: 1,

    fontSize: 15,
    fontWeight: "500",
    color: "#46566B",

    marginLeft: 1,
  },

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

  logoutButton: {
    height: 50,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,

    marginTop: 1,
  },

  logoutPressed: {
    opacity: 0.55,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E53935",

    marginLeft: 9,
  },
});