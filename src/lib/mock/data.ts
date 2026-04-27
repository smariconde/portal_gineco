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
    id: "loc-qx",
    name: "Quirófano de Ginecología",
    description: "Quirófano central, planta baja.",
    qrCode: "GINECO-QX-2026",
    active: true,
    createdAt: "2026-03-01T08:00:00Z",
  },
  {
    id: "loc-ce",
    name: "Consultorio Externo de Ginecología",
    description: "Consultorios de planta baja, ala oeste.",
    qrCode: "GINECO-CE-2026",
    active: true,
    createdAt: "2026-03-01T08:00:00Z",
  },
  {
    id: "loc-colpo",
    name: "Unidad de Colposcopía",
    description: "Sector de colposcopía y patología cervical — 1er piso.",
    qrCode: "GINECO-COLPO-2026",
    active: true,
    createdAt: "2026-03-01T08:00:00Z",
  },
  {
    id: "loc-guardia",
    name: "Guardia de Ginecología",
    description: "Guardia 24 hs — planta baja.",
    qrCode: "GINECO-GD-2026",
    active: true,
    createdAt: "2026-03-01T08:00:00Z",
  },
  {
    id: "loc-onco",
    name: "Oncología Ginecológica",
    description: "Servicio de oncología ginecológica — 3er piso.",
    qrCode: "GINECO-ONCO-2026",
    active: false,
    createdAt: "2026-03-01T08:00:00Z",
  },
];

/* ----------------------------- Check-ins ----------------------------- */

export const mockCheckIns: CheckIn[] = [
  { id: "ci-1", studentId: "stu-1", locationId: "loc-aula", scannedAt: "2026-03-12T08:05:00Z" },
  { id: "ci-2", studentId: "stu-1", locationId: "loc-ce", scannedAt: "2026-03-14T09:30:00Z" },
  { id: "ci-3", studentId: "stu-1", locationId: "loc-qx", scannedAt: "2026-03-19T07:45:00Z" },
  { id: "ci-4", studentId: "stu-1", locationId: "loc-colpo", scannedAt: "2026-03-26T22:10:00Z" },
  { id: "ci-5", studentId: "stu-1", locationId: "loc-guardia", scannedAt: "2026-04-02T19:20:00Z" },
  { id: "ci-6", studentId: "stu-1", locationId: "loc-aula", scannedAt: "2026-04-09T08:02:00Z" },
  { id: "ci-7", studentId: "stu-1", locationId: "loc-ce", scannedAt: "2026-04-16T09:15:00Z" },
  { id: "ci-8", studentId: "stu-1", locationId: "loc-qx", scannedAt: "2026-04-23T07:50:00Z" },
  // otras alumnas
  { id: "ci-9", studentId: "stu-2", locationId: "loc-aula", scannedAt: "2026-03-12T08:08:00Z" },
  { id: "ci-10", studentId: "stu-2", locationId: "loc-ce", scannedAt: "2026-03-21T10:00:00Z" },
  { id: "ci-11", studentId: "stu-2", locationId: "loc-qx", scannedAt: "2026-04-02T07:30:00Z" },
  { id: "ci-12", studentId: "stu-3", locationId: "loc-ce", scannedAt: "2026-03-15T10:00:00Z" },
  { id: "ci-13", studentId: "stu-4", locationId: "loc-aula", scannedAt: "2026-03-12T08:00:00Z" },
  { id: "ci-14", studentId: "stu-4", locationId: "loc-qx", scannedAt: "2026-03-26T07:40:00Z" },
];

/* ------------------------------ Casos ------------------------------ */

