import FlowerOfLife from './components/FlowerOfLife';

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center">
          <FlowerOfLife size={180} className="animate-rotate-slow" />
        </div>
        <p
          className="mt-6 text-[10px] tracking-[0.32em] uppercase font-heading"
          style={{ color: 'rgb(var(--accent) / 0.6)' }}
        >
          Entering the Oracle...
        </p>
      </div>
    </main>
  );
}
