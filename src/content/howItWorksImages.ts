export type HowItWorksImage = {
  src: string;
  alt: string;
  objectPosition?: string;
  aspectClass?: string;
};

export const HOW_IT_WORKS_IMAGES: HowItWorksImage[] = [
  {
    src: "https://images.unsplash.com/photo-1676302477502-fa8a634aaa8e?w=900&h=540&auto=format&fit=crop&q=80",
    alt: "Open dictionary with language entries in warm natural light",
  },
  {
    src: "https://images.unsplash.com/photo-1673515335152-f2589ba8bb7a?w=900&h=540&auto=format&fit=crop&q=80",
    alt: "Translation tiles on a desk beside laptop and smartphone",
    objectPosition: "50% 45%",
  },
  {
    src: "https://images.unsplash.com/photo-1620969427101-7a2bb6d83273?w=900&h=540&auto=format&fit=crop&q=80",
    alt: "Close-up of dictionary pages with definitions",
    objectPosition: "50% 35%",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=540&auto=format&fit=crop&crop=entropy&q=80",
    alt: "Colleagues sharing ideas around a laptop in a bright office",
    objectPosition: "50% 42%",
    aspectClass: "aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto",
  },
];
