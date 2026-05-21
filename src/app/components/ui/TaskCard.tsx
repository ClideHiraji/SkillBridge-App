import { useNavigate } from 'react-router';
import { Clock, Users, Calendar } from 'lucide-react';
import type { Task } from '../../data/mockData';
import { categoryColors } from '../../data/mockData';

interface Props {
  task: Task;
  variant?: 'student' | 'business';
  onManage?: (taskId: string) => void;
  compact?: boolean;
}

export function TaskCard({ task, variant = 'student', onManage, compact = false }: Props) {
  const navigate = useNavigate();
  const catColor = categoryColors[task.category] || '#4F5BD5';

  const handleClick = () => {
    if (variant === 'student') {
      navigate(`/student/task/${task.id}`);
    } else {
      navigate(`/business/task/${task.id}/applicants`);
    }
  };

  if (compact) {
    return (
      <div
        onClick={handleClick}
        className="flex-shrink-0 w-[200px] bg-white rounded-2xl p-4 cursor-pointer shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between mb-2">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: catColor + '20', color: catColor }}
          >
            {task.category}
          </span>
          {variant === 'business' && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: '#FF7B5420', color: '#FF7B54' }}
            >
              {task.applicantCount} applied
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-gray-900 leading-snug mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
          {task.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold" style={{ color: '#4F5BD5', fontFamily: 'Sora, sans-serif' }}>
            ₱{task.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 text-gray-400">
            <Calendar size={10} />
            <span className="text-[10px]">{task.daysLeft}d left</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl p-4 cursor-pointer shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: catColor + '15', color: catColor }}
          >
            {task.category}
          </span>
        </div>
        <span className="text-base font-bold" style={{ color: '#4F5BD5', fontFamily: 'Sora, sans-serif' }}>
          ₱{task.price.toLocaleString()}
        </span>
      </div>

      <h3 className="text-[15px] font-semibold text-gray-900 mb-1 leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
        {task.title}
      </h3>
      <p className="text-xs text-gray-500 mb-3">{task.businessName}</p>

      <div className="flex items-center gap-3 mb-3 text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar size={11} />
          <span className="text-[11px]">{task.daysLeft} days left</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={11} />
          <span className="text-[11px]">{task.estimatedTime}</span>
        </div>
        {variant === 'business' && (
          <div className="flex items-center gap-1">
            <Users size={11} />
            <span className="text-[11px]">{task.applicantCount}/{task.maxApplicants}</span>
          </div>
        )}
      </div>

      <div className="flex items-center flex-wrap gap-1.5">
        {task.skills.slice(0, 3).map(skill => (
          <span
            key={skill}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
          >
            {skill}
          </span>
        ))}
        {task.skills.length > 3 && (
          <span className="text-[10px] text-gray-400">+{task.skills.length - 3}</span>
        )}
        {variant === 'business' && (
          <button
            onClick={(e) => { e.stopPropagation(); onManage?.(task.id); }}
            className="ml-auto text-[11px] font-semibold px-3 py-1 rounded-full"
            style={{ background: '#FF7B5420', color: '#FF7B54' }}
          >
            {task.applicantCount} applicants
          </button>
        )}
      </div>
    </div>
  );
}
