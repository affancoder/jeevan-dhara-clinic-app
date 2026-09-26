import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";

import logo from "../../assets/images/logo.jpeg";
import banner1 from "../../assets/images/banner1.webp";
import banner2 from "../../assets/images/banner2.webp";
import banner3 from "../../assets/images/banner3.webp";
import banner4 from "../../assets/images/banner4.webp";
import doctor1 from "../../assets/images/doctor1.webp";

const Home = () => {

  
  const router = useRouter();

  const { width } = useWindowDimensions();

  /* ================================
     BANNER
  ================================= */

  const bannerWidth = width - 32;
  const bannerHeight = 180;

  const banners = [banner1, banner2, banner3, banner4];

  const [currentBanner, setCurrentBanner] = useState(0);

  const bannerScrollRef = useRef<ScrollView>(null);

  /* ================================
     AUTOMATIC BANNER SLIDER
  ================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      const nextBanner =
        currentBanner === banners.length - 1 ? 0 : currentBanner + 1;

      setCurrentBanner(nextBanner);

      bannerScrollRef.current?.scrollTo({
        x: nextBanner * bannerWidth,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentBanner, bannerWidth]);

  /* ================================
     MANUAL BANNER SWIPE
  ================================= */

  const handleBannerScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const index = Math.round(offsetX / bannerWidth);

    if (index >= 0 && index < banners.length && index !== currentBanner) {
      setCurrentBanner(index);
    }
  };

  return (
    <View style={styles.container}>
      {/* ===== SCROLLABLE HOME CONTENT ==== */}

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ==== HEADER ==== */}

        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <View>
            
            <Text style={styles.clinicName}>Jeevan Dhara Clinic</Text>

            <Text style={styles.welcomeText}>Your Health Our Care</Text>
          </View>

          <Pressable
            style={styles.notificationButton}
            onPress={() => console.log("Notifications")}
          >
            <Ionicons name="notifications-outline" size={25} color="#333" />
          </Pressable>
        </View>

        {/* === SEARCH == */}

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={21} color="#173388" />

          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialists..."
            placeholderTextColor="#999"
            returnKeyType="search"
          />
        </View>

        {/* ===== SINGLE BANNER CARD === */}

        <View
          style={[
            styles.bannerCard,
            {
              width: bannerWidth,
              height: bannerHeight,
            },
          ]}
        >
          <ScrollView
            ref={bannerScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onMomentumScrollEnd={handleBannerScroll}
          >
            {banners.map((banner, index) => (
              <Image
                key={index}
                source={banner}
                style={{
                  width: bannerWidth,
                  height: bannerHeight,
                }}
              />
            ))}
          </ScrollView>
        </View>

        {/* ===
            BANNER DOTS ==== */}

        <View style={styles.dotsContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentBanner === index && styles.activeDot]}
            />
          ))}
        </View>

        {/* ==== DOCTOR CATEGORIES === */}

        <View style={styles.categoryGrid}>
          {/* Cardiology */}

          <Pressable
            style={styles.categoryItem}
            onPress={() => router.push("/DoctorCategories")}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="heart" size={25} color="#E53935" />
            </View>

            <Text style={styles.categoryText}>Cardiology</Text>
          </Pressable>

          {/* Dermatology */}

          <Pressable
            style={styles.categoryItem}
            onPress={() => router.push("/DoctorCategories")}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="triangle" size={25} color="#E68A00" />
            </View>

            <Text style={styles.categoryText}>Dermatology</Text>
          </Pressable>

          {/* Pediatrics */}

          <Pressable
            style={styles.categoryItem}
            onPress={() =>router.push("/DoctorCategories")}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="people" size={25} color="#087EA4" />
            </View>

            <Text style={styles.categoryText}>Pediatrics</Text>
          </Pressable>

          {/* Gynaecology */}

          <Pressable
            style={styles.categoryItem}
            onPress={() =>router.push("/DoctorCategories")}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="female" size={25} color="#D9A900" />
            </View>

            <Text style={styles.categoryText}>Gynaecology</Text>
          </Pressable>

          {/* Orthopedics */}

          <Pressable
            style={styles.categoryItem}
            onPress={() =>router.push("/DoctorCategories")}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="git-merge" size={25} color="#315DC7" />
            </View>

            <Text style={styles.categoryText}>Orthopedics</Text>
          </Pressable>

          {/* ENT */}

          <Pressable
            style={styles.categoryItem}
            onPress={() =>router.push("/DoctorCategories")}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="ear" size={25} color="#C82C8A" />
            </View>

            <Text style={styles.categoryText}>ENT</Text>
          </Pressable>

          {/* Neurology */}

          <Pressable
            style={styles.categoryItem}
            onPress={() =>router.push("/DoctorCategories")}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="hardware-chip" size={25} color="#15945A" />
            </View>

            <Text style={styles.categoryText}>Neurology</Text>
          </Pressable>

          {/* General Physician */}

          <Pressable
            style={styles.categoryItem}
            onPress={() =>router.push("/DoctorCategories")}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="medkit" size={25} color="#1464D2" />
            </View>

            <Text style={styles.categoryText}>General{"\n"}Physician</Text>
          </Pressable>
        </View>

        {/* ====== UPCOMING APPOINTMENTS ==== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>

          <Pressable onPress={() => router.push("/MyAppointments")}>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        {/* Appointment Card */}

        <Pressable
          style={styles.appointmentCard}
          onPress={() =>router.push("/DoctorCategories")}
        >
          <Image source={doctor1} style={styles.doctorImage} />

          <View style={styles.appointmentInfo}>
            <Text style={styles.doctorName}>Dr. Priya Sharma</Text>

            <Text style={styles.specialist}>Cardiologist</Text>

            <View style={styles.timeRow}>
              <Ionicons name="calendar-outline" size={14} color="#666" />

              <Text style={styles.timeText}>12 Sep 2026, 10:00 AM</Text>
            </View>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Upcoming</Text>
          </View>
        </Pressable>

        {/* Extra bottom space so content
            doesn't hide behind navigation */}

        <View style={styles.bottomContentSpace} />
      </ScrollView>

      {/* === FIXED BOTTOM NAVIGATION ======= */}

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => router.push("/home")}>
          <Ionicons name="home" size={23} color="#173388" />

          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.push("/MyAppointments")}
        >
          <Ionicons name="calendar-outline" size={23} color="#777" />

          <Text style={styles.navText}>Appointments</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons name="notifications-outline" size={23} color="#777" />

          <Text style={styles.navText}>Notifications</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person-outline" size={23} color="#777" />

          <Text style={styles.navText}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;

