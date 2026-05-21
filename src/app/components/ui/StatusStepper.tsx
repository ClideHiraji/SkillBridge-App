import { Check } from 'lucide-react';

const STEPS = ['Applied', 'Accepted', 'In Progress', 'Done', 'Paid'];

interface Props {
  currentStep: number; // 1-5
  color?: string;
}

export function StatusStepper({ currentStep, color = '#FF7B54' }: Props) {
  return (
    <div className="flex items-start gap-0 w-full">
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        const isFuture = stepNum > currentStep;
        return (
          <div key={step} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {/* Line before */}
              <div
                className="flex-1 h-0.5 transition-all duration-300"
                style={{ background: i === 0 ? 'transparent' : isCompleted || isCurrent ? color : '#E5E7EB' }}
              />
              {/* Circle */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  background: isCompleted ? '#10B981' : isCurrent ? color : '#E5E7EB',
                  boxShadow: isCurrent ? `0 0 0 3px ${color}33` : 'none',
                }}
              >
                {isCompleted ? (
                  <Check size={13} color="#fff" strokeWidth={2.5} />
                ) : (
                  <span className="text-[10px] font-bold" style={{ color: isFuture ? '#9CA3AF' : '#fff' }}>{stepNum}</span>
                )}
              </div>
              {/* Line after */}
              <div
                className="flex-1 h-0.5 transition-all duration-300"
                style={{ background: i === STEPS.length - 1 ? 'transparent' : isCompleted ? color : '#E5E7EB' }}
              />
            </div>
            <p className="text-[9px] text-center mt-1.5 leading-tight"
              style={{ color: isCompleted ? '#10B981' : isCurrent ? color : '#9CA3AF', fontWeight: isCurrent ? '600' : '400' }}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
}
