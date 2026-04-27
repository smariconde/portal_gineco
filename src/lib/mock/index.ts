export * from "./data";

import {
  mockCases,
  mockCheckIns,
  mockForumMessages,
  mockForumThreads,
  mockGrades,
  mockLocations,
  mockUsers,
} from "./data";
import type { ClinicalCase, Grade } from "@/lib/types";

/* Helpers de acceso (simulan futuras queries de Supabase) */

export function getUserById(id: string) {
  return mockUsers.find((u) => u.id === id);
}

export function getLocationById(id?: string) {
  if (!id) return undefined;
  return mockLocations.find((l) => l.id === id);
}

export function getLocationByQr(qr: string) {
  return mockLocations.find((l) => l.qrCode === qr);
}

export function getCheckInsByStudent(studentId: string) {
  return [...mockCheckIns]
    .filter((c) => c.studentId === studentId)
    .sort((a, b) => b.scannedAt.localeCompare(a.scannedAt));
}

export function getCasesByStudent(studentId: string): ClinicalCase[] {
  return [...mockCases]
    .filter((c) => c.studentId === studentId)
    .sort((a, b) => b.caseDate.localeCompare(a.caseDate));
}

export function getCaseById(id: string) {
  return mockCases.find((c) => c.id === id);
}

export function getStudentsByTutor(tutorId: string) {
  return mockUsers.filter((u) => u.role === "student" && u.tutorId === tutorId);
}

export function getThreadByPair(studentId: string, tutorId: string) {
  return mockForumThreads.find(
    (t) => t.studentId === studentId && t.tutorId === tutorId
  );
}

export function getThreadsByTutor(tutorId: string) {
  return mockForumThreads.filter((t) => t.tutorId === tutorId);
}

export function getMessagesByThread(threadId: string) {
  return [...mockForumMessages]
    .filter((m) => m.threadId === threadId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function getGradeByStudent(studentId: string): Grade | undefined {
  return mockGrades.find((g) => g.studentId === studentId);
}

export function computeAverage(g?: Grade): number | null {
  if (!g || g.exam == null || g.ai == null) return null;
  return Math.round(((g.exam + g.ai) / 2) * 10) / 10;
}
