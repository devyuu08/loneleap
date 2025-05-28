import PropTypes from "prop-types";

export default function HeroHeader({ title, subtitle, countLabel, count }) {
  return (
    <div className="text-center space-y-2">
      {title && (
        <h2 className="text-3xl font-extrabold drop-shadow">{title}</h2>
      )}
      {subtitle && <p className="text-sm text-white/90">{subtitle}</p>}
      {countLabel && (
        <p className="text-xs text-white/60">
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
