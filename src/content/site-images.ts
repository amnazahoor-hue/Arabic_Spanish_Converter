export type ImageAccessibility = {
  alt: string;
  /** Longer description; also used as the image `title` tooltip. */
  description: string;
};

export const SITE_IMAGES = {
  logo: {
    alt: "Logotipo de Traductor Árabe Español",
    description:
      "Emblema circular con líneas entrelazadas en dorado y blanco sobre fondo verde azulado, identidad visual del traductor árabe-español.",
  },
  heroPeopleDesktop: {
    alt: "Grupo diverso de personas hispanohablantes y de origen árabe conversando y sonriendo",
    description:
      "Fotografía de fondo del inicio con un grupo multicultural en un ambiente cálido y acogedor, que representa el puente lingüístico y cultural entre España y el mundo árabe.",
  },
  heroPeopleMobile: {
    alt: "Personas de distintos orígenes compartiendo una conversación amistosa",
    description:
      "Imagen de fondo para móvil del hero: retrato de un encuentro social entre hablantes de español y árabe, con tonos suaves y ambiente cercano.",
  },
  commonPhrasesBg: {
    alt: "Escena cotidiana con elementos que evocan comunicación entre culturas",
    description:
      "Fotografía decorativa de la sección de frases comunes: ambiente luminoso que refuerza el uso práctico del traductor en situaciones del día a día.",
  },
  marroquiDarijaBg: {
    alt: "Paisaje urbano y cultural de Marruecos con arquitectura tradicional",
    description:
      "Imagen de fondo de la sección sobre darija marroquí: escena que evoca Marruecos y el contexto en el que se habla el dialecto marroquí frente al árabe estándar.",
  },
  authorPortrait: {
    alt: "Retrato de Noelia Zahirín, experta en traducción árabe-español",
    description:
      "Fotografía de perfil de Noelia Zahirín, personaje editorial ficticio del sitio, lingüista especializada en traducción bidireccional árabe-español y dialectos del Magreb.",
  },
  openGraph: {
    alt: "Traductor Árabe Español — traducción instantánea de texto y voz",
    description:
      "Tarjeta de vista previa para redes sociales del traductor árabe-español con marca en verde azulado y dorado.",
  },
  favicon: {
    alt: "Icono de Traductor Árabe Español",
    description: "Favicon del sitio con el emblema del traductor árabe-español.",
  },
  appleTouchIcon: {
    alt: "Icono de Traductor Árabe Español para dispositivos Apple",
    description: "Icono de acceso directo en pantalla de inicio para iPhone e iPad.",
  },
} as const satisfies Record<string, ImageAccessibility>;
