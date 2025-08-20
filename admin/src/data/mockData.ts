export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  notes: string;
  createdAt: string;
  lastVisit?: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number; // en minutos
  type: 'consultation' | 'follow-up' | 'evaluation' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  reason: string;
  price: number;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  appointmentId?: string;
}

export interface DailySchedule {
  date: string;
  timeSlots: TimeSlot[];
}

export interface PsychologistProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  licenseNumber: string;
  experience: number;
  bio: string;
  education: string[];
  certifications: string[];
  price: number;
  workingHours: {
    [key: string]: { start: string; end: string; isWorking: boolean };
  };
}

// Mock de pacientes
export const mockPatients: Patient[] = [
  {
    id: "p1",
    firstName: "María",
    lastName: "García López",
    email: "maria.garcia@email.com",
    phone: "+52 55 1234 5678",
    dateOfBirth: "1990-05-15",
    emergencyContact: {
      name: "Juan García",
      phone: "+52 55 8765 4321",
      relationship: "Esposo"
    },
    medicalHistory: ["Ansiedad", "Episodio depresivo previo"],
    notes: "Paciente muy colaborativa, responde bien a terapia cognitivo-conductual",
    createdAt: "2024-01-15T10:00:00Z",
    lastVisit: "2024-08-15T15:30:00Z",
    status: "active"
  },
  {
    id: "p2",
    firstName: "Carlos",
    lastName: "Rodríguez Pérez",
    email: "carlos.rodriguez@email.com",
    phone: "+52 55 2345 6789",
    dateOfBirth: "1985-03-22",
    emergencyContact: {
      name: "Ana Rodríguez",
      phone: "+52 55 9876 5432",
      relationship: "Hermana"
    },
    medicalHistory: ["TDAH", "Problemas de atención"],
    notes: "Requiere estrategias específicas para manejo de atención",
    createdAt: "2024-02-20T09:15:00Z",
    lastVisit: "2024-08-10T11:00:00Z",
    status: "active"
  },
  {
    id: "p3",
    firstName: "Ana",
    lastName: "Martínez Silva",
    email: "ana.martinez@email.com",
    phone: "+52 55 3456 7890",
    dateOfBirth: "1992-07-08",
    emergencyContact: {
      name: "Luis Martínez",
      phone: "+52 55 1111 2222",
      relationship: "Padre"
    },
    medicalHistory: ["Trastorno de estrés postraumático"],
    notes: "Trauma reciente, requiere abordaje cuidadoso",
    createdAt: "2024-03-10T14:20:00Z",
    lastVisit: "2024-08-18T16:45:00Z",
    status: "active"
  },
  {
    id: "p4",
    firstName: "Roberto",
    lastName: "López Hernández",
    email: "roberto.lopez@email.com",
    phone: "+52 55 4567 8901",
    dateOfBirth: "1988-11-30",
    emergencyContact: {
      name: "Carmen López",
      phone: "+52 55 3333 4444",
      relationship: "Madre"
    },
    medicalHistory: ["Trastorno bipolar", "Episodios maníacos"],
    notes: "Paciente estable con medicación, sesiones de seguimiento",
    createdAt: "2024-04-05T11:30:00Z",
    lastVisit: "2024-08-12T13:15:00Z",
    status: "active"
  },
  {
    id: "p5",
    firstName: "Patricia",
    lastName: "González Morales",
    email: "patricia.gonzalez@email.com",
    phone: "+52 55 5678 9012",
    dateOfBirth: "1995-09-12",
    emergencyContact: {
      name: "Miguel González",
      phone: "+52 55 5555 6666",
      relationship: "Novio"
    },
    medicalHistory: ["Trastorno de ansiedad social"],
    notes: "Primera vez en terapia, muy motivada al cambio",
    createdAt: "2024-07-15T16:00:00Z",
    status: "pending"
  }
];

// Mock de citas
export const mockAppointments: Appointment[] = [
  {
    id: "a1",
    patientId: "p1",
    patientName: "María García López",
    date: "2024-08-20",
    time: "09:00",
    duration: 60,
    type: "consultation",
    status: "scheduled",
    reason: "Sesión de seguimiento - Manejo de ansiedad",
    price: 800,
    paymentStatus: "paid"
  },
  {
    id: "a2",
    patientId: "p2",
    patientName: "Carlos Rodríguez Pérez",
    date: "2024-08-20",
    time: "11:00",
    duration: 60,
    type: "follow-up",
    status: "scheduled",
    reason: "Evaluación de progreso TDAH",
    price: 800,
    paymentStatus: "pending"
  },
  {
    id: "a3",
    patientId: "p3",
    patientName: "Ana Martínez Silva",
    date: "2024-08-20",
    time: "15:00",
    duration: 90,
    type: "consultation",
    status: "scheduled",
    reason: "Terapia EMDR para PTSD",
    price: 1200,
    paymentStatus: "paid"
  },
  {
    id: "a4",
    patientId: "p1",
    patientName: "María García López",
    date: "2024-08-21",
    time: "10:00",
    duration: 60,
    type: "follow-up",
    status: "scheduled",
    reason: "Revisión de técnicas de relajación",
    price: 800,
    paymentStatus: "pending"
  },
  {
    id: "a5",
    patientId: "p4",
    patientName: "Roberto López Hernández",
    date: "2024-08-21",
    time: "14:00",
    duration: 60,
    type: "consultation",
    status: "scheduled",
    reason: "Monitoreo de estado anímico",
    price: 800,
    paymentStatus: "paid"
  },
  {
    id: "a6",
    patientId: "p5",
    patientName: "Patricia González Morales",
    date: "2024-08-22",
    time: "09:30",
    duration: 60,
    type: "evaluation",
    status: "scheduled",
    reason: "Primera evaluación psicológica",
    price: 1000,
    paymentStatus: "pending"
  },
  {
    id: "a7",
    patientId: "p2",
    patientName: "Carlos Rodríguez Pérez",
    date: "2024-08-22",
    time: "16:00",
    duration: 60,
    type: "consultation",
    status: "scheduled",
    reason: "Estrategias de concentración",
    price: 800,
    paymentStatus: "paid"
  },
  {
    id: "a8",
    patientId: "p3",
    patientName: "Ana Martínez Silva",
    date: "2024-08-23",
    time: "11:30",
    duration: 60,
    type: "follow-up",
    status: "scheduled",
    reason: "Seguimiento post-trauma",
    price: 800,
    paymentStatus: "pending"
  }
];

