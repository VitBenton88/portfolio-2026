import type { ImageData, PictureSource } from '../types';

interface PictureProps {
  img: ImageData;
  sources?: PictureSource[];
  className?: string;
}

function mapSources({ media, srcset, type }: PictureSource, index: number) {
  return <source key={index} media={media} srcSet={srcset} type={type} />;
}

export function Picture({ img, sources, className }: PictureProps) {
  return (
    <picture className={className}>
      {!!sources?.length && sources.map(mapSources)}

      <img
        alt={img.alt}
        height={img.height}
        width={img.width}
        loading={img.loadingStrategy}
        src={img.src}
        srcSet={img.srcset}
        sizes={img.sizes}
      />
    </picture>
  );
}
