interface Props {
  totalSteps: number;
  currentStep: number;
  color?: string;
}

export function StepIndicator({ totalSteps, currentStep, color = '#4F5BD5' }: Props) {
  return (
    <div className="w-full">
      <p className="text-xs text-gray-400 mb-2">Step {currentStep} of {totalSteps}</p>
      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < currentStep ? color : '#E5E7EB' }}
          />
        ))}
      </div>
    </div>
  );
}
