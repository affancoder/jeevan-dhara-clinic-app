import React, { useState } from "react";
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
  Phone,
  Navigation,
} from "lucide-react-native";

/*
|--------------------------------------------------------------------------
| TEMPORARY DOCTOR DATA
|--------------------------------------------------------------------------
| This is mock data for now.
|
| Later:
| - doctors can come from your backend/database
| - reviews can come from your backend
| - location can come from your backend
| - availability can come from your backend
| - appointment slots can come from your backend
|
| The UI structure does not need to be rebuilt.
|--------------------------------------------------------------------------
*/

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

    reviewsData: [
      {
        id: "r1",
        patientName: "Rahul Sharma",
        rating: 5,
        date: "15 Aug 2026",
        comment:
          "Very professional and experienced doctor. He explained everything clearly.",
      },
      {
        id: "r2",
        patientName: "Ananya Das",
        rating: 5,
        date: "02 Aug 2026",
        comment:
          "Very good experience. The doctor was patient and explained the treatment properly.",
      },
      {
        id: "r3",
        patientName: "Sourav Roy",
        rating: 4,
        date: "20 Jul 2026",
        comment:
          "Good doctor and very helpful staff.",
      },
    ],

    location: {
      clinicName: "Jeevan Dhara Clinic",
      address: "Main Clinic, Kolkata, West Bengal",
      area: "Kolkata",
      timing: "Mon - Sat · 9:00 AM - 6:00 PM",
      phone: "+91 98765 43210",
    },
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

    reviewsData: [
      {
        id: "r1",
        patientName: "Arjun Singh",
        rating: 5,
        date: "12 Aug 2026",
        comment:
          "Dr. Priya was very polite and explained the treatment in a simple way.",
      },
      {
        id: "r2",
        patientName: "Sneha Roy",
        rating: 4,
        date: "28 Jul 2026",
        comment:
          "Good consultation experience. The clinic staff was also helpful.",
      },
      {
        id: "r3",
        patientName: "Amit Das",
        rating: 5,
        date: "10 Jul 2026",
        comment:
          "Very satisfied with the consultation.",
      },
    ],

    location: {
      clinicName: "Jeevan Dhara Clinic",
      address: "Main Clinic, Kolkata, West Bengal",
      area: "Kolkata",
      timing: "Mon - Sat · 10:00 AM - 6:00 PM",
      phone: "+91 98765 43210",
    },
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

    reviewsData: [
      {
        id: "r1",
        patientName: "Vikash Kumar",
        rating: 5,
        date: "18 Aug 2026",
        comment:
          "Excellent doctor with great experience. Very professional consultation.",
      },
      {
        id: "r2",
        patientName: "Rohit Sen",
        rating: 4,
        date: "05 Aug 2026",
        comment:
          "The doctor explained the procedure and treatment options clearly.",
      },
      {
        id: "r3",
        patientName: "Puja Ghosh",
        rating: 5,
        date: "21 Jul 2026",
        comment:
          "Very good experience with the doctor.",
      },
    ],

    location: {
      clinicName: "Jeevan Dhara Clinic",
      address: "Main Clinic, Kolkata, West Bengal",
      area: "Kolkata",
      timing: "Mon - Sat · 9:00 AM - 5:00 PM",
      phone: "+91 98765 43210",
    },
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

    reviewsData: [
      {
        id: "r1",
        patientName: "Rina Sharma",
        rating: 5,
        date: "14 Aug 2026",
        comment:
          "Very caring doctor. She was very patient with my child.",
      },
      {
        id: "r2",
        patientName: "Manish Gupta",
        rating: 5,
        date: "01 Aug 2026",
        comment:
          "Excellent pediatric consultation experience.",
      },
      {
        id: "r3",
        patientName: "Kavita Das",
        rating: 4,
        date: "19 Jul 2026",
        comment:
          "Good doctor and friendly staff.",
      },
    ],

    location: {
      clinicName: "Jeevan Dhara Clinic",
      address: "Main Clinic, Kolkata, West Bengal",
      area: "Kolkata",
      timing: "Mon - Sat · 11:00 AM - 5:00 PM",
      phone: "+91 98765 43210",
    },
  },
];

