export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export const AUTHOR_PROFILE = {
  name: "Noelia Zahirín",
  role: "Experta En Traducción Árabe-Español",
  imageSrc: "/images/author-expert.webp",
  imageAlt:
    "Retrato ilustrado de Noelia Zahirín, experta ficticia en traducción árabe-español",
  bio: "Lingüista especializada en traducción bidireccional árabe–español, dialectos del Magreb y comunicación intercultural. Revisa contenidos, guías y ejemplos prácticos publicados en Traductor Árabe Español.",
  expertise: [
    "Árabe Estándar Moderno (Fusha)",
    "Darija Marroquí",
    "Localización Español (España y Latinoamérica)",
    "Traducción Asistida Por IA",
  ],
} as const;

export const AUTHOR_SECTIONS: LegalSection[] = [
  {
    heading: "Sobre Noelia Zahirín",
    paragraphs: [
      "Noelia Zahirín es una experta ficticia creada para representar la voz editorial de Traductor Árabe Español. Combina formación en lingüística aplicada con experiencia en traducción entre árabe y español para familias, estudiantes y pequeños negocios.",
      "Su enfoque prioriza traducciones naturales, sensibles al contexto y adaptadas a la vida real — desde mensajes cotidianos hasta consultas de viaje, comercio y estudios.",
    ],
  },
  {
    heading: "Áreas De Especialización",
    paragraphs: [
      "Revisa y orienta contenidos sobre dialectos árabes, frases comunes, preguntas frecuentes y buenas prácticas de traducción entre árabe y español.",
      "Colabora en la mejora continua del traductor, verificando claridad, precisión y utilidad para usuarios en España, Marruecos y Latinoamérica.",
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
