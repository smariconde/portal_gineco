import type {
  CheckIn,
  ClinicalCase,
  ForumMessage,
  ForumThread,
  Grade,
  Location,
  User,
} from "@/lib/types";

/* ----------------------------- Usuarios ----------------------------- */

export const mockUsers: User[] = [
  {
    id: "stu-1",
    fullName: "María Belén Romero",
    email: "mromero@mi.unc.edu.ar",
    role: "student",
    studentId: "39.842.117",
    tutorId: "tut-1",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "stu-2",
    fullName: "Lucía Paz Fernández",
    email: "lfernandez@mi.unc.edu.ar",
    role: "student",
    studentId: "40.115.902",
    tutorId: "tut-1",
    avatarUrl: "https://i.pravatar.cc/150?img=48",
  },
  {
    id: "stu-3",
    fullName: "Tomás Agustín Heredia",
    email: "theredia@mi.unc.edu.ar",
    role: "student",
    studentId: "39.998.211",
    tutorId: "tut-2",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "stu-4",
    fullName: "Camila Soledad Ortiz",
    email: "cortiz@mi.unc.edu.ar",
    role: "student",
    studentId: "40.330.108",
    tutorId: "tut-1",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "tut-1",
    fullName: "Dra. Verónica Aguirre",
    email: "vaguirre@fcm.unc.edu.ar",
    role: "teacher",
    avatarUrl: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: "tut-2",
    fullName: "Dr. Federico Maldonado",
    email: "fmaldonado@fcm.unc.edu.ar",
    role: "teacher",
    avatarUrl: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: "adm-1",
    fullName: "Prof. Dra. Mariana Cabral",
    email: "mcabral@fcm.unc.edu.ar",
    role: "admin",
    avatarUrl: "https://i.pravatar.cc/150?img=49",
  },
];

export const currentStudent = mockUsers.find((u) => u.id === "stu-1")!;
export const currentTutor = mockUsers.find((u) => u.id === "tut-1")!;
export const currentAdmin = mockUsers.find((u) => u.id === "adm-1")!;

/* ------------------------- Lugares de rotación ------------------------- */

export const mockLocations: Location[] = [
  {
    id: "loc-aula",
    name: "Aula Cátedra",
    description: "Aula de teóricos — 2do piso, ala norte.",
    qrCode: "GINECO-AULA-2026",
    active: true,
    createdAt: "2026-03-01T08:00:00Z",
  },
  {
    id: "loc-quirofano",
    name: "Quirófano",
    description: "Quirófano central, planta baja.",
    qrCode: "GINECO-QX-2026",
    active: true,
    createdAt: "2026-03-01T08:00:00Z",
  },
  {
    id: "loc-consultorio",
    name: "Consultorio Externo",
    description: "Consultorios de planta baja, ala oeste.",
    qrCode: "GINECO-CE-2026",
    active: true,
    createdAt: "2026-03-01T08:00:00Z",
  },
  {
    id: "loc-partos",
    name: "Sala de Partos",
    description: "Sector de partos — 1er piso.",
    qrCode: "GINECO-SP-2026",
    active: true,
    createdAt: "2026-03-01T08:00:00Z",
  },
  {
    id: "loc-guardia",
    name: "Guardia",
    description: "Guardia 24 hs — planta baja.",
    qrCode: "GINECO-GD-2026",
    active: true,
    createdAt: "2026-03-01T08:00:00Z",
  },
  {
    id: "loc-internado",
    name: "Internación",
    description: "Internación obstétrica — 3er piso.",
    qrCode: "GINECO-INT-2026",
    active: false,
    createdAt: "2026-03-01T08:00:00Z",
  },
];

/* ----------------------------- Check-ins ----------------------------- */

