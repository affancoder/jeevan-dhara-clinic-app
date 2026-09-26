# Jeevan Dhara Clinic 🏥

A modern mobile healthcare application built with **React Native and Expo** for discovering doctors, viewing doctor profiles, managing appointments, notifications, and patient information.

This is my **first mobile application built independently using React Native + Expo**.

---

## 👨‍💻 Developer

**MD AFFAN ASGHAR**  
B.Tech (CSE) | Full-Stack Web Developer

I designed and developed this application from scratch while learning and applying React Native, Expo, Expo Router, TypeScript, and mobile UI development.

---

## 📱 About the Application

**Jeevan Dhara Clinic** is a doctor appointment booking application designed to provide patients with a simple way to:

- Create an account
- Log in securely
- Find doctors
- Browse doctor categories
- View doctor profiles
- Check doctor experience and ratings
- View consultation fees
- Check doctor availability
- Book appointments
- Manage appointments
- Receive notifications
- Submit feedback and ratings
- Manage their profile

The application is currently being developed with a **backend-ready architecture**, so static UI data can later be replaced with data received from the backend API and database.

---

## ✨ Main Features

### 🔐 Authentication

- Splash screen
- User registration
- Login
- Forgot password
- OTP login flow
- Mobile number / email support

### 🏥 Doctor Discovery

- Doctor categories
- Cardiology
- Dermatology
- Pediatrics
- Gynecology
- Orthopedics
- ENT
- Neurology
- General Physician
- Doctor search
- Doctor availability

### 👨‍⚕️ Doctor Profiles

Each doctor profile can display:

- Doctor image
- Name
- Specialization
- Experience
- Rating
- Reviews
- Consultation fee
- Languages
- About doctor
- Clinic location
- Availability status

The doctor profile is structured so these values can later be loaded directly from the backend. :contentReference[oaicite:0]{index=0}

### 📅 Appointment System

- Select doctor
- Select appointment date
- Select available time slot
- Confirm appointment
- Appointment confirmation
- View upcoming appointments
- Manage appointment status

### 🔔 Notifications

- Appointment confirmation
- Appointment reminders
- Appointment completion
- Feedback notifications
- Clinic updates
- Mark notification as read
- Mark all notifications as read
- Delete notifications

### ⭐ Ratings & Feedback

- Rate doctors
- Submit feedback
- View previous feedback

### 👤 Patient Profile

- Personal information
- Change password
- My appointments
- My feedback
- Support & help
- Logout

---

## 🛠️ Technology Stack

### Mobile Application

- React Native
- Expo
- Expo Router
- TypeScript
- JavaScript
- React

### UI & Icons

- React Native StyleSheet
- Lucide React Native

### Navigation

- Expo Router
- File-based routing

### Backend

Backend integration is planned so application data can eventually be retrieved from a database instead of hardcoded mock data.

---

## 📂 Project Structure

```text
my-app/
│
├── src/
│   └── app/
│       ├── index.tsx
│       ├── Login.tsx
│       ├── Registration.tsx
│       ├── ForgotPassword.tsx
│       ├── Home.tsx
│       ├── DoctorCategories.tsx
│       ├── DoctorList.tsx
│       ├── DoctorProfile.tsx
│       ├── AppointmentBooking.tsx
│       ├── AppointmentConfirmed.tsx
│       ├── MyAppointments.tsx
│       ├── RatingFeedback.tsx
│       ├── Notifications.tsx
│       └── Profile.tsx
│
├── assets/
│   └── images/
│
├── package.json
├── app.json
├── eas.json
└── README.md