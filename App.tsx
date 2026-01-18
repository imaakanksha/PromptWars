
import React, { useState, useCallback } from 'react';
import { UserInputs, CookingPlan, CookingTask } from './types';
import { generateCookingPlan } from './services/geminiService';
import InputForm from './components/InputForm';
import TodoList from './components/TodoList';
import LoadingState from './components/LoadingState';
import Header from './components/Header';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<CookingPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (inputs: UserInputs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateCookingPlan(inputs);
      setPlan(result);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = useCallback((taskId: string) => {
    setPlan(prev => {
      if (!prev) return null;
      return {
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t)
      };
    });
  }, []);

  const reset = () => {
    setPlan(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {!plan && !loading && (
          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-serif text-stone-800 mb-2">What's on the menu today?</h2>
              <p className="text-stone-500">Tell us about your day, and we'll handle the logistics.</p>
            </div>
            <InputForm onSubmit={handleGenerate} />
          </div>
        )}

        {loading && <LoadingState />}

        {error && (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
            <i className="fas fa-exclamation-circle text-2xl mb-2"></i>
            <p>{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {plan && !loading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center bg-stone-800 text-white p-6 rounded-3xl shadow-lg">
                <div>
                  <h2 className="text-2xl font-serif mb-1">{plan.mealName}</h2>
                  <div className="flex gap-4 text-sm text-stone-300">
                    <span><i className="far fa-clock mr-1"></i> {plan.totalTime}</span>
                    <span><i className="fas fa-signal mr-1"></i> {plan.difficulty}</span>
                  </div>
                </div>
                <button 
                  onClick={reset}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  title="Plan something else"
                >
                  <i className="fas fa-redo"></i>
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-2 space-y-4">
                  <h3 className="text-xl font-semibold text-stone-800 px-2 flex items-center">
                    <i className="fas fa-list-check mr-2 text-orange-500"></i>
                    Your Step-by-Step Plan
                  </h3>
                  <TodoList tasks={plan.tasks} onToggle={toggleTask} />
               </div>
               
               <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-stone-800 px-2 flex items-center">
                    <i className="fas fa-lightbulb mr-2 text-yellow-500"></i>
                    Chef's Tips
                  </h3>
                  <div className="bg-yellow-50 rounded-3xl p-6 border border-yellow-100 space-y-4 shadow-sm">
                    {plan.tips.map((tip, idx) => (
                      <div key={idx} className="flex gap-3 text-stone-700">
                        <span className="text-yellow-600 font-bold">•</span>
                        <p className="text-sm italic">{tip}</p>
                      </div>
                    ))}
                  </div>
               </div>
             </div>
          </div>
        )}
      </main>

      <footer className="py-8 border-t border-stone-200 text-center text-stone-400 text-sm">
        <p>© {new Date().getFullYear()} ChefStep AI Micro-App • Designed for efficiency</p>
      </footer>
    </div>
  );
};

export default App;
