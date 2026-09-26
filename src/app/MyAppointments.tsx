import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { Stack, router } from "expo-router";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react-native";

/*
|--------------------------------------------------------------------------
| Appointment Model
|--------------------------------------------------------------------------
| Backend-ready structure.
|
| Later this can come directly from:
|
| GET /appointments
|
|--------------------------------------------------------------------------
*/

type AppointmentStatus =
  | "upcoming"
  | "completed"
  | "cancelled";

type Appointment = {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  doctorImage: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  consultationFee: number;

  /*
  |----------------------------------------------------------------------
  | Rating
  |----------------------------------------------------------------------
  | false = user has not rated this completed appointment
  | true  = user already submitted feedback
  |
  | Later this value can come from backend.
  |----------------------------------------------------------------------
  */
  ratingSubmitted: boolean;
};

/*
|--------------------------------------------------------------------------
| Temporary Appointment Data
|--------------------------------------------------------------------------
| Replace this with API/database data later.
|--------------------------------------------------------------------------
*/

const appointmentData: Appointment[] = [
  {
    id: "JDS0300012.001",
    doctorId: "2",
    doctorName: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    doctorImage:
      "https://randomuser.me/api/portraits/women/44.jpg",
    date: "12 Sep 2026",
    time: "10:00 AM",
    status: "upcoming",
    consultationFee: 600,
    ratingSubmitted: false,
  },

  {
    id: "JDS0300012.002",
    doctorId: "3",
    doctorName: "Dr. Amit Verma",
    specialty: "Interventional Cardiologist",
    doctorImage:
      "https://randomuser.me/api/portraits/men/52.jpg",
    date: "20 Sep 2026",
    time: "11:30 AM",
    status: "upcoming",
    consultationFee: 700,
    ratingSubmitted: false,
  },

  {
    id: "JDS0300012.003",
    doctorId: "4",
    doctorName: "Dr. Neha Kapoor",
    specialty: "Pediatric Cardiologist",
    doctorImage:
      "https://randomuser.me/api/portraits/women/68.jpg",
    date: "08 Oct 2026",
    time: "04:00 PM",
    status: "cancelled",
    consultationFee: 600,
    ratingSubmitted: false,
  },

  {
    id: "JDS0300012.004",
    doctorId: "1",
    doctorName: "Dr. Rajesh Mehta",
    specialty: "Cardiologist",
    doctorImage:
      "https://randomuser.me/api/portraits/men/32.jpg",
    date: "05 Aug 2026",
    time: "09:30 AM",
    status: "completed",
    consultationFee: 600,
    ratingSubmitted: false,
  },

  {
    id: "JDS0300012.005",
    doctorId: "2",
    doctorName: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    doctorImage:
      "https://randomuser.me/api/portraits/women/44.jpg",
    date: "25 Jul 2026",
    time: "02:00 PM",
    status: "completed",
    consultationFee: 600,
    ratingSubmitted: true,
  },
];

/*
|--------------------------------------------------------------------------
| Appointment Tabs
|--------------------------------------------------------------------------
*/

type AppointmentTab =
  | "upcoming"
  | "completed"
  | "cancelled";

const tabs: {
  key: AppointmentTab;
  label: string;
}[] = [
  {
    key: "upcoming",
    label: "Upcoming",
  },
  {
    key: "completed",
    label: "Completed",
  },
  {
    key: "cancelled",
    label: "Cancelled",
  },
];

/*
|--------------------------------------------------------------------------
| My Appointments
|--------------------------------------------------------------------------
*/