export const mockCases: ClinicalCase[] = [
  {
    id: "case-1",
    studentId: "stu-1",
    title: "Quiste de ovario complejo — laparotomía exploradora",
    description:
      "Paciente de 52 años, postmenopáusica desde hace 4 años, que consulta por dolor pélvico de moderada intensidad y sensación de plenitud abdominal progresiva. " +
      "**Antecedentes:** G2P2, histerectomía vaginal por prolapso a los 48 años (conservó anexos). " +
      "**Examen:** masa anexial izquierda de aproximadamente 8 cm, de consistencia mixta, con áreas quísticas y sólidas, móvil, sin signos de irritación peritoneal. " +
      "**Estudios:** ecografía transvaginal: masa anexial izquierda de 8,2 × 6,5 cm con tabiques, componente sólido y flujo vascular en Doppler. CA-125: 45 U/mL. LDH y AFP normales. " +
      "**Procedimiento:** se realiza laparotomía exploradora por sospecha de malignidad. Hallazgos: quiste seroso borderline de ovario izquierdo, sin signos de diseminación extraperitoneal. Se practica anexectomía izquierda + biopsia de epiplón + lavado peritoneal. La paciente evolucionó favorablemente. " +
      "**Histopatología:** tumor seroso borderline de ovario, sin invasión estromal. Lavado peritoneal: negativo para células malignas. " +
      "**Conducta:** derivación a oncología ginecológica para seguimiento con controles periódicos de CA-125 y ecografía.\n\n" +
      "**Reflexión:** este caso me permitió comprender la complejidad del diagnóstico diferencial entre lesiones benignas, borderline y malignas en pacientes postmenopáusicas. La correlación clínico-imagenológica es fundamental. Quiero profundizar en los criterios de riesgo de malignidad (IOTA) y el manejo conservador en pacientes jóvenes con tumores borderline.",
    caseDate: "2026-03-19",
    locationId: "loc-qx",
    imageUrls: [
      "/images/cases/case-01-ovarian-cyst.jpg",
    ],
    createdAt: "2026-03-19T18:00:00Z",
    updatedAt: "2026-03-19T18:00:00Z",
  },
  {
    id: "case-2",
    studentId: "stu-1",
    title: "HSIL (NIC II-III) — colposcopia y escisión con asa (LEEP)",
    description:
      "Paciente de 34 años, sin síntomas, derivada desde atención primaria por Papanicolaou III-B. " +
      "**Antecedentes:** G1P1, parto vaginal a los 26 años, anticoncepción con DIU de cobre desde hace 5 años. No antecedentes de infecciones de transmisión sexual documentadas. " +
      "**Colposcopia:** unión escamocolumnar completamente visible (tipo 1). Zona de transformación con áreas acetoblancas densas en labios anteriores, con signos de neoplasia de alto grado (bordes irregulares, ácido acético rápido, mosaico grueso). Vascularización atípica en áreas focales. Schiller negativo. " +
      "**Biopsia dirigida:** neoplasia intraepitelial cervical de alto grado (NIC II-III). " +
      "**Procedimiento:** escisión con asa electroquirúrgica (LEEP) bajo anestesia local (lidocaína 1% sin epinefrina en bloque cervical). Especimen de 2,5 × 1,8 cm. Hemostasia con cauterización de márgenes y aplicación de Monsel. " +
      "**Hallazgo histológico:** NIC II con márgenes quirúrgicos libres de lesión. Sin evidencia de microinvasión. " +
      "**Conducta:** seguimiento con citología a los 6 meses y colposcopia a los 12 meses.\n\n" +
      "**Reflexión:** primera vez que asisto a un procedimiento de escisión cervical. Me llamó la atención la técnica de asa y la importancia del control de sangrado post-procedimiento. Aprendí la relevancia del tamizaje y la prevención secundaria del cáncer cervicouterino mediante el Papanicolaou y la colposcopia.",
    caseDate: "2026-03-14",
    locationId: "loc-colpo",
    imageUrls: [
      "/images/cases/case-02-hsil.jpg",
    ],
    createdAt: "2026-03-14T12:30:00Z",
    updatedAt: "2026-03-14T12:30:00Z",
  },
  {
    id: "case-3",
    studentId: "stu-1",
    title: "Carcinoma de endometrio — histerectomía radical con linfadenectomía",
    description:
      "Paciente de 65 años, G3P3, postmenopáusica desde hace 12 años, que consulta por sangrado genital de repetición de 3 meses de evolución. " +
      "**Antecedentes:** HTA en tratamiento. Obesidad (IMC 32). No diabetes. Sin antecedentes oncológicos familiares. " +
      "**Examen:** tacto vaginal: cuello uterino normal, útero de tamaño normal, anexos no palpables. " +
      "**Estudios:** hemoglobina 11,2 g/dL. Ecografía transvaginal: endometrio de 18 mm, heterogéneo, con áreas quísticas. No masas anexiales. " +
      "**Biopsia endometrial (Pipelle):** adenocarcinoma endometrioide, grado 1 de diferenciación. " +
      "**Procedimiento:** histerectomía total abdominal con anexectomía bilateral + linfadenectomía pélvica + lavado peritoneal. Hallazgos macroscópicos: útero de tamaño normal, endometrio engrosado de 2 cm, miómetrio sin signos de invasión aparente. " +
      "**Histopatología:** adenocarcinoma endometrioide grado 1, invasión miometrial < 50% (FIGO IA). Linfadenectomía: 12 ganglios, todos negativos. Lavado peritoneal: negativo. " +
      "**Estadificación:** FIGO IA, grado 1. Riesgo bajo-intermedio. " +
      "**Conducta:** seguimiento con controles ginecológicos trimestrales el primer año.\n\n" +
      "**Reflexión:** impactante ver la estadificación oncológica en ginecología en vivo. Pude identificar los grupos ganglionares pélvicos (obturadorios, iliacos externos e internos) y comprender la importancia del lavado peritoneal para el estadificación completa. Este caso me hizo reflexionar sobre la relación entre obesidad, HTA y cáncer de endometrio (síndrome metabólico).",
    caseDate: "2026-03-26",
    locationId: "loc-qx",
    imageUrls: [
      "/images/cases/case-03-endometrial-cancer.jpg",
    ],
    createdAt: "2026-03-26T23:50:00Z",
    updatedAt: "2026-03-26T23:50:00Z",
  },
  {
    id: "case-4",
    studentId: "stu-1",
    title: "Endometriosis profunda — consultorio y planificación quirúrgica",
    description:
      "Paciente de 29 años, con dismenorrea severa progresiva desde los 22 años y dispareunia profunda de 2 años de evolución. " +
      "**Antecedentes:** G0P0. Antecedente de apendicectomía a los 15 años. Sin cirugías pélvicas previas. " +
      "**Examen:** tacto vaginal: útero de posición central, móvil, levemente aumentado de tamaño. Ligamentos uterosacros engrosados y dolorosos. Nódulo endometriósico palpable en fosa rectorovaginal de aproximadamente 3 cm. " +
      "**Estudios:** ecografía transvaginal: nódulos endometriósicos en ligamentos uterosacros bilaterales (izquierdo 2,8 cm, derecho 1,5 cm) y nódulo en rectorvaginal de 3,2 cm. Quiste endometriósico (endometrioma) en ovario izquierdo de 4,5 cm. " +
      "**RMN pélvica:** confirmación de endometriosis profunda con compromiso del septo rectovaginal, ligamentos uterosacros y ovario izquierdo. No compromiso ureteral ni intestinal evidente. " +
      "**Laboratorio:** CA-125: 68 U/mL. " +
      "**Conducta:** se inicia tratamiento hormonal con agonista de GnRH (leuprolide 3,75 mg mensual) por 3 meses como terapia neoadyuvante, con suplemento de calcio y vitamina D. Se programa cirugía laparoscópica con posible colaboración de cirugía colorrectal según hallazgos intraoperatorios. Se ofrece preservación de fertilidad.\n\n" +
      "**Reflexión:** muy interesante entender el abordaje multidisciplinario de la endometriosis profunda. La decisión de preservación de fertilidad es clave en pacientes jóvenes nulíparas. Quiero profundizar en la conservación de la fertilidad en endometriosis severa y las opciones de reproducción asistida post-cirugía.",
    caseDate: "2026-04-02",
    locationId: "loc-ce",
    imageUrls: [
      "/images/cases/case-04-endometriosis.jpg",
    ],
    createdAt: "2026-04-02T22:00:00Z",
    updatedAt: "2026-04-02T22:00:00Z",
  },
  {
    id: "case-5",
    studentId: "stu-1",
    title: "Prolapso genital (cistocele grado III) — cirugía reconstructiva",
    description:
      "Paciente de 58 años, G4P4, con prolapso uterovaginal completo de 2 años de evolución progresiva. " +
      "**Antecedentes:** todos partos vaginales, el mayor de 3.800 g. Sin cirugías pélvicas previas. Menopausia a los 51 años, sin tratamiento hormonal. " +
      "**Síntomas:** sensación de \"bulto\" vaginal, incontinencia urinaria de esfuerzo, disuria ocasional. Sin retención urinaria. " +
      "**Examen:** prolapso uterovaginal grado IV según POP-Q (punto C en +6 cm). Cistocele grado III. Rectocele grado II. " +
      "**Estudios:** urodinamia: incontinencia urinaria de esfuerzo genuina, sin retención. Ecografía: residuo postmiccional normal. " +
      "**Procedimiento:** colpocleisis de LeFort (paciente no desea actividad sexual preservada) + reparación anterior (colporrafia anterior con malla biológica) + reparación posterior (colporrafia posterior). Duración: 95 minutos. Sin complicaciones intraoperatorias. " +
      "**Evolución:** alta a las 48 horas. Catéter vesical retirado a las 24 horas. Micción espontánea completa.\n\n" +
      "**Reflexión:** excelente oportunidad para entender la anatomía del piso pélvico y la fisiopatología del prolapso. Pude practicar la técnica de sutura en capas guiada por la Dra. Aguirre. Me llamó la atención la importancia de la evaluación urodinámica preoperatoria para descartar incontinencia oculta.",
    caseDate: "2026-04-16",
    locationId: "loc-qx",
    imageUrls: [
      "/images/cases/case-05-prolapse.jpg",
    ],
    createdAt: "2026-04-16T11:00:00Z",
    updatedAt: "2026-04-16T11:00:00Z",
  },
  {
    id: "case-6",
    studentId: "stu-1",
    title: "Sangrado uterino anormal (SUA) por disfuncional en adolescente",
    description:
      "Paciente de 17 años, que consulta por sangrado menstrual abundante e irregular desde la menarca (a los 12 años). " +
      "**Antecedentes:** G0P0. No antecedentes médicos ni quirúrgicos relevantes. Sin antecedentes de coagulopatía familiar. No toma medicación. " +
      "**Síntomas:** ciclos irregulares (cada 20-45 días), sangrado que dura 8-10 días, con abundancia que le impide asistir a la escuela 1-2 días por mes. " +
      "**Examen:** buen estado general. PA 100/60. FC 88. No palidez mucocutánea evidente. Examen ginecológico: no realizado por menor de edad, sin actividad sexual declarada. " +
      "**Laboratorio:** hemoglobina 9,2 g/dL (anemia leve-moderada). VHS 18 mm/h. TSH normal. Pruebas de coagulación: normales. " +
      "**Ecografía abdominal:** útero y ovarios de morfología normal para edad. Endometrio de 8 mm. " +
      "**Diagnóstico:** sangrado uterino anormal (SUA) por disfunción ovulatoria en adolescente (AUB-E de la clasificación FIGO). Anemia ferropénica secundaria. " +
      "**Conducta:** inicio de anticonceptivos orales combinados (etinilestradiol 30 mcg + levonorgestrel 150 mcg) en régimen continuo por 3 meses, luego cíclico. Suplemento de hierro oral (sulfato ferroso 325 mg/día). Control en 3 meses.\n\n" +
      "**Reflexión:** caso clásico de AUB en adolescente por anovulación. Aprendí sobre los criterios diagnósticos de la clasificación FIGO-PALM-COEIN y el manejo hormonal en esta población. Refuerzo en la importancia del seguimiento de la anemia y la educación sobre signos de alarma.",
    caseDate: "2026-04-23",
    locationId: "loc-ce",
    imageUrls: [
      "/images/cases/case-06-sua.jpg",
    ],
    createdAt: "2026-04-23T14:30:00Z",
    updatedAt: "2026-04-23T14:30:00Z",
  },
  // casos de otras alumnas (para dashboard tutor)
  {
    id: "case-7",
    studentId: "stu-2",
    title: "Miomatosis uterina sintomática — histerectomía abdominal",
    description:
      "Paciente de 48 años con miomatosis uterina múltiple, metrorragias progresivas y síntomas compresivos vesicales. " +
      "**Antecedentes:** G3P3, partos vaginales. Menopausia no establecida. " +
      "**Examen:** útero aumentado de tamaño, irregular, del tamaño aproximado de 16 semanas. Anexos no palpables. " +
      "**Estudios:** ecografía: múltiples nódulos miomatosos intramusculares y subserosos, el mayor de 10 cm. Endometrio de 6 mm. " +
      "**Procedimiento:** histerectomía abdominal total. Hallazgos: útero de 800 g, múltiples miomas, el mayor de 10 × 8 cm. Sin complicaciones. " +
      "**Histopatología:** miomatosis uterina, múltiples leiomiomas. Sin evidencia de degeneración maligna.\n\n" +
      "**Reflexión:** asistí en quirófano con la Dra. Aguirre. Gran caso para entender la anatomía quirúrgica pélvica y la técnica de ligadura de los pedículos uterinos.",
    caseDate: "2026-04-02",
    locationId: "loc-qx",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/d/df/Fibroid.jpg",
    ],
    createdAt: "2026-04-02T15:00:00Z",
    updatedAt: "2026-04-02T15:00:00Z",
  },
  {
    id: "case-8",
    studentId: "stu-2",
    title: "Fibroadenoma de mama — consulta y manejo conservador",
    description:
      "Paciente de 22 años, que consulta por nódulo palpable en mama izquierda de 3 meses de evolución, indoloro. " +
      "**Antecedentes:** G0P0. Sin antecedentes oncológicos familiares. " +
      "**Examen:** nódulo en cuadrante superoexterno de mama izquierda de aproximadamente 2 cm, móvil, bien delimitado, de consistencia elástica, indoloro. No adenopatías axilares. " +
      "**Estudios:** ecografía mamaria: imagen ovalada, bien delimitada, orientación paralela, halo ecogénico, ausencia de microcalcificaciones. Categoría BI-RADS 3. " +
      "**Conducta:** seguimiento ecográfico a los 6 meses. Educación sobre autoexamen mamario.\n\n" +
      "**Reflexión:** buen caso para practicar la palpación mamaria sistemática y el manejo conservador de las lesiones benignas. Aprendí sobre los criterios BI-RADS y la importancia de la correlación clínico-imagenológica.",
    caseDate: "2026-03-21",
    locationId: "loc-ce",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Fibroadenoma_of_breast.jpg",
    ],
    createdAt: "2026-03-21T12:00:00Z",
    updatedAt: "2026-03-21T12:00:00Z",
  },
  {
    id: "case-9",
    studentId: "stu-3",
    title: "SOP (Síndrome de Ovario Poliquístico) — manejo integral",
    description:
      "Paciente de 24 años, que consulta por ciclos irregulares, aumento de peso y acné desde la adolescencia. " +
      "**Antecedentes:** G0P0. Menarca a los 11 años. Ciclos irregulares desde entonces. Sin antecedentes médicos relevantes. " +
      "**Examen:** IMC 28. Hirsutismo leve-moderado (Ferriman-Gallwey 12). Acné inflamatorio en cara y espalda. Acantosis nigricans en cuello. " +
      "**Laboratorio:** LH 14 mIU/mL, FSH 6 mIU/mL (LH/FSH > 2). Testosterona total 68 ng/dL (límite superior). DHEA-S normal. Prolactina normal. TSH normal. " +
      "**Ecografía transvaginal:** ovarios aumentados de tamaño, con >20 folículos periféricos de 2-9 mm cada uno (criterio de Rotterdam). " +
      "**Diagnóstico:** síndrome de ovario poliquístico (SOP) según criterios de Rotterdam (hiperandrogenismo + oligoanovulación + morfología poliquística). " +
      "**Conducta:** inicio de anticonceptivos orales combinados (etinilestradiol 30 mcg + drospirenona 3 mg) para regular ciclo y controlar acné. Metformina 500 mg dos veces al día para sensibilización insulínica. Plan nutricional y ejercicio. Control en 3 meses.\n\n" +
      "**Reflexión:** caso típico de SOP. Aprendí sobre los criterios diagnósticos de Rotterdam, el manejo integral (hormonal, metabólico, estético) y la importancia de la consejería sobre fertilidad futura.",
    caseDate: "2026-03-15",
    locationId: "loc-ce",
    imageUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/Polycystic_ovary.jpg",
    ],
    createdAt: "2026-03-15T12:00:00Z",
    updatedAt: "2026-03-15T12:00:00Z",
  },
  {
    id: "case-10",
    studentId: "stu-4",
    title: "Cáncer de cuello uterino (IB1) — histerectomía radical tipo Wertheim",
    description:
      "Paciente de 38 años, derivada por citología anormal (Papanicolaou IV). " +
      "**Antecedentes:** G2P2. Sin antecedentes de Papanicolaous previos regulares. " +
      "**Colposcopia:** lesión acetoblanca densa en borde externo de unión escamocolumnar, con áreas de neovascularización. Biopsia dirigida: carcinoma escamoso invasor. " +
      "**Estudios de extensión:** ecografía pélvica y abdominal: sin compromiso paramerial ni adenopatías. TAC de tórax, abdomen y pelvis: sin metástasis a distancia. " +
      "**Procedimiento:** histerectomía radical tipo Wertheim (ampliada) + linfadenectomía pélvica. Hallazgos: tumor en cuello uterino de 2,5 cm de diámetro máximo, sin compromiso de parametrios. " +
      "**Histopatología:** carcinoma escamoso moderadamente diferenciado, invasión estromal < 5 mm en profundidad, < 7 mm en extensión horizontal. Márgenes quirúrgicos libres. Linfadenectomía: 18 ganglios, todos negativos. " +
      "**Estadificación:** FIGO IB1 (T1b1 N0 M0). " +
      "**Conducta:** alta a las 72 horas. Seguimiento con controles trimestrales con citología vaginal.\n\n" +
      "**Reflexión:** caso fundamental para entender la cirugía oncológica ginecológica. Pude observar la técnica de disección de los espacios de Latzko y el manejo de los ureteres durante la histerectomía radical. Refuerzo en la importancia del tamizaje cervical.",
    caseDate: "2026-03-26",
    locationId: "loc-qx",
    imageUrls: [
      "/images/cases/case-10-cervical-cancer.jpg",
    ],
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
    body: "Hola María, bienvenida a la rotación de Ginecología II. Empezá documentando los casos de consultorio y los procedimientos que observes. Cualquier duda sobre manejo me escribís.",
    createdAt: "2026-03-12T09:00:00Z",
  },
  {
    id: "msg-2",
    threadId: "thr-1",
    authorId: "stu-1",
    body: "Gracias Dra. Ya documenté el primer caso de colposcopía con LEEP que vimos en la unidad.",
    createdAt: "2026-03-14T13:00:00Z",
  },
  {
    id: "msg-3",
    threadId: "thr-1",
    authorId: "tut-1",
    body: "Excelente descripción del caso de carcinoma de endometrio. Te dejo bibliografía sobre estadificación quirúrgica en cáncer de endometrio para que profundices.",
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
    body: "Dale, lo agendamos. Te voy a pedir además que prepares un breve resumen del caso de endometriosis profunda para la próxima reunión.",
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
      "Documentó 2 casos clínicos con descripciones detalladas y reflexiones personales coherentes. Asistencia regular a las rotaciones en los distintos sectores del servicio. Participación activa en las discusiones tutor-alumno. Combinado con la evaluación conceptual del tutor/a, se sugiere una nota de participación de 8.2/10.",
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
