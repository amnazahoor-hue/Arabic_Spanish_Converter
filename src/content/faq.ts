export type FaqCategory = "Uso" | "Límites" | "Voz" | "Idiomas" | "Precisión";

export const FAQ_ITEMS = [
  {
    id: "translate-free",
    category: "Uso" as FaqCategory,
    question: "¿Cómo Traducir Del Árabe Al Español En Línea Gratis?",
    answer:
      "Solo pega tu texto en el cuadro de entrada. Haz clic en «Traducir aquí». Funciona al instante y te da las traducciones. También puedes usarlo para traducción de español a árabe.",
  },
  {
    id: "character-limit",
    category: "Límites" as FaqCategory,
    question: "¿Cuántos Caracteres Puedo Traducir A La Vez?",
    answer:
      "Tienes un límite de 5000 caracteres. Para documentos y artículos completos, utiliza nuestra API traductor árabe. Además, divide tu texto en secciones.",
  },
  {
    id: "voice",
    category: "Voz" as FaqCategory,
    question: "¿Puedo Usarlo Como Un Traductor De Voz Árabe-Español?",
    answer:
      "Sí. Nuestra función de audio le permite hablarle al traductor. Simplemente haga clic en el icono del micrófono en el cuadro de entrada. Obtendrá resultados fiables.",
  },
  {
    id: "swap-language",
    category: "Idiomas" as FaqCategory,
    question: "¿Cómo Cambio De Idioma?",
    answer:
      "Haz clic en el botón de intercambio entre los dos idiomas. Cambia rápidamente la herramienta de un traductor español a árabe.",
  },
  {
    id: "accuracy",
    category: "Precisión" as FaqCategory,
    question: "¿Qué Tan Precisa Es La Traducción?",
    answer:
      "Nuestro traductor confiable logra precisión en el árabe estándar moderno y tiene conocimientos sobre dialectos. La IA revisa el contenido antes de convertirlo al español. Lo que reduce los errores.",
  },
] as const;
