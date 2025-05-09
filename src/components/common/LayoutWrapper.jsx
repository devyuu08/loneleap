export default function LayoutWrapper({ children }) {
  return (
    <div className="max-w-6xl mx-auto pt-28 px-4 sm:px-6 lg:px-8 py-10">
      {children}
    </div>
  );
}
