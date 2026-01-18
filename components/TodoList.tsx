
import React from 'react';
import { CookingTask, TaskCategory } from '../types';

interface TodoListProps {
  tasks: CookingTask[];
  onToggle: (id: string) => void;
}

const getCategoryStyles = (category: TaskCategory) => {
  switch (category) {
    case TaskCategory.PREP: return 'bg-blue-100 text-blue-600';
    case TaskCategory.COOK: return 'bg-orange-100 text-orange-600';
    case TaskCategory.CLEAN: return 'bg-emerald-100 text-emerald-600';
    case TaskCategory.SERVE: return 'bg-purple-100 text-purple-600';
    default: return 'bg-stone-100 text-stone-600';
  }
};

const TodoList: React.FC<TodoListProps> = ({ tasks, onToggle }) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div 
          key={task.id}
          onClick={() => onToggle(task.id)}
          className={`step-card flex items-center gap-4 p-5 rounded-3xl border cursor-pointer select-none transition-all ${
            task.isCompleted 
              ? 'bg-stone-50 border-stone-100 opacity-60' 
              : 'bg-white border-stone-200 shadow-sm hover:border-orange-200'
          }`}
        >
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
            task.isCompleted 
              ? 'bg-orange-500 border-orange-500 text-white' 
              : 'border-stone-300'
          }`}>
            {task.isCompleted && <i className="fas fa-check text-xs"></i>}
          </div>
          
          <div className="flex-grow">
            <p className={`font-medium text-stone-800 ${task.isCompleted ? 'line-through text-stone-400' : ''}`}>
              {task.task}
            </p>
            <div className="flex gap-2 mt-1">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${getCategoryStyles(task.category)}`}>
                {task.category}
              </span>
              <span className="text-[10px] uppercase font-bold text-stone-400">
                <i className="far fa-clock mr-1"></i> {task.duration}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      {tasks.length === 0 && (
        <div className="text-center py-12 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
          <p className="text-stone-400">No tasks generated. Try adjusting your inputs.</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
