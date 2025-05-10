import PropTypes from "prop-types";

export default function HeroSection({
  imageSrc,
  title,
  subtitle,
  children,
  height = "h-[80vh]",
}) {
  return (
    <section
      className={`relative ${height} pt-16 text-white flex items-center justify-center overflow-hidden`}
    >
      {/* 배경 이미지 */}
      <img
        src={imageSrc}
        alt="배경 이미지"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 콘텐츠 전체 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* 텍스트 그룹 */}
        <div className="text-center space-y-4 mb-8">
          {title && (
            <h2 className="text-3xl font-extrabold drop-shadow">{title}</h2>
          )}
          {subtitle && <p className="text-sm text-white/90">{subtitle}</p>}
        </div>

        {/* 하단 children 콘텐츠는 자유롭게 배치 가능 */}
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}
HeroSection.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
};
