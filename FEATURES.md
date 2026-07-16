# Prakriti Psychological Wellness Clinic - Application Features

This document outlines the features and functionalities implemented in the Prakriti Psychological Wellness Clinic web application. The application is divided into two main parts: a patient-facing public marketing website and a secure internal admin panel.

## 🌍 Public Website (Patient-Facing)

The public website is designed to build trust, reduce anxiety for first-time visitors, and drive appointment bookings.

### 1. Home Page (`/`)
* **Hero Section:** Calming introduction with primary (Book) and secondary (Services) calls to action.
* **Trust Indicators:** Highlighted ratings (5.0 stars, 127 reviews), RCI registration, and clinical experience.
* **Services Preview:** Quick scannable cards for top service categories (Individual Therapy, Relationship & Family, etc.).
* **Doctor Intro:** A warm "Meet the Doctor" section highlighting Dr. Prakriti Sinha's empathetic approach.
* **Testimonials:** A showcase of patient reviews to build credibility and comfort.

### 2. Services Page (`/services`)
* **Categorized Offerings:** Services are grouped logically (e.g., Anxiety Treatment under Individual Therapy, EMDR under Specialized Clinical).
* **Therapy Explainers:** Plain-language explanations of clinical terms like CBT (Cognitive Behavioral Therapy) and EMDR to demystify treatments for patients.

### 3. About Page (`/about`)
* **Professional Profile:** Detailed breakdown of Dr. Sinha's credentials, qualifications, and affiliations.
* **Therapeutic Philosophy:** A warm, first-person narrative explaining the clinic's non-judgmental and personalized approach to healing.

### 4. Contact & FAQ (`/contact`)
* **Clinic Details:** Clear display of location, operating hours, phone number, and email.
* **FAQ Section:** Addresses common patient anxieties regarding confidentiality, session duration, and what to expect during the first visit.

### 5. Multi-Step Appointment Booking (`/book`)
* **Step 1 - Concern Selection:** Patients choose the service/category they need help with.
* **Step 2 - Date & Time:** Patients select a preferred date and available time slot.
* **Step 3 - Patient Details:** Collection of essential contact info (Name, Phone, Email) and a brief optional note. Features a toggle for new vs. returning patients.
* **Privacy-First Design:** Clear reassurance microcopy throughout the flow stating that all data is strictly confidential. No online payment is collected here (payment is handled in-person).

---

## 🔒 Admin Panel (Clinic Staff & Doctor)

A secure portal to manage the clinic's daily operations and patient pipeline.

### 1. Authentication (`/admin/login`)
* **Secure Login:** JWT-based authentication for clinic staff.
* **Role-Based Access:** Differentiates between 'ADMIN' (Doctor) and 'STAFF' (Receptionist) roles.

### 2. Dashboard Home (`/admin/dashboard`)
* **Quick Stats:** At-a-glance metrics showing Today's Appointments, Pending Requests, and Total Bookings.
* **Recent Requests:** A quick summary list of the most recent appointment requests.

### 3. Appointment Management (`/admin/appointments`)
* **List View:** A comprehensive table of all appointment requests with patient contact details, dates, and times.
* **Status Updates:** Staff can change the status of any appointment (Pending, Confirmed, Completed, Cancelled, No-show) to track the patient journey.

---

## 🎨 Design & UX Architecture

* **Calming Color Palette:** Uses muted forest greens (sage), warm cream/sand backgrounds, and charcoal text instead of harsh pure whites/blacks. Avoids anxiety-triggering colors like bright red or clinical blue.
* **Typography:** Uses "Fraunces" (a warm serif) for headings to convey expertise and humanity, paired with "Inter" (a clean sans-serif) for highly readable body text.
* **Mobile-First Responsiveness:** Fully optimized for mobile users, recognizing that most local searches occur on smartphones.

---

## 🛠️ Technical Stack (Prototype)

* **Frontend:** React 19 (via Vite), React Router DOM for routing.
* **Styling:** Tailwind CSS v4 with custom theme configuration.
* **Backend:** Express.js (Node.js) server running concurrently with the frontend.
* **Data Storage:** Currently using an in-memory mock database for rapid prototyping (ready to be swapped with PostgreSQL/Prisma in a production environment).
