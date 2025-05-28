export default function MainSectionWrapper({
  children,
  className = "",
  containerClass = "",
  bg = "bg-white",
  padding = "py-32 px-6",
}) {
  return (
    <section className={`relative ${padding} ${bg} ${className}`}>
      <div className={`max-w-screen-2xl mx-auto ${containerClass}`}>
        {children}
      </div>
    </section>
  );
}
