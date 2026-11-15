// Catálogo de vídeos del canal agrupados por temática.
// Cada vídeo incluye sus capítulos (con el segundo de inicio) y un resumen
// del contenido educativo, que se muestra debajo del reproductor en /video/:id.

export const YT_CHANNEL = "https://www.youtube.com/@MarkH4ck";
const PL = (id) => `https://www.youtube.com/playlist?list=${id}`;

export const CATEGORIES = [
  {
    id: "active-directory",
    name: "Active Directory",
    short: "AD",
    color: "red",
    tagline: "Pentesting de redes corporativas Windows en un lab controlado.",
    playlist: PL("PLBf436OrUdYZyxRtkFkrx1pDSNuryUSvk"),
  },
  {
    id: "reversing",
    name: "Reversing & Cracking",
    short: "RE",
    color: "green",
    tagline: "Crackmes, keygens, packers y la anatomía de un ejecutable.",
  },
  {
    id: "exploiting",
    name: "Exploiting · Computación 101",
    short: "BOF",
    color: "red",
    tagline: "Stack, buffer overflows y laboratorio de explotación en Windows.",
    playlist: PL("PLBf436OrUdYYZwCCujf8Ja5rc7MC5obOj"),
  },
  {
    id: "assembly",
    name: "Fundamentals x86 & Windows Internals",
    short: "ASM",
    color: "green",
    tagline: "Ensamblador MASM, Windows API, TEB/PEB y ASLR.",
    playlist: PL("PLBf436OrUdYZdz6srGHaoYOXdQ4LzyY_5"),
  },
  {
    id: "game-hacking",
    name: "Game Hacking",
    short: "GH",
    color: "red",
    tagline: "Cómo funcionan los cheats por dentro: memoria, overlays y ESP.",
  },
];

const t = (s) => {
  const p = s.split(":").map(Number);
  return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1];
};
const ch = (list) => list.map(([time, label]) => ({ time, start: t(time), label }));

