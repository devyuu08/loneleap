export default function LayoutWrapper({ children }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      {children}
    </div>
  );
}
