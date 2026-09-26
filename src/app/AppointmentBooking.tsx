import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  CalendarDays,
} from "lucide-react-native";

/*
|--------------------------------------------------------------------------
| BACKEND-READY TYPES
|--------------------------------------------------------------------------
| These structures can later come directly from your API/database.
*/

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  consultationFee: number;
  image: string;
};

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

type AppointmentDate = {
  id: string; // YYYY-MM-DD
  date: number;
  day: string;
  month: string;
  year: number;
  available: boolean;
  slots: TimeSlot[];
};

/*
|--------------------------------------------------------------------------
| TEMPORARY DOCTOR DATA
|--------------------------------------------------------------------------
| Later replace this with:
|
| GET /doctors/:doctorId
|
| The UI does not need to change.
*/

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Mehta",
    specialty: "Cardiologist",
    consultationFee: 600,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    consultationFee: 600,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Dr. Amit Verma",
    specialty: "Interventional Cardiologist",
    consultationFee: 800,
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: "4",
    name: "Dr. Neha Kapoor",
    specialty: "Pediatric Cardiologist",
    consultationFee: 700,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

/*
|--------------------------------------------------------------------------
| TEMPORARY BACKEND-LIKE AVAILABILITY DATA
|--------------------------------------------------------------------------
| This is intentionally structured like API data.
|
| Later your backend can return the exact same structure.
|
| Example future API:
|
| GET /doctors/:doctorId/availability?month=2026-09
|
|--------------------------------------------------------------------------
*/

