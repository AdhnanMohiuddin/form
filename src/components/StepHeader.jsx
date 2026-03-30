import { Check } from "lucide-react";

export default function StepHeader({ stepIndex, currentStep, title, onEdit }) {
  const isCompleted = currentStep > stepIndex;
  const isActive = currentStep === stepIndex;

  return (
    <div className={`flex justify-between items-center px-5 py-4 ${isActive ? "border-b border-gray-200" : ""}`}>
      <div className="flex items-center gap-3">
        {isCompleted ? (
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500">
            <Check className="text-white w-5 h-5 stroke-[3]" />
          </div>
        ) : (
          <div className="w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold bg-gray-200 text-gray-600">
            {stepIndex + 1}
          </div>
        )}
        <h2 className="font-semibold text-base text-gray-800">{title}</h2>
      </div>

      {isCompleted && (
        <button
          type="button"
          onClick={() => onEdit(stepIndex)}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  );
}
