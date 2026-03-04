export default function Loading() {
  return (
    <div className="fixed inset-x-0 top-0 z-[10000] h-0.5 overflow-hidden bg-beige/20">
      <div className="loading-bar-line h-full w-full origin-left bg-terracotta/80" />
    </div>
  );
}