export const VIDEOS = [
  // ───────────────────────── ACTIVE DIRECTORY ─────────────────────────
  {
    id: "QTJS-VC6iJ4",
    category: "active-directory",
    part: "Parte 1",
    title: "Explotación de redes corporativas (Active Directory + fuerza bruta)",
    date: "2026-04-15",
    length: 954,
    views: 1893,
    summary:
      "Primer vídeo de la serie de hacking ético sobre entornos Windows. Explico qué es Active Directory, el papel del controlador de dominio en una red empresarial y cómo se auditan estos entornos desde Kali Linux.",
    chapters: ch([
      ["0:00", "Introducción a la serie"],
      ["1:30", "¿Qué es Active Directory?"],
      ["5:00", "El controlador de dominio"],
      ["9:00", "Auditoría con CrackMapExec"],
      ["13:00", "Conclusiones"],
    ]),
  },
  {
    id: "hojh9oj8wiQ",
    category: "active-directory",
    part: "Parte 2",
    title: "Crea tu home lab para pentesting corporativo (Active Directory)",
    date: "2026-04-19",
    length: 1670,
    views: 239,
    summary:
      "Montaje paso a paso de un laboratorio virtual con VirtualBox: Windows Server y Windows Pro comunicados en una red aislada para practicar ciberseguridad de forma segura, sin tocar sistemas reales.",
    chapters: ch([
      ["0:00", "Introducción y objetivo del lab"],
      ["3:00", "Instalando VirtualBox"],
      ["8:00", "Windows Server + Windows Pro"],
      ["18:00", "Red interna entre máquinas"],
      ["25:00", "Escenario listo para practicar"],
    ]),
  },
  {
    id: "cikAPLPshoY",
    category: "active-directory",
    part: "Parte 3",
    title: "LLMNR Poisoning: capturando hashes NTLMv2 con Responder",
    date: "2026-11-12",
    length: 1007,
    views: 64,
    summary:
      "Cómo funciona el protocolo LLMNR en Windows, por qué puede exponer credenciales dentro de una red local y, sobre todo, cómo mitigar y proteger la infraestructura corporativa frente a esta debilidad. Todo en el home lab.",
    chapters: ch([
      ["0:00", "¿Qué es LLMNR Poisoning?"],
      ["2:50", "Configuración del laboratorio"],
      ["6:54", "Observando el tráfico en el lab"],
      ["12:42", "Mitigación y defensa (Blue Team)"],
      ["16:18", "Conclusiones"],
    ]),
  },

  // ───────────────────────── REVERSING & CRACKING ─────────────────────────
  {
    id: "A4fRQ5k6SJo",
    category: "reversing",
    title: "La mejor herramienta para ciberseguridad: Ghidra",
    date: "2025-06-25",
    length: 1471,
    views: 3777,
    summary:
      "Introducción a Ghidra, el framework gratuito de ingeniería inversa creado por la NSA. Recorro la interfaz y hago un análisis guiado de un ejecutable para iniciarte en el reverse engineering.",
    chapters: ch([
      ["0:00", "¿Qué es Ghidra?"],
      ["9:08", "Iniciando Ghidra"],
      ["11:15", "Analizando el .exe"],
      ["21:00", "Conclusión"],
    ]),
  },
  {
    id: "VDl4DA3FgWI",
    category: "reversing",
    title: "Crackea tu primer programa con ingeniería inversa (para principiantes)",
    date: "2025-07-16",
    length: 719,
    views: 58290,
    summary:
      "Tutorial de entrada al reversing: resolvemos un crackme básico de Crackmes.one paso a paso con x64dbg. Ideal si nunca has abierto un debugger.",
    chapters: ch([
      ["0:00", "Introducción"],
      ["1:30", "Cargando el crackme en x64dbg"],
      ["5:00", "Siguiendo la lógica del programa"],
      ["9:00", "Resultado final"],
    ]),
  },
  {
    id: "slNbu0a65so",
    category: "reversing",
    title: "Aprende a crackear un programa desde 0 · Crackmes.one (CTF)",
    date: "2025-10-13",
    length: 1279,
    views: 8129,
    summary:
      "Segundo tutorial de reversing: un crackme de nivel 3 con protección anti-debugger, combinando análisis dinámico con x64dbg y estático con IDA. Pensado para principiantes que quieren dar el siguiente paso.",
    chapters: ch([
      ["0:00", "Introducción y el reto"],
      ["3:00", "Análisis dinámico (x64dbg)"],
      ["10:00", "Anti-debugger"],
      ["16:00", "Análisis estático (IDA)"],
      ["21:00", "Conclusiones"],
    ]),
  },
  {
    id: "YYyjC55o7Dk",
    category: "reversing",
    title: "Todo es open source si sabes ingeniería inversa",
    date: "2025-12-01",
    length: 1477,
    views: 3397,
    summary:
      "Análisis de un crackme educativo centrado en entender un algoritmo de validación de seriales: cómo se razona la lógica para, con fines formativos, reproducir su comportamiento.",
    chapters: ch([
      ["0:00", "Introducción"],
      ["1:35", "El crackme (2ª parte)"],
      ["2:45", "Entendiendo el algoritmo"],
      ["13:00", "Reproduciendo la lógica"],
      ["21:39", "Comprobando el resultado"],
    ]),
  },
  {
    id: "l2LuTCvoC-g",
    category: "reversing",
    title: "Esto es lo que hay dentro de un archivo .EXE",
    date: "2025-12-07",
    length: 2337,
    views: 1277,
    summary:
      "Diseccionamos un ejecutable de Windows: estructura PE, headers y secciones. Una guía visual con HxD y PE-bear para entender qué contiene realmente un .exe y cómo se compila.",
    chapters: ch([
      ["0:00", "Introducción"],
      ["2:10", "Secciones"],
      ["15:52", "DOS Header"],
      ["18:16", "DOS Stub"],
      ["19:19", "PE Header"],
      ["27:27", "Optional Header"],
      ["28:35", "Section Header"],
      ["35:21", "Proceso de compilado"],
    ]),
  },
  {
    id: "jSZn_lhLGqA",
    category: "reversing",
    title: "Tu antivirus no sirve: así ocultan malware los hackers",
    date: "2025-12-15",
    length: 1334,
    views: 526,
    summary:
      "Qué son los packers (empaquetadores) y cómo se reconocen desde el punto de vista del análisis defensivo (Blue Team): identificar código empaquetado y analizarlo de forma estática con IDA Free.",
    chapters: ch([
      ["0:00", "Introducción"],
      ["1:34", "Empaquetadores (packers)"],
      ["5:21", "Unpacking en memoria"],
      ["7:15", "Análisis estático (IDA Free)"],
      ["20:56", "Conclusiones"],
    ]),
  },
  {
    id: "kx9MFW-dU9c",
    category: "reversing",
    title: "Intenté crackear este programa... ¿es imposible? (Reversing)",
    date: "2026-03-21",
    length: 1300,
    views: 642,
    summary:
      "Bases del reversing en Windows analizando la lógica de un crackme con las dos herramientas de referencia: x64dbg para análisis dinámico e IDA Pro para el estático.",
    chapters: ch([
      ["0:00", "¿Qué es la ingeniería inversa?"],
      ["0:25", "Tu primer crackme (entorno)"],
      ["3:31", "Análisis dinámico con x64dbg"],
      ["11:00", "Análisis estático"],
      ["21:00", "Conclusión y próximos pasos"],
    ]),
  },
  {
    id: "q1gmcywiW3k",
    category: "reversing",
    title: "¿Es ARM más difícil que x86? (crackme CTF con QEMU y Ghidra)",
    date: "2026-03-29",
    length: 947,
    views: 237,
    summary:
      'Resolvemos el reto "ELF ARM - Basic Crackme" de Root-Me montando un entorno de análisis en Windows con QEMU y Ghidra. Explico las diferencias clave entre ARM y x86 para no perderte en el ensamblador.',
    chapters: ch([
      ["0:00", "Introducción y el reto"],
      ["0:45", "¿Qué es ARM?"],
      ["2:28", "Analizando con HxD"],
      ["3:35", "Ejecutando ARM en Windows (QEMU)"],
      ["4:35", "Análisis con Ghidra"],
      ["8:35", "Obteniendo la key"],
    ]),
  },

  // ───────────────────────── EXPLOITING · COMPUTACIÓN 101 ─────────────────────────
  {
    id: "2xjaGZF_obk",
    category: "exploiting",
    title: "Cómo explotar un buffer overflow en Windows · Computación 101",
    date: "2025-07-10",
    length: 1857,
    views: 294,
    summary:
      "Escribimos desde cero un programa vulnerable en ensamblador para entender, a nivel de CPU y memoria, qué es un buffer overflow. Todo en un laboratorio aislado y con fines exclusivamente educativos.",
    chapters: ch([
      ["0:00", "Intro"],
      ["1:31", "Preparando el set-up"],
      ["3:53", "¿Qué es el buffer overflow?"],
      ["17:00", "Analizando el programa víctima"],
      ["27:57", "Explicación del fallo"],
    ]),
  },
  {
    id: "HGeaQPzVxkw",
    category: "exploiting",
    title: "Cómo crear un payload y entender un buffer overflow",
    date: "2025-07-14",
    length: 1296,
    views: 636,
    summary:
      "Continuación del lab anterior: cómo se razona la dirección de retorno y el flujo de ejecución con OllyDbg, para comprender de forma práctica cómo se ve una vulnerabilidad en memoria.",
    chapters: ch([
      ["0:00", "Dirección de retorno"],
      ["5:00", "Debugging con OllyDbg"],
      ["12:48", "Entendiendo el payload"],
      ["18:21", "Analizando el binario"],
      ["19:00", "Direcciones relativas"],
    ]),
  },
  {
    id: "KvApWpHzGCI",
    category: "exploiting",
    title: "Buffer overflow en VulnServer · reconocimiento con Ghidra",
    date: "2025-08-24",
    length: 1764,
    views: 411,
    summary:
      "Primer paso del desarrollo de un exploit: reconocimiento del binario de VulnServer con Ghidra. Identificamos funciones inseguras, el flujo de datos del usuario y el stack vs. heap.",
    chapters: ch([
      ["0:00", "Introducción y objetivos"],
      ["2:21", "Flujo del código"],
      ["7:05", "¿Qué es el stack y el heap?"],
      ["15:34", "Análisis estático con Ghidra"],
      ["24:07", "Bucle de comprobación de entrada"],
      ["25:05", "Punto vulnerable"],
      ["27:41", "Conclusiones"],
    ]),
  },
  {
    id: "eVeZtkNDCWY",
    category: "exploiting",
    title: "Depurando una PoC en Windows con WinDbg · msfvenom",
    date: "2025-10-06",
    length: 2080,
    views: 1104,
    summary:
      "Cómo construir y depurar una prueba de concepto sobre VulnServer con WinDbg en un lab controlado, viendo los conceptos de payload e integración con Metasploit desde el punto de vista del depurador.",
    chapters: ch([
      ["0:00", "Intro"],
      ["1:33", "Objetivo del laboratorio"],
      ["6:03", "Entorno (WinDbg + Kali)"],
      ["6:40", "Análisis dinámico (WinDbg)"],
      ["11:51", "La dirección de RET"],
      ["15:38", "Preparando EIP/ESP"],
      ["25:08", "Generando el payload con msfvenom"],
      ["27:45", "Explicación del resultado"],
    ]),
  },

  // ───────────────────────── FUNDAMENTALS x86 & INTERNALS ─────────────────────────
  {
    id: "eqtWiryKf48",
    category: "assembly",
    part: "Clase 1",
    title: "Introducción a Assembly x86 con MASM en Visual Studio",
    date: "2026-06-22",
    length: 1572,
    views: 757,
    summary:
      "Clase 1 del curso de ensamblador: por qué aprender Assembly, comparativa con C/C++, ARM vs x86 y configuración completa del entorno con Visual Studio y el Windows SDK.",
    chapters: ch([
      ["0:00", "Introducción"],
      ["1:41", "¿Qué es Assembly y por qué aprenderlo?"],
      ["8:25", "C/C++ vs Assembly"],
      ["12:25", "ARM vs x86/64"],
      ["17:46", "Configuración del entorno"],
      ["24:30", "Comprobación"],
    ]),
  },
  {
    id: "HydogSW4F8M",
    category: "assembly",
    part: "Clase 2",
    title: 'Escribe tu primer programa en ensamblador x86 ("Hola Mundo")',
    date: "2026-06-23",
    length: 1753,
    views: 420,
    summary:
      'Clase 2: programamos un "Hola Mundo" con MASM sobre x86 (32 bits) en Windows, explicando directivas, la sección .data, la sección .code y las llamadas a la Windows API.',
    chapters: ch([
      ["0:00", "Introducción al ensamblador"],
      ["2:40", "Assembly directives"],
      ["11:13", "Sección .data"],
      ["13:40", "Sección .code"],
      ["16:00", "Windows API"],
      ["23:50", 'Ejecutando "Hola Mundo"'],
      ["27:31", "Conclusiones"],
    ]),
  },
  {
    id: "Q1tfEk618K8",
    category: "assembly",
    part: "Clase 3",
    title: "Manipulación de datos: Windows API + Assembly + XOR",
    date: "2025-07-06",
    length: 1952,
    views: 310,
    summary:
      "Cómo funciona la operación XOR en ensamblador y cómo mostrar resultados por pantalla con la Windows API. Programación de bajo nivel para quienes estudian seguridad.",
    chapters: ch([
      ["0:00", "Introducción"],
      ["4:00", "Cómo funciona XOR"],
      ["12:00", "Escribiendo el código ASM"],
      ["22:00", "Mostrando datos con la Windows API"],
    ]),
  },
  {
    id: "VBcfHDGXQ38",
    category: "assembly",
    title: "¿Qué hay dentro de Windows? TEB, PEB y ASLR · Windows Internals",
    date: "2025-10-03",
    length: 2233,
    views: 401,
    summary:
      "Fundamentos de análisis de bajo nivel en Windows explicados en pizarra: el stack y la dirección de retorno, la Import Address Table, el TEB, el PEB y el papel del ASLR.",
    chapters: ch([
      ["0:00", "Introducción"],
      ["0:33", "El stack y la dirección de retorno"],
      ["8:18", "Import Address Table + loader"],
      ["11:18", "TEB y PEB (internals)"],
      ["36:15", "Próximos episodios"],
    ]),
  },

  // ───────────────────────── GAME HACKING ─────────────────────────
  {
    id: "Vce2Tli4-9s",
    category: "game-hacking",
    title: "Cómo se crean los hacks para juegos (guía para principiantes)",
    date: "2025-08-31",
    length: 443,
    views: 20606,
    summary:
      "Explicación divulgativa de cómo funcionan los cheats y trucos de videojuegos: la relación entre CPU, disco y RAM, y por qué leer y escribir memoria permite modificar el estado de un juego.",
    chapters: ch([
      ["0:00", "Introducción"],
      ["1:00", "CPU, disco y RAM"],
      ["3:30", "Memoria y estado del juego"],
      ["6:00", "Conclusión"],
    ]),
  },
  {
    id: "pM-f2iFATJw",
    category: "game-hacking",
    title: "Así creé un cheat ESP en Python (AssaultCube)",
    date: "2025-12-22",
    length: 1808,
    views: 1884,
    summary:
      "Enfoque educativo de programación: cómo se desarrolla un overlay ESP en Python con Pymem y Cheat Engine sobre un juego de pruebas, entendiendo la lectura de memoria y la proyección mundo-a-pantalla.",
    chapters: ch([
      ["0:00", "Introducción"],
      ["1:09", "Setup / configuración"],
      ["4:36", "Constantes y librerías"],
      ["5:53", "Mundo a pantalla"],
      ["14:47", "Overlay del enemigo"],
      ["16:52", "Click-through (Windows API)"],
      ["22:57", "Función main"],
      ["26:54", "Matriz MVP"],
      ["28:00", "Resultados"],
    ]),
  },
];

export const videosByCategory = (catId) =>
  VIDEOS.filter((v) => v.category === catId);

export const getVideo = (id) => VIDEOS.find((v) => v.id === id);
export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
