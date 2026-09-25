import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Heart,
  UserRound,
  Clock3,
  Wallet,
  Languages,
  Star,
  MapPin,
} from "lucide-react-native";

const doctors = [
  {
    id: "1",
    name: "Dr. Rajesh Mehta",
    specialty: "Cardiologist",
    experience: "15 Years",
    rating: "4.8",
    reviews: "330 reviews",
    consultationFee: "₹600",
    languages: "English, Hindi",
    available: true,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    about:
      "Dr. Rajesh Mehta is a highly experienced cardiologist with over 15 years of experience in diagnosing and treating heart-related conditions. He is dedicated to providing compassionate and personalized care.",
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    experience: "12 Years",
    rating: "4.6",
    reviews: "210 reviews",
    consultationFee: "₹600",
    languages: "English, Hindi",
    available: true,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    about:
      "Dr. Priya Sharma is a highly experienced cardiologist with over 12 years of experience in diagnosing and treating cardiovascular conditions. She is dedicated to providing compassionate and personalized care.",
  },
  {
    id: "3",
    name: "Dr. Amit Verma",
    specialty: "Interventional Cardiologist",
    experience: "19 Years",
    rating: "4.7",
    reviews: "190 reviews",
    consultationFee: "₹700",
    languages: "English, Hindi",
    available: true,
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    about:
      "Dr. Amit Verma is an experienced interventional cardiologist specializing in advanced cardiovascular procedures and patient-focused cardiac care.",
  },
  {
    id: "4",
    name: "Dr. Neha Kapoor",
    specialty: "Pediatric Cardiologist",
    experience: "10 Years",
    rating: "4.8",
    reviews: "120 reviews",
    consultationFee: "₹600",
    languages: "English, Hindi",
    available: false,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    about:
      "Dr. Neha Kapoor specializes in pediatric cardiology and provides comprehensive cardiac care for children and young patients.",
  },
];

export default function DoctorProfile() {
  const { doctorId } = useLocalSearchParams();

  const doctor = doctors.find(
    (item) => item.id === doctorId
  );

  if (!doctor) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Doctor not found
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerTitleAlign: "center",
          headerTintColor: "#1E5AA8",

          headerRight: () => (
            <Pressable
              style={styles.headerHeart}
              onPress={() => {
                // Later: save/remove doctor from favourites
              }}
            >
              <Heart
                size={22}
                color="#315A91"
                strokeWidth={1.8}
              />
            </Pressable>
          ),
        }}
      />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Doctor Header */}
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: doctor.image }}
              style={styles.doctorImage}
            />

            <Text style={styles.doctorName}>
              {doctor.name}
            </Text>

            <Text style={styles.specialty}>
              {doctor.specialty}
            </Text>

            <View style={styles.ratingRow}>
              <Star
                size={15}
                color="#F4B400"
                fill="#F4B400"
              />

              <Text style={styles.rating}>
                {doctor.rating}
              </Text>

              <Text style={styles.reviews}>
                ({doctor.reviews})
              </Text>
            </View>

            <View
              style={[
                styles.availableBadge,
                !doctor.available &&
                  styles.unavailableBadge,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  !doctor.available &&
                    styles.unavailableDot,
                ]}
              />

              <Text
                style={[
                  styles.availableText,
                  !doctor.available &&
                    styles.unavailableText,
                ]}
              >
                {doctor.available
                  ? "Available"
                  : "Busy"}
              </Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <View style={[styles.tab, styles.activeTab]}>
              <Text style={styles.activeTabText}>
                About
              </Text>
            </View>

            <View style={styles.tab}>
              <Text style={styles.tabText}>
                Reviews
              </Text>
            </View>

            <View style={styles.tab}>
              <Text style={styles.tabText}>
                Location
              </Text>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              About Doctor
            </Text>

            <Text style={styles.aboutText}>
              {doctor.about}
            </Text>
          </View>

          {/* Doctor Information */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <UserRound
                  size={18}
                  color="#2563EB"
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  Specialization
                </Text>

                <Text style={styles.infoValue}>
                  {doctor.specialty}
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <Clock3
                  size={18}
                  color="#2563EB"
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  Experience
                </Text>

                <Text style={styles.infoValue}>
                  {doctor.experience}
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <Wallet
                  size={18}
                  color="#2563EB"
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  Consultation Fee
                </Text>

                <Text style={styles.infoValue}>
                  {doctor.consultationFee}
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <Languages
                  size={18}
                  color="#2563EB"
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  Languages
                </Text>

                <Text style={styles.infoValue}>
                  {doctor.languages}
                </Text>
              </View>
            </View>
          </View>

          {/* Location Preview */}
          <View style={styles.locationSection}>
            <View style={styles.locationIcon}>
              <MapPin
                size={18}
                color="#2563EB"
              />
            </View>

            <View>
              <Text style={styles.locationTitle}>
                Jeevan Dhara Clinic
              </Text>

              <Text style={styles.locationText}>
                Main Clinic · Kolkata
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.bookButton,
              pressed && styles.bookButtonPressed,
            ]}
            onPress={() =>
              router.push({
                pathname: "/AppointmentBooking",
                params: {
                  doctorId: doctor.id,
                },
              })
            }
          >
            <Text style={styles.bookButtonText}>
              Book Appointment
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 105,
  },

  profileHeader: {
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 20,
  },

  doctorImage: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: "#EAF1F5",
    marginBottom: 10,
  },

  doctorName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#183B6B",
    marginBottom: 4,
  },

  specialty: {
    fontSize: 13,
    color: "#687789",
    marginBottom: 6,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  rating: {
    fontSize: 12,
    fontWeight: "600",
    color: "#596574",
    marginLeft: 4,
  },

  reviews: {
    fontSize: 11,
    color: "#8993A0",
    marginLeft: 3,
  },

  availableBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDF7E8",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
  },

  unavailableBadge: {
    backgroundColor: "#FFE4E4",
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#159447",
    marginRight: 5,
  },

  unavailableDot: {
    backgroundColor: "#E53935",
  },

  availableText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#159447",
  },

  unavailableText: {
    color: "#E53935",
  },

  tabs: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E7EBEF",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 9,
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#1E5AA8",
  },

  activeTabText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E5AA8",
  },

  tabText: {
    fontSize: 12,
    color: "#7D8794",
  },

  section: {
    paddingHorizontal: 20,
    paddingTop: 17,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#183B6B",
    marginBottom: 7,
  },

  aboutText: {
    fontSize: 11,
    lineHeight: 17,
    color: "#697586",
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    marginTop: 14,
    justifyContent: "space-between",
  },

  infoCard: {
    width: "48%",
    minHeight: 70,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    marginBottom: 9,
    padding: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 9,
    color: "#8792A1",
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 10,
    fontWeight: "600",
    color: "#30445F",
  },

  locationSection: {
    marginHorizontal: 15,
    marginTop: 2,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  locationTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#30445F",
  },

  locationText: {
    fontSize: 10,
    color: "#7C8795",
    marginTop: 2,
  },

  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingTop: 9,
    paddingBottom: 13,
    borderTopWidth: 1,
    borderTopColor: "#EEF1F4",
  },

  bookButton: {
    height: 48,
    borderRadius: 9,
    backgroundColor: "#12A66A",
    alignItems: "center",
    justifyContent: "center",
  },

  bookButtonPressed: {
    opacity: 0.85,
  },

  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  headerHeart: {
    marginRight: 14,
    padding: 4,
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  errorText: {
    fontSize: 16,
    color: "#183B6B",
    marginBottom: 15,
  },

  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#12A66A",
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});