export default function DoctorProfile() {
  const { doctorId } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState<
    "About" | "Reviews" | "Location"
  >("About");

  const doctor = doctors.find(
    (item) => item.id === doctorId
  );

  /*
  |--------------------------------------------------------------------------
  | Doctor Not Found
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Main Screen
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerTitleAlign: "center",
          headerTintColor: "#1E5AA8",
          headerShadowVisible: false,

          headerRight: () => (
            <Pressable
              style={styles.headerHeart}
              onPress={() => {
                // Later:
                // save/remove doctor from favourites
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
          {/* ============================================================
              DOCTOR HEADER
          ============================================================ */}

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

            {/* Rating */}
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

            {/* Availability */}
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

          {/* ============================================================
              TABS
          ============================================================ */}

          <View style={styles.tabs}>
            {(
              ["About", "Reviews", "Location"] as const
            ).map((tab) => (
              <Pressable
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab &&
                    styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={
                    activeTab === tab
                      ? styles.activeTabText
                      : styles.tabText
                  }
                >
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* ============================================================
              ABOUT TAB
          ============================================================ */}

          {activeTab === "About" && (
            <>
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
                {/* Specialization */}
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

                {/* Experience */}
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

                {/* Consultation Fee */}
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

                {/* Languages */}
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
            </>
          )}

          {/* ============================================================
              REVIEWS TAB
          ============================================================ */}

          {activeTab === "Reviews" && (
            <View style={styles.tabContent}>
              {/* Rating Summary */}
              <View style={styles.reviewSummary}>
                <Text style={styles.bigRating}>
                  {doctor.rating}
                </Text>

                <View>
                  <View style={styles.reviewStars}>
                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <Star
                          key={star}
                          size={17}
                          color="#F4B400"
                          fill={
                            star <=
                            Math.round(
                              Number(
                                doctor.rating
                              )
                            )
                              ? "#F4B400"
                              : "transparent"
                          }
                        />
                      )
                    )}
                  </View>

                  <Text
                    style={styles.totalReviews}
                  >
                    {doctor.reviews}
                  </Text>
                </View>
              </View>

              {/* Individual Reviews */}
              {doctor.reviewsData.map(
                (review) => (
                  <View
                    key={review.id}
                    style={styles.reviewCard}
                  >
                    <View
                      style={styles.reviewHeader}
                    >
                      <Text
                        style={styles.patientName}
                      >
                        {review.patientName}
                      </Text>

                      <Text
                        style={styles.reviewDate}
                      >
                        {review.date}
                      </Text>
                    </View>

                    {/* Review Stars */}
                    <View
                      style={styles.reviewStars}
                    >
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <Star
                            key={star}
                            size={13}
                            color="#F4B400"
                            fill={
                              star <=
                              review.rating
                                ? "#F4B400"
                                : "transparent"
                            }
                          />
                        )
                      )}
                    </View>

                    <Text
                      style={styles.reviewComment}
                    >
                      {review.comment}
                    </Text>
                  </View>
                )
              )}
            </View>
          )}

          {/* ============================================================
              LOCATION TAB
          ============================================================ */}

          {activeTab === "Location" && (
            <View style={styles.tabContent}>
              <View style={styles.locationCard}>
                <View style={styles.locationIcon}>
                  <MapPin
                    size={21}
                    color="#2563EB"
                  />
                </View>

                <View
                  style={styles.locationContent}
                >
                  <Text
                    style={styles.locationTitle}
                  >
                    {doctor.location.clinicName}
                  </Text>

                  <Text
                    style={styles.locationAddress}
                  >
                    {doctor.location.address}
                  </Text>

                  <Text
                    style={styles.locationTiming}
                  >
                    {doctor.location.timing}
                  </Text>

                  <View
                    style={styles.phoneRow}
                  >
                    <Phone
                      size={13}
                      color="#2563EB"
                    />

                    <Text
                      style={styles.locationPhone}
                    >
                      {doctor.location.phone}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Area */}
              <View style={styles.locationDetail}>
                <MapPin
                  size={17}
                  color="#2563EB"
                />

                <View>
                  <Text
                    style={styles.locationDetailLabel}
                  >
                    Clinic Location
                  </Text>

                  <Text
                    style={styles.locationDetailValue}
                  >
                    {doctor.location.area}
                  </Text>
                </View>
              </View>

              {/* Timing */}
              <View style={styles.locationDetail}>
                <Clock3
                  size={17}
                  color="#2563EB"
                />

                <View>
                  <Text
                    style={styles.locationDetailLabel}
                  >
                    Consultation Hours
                  </Text>

                  <Text
                    style={styles.locationDetailValue}
                  >
                    {doctor.location.timing}
                  </Text>
                </View>
              </View>

              {/* Directions */}
              <Pressable
                style={({ pressed }) => [
                  styles.directionButton,
                  pressed &&
                    styles.directionButtonPressed,
                ]}
                onPress={() => {
                  // Later:
                  // Open Google Maps / Mapbox
                }}
              >
                <Navigation
                  size={17}
                  color="#FFFFFF"
                />

                <Text
                  style={
                    styles.directionButtonText
                  }
                >
                  Get Directions
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>

        {/* ==============================================================
            BOTTOM BOOK APPOINTMENT BUTTON
        ============================================================== */}

        <View style={styles.bottomContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.bookButton,
              pressed &&
                styles.bookButtonPressed,
            ]}
            onPress={() =>
              router.push({
                pathname:
                  "/AppointmentBooking",
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

/*
|--------------------------------------------------------------------------
| STYLES
|--------------------------------------------------------------------------
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 105,
  },

  /*
  |--------------------------------------------------------------------------
  | HEADER
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | TABS
  |--------------------------------------------------------------------------
  */

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

  tabContent: {
    paddingHorizontal: 15,
    paddingTop: 17,
  },

  /*
  |--------------------------------------------------------------------------
  | ABOUT
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | INFORMATION CARDS
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | REVIEWS
  |--------------------------------------------------------------------------
  */

  reviewSummary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  bigRating: {
    fontSize: 32,
    fontWeight: "700",
    color: "#183B6B",
    marginRight: 15,
  },

  reviewStars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  totalReviews: {
    fontSize: 11,
    color: "#7C8795",
    marginTop: 4,
  },

  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EBEF",
    borderRadius: 11,
    padding: 13,
    marginBottom: 10,
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  patientName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#30445F",
  },

  reviewDate: {
    fontSize: 9,
    color: "#8993A0",
  },

  reviewComment: {
    fontSize: 11,
    lineHeight: 17,
    color: "#697586",
    marginTop: 7,
  },

  /*
  |--------------------------------------------------------------------------
  | LOCATION
  |--------------------------------------------------------------------------
  */

  locationCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
  },

  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  locationContent: {
    flex: 1,
  },

  locationTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#30445F",
  },

  locationAddress: {
    fontSize: 11,
    color: "#697586",
    marginTop: 5,
    lineHeight: 17,
  },

  locationTiming: {
    fontSize: 10,
    color: "#687789",
    marginTop: 8,
  },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  locationPhone: {
    fontSize: 10,
    color: "#2563EB",
    fontWeight: "600",
    marginLeft: 5,
  },

  locationDetail: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 13,
    marginTop: 10,
  },

  locationDetailLabel: {
    fontSize: 9,
    color: "#8792A1",
    marginBottom: 3,
    marginLeft: 10,
  },

  locationDetailValue: {
    fontSize: 11,
    fontWeight: "600",
    color: "#30445F",
    marginLeft: 10,
  },

  directionButton: {
    height: 45,
    backgroundColor: "#12A66A",
    borderRadius: 9,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  directionButtonPressed: {
    opacity: 0.85,
  },

  directionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
  },

  /*
  |--------------------------------------------------------------------------
  | BOTTOM BOOK BUTTON
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | HEADER FAVOURITE
  |--------------------------------------------------------------------------
  */

  headerHeart: {
    marginRight: 14,
    padding: 4,
  },

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

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