export const mockCheckIns: CheckIn[] = [
  { id: "ci-1", studentId: "stu-1", locationId: "loc-aula", scannedAt: "2026-03-12T08:05:00Z" },
  { id: "ci-2", studentId: "stu-1", locationId: "loc-consultorio", scannedAt: "2026-03-14T09:30:00Z" },
  { id: "ci-3", studentId: "stu-1", locationId: "loc-quirofano", scannedAt: "2026-03-19T07:45:00Z" },
  { id: "ci-4", studentId: "stu-1", locationId: "loc-partos", scannedAt: "2026-03-26T22:10:00Z" },
  { id: "ci-5", studentId: "stu-1", locationId: "loc-guardia", scannedAt: "2026-04-02T19:20:00Z" },
  { id: "ci-6", studentId: "stu-1", locationId: "loc-aula", scannedAt: "2026-04-09T08:02:00Z" },
  { id: "ci-7", studentId: "stu-1", locationId: "loc-consultorio", scannedAt: "2026-04-16T09:15:00Z" },
  { id: "ci-8", studentId: "stu-1", locationId: "loc-quirofano", scannedAt: "2026-04-23T07:50:00Z" },
  // otras alumnas
  { id: "ci-9", studentId: "stu-2", locationId: "loc-aula", scannedAt: "2026-03-12T08:08:00Z" },
  { id: "ci-10", studentId: "stu-2", locationId: "loc-partos", scannedAt: "2026-03-21T03:00:00Z" },
  { id: "ci-11", studentId: "stu-2", locationId: "loc-quirofano", scannedAt: "2026-04-02T07:30:00Z" },
  { id: "ci-12", studentId: "stu-3", locationId: "loc-consultorio", scannedAt: "2026-03-15T10:00:00Z" },
  { id: "ci-13", studentId: "stu-4", locationId: "loc-aula", scannedAt: "2026-03-12T08:00:00Z" },
  { id: "ci-14", studentId: "stu-4", locationId: "loc-quirofano", scannedAt: "2026-03-26T07:40:00Z" },
];

/* ------------------------------ Casos ------------------------------ */

export const mockCases: ClinicalCase[] = [
  {
    id: "case-1",
    studentId: "stu-1",
    title: "Cesárea programada por presentación podálica",
    description:
      "Paciente de 32 años, G2P1, embarazo de término con presentación podálica franca confirmada por ecografía. Se programó cesárea segmentaria. " +
      "**Hallazgos:** RN vigoroso, Apgar 9/10. Sin complicaciones intraoperatorias.\n\n" +
      "**Reflexión:** primera vez que asisto a una cesárea de cabo a rabo. Me llamó la atención la coordinación del equipo y la importancia del time-out previo. " +
      "Quiero profundizar en los criterios de elección entre cesárea y versión cefálica externa.",
    caseDate: "2026-03-19",
    locationId: "loc-quirofano",
    imageUrls: [
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=70",
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=70",
    ],
    createdAt: "2026-03-19T18:00:00Z",
    updatedAt: "2026-03-19T18:00:00Z",
  },
  {
    id: "case-2",
    studentId: "stu-1",
    title: "Control prenatal — embarazo de bajo riesgo (28 sem)",
    description:
      "Paciente de 27 años, primigesta, cursando 28 semanas. Control prenatal de rutina en consultorio externo. " +
      "**Examen:** TA 110/70, FCF 144, AU acorde. Sin edemas ni proteinuria.\n\n" +
      "Se solicita PTOG y serologías de tercer trimestre. Se refuerza educación sobre signos de alarma.",
    caseDate: "2026-03-14",
    locationId: "loc-consultorio",
    imageUrls: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=70",
    ],
    createdAt: "2026-03-14T12:30:00Z",
    updatedAt: "2026-03-14T12:30:00Z",
  },
  {
    id: "case-3",
    studentId: "stu-1",
    title: "Parto vaginal eutócico — multípara",
    description:
      "Paciente de 34 años, G3P2, trabajo de parto espontáneo a las 39+4 semanas. " +
      "**Evolución:** dilatación completa en 4 hs, expulsivo de 12 minutos. RN femenino 3.250 g, Apgar 9/10.\n\n" +
      "**Reflexión:** muy emocionante presenciar un parto natural. Pude practicar maniobra de Ritgen guiada por la obstetra.",
    caseDate: "2026-03-26",
    locationId: "loc-partos",
    imageUrls: [
      "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=70",
    ],
    createdAt: "2026-03-26T23:50:00Z",
    updatedAt: "2026-03-26T23:50:00Z",
  },
  {
    id: "case-4",
    studentId: "stu-1",
    title: "Amenaza de parto pretérmino — guardia",
    description:
      "Paciente de 22 años, 32 semanas, ingresa a guardia con dinámica uterina regular. " +
      "Se indica útero-inhibición con nifedipina y maduración pulmonar con betametasona. Estabilización exitosa, alta a las 48 hs.",
    caseDate: "2026-04-02",
    locationId: "loc-guardia",
    imageUrls: [],
    createdAt: "2026-04-02T22:00:00Z",
    updatedAt: "2026-04-02T22:00:00Z",
  },
  {
    id: "case-5",
    studentId: "stu-1",
    title: "Ecografía obstétrica — biometría 20 sem",
    description:
      "Paciente de 29 años, scan morfológico. Biometría acorde a EG. ILA normal. Placenta anterior, no previa. " +
      "Sin malformaciones detectables. Pude identificar las 4 cámaras cardíacas y los grandes vasos.",
    caseDate: "2026-04-16",
    locationId: "loc-consultorio",
    imageUrls: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=70",
      "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?w=800&q=70",
    ],
    createdAt: "2026-04-16T11:00:00Z",
    updatedAt: "2026-04-16T11:00:00Z",
  },
  // casos de otras alumnas (para dashboard tutor)
  {
    id: "case-6",
    studentId: "stu-2",
    title: "Histerectomía abdominal por miomatosis",
    description: "Paciente de 48 años con miomatosis sintomática. Asistí en quirófano con la Dra. Aguirre.",
    caseDate: "2026-04-02",
    locationId: "loc-quirofano",
    imageUrls: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=70",
    ],
    createdAt: "2026-04-02T15:00:00Z",
    updatedAt: "2026-04-02T15:00:00Z",
  },
  {
    id: "case-7",
    studentId: "stu-4",
    title: "Cesárea de urgencia por SFA",
    description: "Paciente de 26 años con DIPS II persistente. Cesárea de urgencia con buen resultado neonatal.",
    caseDate: "2026-03-26",
    locationId: "loc-quirofano",
    imageUrls: [],
    createdAt: "2026-03-26T16:00:00Z",
    updatedAt: "2026-03-26T16:00:00Z",
  },
];