const appointmentData: Record<string, AppointmentDate[]> = {
  "1": [
    {
      id: "2026-09-10",
      date: 10,
      day: "Thu",
      month: "Sep",
      year: 2026,
      available: true,
      slots: [
        { id: "1", time: "09:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: true },
        { id: "3", time: "11:00 AM", available: false },
        { id: "4", time: "01:30 PM", available: true },
        { id: "5", time: "04:00 PM", available: true },
        { id: "6", time: "05:00 PM", available: false },
      ],
    },

    {
      id: "2026-09-11",
      date: 11,
      day: "Fri",
      month: "Sep",
      year: 2026,
      available: true,
      slots: [
        { id: "1", time: "09:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: false },
        { id: "3", time: "11:00 AM", available: true },
        { id: "4", time: "01:30 PM", available: true },
        { id: "5", time: "04:00 PM", available: false },
        { id: "6", time: "05:00 PM", available: true },
      ],
    },

    {
      id: "2026-09-12",
      date: 12,
      day: "Sat",
      month: "Sep",
      year: 2026,
      available: true,
      slots: [
        { id: "1", time: "09:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: true },
        { id: "3", time: "11:00 AM", available: true },
        { id: "4", time: "01:30 PM", available: true },
        { id: "5", time: "04:00 PM", available: true },
        { id: "6", time: "05:00 PM", available: true },
      ],
    },

    {
      id: "2026-09-13",
      date: 13,
      day: "Sun",
      month: "Sep",
      year: 2026,
      available: true,
      slots: [
        { id: "1", time: "09:00 AM", available: false },
        { id: "2", time: "10:00 AM", available: true },
        { id: "3", time: "11:00 AM", available: true },
        { id: "4", time: "01:30 PM", available: false },
        { id: "5", time: "04:00 PM", available: true },
        { id: "6", time: "05:00 PM", available: true },
      ],
    },

    {
      id: "2026-09-14",
      date: 14,
      day: "Mon",
      month: "Sep",
      year: 2026,
      available: true,
      slots: [
        { id: "1", time: "09:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: true },
        { id: "3", time: "11:00 AM", available: false },
        { id: "4", time: "01:30 PM", available: true },
        { id: "5", time: "04:00 PM", available: true },
        { id: "6", time: "05:00 PM", available: false },
      ],
    },
  ],

  "2": [
    {
      id: "2026-09-12",
      date: 12,
      day: "Sat",
      month: "Sep",
      year: 2026,
      available: true,
      slots: [
        { id: "1", time: "09:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: true },
        { id: "3", time: "11:00 AM", available: true },
        { id: "4", time: "01:30 PM", available: true },
        { id: "5", time: "04:00 PM", available: true },
        { id: "6", time: "05:00 PM", available: true },
      ],
    },

    {
      id: "2026-09-13",
      date: 13,
      day: "Sun",
      month: "Sep",
      year: 2026,
      available: true,
      slots: [
        { id: "1", time: "09:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: false },
        { id: "3", time: "11:00 AM", available: true },
        { id: "4", time: "01:30 PM", available: true },
        { id: "5", time: "04:00 PM", available: false },
        { id: "6", time: "05:00 PM", available: true },
      ],
    },
  ],

  "3": [
    {
      id: "2026-09-12",
      date: 12,
      day: "Sat",
      month: "Sep",
      year: 2026,
      available: true,
      slots: [
        { id: "1", time: "09:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: false },
        { id: "3", time: "11:00 AM", available: true },
        { id: "4", time: "01:30 PM", available: true },
        { id: "5", time: "04:00 PM", available: false },
        { id: "6", time: "05:00 PM", available: true },
      ],
    },
  ],

  "4": [
    {
      id: "2026-09-12",
      date: 12,
      day: "Sat",
      month: "Sep",
      year: 2026,
      available: true,
      slots: [
        { id: "1", time: "09:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: true },
        { id: "3", time: "11:00 AM", available: true },
        { id: "4", time: "01:30 PM", available: false },
        { id: "5", time: "04:00 PM", available: true },
        { id: "6", time: "05:00 PM", available: true },
      ],
    },
  ],
};

/*
|--------------------------------------------------------------------------
| MONTH HELPERS
|--------------------------------------------------------------------------
*/

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

/*
|--------------------------------------------------------------------------
| CREATE DATE KEY
|--------------------------------------------------------------------------
*/

function createDateId(
  year: number,
  month: number,
  day: number
) {
  const monthNumber = String(month + 1).padStart(2, "0");
  const dayNumber = String(day).padStart(2, "0");

  return `${year}-${monthNumber}-${dayNumber}`;
}

/*
|--------------------------------------------------------------------------
| CREATE CALENDAR DAYS
|--------------------------------------------------------------------------
| This is the important part.
|
| The calendar is NOT fixed to September.
| It automatically generates the correct days for every month.
|--------------------------------------------------------------------------
*/

function generateCalendarDays(
  year: number,
  month: number
): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const days: (number | null)[] = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Actual month days
  for (let day = 1; day <= totalDays; day++) {
    days.push(day);
  }

  return days;
}

/*
|--------------------------------------------------------------------------
| GET TEMPORARY AVAILABILITY
|--------------------------------------------------------------------------
| Later replace this function with an API call.
|
| For example:
|
| const response = await fetch(
|   `${API_URL}/doctors/${doctorId}/availability?month=${year}-${month}`
| );
|
|--------------------------------------------------------------------------
*/

function getDoctorAvailability(
  doctorId: string,
  year: number,
  month: number
): AppointmentDate[] {
  const doctorAvailability = appointmentData[doctorId] ?? [];

  return doctorAvailability.filter((item) => {
    return (
      item.year === year &&
      shortMonthNames.indexOf(item.month) === month
    );
  });
}

export default function AppointmentBooking() {
  const params = useLocalSearchParams();

  /*
  |--------------------------------------------------------------------------
  | Doctor ID comes from DoctorProfile
  |--------------------------------------------------------------------------
  */

  const doctorId =
    typeof params.doctorId === "string"
      ? params.doctorId
      : "2";

  const doctor =
    doctors.find((item) => item.id === doctorId) ??
    doctors[1];

  /*
  |--------------------------------------------------------------------------
  | Initial calendar month
  |--------------------------------------------------------------------------
  |
  | Starts at September 2026 because that is where the temporary
  | availability currently exists.
  |
  | Later you can initialize this with:
  |
  | new Date()
  |
  |--------------------------------------------------------------------------
  */

  const firstAvailableDate =
    appointmentData[doctor.id]?.find(
      (item) => item.available
    );

  const initialDate = firstAvailableDate
    ? new Date(firstAvailableDate.id)
    : new Date();

  const [currentMonth, setCurrentMonth] = useState(
    initialDate.getMonth()
  );

  const [currentYear, setCurrentYear] = useState(
    initialDate.getFullYear()
  );

  /*
  |--------------------------------------------------------------------------
  | Availability for current month
  |--------------------------------------------------------------------------
  */

  const availableDates = useMemo(() => {
    return getDoctorAvailability(
      doctor.id,
      currentYear,
      currentMonth
    );
  }, [
    doctor.id,
    currentYear,
    currentMonth,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Selected date
  |--------------------------------------------------------------------------
  */

  const [selectedDate, setSelectedDate] = useState(
    firstAvailableDate?.id ?? ""
  );

  /*
  |--------------------------------------------------------------------------
  | Selected time
  |--------------------------------------------------------------------------
  */

  const getFirstAvailableSlot = (
    dateId: string
  ) => {
    const date = availableDates.find(
      (item) => item.id === dateId
    );

    return (
      date?.slots.find(
        (slot) => slot.available
      )?.id ?? ""
    );
  };

  const [selectedTime, setSelectedTime] = useState(
    firstAvailableDate
      ? firstAvailableDate.slots.find(
          (slot) => slot.available
        )?.id ?? ""
      : ""
  );

  /*
  |--------------------------------------------------------------------------
  | Selected date object
  |--------------------------------------------------------------------------
  */

  const selectedDateData =
    availableDates.find(
      (item) => item.id === selectedDate
    ) ?? null;

  /*
  |--------------------------------------------------------------------------
  | Generate calendar
  |--------------------------------------------------------------------------
  */

  const calendarDays = useMemo(() => {
    return generateCalendarDays(
      currentYear,
      currentMonth
    );
  }, [currentYear, currentMonth]);

  /*
  |--------------------------------------------------------------------------
  | Change month
  |--------------------------------------------------------------------------
  */

  const changeMonth = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    /*
    | Find first available date in the new month.
    | If backend has availability, that date will be selected.
    */

    const newMonthAvailability =
      getDoctorAvailability(
        doctor.id,
        newYear,
        newMonth
      );

    const firstAvailable =
      newMonthAvailability.find(
        (item) => item.available
      );

    if (firstAvailable) {
      setSelectedDate(firstAvailable.id);

      const firstSlot =
        firstAvailable.slots.find(
          (slot) => slot.available
        );

      setSelectedTime(
        firstSlot?.id ?? ""
      );
    } else {
      setSelectedDate("");
      setSelectedTime("");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Select date
  |--------------------------------------------------------------------------
  */

  const handleDateChange = (
    dateId: string
  ) => {
    const date = availableDates.find(
      (item) => item.id === dateId
    );

    if (!date || !date.available) {
      return;
    }

    setSelectedDate(dateId);

    const firstAvailableSlot =
      date.slots.find(
        (slot) => slot.available
      );

    setSelectedTime(
      firstAvailableSlot?.id ?? ""
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Confirm Appointment
  |--------------------------------------------------------------------------
  |
  | This payload is already structured for backend integration.
  |
  | Later:
  |
  | await createAppointment(bookingPayload)
  |
  |--------------------------------------------------------------------------
  */

  const handleConfirmAppointment = () => {
    if (!selectedDateData) {
      Alert.alert(
        "Select Date",
        "Please select an available appointment date."
      );
      return;
    }

    const selectedSlot =
      selectedDateData.slots.find(
        (slot) =>
          slot.id === selectedTime
      );

    if (
      !selectedSlot ||
      !selectedSlot.available
    ) {
      Alert.alert(
        "Select Time",
        "Please select an available time slot."
      );
      return;
    }

    const bookingPayload = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      consultationFee:
        doctor.consultationFee,

      appointmentDate:
        selectedDateData.id,

      appointmentTime:
        selectedSlot.time,

      timeSlotId:
        selectedSlot.id,

      /*
      | Later backend can automatically
      | attach the logged-in user:
      |
      | patientId: currentUser.id
      */
    };

    /*
    |--------------------------------------------------------------------------
    | TEMPORARY
    |--------------------------------------------------------------------------
    | Replace this console.log with API request.
    |--------------------------------------------------------------------------
    */

    console.log(
      "Appointment payload:",
      bookingPayload
    );

    router.push({
      pathname:
        "/AppointmentConfirmed",

      params: {
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        fee: String(
          doctor.consultationFee
        ),
        date: selectedDateData.id,
        time: selectedSlot.time,
      },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Book Appointment",
          headerTitleAlign: "center",
          headerTintColor: "#183B6B",
          headerShadowVisible: false,

          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.content
          }
        >
          {/* =========================================================
              DOCTOR CARD
          ========================================================== */}

          <View style={styles.doctorCard}>
            <Image
              source={{
                uri: doctor.image,
              }}
              style={styles.doctorImage}
            />

            <View
              style={styles.doctorInfo}
            >
              <Text
                style={styles.doctorName}
              >
                {doctor.name}
              </Text>

              <Text
                style={styles.specialty}
              >
                {doctor.specialty}
              </Text>

              <Text style={styles.fee}>
                ₹ {doctor.consultationFee}{" "}
                (Consultation Fee)
              </Text>
            </View>
          </View>

          {/* =========================================================
              SELECT DATE
          ========================================================== */}

          <View
            style={styles.sectionHeader}
          >
            <CalendarDays
              size={16}
              color="#183B6B"
            />

            <Text
              style={styles.sectionTitle}
            >
              Select Date
            </Text>
          </View>

          {/* Month navigation */}

          <View
            style={styles.monthHeader}
          >
            <Pressable
              onPress={() =>
                changeMonth(-1)
              }
              style={styles.monthArrow}
            >
              <ChevronLeft
                size={20}
                color="#183B6B"
              />
            </Pressable>

            <Text
              style={styles.monthTitle}
            >
              {monthNames[currentMonth]}{" "}
              {currentYear}
            </Text>

            <Pressable
              onPress={() =>
                changeMonth(1)
              }
              style={styles.monthArrow}
            >
              <ChevronRight
                size={20}
                color="#183B6B"
              />
            </Pressable>
          </View>

          {/* Weekday row */}

          <View style={styles.weekRow}>
            {weekDays.map((day) => (
              <Text
                key={day}
                style={styles.weekDay}
              >
                {day}
              </Text>
            ))}
          </View>

          {/* =========================================================
              DYNAMIC CALENDAR
          ========================================================== */}

          <View
            style={styles.calendarGrid}
          >
            {calendarDays.map(
              (date, index) => {
                if (date === null) {
                  return (
                    <View
                      key={`empty-${index}`}
                      style={
                        styles.calendarDay
                      }
                    />
                  );
                }

                const dateId =
                  createDateId(
                    currentYear,
                    currentMonth,
                    date
                  );

                const dateData =
                  availableDates.find(
                    (item) =>
                      item.id === dateId
                  );

                const available =
                  dateData?.available ??
                  false;

                const selected =
                  selectedDate ===
                  dateId;

                return (
                  <Pressable
                    key={dateId}
                    disabled={!available}
                    onPress={() =>
                      handleDateChange(
                        dateId
                      )
                    }
                    style={[
                      styles.calendarDay,
                      selected &&
                        styles.selectedCalendarDay,
                      !available &&
                        styles.disabledCalendarDay,
                    ]}
                  >
                    <Text
                      style={[
                        styles.calendarDateText,
                        selected &&
                          styles.selectedCalendarDateText,
                        !available &&
                          styles.disabledCalendarDateText,
                      ]}
                    >
                      {date}
                    </Text>
                  </Pressable>
                );
              }
            )}
          </View>

          {/* =========================================================
              TIME SLOTS
          ========================================================== */}

          <View
            style={styles.sectionHeader}
          >
            <Clock3
              size={16}
              color="#183B6B"
            />

            <Text
              style={styles.sectionTitle}
            >
              Select Time Slot
            </Text>
          </View>

          {selectedDateData ? (
            <View style={styles.timeGrid}>
              {selectedDateData.slots.map(
                (slot) => {
                  const selected =
                    slot.id ===
                    selectedTime;

                  return (
                    <Pressable
                      key={slot.id}
                      disabled={
                        !slot.available
                      }
                      onPress={() =>
                        setSelectedTime(
                          slot.id
                        )
                      }
                      style={[
                        styles.timeSlot,
                        selected &&
                          styles.selectedTimeSlot,
                        !slot.available &&
                          styles.disabledTimeSlot,
                      ]}
                    >
                      <Text
                        style={[
                          styles.timeText,
                          selected &&
                            styles.selectedTimeText,
                          !slot.available &&
                            styles.disabledTimeText,
                        ]}
                      >
                        {slot.time}
                      </Text>
                    </Pressable>
                  );
                }
              )}
            </View>
          ) : (
            <View
              style={
                styles.noAvailability
              }
            >
              <Text
                style={
                  styles.noAvailabilityText
                }
              >
                No appointments available
                for this month.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* =========================================================
            CONFIRM BUTTON
        ========================================================== */}

        <View
          style={styles.bottomContainer}
        >
          <Pressable
            onPress={
              handleConfirmAppointment
            }
            disabled={
              !selectedDateData ||
              !selectedTime
            }
            style={({ pressed }) => [
              styles.confirmButton,

              (!selectedDateData ||
                !selectedTime) &&
                styles.disabledConfirmButton,

              pressed &&
                styles.buttonPressed,
            ]}
          >
            <Text
              style={
                styles.confirmButtonText
              }
            >
              Confirm Appointment
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

  content: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 110,
  },

  /*
  |--------------------------------------------------------------------------
  | Doctor card
  |--------------------------------------------------------------------------
  */

  doctorCard: {
    minHeight: 74,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 11,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 18,
  },

  doctorImage: {
    width: 58,
    height: 62,
    borderRadius: 9,
    backgroundColor: "#EEF3F7",
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 10,
  },

  doctorName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#183B6B",
    marginBottom: 3,
  },

  specialty: {
    fontSize: 11,
    color: "#64748B",
    marginBottom: 3,
  },

  fee: {
    fontSize: 10,
    color: "#64748B",
  },

  /*
  |--------------------------------------------------------------------------
  | Section
  |--------------------------------------------------------------------------
  */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
    gap: 6,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#183B6B",
  },

  /*
  |--------------------------------------------------------------------------
  | Month navigation
  |--------------------------------------------------------------------------
  */

  monthHeader: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F4",
    marginBottom: 7,
  },

  monthTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#26364A",
  },

  monthArrow: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  /*
  |--------------------------------------------------------------------------
  | Weekdays
  |--------------------------------------------------------------------------
  */

  weekRow: {
    flexDirection: "row",
    marginBottom: 3,
  },

  weekDay: {
    width: "14.285%",
    textAlign: "center",
    fontSize: 9,
    color: "#8A94A6",
    fontWeight: "500",
  },

  /*
  |--------------------------------------------------------------------------
  | Calendar
  |--------------------------------------------------------------------------
  */

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
  },

  calendarDay: {
    width: "14.285%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedCalendarDay: {
    width: "14.285%",
    height: 30,
  },

  calendarDateText: {
    fontSize: 10,
    color: "#344054",
    width: 25,
    height: 25,
    textAlign: "center",
    textAlignVertical: "center",
  },

  selectedCalendarDateText: {
    backgroundColor: "#16A86B",
    color: "#FFFFFF",
    width: 25,
    height: 25,
    borderRadius: 13,
    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
    fontWeight: "700",
  },

  disabledCalendarDay: {
    opacity: 0.35,
  },

  disabledCalendarDateText: {
    color: "#B8C0CA",
  },

  /*
  |--------------------------------------------------------------------------
  | Time slots
  |--------------------------------------------------------------------------
  */

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },

  timeSlot: {
    width: "31.5%",
    minHeight: 37,
    borderWidth: 1,
    borderColor: "#DCE3E9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  selectedTimeSlot: {
    backgroundColor: "#16A86B",
    borderColor: "#16A86B",
  },

  disabledTimeSlot: {
    backgroundColor: "#F7F8F9",
    borderColor: "#E8EBEE",
  },

  timeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#526173",
  },

  selectedTimeText: {
    color: "#FFFFFF",
  },

  disabledTimeText: {
    color: "#B5BDC7",
  },

  /*
  |--------------------------------------------------------------------------
  | No availability
  |--------------------------------------------------------------------------
  */

  noAvailability: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEF1F4",
    borderRadius: 9,
  },

  noAvailabilityText: {
    fontSize: 11,
    color: "#8A94A6",
  },

  /*
  |--------------------------------------------------------------------------
  | Bottom button
  |--------------------------------------------------------------------------
  */

  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingTop: 9,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: "#EEF1F4",
  },

  confirmButton: {
    height: 48,
    backgroundColor: "#16A86B",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  disabledConfirmButton: {
    backgroundColor: "#A8DCC5",
  },

  buttonPressed: {
    opacity: 0.8,
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});