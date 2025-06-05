import PropTypes from "prop-types";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

export default function HeroSection({
  imageSrc,
  imageAlt = "배경 이미지",
  children,
  height = "h-[80vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh]",
  overlayColor = "bg-black/30",
}) {
  return (
    <section
      className={`relative ${height} pt-16 text-white flex items-center justify-center overflow-hidden`}
    >
      {imageSrc && (
        <SkeletonImage
          src={imageSrc}
          alt={imageAlt}
          objectFit="cover"
          absolute={true}
        />
      )}

      <div className={`absolute inset-0 ${overlayColor}`} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col items-center justify-center">
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
  overlayColor: PropTypes.string,
};
