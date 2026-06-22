import { SITE_IMAGES } from "@/content/site-images";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type AuthorDetail = {
  label: string;
  value: string;
};

export const AUTHOR_PROFILE = {
  name: "Noelia Zahirín",
  role: "Experta en traducción árabe–español",
  imageSrc: "/images/author-noelia-zahirin.webp",
  imageAlt: SITE_IMAGES.authorPortrait.alt,
  imageDescription: SITE_IMAGES.authorPortrait.description,
  bio: "Lingüista especializada en traducción bidireccional árabe–español, dialectos del Magreb y comunicación intercultural. Revisa contenidos, guías y ejemplos prácticos publicados en Traductor Árabe Español.",
  details: [
    { label: "Ubicación", value: "Valencia, España" },
    { label: "Idiomas", value: "Español (nativo), árabe estándar, darija marroquí, inglés" },
    { label: "Formación", value: "Licenciatura en Traducción e Interpretación (UA)" },
    { label: "Experiencia", value: "Más de 12 años en localización y revisión multilingüe" },
    { label: "Enfoque", value: "Traducción natural, contextual y accesible para el día a día" },
  ] satisfies AuthorDetail[],
  expertise: [
    "Árabe estándar moderno (fusha)",
    "Darija marroquí",
    "Localización español (España y Latinoamérica)",
    "Traducción asistida por IA",
    "Comunicación intercultural",
    "Revisión editorial y terminología",
  ],
} as const;

export const AUTHOR_SECTIONS: LegalSection[] = [
  {
    heading: "Sobre Noelia Zahirín",
    paragraphs: [
      "Noelia Zahirín es una experta ficticia creada para representar la voz editorial de Traductor Árabe Español. Combina formación en lingüística aplicada con experiencia en traducción entre árabe y español para familias, estudiantes, viajeros y pequeños negocios.",
      "Su trabajo se centra en hacer comprensible el puente entre dos idiomas y culturas: explica matices del árabe marroquí, propone frases útiles en contexto real y ayuda a que cada traducción suene natural en español.",
    ],
  },
  {
    heading: "Trayectoria y formación",
    paragraphs: [
      "Estudió Traducción e Interpretación con especialización en pares semíticos y romance. Ha colaborado en proyectos de localización web, materiales educativos y contenidos para comunidades migrantes en la península ibérica.",
      "Con el tiempo amplió su interés hacia los dialectos del Magreb — especialmente el darija — y hacia el uso responsable de herramientas de traducción automática e inteligencia artificial.",
    ],
  },
  {
    heading: "Áreas de especialización",
    paragraphs: [
      "Revisa y orienta contenidos sobre dialectos árabes, frases comunes, preguntas frecuentes y buenas prácticas de traducción entre árabe y español.",
      "Colabora en la mejora continua del traductor, verificando claridad, precisión y utilidad para usuarios en España, Marruecos y Latinoamérica.",
    ],
  },
  {
    heading: "Filosofía editorial",
    paragraphs: [
      "Noelia defiende traducciones que respetan el contexto: una misma palabra puede cambiar de sentido según si hablamos de mercado, medicina, saludos o trámites administrativos.",
      "En Traductor Árabe Español, su criterio editorial prioriza la utilidad práctica, la claridad y el respeto cultural — sin sustituir, en casos sensibles, el criterio de un traductor jurado o profesional especializado.",
    ],
  },
  {
    heading: "Contacto",
    paragraphs: [
      "Para sugerencias editoriales, correcciones o propuestas de contenido, utilice la página de contacto del sitio.",
      "Agradecemos los comentarios de la comunidad: nos ayudan a ofrecer traducciones más claras, fiables y accesibles.",
    ],
  },
];
