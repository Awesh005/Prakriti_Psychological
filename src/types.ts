export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
};

export type Service = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  rating: number;
  approved: boolean;
};

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show';

export type Appointment = {
  id: string;
  serviceId: string;
  date: string; // ISO string
  timeSlot: string; // e.g. "10:00 AM"
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  isNewPatient: boolean;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
};

export type UserRole = 'ADMIN' | 'STAFF';

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};
