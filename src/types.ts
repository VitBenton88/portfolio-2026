/** Page sections in DOM order; the source of truth for SectionId. */
export const SECTION_IDS = ['hero', 'about', 'resume', 'contact'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

type SrcsetStringType = string | `${string}, ${string}`;

export type SourceType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp'
  | 'image/avif'
  | 'image/svg+xml'
  | 'video/mp4'
  | 'video/webm'
  | 'video/ogg';

// Basic media query patterns
export type MediaQueryTypes =
  | `(max-width: ${string})`
  | `(min-width: ${string})`
  | `(max-height: ${string})`
  | `(min-height: ${string})`
  | `(orientation: ${'landscape' | 'portrait'})`
  | `(resolution: ${string})`
  | `(aspect-ratio: ${string})`;

// Compound media queries combining multiple conditions
type MediaQuery = MediaQueryTypes | `${MediaQueryTypes} and ${MediaQueryTypes}`;

export interface PictureSource {
  srcset?: SrcsetStringType;
  sizes?: string;
  media?: MediaQuery;
  type?: SourceType;
}

export interface ImageData {
  alt?: string;
  height?: string;
  width?: string;
  loadingStrategy?: 'eager' | 'lazy';
  src: string;
  srcset?: SrcsetStringType;
  sizes?: string;
}
