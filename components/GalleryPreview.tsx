import ResponsiveImage from "@/components/ResponsiveImage";

type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryPreviewProps = {
  images: GalleryImage[];
};

export default function GalleryPreview({ images }: GalleryPreviewProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {images.map((image, index) => (
        // Temporary stock image — replace with professional Mend Beauty Studio photography.
        <ResponsiveImage
          key={image.src}
          src={image.src}
          alt={image.alt}
          aspect="aspect-[3/4]"
          overlay
          sizes="(max-width: 1024px) 50vw, 25vw"
          className={index % 2 === 0 ? "" : "lg:mt-10"}
        />
      ))}
    </div>
  );
}
