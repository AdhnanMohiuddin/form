export default function StepButtons({ onClear, onNext, nextLabel = "Next" }) {
  return (
    <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
      <button
        type="button"
        onClick={onClear}
        className="border border-blue-500 text-blue-600 px-7 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
      >
        Clear
      </button>
      <button
        type="button"
        onClick={onNext}
        className="bg-orange-500 text-white px-7 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
      >
        {nextLabel}
      </button>
    </div>
  );
}