// Mock del perfil del psicólogo
export const mockPsychologistProfile: PsychologistProfile = {
  id: "psy1",
  firstName: "María",
  lastName: "González",
  email: "dra.gonzalez@psysync.com",
  phone: "+52 55 1234 5678",
  specialty: "Psicología Clínica",
  licenseNumber: "PSY-12345678",
  experience: 8,
  bio: "Especialista en terapia cognitivo-conductual con amplia experiencia en el tratamiento de trastornos de ansiedad y depresión.",
  education: [
    "Licenciatura en Psicología - UNAM",
    "Maestría en Psicología Clínica - Universidad Iberoamericana",
    "Especialización en TCC - Instituto Beck"
  ],
  certifications: [
    "Certificación en Terapia Cognitivo-Conductual",
    "Especialización en EMDR",
    "Certificación en Mindfulness"
  ],
  price: 800,
  workingHours: {
    monday: { start: "09:00", end: "18:00", isWorking: true },
    tuesday: { start: "09:00", end: "18:00", isWorking: true },
    wednesday: { start: "09:00", end: "18:00", isWorking: true },
    thursday: { start: "09:00", end: "18:00", isWorking: true },
    friday: { start: "09:00", end: "17:00", isWorking: true },
    saturday: { start: "09:00", end: "14:00", isWorking: true },
    sunday: { start: "00:00", end: "00:00", isWorking: false }
  }
};

// Generar horarios para el mes actual
export const generateMockSchedule = (): DailySchedule[] => {
  const schedules: DailySchedule[] = [];
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(today.getFullYear(), today.getMonth(), day);
    const dateString = currentDate.toISOString().split('T')[0];
    const dayOfWeek = currentDate.getDay();
    
    // No trabajar domingos
    if (dayOfWeek === 0) {
      schedules.push({
        date: dateString,
        timeSlots: []
      });
      continue;
    }
    
    const timeSlots: TimeSlot[] = [];
    const workingHours = mockPsychologistProfile.workingHours;
    const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];
    
    if (workingHours[dayName].isWorking) {
      const startHour = parseInt(workingHours[dayName].start.split(':')[0]);
      const endHour = parseInt(workingHours[dayName].end.split(':')[0]);
      
      for (let hour = startHour; hour < endHour; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        const slotId = `slot_${dateString}_${hour}`;
        
        // Verificar si hay una cita programada en este horario
        const hasAppointment = mockAppointments.find(apt => 
          apt.date === dateString && apt.time === timeString
        );
        
        timeSlots.push({
          id: slotId,
          startTime: timeString,
          endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
          isAvailable: !hasAppointment,
          appointmentId: hasAppointment?.id
        });
      }
    }
    
    schedules.push({
      date: dateString,
      timeSlots
    });
  }
  
  return schedules;
};

// Funciones de utilidad para filtros y búsquedas
export const searchPatients = (patients: Patient[], query: string): Patient[] => {
  if (!query.trim()) return patients;
  
  const lowercaseQuery = query.toLowerCase();
  return patients.filter(patient => 
    patient.firstName.toLowerCase().includes(lowercaseQuery) ||
    patient.lastName.toLowerCase().includes(lowercaseQuery) ||
    patient.email.toLowerCase().includes(lowercaseQuery) ||
    patient.phone.includes(query)
  );
};

export const filterAppointmentsByDateRange = (
  appointments: Appointment[], 
  startDate: string, 
  endDate: string
): Appointment[] => {
  return appointments.filter(apt => apt.date >= startDate && apt.date <= endDate);
};

export const getAppointmentsByStatus = (
  appointments: Appointment[], 
  status: Appointment['status']
): Appointment[] => {
  return appointments.filter(apt => apt.status === status);
};

export const getTodaysAppointments = (appointments: Appointment[]): Appointment[] => {
  const today = new Date().toISOString().split('T')[0];
  return appointments.filter(apt => apt.date === today);
};

export const getWeeklyStats = (appointments: Appointment[]) => {
  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  const weekEnd = new Date(today.setDate(weekStart.getDate() + 6));
  
  const weeklyAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate >= weekStart && aptDate <= weekEnd;
  });
  
  return {
    total: weeklyAppointments.length,
    completed: weeklyAppointments.filter(apt => apt.status === 'completed').length,
    scheduled: weeklyAppointments.filter(apt => apt.status === 'scheduled').length,
    cancelled: weeklyAppointments.filter(apt => apt.status === 'cancelled').length,
    revenue: weeklyAppointments
      .filter(apt => apt.paymentStatus === 'paid')
      .reduce((sum, apt) => sum + apt.price, 0)
  };
};