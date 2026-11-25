type MediaSlotProps = {
  slotId: string;
  label: string;
  aspect?: string;
  className?: string;
};

/**
 * Reserved placement for later studio photo or video. Uses the existing MEND
 * logo only; never stock photography or AI-generated images.
 */
export default function MediaSlot({
  slotId,
  label,
  aspect = "aspect-square",
  className = "",
}: MediaSlotProps) {
  return (
    <div
      data-media-slot={slotId}
      className={`${aspect} ${className} flex w-full flex-col items-center justify-center gap-3 bg-sand px-6 text-center`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/mend-beauty-logo-gold-transparent.png"
        alt=""
        width={180}
        height={260}
        className="h-20 w-auto object-contain sm:h-24"
      />
      <p className="max-w-[16rem] text-xs leading-relaxed text-taupe sm:text-sm">{label}</p>
    </div>
  );
}
