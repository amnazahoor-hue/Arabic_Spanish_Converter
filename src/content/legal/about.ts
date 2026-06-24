import type { LegalSection } from "@/components/legal/LegalPage";

export const ABOUT_SECTIONS: LegalSection[] = [
  {
    heading: "Quiénes somos",
    paragraphs: [
      "Traductor Árabe Español es un proyecto editorial y tecnológico independiente dedicado a la traducción gratuita árabe–español en la web. Nació de la convicción de que el idioma no debe ser una barrera para pedir cita médica, leer un aviso escolar sobre sus hijos, comprender un contrato de alquiler o responder a un mensaje familiar de WhatsApp a través del Mediterráneo.",
      "No somos una agencia de traducción ni un despacho de abogados. Somos un equipo reducido con experiencia en desarrollo web, lingüística aplicada y comunicación intercultural, que mantiene el servicio con transparencia sobre sus límites: traducción automática útil para la vida cotidiana, pero no sustituto de profesionales jurados cuando la ley los exige.",
      "El nombre evoca Al-Andalus como espacio histórico de convivencia e intercambio de conocimiento entre culturas árabe y románica; hoy ese legado se traduce en herramientas digitales accesibles desde un teléfono, sin muros de pago ni registro obligatorio para la traducción básica. Última actualización: Mayo 2026.",
    ],
  },
  {
    heading: "A quién nos dirigimos",
    paragraphs: [
      "Nuestro público principal son personas y familias de comunidades migrantes y de la diáspora en España: marroquíes, argelinos, tunecinos, sirios, palestinos, saharauis y otros colectivos arabófonos que conviven con el español en la administración pública, la sanidad, el trabajo y la escuela. También atendemos a latinoamericanos que estudian árabe, estudiantes Erasmus, voluntarios de ONG, pequeños negocios que atienden a clientes bilingües y usuarios de habla inglesa que necesitan un puente claro entre árabe y español.",
      "En América Latina crece el interés por el árabe por motivos académicos, familiares, profesionales (comercio, diplomacia, turismo) y comunitarios. Ofrecemos un puente inmediato español↔árabe sin instalaciones pesadas de aplicaciones, útil en conexiones modestas y teléfonos de gama media habituales entre nuestros usuarios.",
      "Reconocemos que muchos usuarios alternan dialectos (darija, árabe levantino) con árabe estándar moderno. Explicamos con honestidad dónde el sistema rinde mejor y cuándo conviene acudir a un hablante nativo o a un servicio especializado, en lugar de prometer una perfección universal.",
    ],
  },
  {
    heading: "Experiencia, pericia, autoridad y confianza (E-E-A-T)",
    paragraphs: [
      "Los motores de búsqueda valoran la experiencia demostrada, la autoridad temática y la fiabilidad (E-E-A-T). Para nosotros, la «experiencia» se refleja en decisiones de producto probadas con usuarios reales: soporte RTL para árabe, objetivos táctiles amplios, límites de caracteres claros y advertencias visibles antes de utilizar una traducción en un trámite oficial.",
      "No reclamamos autoridad en derecho migratorio o medicina, pero sí en el nicho de la traducción asistida por ordenador árabe–español: documentación clara, preguntas frecuentes que responden a cuestiones concretas (darija, traductores jurados, uso móvil) y páginas legales en español alineadas con el GDPR y la legislación española.",
      "La «confianza» proviene de publicar avisos legales completos, una política de privacidad detallada, una fecha de actualización visible (Mayo 2026) y un canal de contacto. No ocultamos que utilizamos APIs de traducción en la nube ni que la publicidad puede financiar el servicio gratuito.",
    ],
  },
  {
    heading: "Metodología y calidad de traducción",
    paragraphs: [
      "La arquitectura del Sitio separa la interfaz (Next.js, accesible y rápida) de la lógica de traducción, que recae en un proveedor especializado en pares lingüísticos. Cada solicitud envía el texto de origen, el idioma de origen detectado o elegido y el idioma de destino; la respuesta aparece en el panel correspondiente con la dirección de escritura adecuada (RTL/LTR).",
      "Antes de publicar cambios, probamos frases frecuentes en contextos reales: mensajes hospitalarios, avisos escolares, consultas laborales básicas y saludos familiares. Comparamos la salida árabe→español y español→árabe para detectar inversiones de significado o pérdida de cortesía (tú/usted, fórmulas religiosas habituales).",
      "Aplicamos límites antabuso para que los bots no degraden el servicio de quienes lo necesitan para comunicarse. Los errores reportados por la comunidad se priorizan en actualizaciones de preguntas frecuentes y, cuando proceda, en ajustes de instrucciones al proveedor o de preprocesamiento de texto (normalización de números, fechas y puntuación árabe).",
      "Recomendamos siempre el flujo «borrador automático + revisión humana» para documentos con consecuencias: visados, litigios, informes clínicos o contratos laborales. Esa recomendación forma parte de nuestra metodología ética, no de una cláusula de exención vacía.",
    ],
  },
  {
    heading: "Cómo sostenemos el proyecto",
    paragraphs: [
      "El acceso gratuito se financia con publicidad responsable y, eventualmente, enlaces de afiliación a materiales de estudio de árabe o español, siempre informados cuando exista una relación comercial. No vendemos contenido de traducciones ni perfiles de usuarios.",
      "Las mejoras previstas en la hoja de ruta (mejor soporte de dialectos, glosarios comunitarios, modo de lectura lenta para aprendices) se anunciarán en esta página y en una sección de noticias cuando esté disponible. Los comentarios constructivos a través del formulario de contacto son bienvenidos, especialmente si detecta traducciones sistemáticamente incorrectas en un dominio concreto (por ejemplo, términos eléctricos o agrícolas).",
    ],
  },
  {
    heading: "Compromiso con la comunidad",
    paragraphs: [
      "Creemos que un traductor web honesto debe educar mientras traduce: por eso enlazamos recursos sobre integración lingüística, aclaramos la diferencia entre AEM y darija y recordamos los derechos básicos de privacidad al pegar texto personal en cualquier servicio en línea.",
      "Si representa una asociación de vecinos, mezquita, centro escolar o sindicato y necesita materiales colectivos, puede proponer colaboraciones no comerciales (talleres de alfabetización digital, revisión de microtextos en español llano) a través del formulario de contacto.",
      "Traductor Árabe Español seguirá siendo, sobre todo, un punto de encuentro entre palabras árabes y españolas: útil, limitado cuando debe serlo y transparente en todo lo demás — para comunidades en España, América Latina y más allá, en árabe, español e inglés.",
    ],
  },
];
