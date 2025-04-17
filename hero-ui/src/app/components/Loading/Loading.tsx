export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-xl font-semibold text-indigo-600">Loading...</span>
      </div>
    </div>
  );
}
