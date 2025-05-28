import PropTypes from "prop-types";

export default function HeroSection({
  imageSrc,
  imageAlt = "배경 이미지",
  children,
  height = "h-[80vh]",
  overlayColor = "bg-black/30",
}) {
  return (
    <section
      className={`relative ${height} pt-16 text-white flex items-center justify-center overflow-hidden`}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className={`absolute inset-0 ${overlayColor}`} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
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