/* ------------------------------ Foro ------------------------------ */

export const mockForumThreads: ForumThread[] = [
  {
    id: "thr-1",
    studentId: "stu-1",
    tutorId: "tut-1",
    lastMessageAt: "2026-04-24T18:32:00Z",
    unreadForStudent: 0,
    unreadForTutor: 1,
  },
  {
    id: "thr-2",
    studentId: "stu-2",
    tutorId: "tut-1",
    lastMessageAt: "2026-04-22T10:00:00Z",
    unreadForStudent: 1,
    unreadForTutor: 0,
  },
  {
    id: "thr-3",
    studentId: "stu-4",
    tutorId: "tut-1",
    lastMessageAt: "2026-04-20T09:15:00Z",
    unreadForStudent: 0,
    unreadForTutor: 0,
  },
];

export const mockForumMessages: ForumMessage[] = [
  {
    id: "msg-1",
    threadId: "thr-1",
    authorId: "tut-1",
    body: "Hola María, ¡bienvenida a la rotación! Cualquier duda me escribís por acá.",
    createdAt: "2026-03-12T09:00:00Z",
  },
  {
    id: "msg-2",
    threadId: "thr-1",
    authorId: "stu-1",
    body: "¡Gracias Dra! Ya cargué mi primer caso del consultorio externo.",
    createdAt: "2026-03-14T13:00:00Z",
  },
  {
    id: "msg-3",
    threadId: "thr-1",
    authorId: "tut-1",
    body: "Excelente reflexión la del caso de cesárea. Te dejo bibliografía sobre versión cefálica externa para que profundices.",
    createdAt: "2026-03-20T19:00:00Z",
  },
  {
    id: "msg-4",
    threadId: "thr-1",
    authorId: "stu-1",
    body: "Lo voy a leer esta semana. ¿Podemos discutirlo el viernes en el ateneo?",
    createdAt: "2026-03-21T08:30:00Z",
  },
  {
    id: "msg-5",
    threadId: "thr-1",
    authorId: "tut-1",
    body: "Dale, lo agendamos. Te voy a pedir además que prepares un breve resumen del caso de APP.",
    createdAt: "2026-04-24T18:32:00Z",
  },
];

/* ------------------------------ Notas ------------------------------ */

export const mockGrades: Grade[] = [
  {
    studentId: "stu-1",
    exam: 8,
    conceptual: 9,
    ai: null,
    status: "pending",
  },
  {
    studentId: "stu-2",
    exam: 7,
    conceptual: 8,
    ai: 8.2,
    aiJustification:
      "Participación destacada en el foro y portafolio con 6 casos bien documentados. Reflexiones de calidad media-alta. Rotaciones completas.",
    status: "promoted",
  },
  {
    studentId: "stu-3",
    exam: 6,
    conceptual: null,
    ai: null,
    status: "pending",
  },
  {
    studentId: "stu-4",
    exam: 9,
    conceptual: 9,
    ai: null,
    status: "pending",
  },
];
