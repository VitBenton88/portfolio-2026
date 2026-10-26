import type { ImageData, PictureSource } from '../types';

interface PictureProps {
  img: ImageData;
  sources?: PictureSource[];
  className?: string;
}

function mapSources({ media, srcset, sizes, type }: PictureSource) {
  return <source key={`${type}-${media}`} media={media} srcSet={srcset} sizes={sizes} type={type} />;
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
