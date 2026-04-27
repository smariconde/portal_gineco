/**
 * Tipos compartidos del dominio Portal Gineco.
 * Estos tipos están diseñados para mapear 1-a-1 con el schema de Supabase
 * que se va a crear en la Fase 2.
 */

export type Role = "student" | "teacher" | "admin";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  /** Solo para alumnos: tutor asignado */
  tutorId?: string;
  /** Solo para alumnos: legajo / matrícula UNC */
  studentId?: string;
}

/** Lugar físico de rotación clínica donde se escanea QR */
export interface Location {
  id: string;
  name: string;
  description?: string;
  /** Código del QR — generalmente UUID o slug. Lo que el QR codifica. */
  qrCode: string;
  active: boolean;
  createdAt: string;
}

/** Registro de presencia escaneando el QR */
export interface CheckIn {
  id: string;
  studentId: string;
  locationId: string;
  scannedAt: string;
}

/** Caso clínico del portafolio del alumno */
export interface ClinicalCase {
  id: string;
  studentId: string;
  title: string;
  description: string; // markdown
  caseDate: string;
  locationId?: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

/** Mensaje del foro privado alumno↔tutor */
export interface ForumMessage {
  id: string;
  threadId: string; // par alumno-tutor
  authorId: string;
  body: string;
  attachments?: { name: string; url: string }[];
  createdAt: string;
}

export interface ForumThread {
  id: string;
  studentId: string;
  tutorId: string;
  lastMessageAt: string;
  unreadForStudent: number;
  unreadForTutor: number;
}

export interface Grade {
  studentId: string;
  /** Nota del parcial escrito (0-10) */
  exam: number | null;
  /** Nota conceptual ingresada por el docente (0-10) */
  conceptual: number | null;
  /** Nota generada por IA (0-10) */
  ai: number | null;
  /** Justificación textual de la IA */
  aiJustification?: string;
  /** Estado de promoción derivado */
  status: "pending" | "promoted" | "regular" | "failed";
}
