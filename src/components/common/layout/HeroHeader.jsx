import PropTypes from "prop-types";

export default function HeroHeader({ title, subtitle, countLabel, count }) {
  return (
    <div className="text-center space-y-2 sm:space-y-3">
      {title && (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-sm">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-sm sm:text-base text-white/90">{subtitle}</p>
      )}
      {countLabel && (
        <p className="text-xs sm:text-sm text-white/60">
          총 {count}개의 {countLabel}
        </p>
      )}
    </div>
  );
}

HeroHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  countLabel: PropTypes.string,
  count: PropTypes.number,
};