export default function MyAppointments() {
  const [activeTab, setActiveTab] =
    useState<AppointmentTab>("upcoming");

  /*
  |--------------------------------------------------------------------------
  | Filter appointments
  |--------------------------------------------------------------------------
  | Later this can be replaced with backend filtering:
  |
  | GET /appointments?status=upcoming
  |
  |--------------------------------------------------------------------------
  */

  const filteredAppointments = useMemo(() => {
    return appointmentData.filter(
      (appointment) =>
        appointment.status === activeTab
    );
  }, [activeTab]);

  /*
  |--------------------------------------------------------------------------
  | Reschedule Appointment
  |--------------------------------------------------------------------------
  */

  const handleReschedule = (
    appointment: Appointment
  ) => {
    /*
      Backend integration later:

      router.push({
        pathname: "/AppointmentBooking",
        params: {
          doctorId: appointment.doctorId,
          appointmentId: appointment.id,
          reschedule: "true",
        },
      });
    */

    Alert.alert(
      "Reschedule Appointment",
      `Reschedule appointment with ${appointment.doctorName}.`
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Cancel Appointment
  |--------------------------------------------------------------------------
  */

  const handleCancel = (
    appointment: Appointment
  ) => {
    Alert.alert(
      "Cancel Appointment",
      `Are you sure you want to cancel your appointment with ${appointment.doctorName}?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            /*
              Backend integration later:

              await cancelAppointment(
                appointment.id
              );

              PATCH /appointments/:id

              {
                status: "cancelled"
              }
            */

            console.log(
              "Cancel appointment:",
              appointment.id
            );
          },
        },
      ]
    );
  };

  /*
  |--------------------------------------------------------------------------
  | View Appointment Details
  |--------------------------------------------------------------------------
  */

  const handleViewDetails = (
    appointment: Appointment
  ) => {
    /*
      Later:

      router.push({
        pathname: "/AppointmentDetails",
        params: {
          appointmentId: appointment.id,
        },
      });
    */

    Alert.alert(
      "Appointment Details",
      `${appointment.doctorName}\n${appointment.date} · ${appointment.time}\nAppointment ID: ${appointment.id}`
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Rate Doctor
  |--------------------------------------------------------------------------
  | Only completed appointments can reach this screen.
  |
  | Parameters sent to Rating.tsx:
  |
  | appointmentId
  | doctorId
  | doctorName
  | specialty
  | doctorImage
  | date
  | time
  |--------------------------------------------------------------------------
  */

  const handleRateDoctor = (
    appointment: Appointment
  ) => {
    if (appointment.status !== "completed") {
      return;
    }

    if (appointment.ratingSubmitted) {
      Alert.alert(
        "Already Rated",
        "You have already submitted feedback for this appointment."
      );
      return;
    }

    router.push({
      pathname: "/rating",
      params: {
        appointmentId: appointment.id,
        doctorId: appointment.doctorId,
        doctorName: appointment.doctorName,
        specialty: appointment.specialty,
        doctorImage: appointment.doctorImage,
        date: appointment.date,
        time: appointment.time,
      },
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Appointment Card
  |--------------------------------------------------------------------------
  */

  const renderAppointment = ({
    item,
  }: {
    item: Appointment;
  }) => {
    const isUpcoming =
      item.status === "upcoming";

    const isCancelled =
      item.status === "cancelled";

    const isCompleted =
      item.status === "completed";

    return (
      <View style={styles.appointmentCard}>
        {/* Doctor Information */}

        <View style={styles.doctorRow}>
          <Image
            source={{
              uri: item.doctorImage,
            }}
            style={styles.doctorImage}
          />

          <View style={styles.doctorInfo}>
            <Text
              style={styles.doctorName}
              numberOfLines={1}
            >
              {item.doctorName}
            </Text>

            <Text
              style={styles.specialty}
              numberOfLines={1}
            >
              {item.specialty}
            </Text>

            {/* Status */}

            <View style={styles.statusRow}>
              {isUpcoming && (
                <View
                  style={[
                    styles.statusBadge,
                    styles.upcomingBadge,
                  ]}
                >
                  <CheckCircle2
                    size={10}
                    color="#159447"
                  />

                  <Text
                    style={[
                      styles.statusText,
                      styles.upcomingText,
                    ]}
                  >
                    Upcoming
                  </Text>
                </View>
              )}

              {isCancelled && (
                <View
                  style={[
                    styles.statusBadge,
                    styles.cancelledBadge,
                  ]}
                >
                  <XCircle
                    size={10}
                    color="#E53935"
                  />

                  <Text
                    style={[
                      styles.statusText,
                      styles.cancelledText,
                    ]}
                  >
                    Cancelled
                  </Text>
                </View>
              )}

              {isCompleted && (
                <View
                  style={[
                    styles.statusBadge,
                    styles.completedBadge,
                  ]}
                >
                  <CheckCircle2
                    size={10}
                    color="#2563EB"
                  />

                  <Text
                    style={[
                      styles.statusText,
                      styles.completedText,
                    ]}
                  >
                    Completed
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Appointment Details */}

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <CalendarDays
              size={14}
              color="#64748B"
            />

            <Text style={styles.detailText}>
              {item.date}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Clock3
              size={14}
              color="#64748B"
            />

            <Text style={styles.detailText}>
              {item.time}
            </Text>
          </View>
        </View>

        {/* Appointment ID */}

        <Text style={styles.appointmentId}>
          ID: {item.id}
        </Text>

        {/* Upcoming Actions */}

        {isUpcoming && (
          <View style={styles.actionRow}>
            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() =>
                handleReschedule(item)
              }
            >
              <Text
                style={styles.secondaryButtonText}
              >
                Reschedule
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() =>
                handleCancel(item)
              }
            >
              <Text
                style={styles.cancelButtonText}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        )}

        {/* Completed Actions */}

        {isCompleted && (
          <View style={styles.completedActions}>
            <Pressable
              style={({ pressed }) => [
                styles.rateButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() =>
                handleRateDoctor(item)
              }
              disabled={item.ratingSubmitted}
            >
              <Star
                size={13}
                color={
                  item.ratingSubmitted
                    ? "#8A94A6"
                    : "#F4B400"
                }
                fill={
                  item.ratingSubmitted
                    ? "transparent"
                    : "#F4B400"
                }
              />

              <Text
                style={[
                  styles.rateButtonText,
                  item.ratingSubmitted &&
                    styles.ratedButtonText,
                ]}
              >
                {item.ratingSubmitted
                  ? "Rated"
                  : "Rate Doctor"}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.detailsButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() =>
                handleViewDetails(item)
              }
            >
              <Text
                style={styles.detailsButtonText}
              >
                View Details
              </Text>
            </Pressable>
          </View>
        )}

        {/* Cancelled */}

        {isCancelled && (
          <Pressable
            style={({ pressed }) => [
              styles.detailsButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() =>
              handleViewDetails(item)
            }
          >
            <Text
              style={styles.detailsButtonText}
            >
              View Details
            </Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "My Appointments",
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />

      <View style={styles.container}>
        {/* Tabs */}

        <View style={styles.tabsContainer}>
          {tabs.map((tab) => {
            const active =
              activeTab === tab.key;

            return (
              <Pressable
                key={tab.key}
                onPress={() =>
                  setActiveTab(tab.key)
                }
                style={({ pressed }) => [
                  styles.tab,
                  active && styles.activeTab,
                  pressed &&
                    styles.tabPressed,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    active &&
                      styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Appointment List */}

        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointment}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            filteredAppointments.length === 0 &&
              styles.emptyListContent,
          ]}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <CalendarDays
                  size={28}
                  color="#7B8794"
                />
              </View>

              <Text style={styles.emptyTitle}>
                No Appointments
              </Text>

              <Text style={styles.emptyText}>
                You don't have any{" "}
                {activeTab} appointments.
              </Text>
            </View>
          }
        />
      </View>
    </>
  );
}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /*
  |--------------------------------------------------------------------------
  | Tabs
  |--------------------------------------------------------------------------
  */

  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#F3F6F8",
    borderRadius: 8,
    padding: 3,
  },

  tab: {
    flex: 1,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },

  activeTab: {
    backgroundColor: "#12A66A",
  },

  tabPressed: {
    opacity: 0.75,
  },

  tabText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#617086",
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  /*
  |--------------------------------------------------------------------------
  | List
  |--------------------------------------------------------------------------
  */

  listContent: {
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 25,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  /*
  |--------------------------------------------------------------------------
  | Appointment Card
  |--------------------------------------------------------------------------
  */

  appointmentCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6EBEF",
    borderRadius: 10,
    padding: 9,
    marginBottom: 9,
  },

  doctorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  doctorImage: {
    width: 55,
    height: 62,
    borderRadius: 8,
    backgroundColor: "#EAF1F5",
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 9,
  },

  doctorName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#183B6B",
    marginBottom: 3,
  },

  specialty: {
    fontSize: 10,
    color: "#6F7D8C",
    marginBottom: 6,
  },

  /*
  |--------------------------------------------------------------------------
  | Status
  |--------------------------------------------------------------------------
  */

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 9,
  },

  upcomingBadge: {
    backgroundColor: "#DDF7E8",
  },

  completedBadge: {
    backgroundColor: "#E8F1FF",
  },

  cancelledBadge: {
    backgroundColor: "#FFE4E4",
  },

  statusText: {
    fontSize: 8,
    fontWeight: "600",
    marginLeft: 3,
  },

  upcomingText: {
    color: "#159447",
  },

  completedText: {
    color: "#2563EB",
  },

  cancelledText: {
    color: "#E53935",
  },

  /*
  |--------------------------------------------------------------------------
  | Appointment Details
  |--------------------------------------------------------------------------
  */

  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F4",
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  detailText: {
    fontSize: 10,
    color: "#596574",
    marginLeft: 5,
    fontWeight: "500",
  },

  appointmentId: {
    fontSize: 8,
    color: "#9AA3AE",
    marginTop: 6,
  },

  /*
  |--------------------------------------------------------------------------
  | Actions
  |--------------------------------------------------------------------------
  */

  actionRow: {
    flexDirection: "row",
    gap: 7,
    marginTop: 8,
  },

  completedActions: {
    flexDirection: "row",
    gap: 7,
    marginTop: 8,
  },

  secondaryButton: {
    flex: 1,
    height: 34,
    borderWidth: 1,
    borderColor: "#D8DEE5",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  secondaryButtonText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#526173",
  },

  cancelButton: {
    flex: 1,
    height: 34,
    borderWidth: 1,
    borderColor: "#E2E5E8",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  cancelButtonText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#E53935",
  },

  /*
  |--------------------------------------------------------------------------
  | Rate Button
  |--------------------------------------------------------------------------
  */

  rateButton: {
    flex: 1,
    height: 34,
    borderWidth: 1,
    borderColor: "#F0D98A",
    borderRadius: 7,
    backgroundColor: "#FFFDF4",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },

  rateButtonText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#B77900",
  },

  ratedButtonText: {
    color: "#8A94A6",
  },

  /*
  |--------------------------------------------------------------------------
  | Details Button
  |--------------------------------------------------------------------------
  */

  detailsButton: {
    flex: 1,
    height: 34,
    borderWidth: 1,
    borderColor: "#D8DEE5",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  detailsButtonText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#526173",
  },

  buttonPressed: {
    opacity: 0.65,
  },

  /*
  |--------------------------------------------------------------------------
  | Empty State
  |--------------------------------------------------------------------------
  */

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F1F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#183B6B",
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 11,
    color: "#7B8794",
    textAlign: "center",
  },
});