/* === STYLES ===== */

const styles = StyleSheet.create({
  /* ===  MAIN CONTAINER ==== */

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    flex: 1,
  },

  /* === HEADER ==== */

  logo: {
    width: 55,
    height: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  clinicName: {
    fontSize: 21,
    fontWeight: "600",
    color: "#0D309A",
    marginRight: 50,
  },

  welcomeText: {
    fontSize: 13,
    color: "#173388",
    marginTop: 2,
  },

  notificationButton: {
    width: 40,
    height: 40,

    justifyContent: "center",
    alignItems: "center",
  },

  /* ================================
     SEARCH
  ================================= */

  searchBox: {
    height: 50,

    marginHorizontal: 16,
    marginTop: 20,

    paddingHorizontal: 14,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 12,

    backgroundColor: "#FFFFFF",
  },

  searchInput: {
    flex: 1,

    marginLeft: 8,

    fontSize: 14,
    color: "#222",
  },

  /* ================================
     BANNER
  ================================= */

  bannerCard: {
    marginHorizontal: 16,
    marginTop: 20,

    borderRadius: 14,
    overflow: "hidden",

    backgroundColor: "#F5F5F5",
  },

  /* ================================
     BANNER DOTS
  ================================= */

  dotsContainer: {
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 8,
  },

  dot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    marginHorizontal: 4,

    backgroundColor: "#D3D3D3",
  },

  activeDot: {
    width: 18,

    backgroundColor: "#1186A3",
  },

  /* ================================
     DOCTOR CATEGORIES
  ================================= */

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",

    paddingHorizontal: 16,

    marginTop: 12,

    paddingBottom: 4,
  },

  categoryItem: {
    width: "25%",

    alignItems: "center",

    marginBottom: 18,
  },

  categoryIcon: {
    width: 58,
    height: 58,

    borderRadius: 29,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#E9EEF0",
  },

  categoryText: {
    marginTop: 6,

    fontSize: 12,

    color: "#222",

    textAlign: "center",
  },

  /* ================================
     UPCOMING APPOINTMENTS
  ================================= */

  sectionHeader: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 16,

    marginTop: 4,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: "600",

    color: "#000",
  },

  viewAll: {
    fontSize: 14,

    fontWeight: "600",

    color: "#1a7ca3",
  },

  appointmentCard: {
    flexDirection: "row",

    alignItems: "center",

    marginHorizontal: 16,

    padding: 12,

    borderRadius: 14,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E8E8E8",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.04,

    shadowRadius: 4,

    elevation: 1,
  },

  doctorImage: {
    width: 48,
    height: 48,

    borderRadius: 10,
  },

  appointmentInfo: {
    flex: 1,

    marginLeft: 12,
  },

  doctorName: {
    fontSize: 15,

    fontWeight: "600",

    color: "#222",
  },

  specialist: {
    fontSize: 12,

    color: "#666",

    marginTop: 2,
  },

  timeRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 6,
  },

  timeText: {
    fontSize: 11,

    color: "#666",

    marginLeft: 4,
  },

  statusBadge: {
    backgroundColor: "#DDF7E5",

    paddingHorizontal: 9,
    paddingVertical: 5,

    borderRadius: 12,

    alignSelf: "flex-start",
  },

  statusText: {
    fontSize: 10,

    fontWeight: "600",

    color: "#009355",
  },

  bottomContentSpace: {
    height: 30,
  },

  /* ================================
     FIXED BOTTOM NAVIGATION
  ================================= */

  bottomNav: {
    height: 70,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-around",

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",

    paddingBottom: 5,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: -2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 5,

    elevation: 10,
  },

  navItem: {
    flex: 1,

    height: "100%",

    alignItems: "center",

    justifyContent: "center",
  },

  navText: {
    marginTop: 4,

    fontSize: 10,

    color: "#777",

    fontWeight: "500",
  },

  activeNavText: {
    color: "#173388",

    fontWeight: "600",
  },
});
