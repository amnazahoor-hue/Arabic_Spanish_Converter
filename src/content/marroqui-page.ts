import type { FaqCategory } from "@/content/faq";

export const MARROQUI_PAGE_PATH = "/traductor-marroqui-espanol";

export const MARROQUI_SECTION_IDS = {
  translator: "translator",
  darija: "darija",
  phrases: "frases-marroqui",
  features: "caracteristicas-marroqui",
  uses: "usos-marroqui",
  faq: "faq-marroqui",
} as const;

export const MARROQUI_DARIJA_INTRO = {
  title: "¿Qué Es Darija",
  accent: "(الدارجة)?",
  lead:
    "La mayoría de los traductores solo trabajan con el árabe estándar moderno (MSA). Pero cuando resides en Casablanca o Tánger, nadie habla MSA. La gente allí habla darija marroquí y utilizar el dialecto marroquí.",
  body:
    "Nuestra herramienta comprende la diferencia con precisión. El darija ha recibido influencias de varios idiomas. Estos son algunos de ellos.",
} as const;

export const MARROQUI_DARIJA_INFLUENCES = [
  {
    title: "Darija frente a árabe estándar moderno",
    text: "El darija tiene palabras más cortas que el árabe estándar moderno y toma prestados sonidos. Un hablante nativo de árabe solo domina entre el 40 y el 50 por ciento del darija, ya que su vocabulario y gramática difieren.",
  },
  {
    title: "Influencia francesa en darija",
    text: "Está influenciado por el francés. Palabras como «teléfono» y «director» se utilizan en la conversación marroquí con pronunciaciones ligeramente diferentes.",
  },
  {
    title: "Influencia española",
    text: "El protectorado español Marruecos (1912-1956) dejó una huella imborrable en este idioma. Las palabras españolas en darija, como «tablita», provienen directamente del español.",
  },
  {
    title: "Influencia bereber en darija",
    text: "Los amazigh moldearon los sonidos marroquíes. Influencia bereber en darija aparece en el vocabulario y en las expresiones regionales.",
  },
] as const;

export const MARROQUI_PHRASES = [
  { darija: "Labas?", spanish: "¿Cómo estás?" },
  { darija: "Shhal hada?", spanish: "¿Cuánto cuesta esto?" },
  { darija: "Fin kayn lmahatta?", spanish: "¿Dónde está la estación?" },
  { darija: "Bghit atay, afak.", spanish: "Quiero té, por favor." },
] as const;

export const MARROQUI_FEATURES_INTRO =
  "Proporciona precisión porque la función de IA está trabajando en segundo plano. Entiende el acento marroquí del árabe y expresiones marroquíes comunes que pueden afectar la precisión de la traducción.";

export const MARROQUI_FEATURES = [
  {
    id: "contexto-ia",
    title: "Traducción Contextual",
    text: "Nuestra herramienta proporciona traducción con inteligencia artificial que tiene en cuenta el contexto.",
    image: "/marroqui/features/marroqui-feature-contexto-ia.webp",
    imageAlt: "Interfaz de traducción con indicadores de contexto e inteligencia artificial",
    imageDescription:
      "Ilustración de traducción contextual: pantalla del traductor marroquí-español mostrando cómo la IA interpreta el significado según el contexto del darija.",
  },
  {
    id: "voz-darija",
    title: "Traducción De Voz",
    text: "La función de traducción de voz procesa la pronunciación darija con precisión.",
    image: "/marroqui/features/marroqui-feature-voz-darija.webp",
    imageAlt: "Persona hablando al micrófono para traducir darija marroquí a español",
    imageDescription:
      "Ilustración de traducción por voz: usuario dictando en darija marroquí mientras el sistema captura la pronunciación y la convierte en español.",
  },
  {
    id: "rapidez",
    title: "Traducción Instantánea",
    text: "Obtén una traducción al español impecable en segundos. Es una herramienta rápida.",
    image: "/marroqui/features/marroqui-feature-rapidez.webp",
    imageAlt: "Resultado de traducción instantánea mostrado en pantalla en segundos",
    imageDescription:
      "Ilustración de velocidad: traducción del darija al español completada al instante, destacando la rapidez del traductor marroquí.",
  },
  {
    id: "espanol-natural",
    title: "Español Natural",
    text: "El resultado está escrito en español natural, como si lo hubiera escrito un hablante nativo.",
    image: "/marroqui/features/marroqui-feature-espanol-natural.webp",
    imageAlt: "Texto en español fluido y natural tras traducir expresiones marroquíes",
    imageDescription:
      "Ilustración de español natural: frases marroquíes convertidas en español coloquial y correcto, como lo escribiría un hablante nativo.",
  },
] as const;

export const MARROQUI_USES = [
  {
    title: "Viajar",
    text: "Consigue tu frases para viajar a Marruecos de nuestro traductor. Ayuda en la llegada al aeropuerto para realizar el check-in.",
  },
  {
    title: "Compras",
    text: "Dominar regatear en zocos marroquíes comienza con el lenguaje. Usa este traductor para preparar tu vocabulario de negociación.",
  },
  {
    title: "Saludos En Marroquí",
    text: "Ayuda a entablar conversaciones triviales con los vecinos. Traductor darija español es útil para el uso diario.",
  },
  {
    title: "Comunicación Empresarial",
    text: "Tanto si eres un importador español como un empresario marroquí, este traductor te ayudará a comunicarte y a cerrar el trato.",
  },
] as const;

export const MARROQUI_FAQ_ITEMS = [
  {
    id: "marroqui-free",
    category: "Uso" as FaqCategory,
    question: "¿Esta traducción es gratuita?",
    answer:
      "Sí, todas las búsquedas de entrada y de frases son de uso gratuito. Además, puedes traducir de español a marroquí en modo inverso.",
  },
  {
    id: "marroqui-interest",
    category: "Precisión" as FaqCategory,
    question: "¿Por qué hay tantos hispanohablantes interesados en el darija?",
    answer:
      "Palabras de origen árabe en español son miles, como «aceite» y «almohada». Todos son legado de la Patrimonio de Al-Ándalus. Además, la comunidad marroquí en España tiene vecinos o amigos árabes marroquíes.",
  },
  {
    id: "marroqui-travel-phrases",
    category: "Uso" as FaqCategory,
    question: "¿Cómo traduzco frases del español al darija para viajar a Marruecos?",
    answer:
      "Usa nuestro traductor para crear frases cotidianas. Escribe tu frase en español en el campo de texto, selecciona Español y verás el resultado. También puedes usarlo como diccionario inverso darija-español.",
  },
  {
    id: "marroqui-alphabet",
    category: "Idiomas" as FaqCategory,
    question: "¿Existe un alfabeto darija o se escribe con la escritura árabe estándar?",
    answer:
      "Darija no tiene alfabetos fijos. En la escritura formal marroquí, se utiliza el alfabeto árabe. En los mensajes de texto informales, se escribe con letras latinas. Traductor de español a marroquí conoce ambos guiones.",
  },
  {
    id: "marroqui-greetings",
    category: "Voz" as FaqCategory,
    question: "¿Cuáles son los saludos más comunes en árabe marroquí?",
    answer:
      "A few are «labas», «myzan» and «bslaam». Estas son las palabras básicas para comunicarse en darija marroquí. Con nuestro traductor, puedes ampliar tu vocabulario.",
  },
] as const;
