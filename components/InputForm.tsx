
import React, { useState } from 'react';
import { UserInputs } from '../types';

interface InputFormProps {
  onSubmit: (inputs: UserInputs) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserInputs>({
    mealType: 'Dinner',
    availableTime: '30 minutes',
    energyLevel: 'Moderate',
    ingredients: '',
    dietaryRestrictions: 'None',
    minimalSetup: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-stone-700">What are we making?</label>
          <select 
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            value={formData.mealType}
            onChange={e => setFormData({ ...formData, mealType: e.target.value })}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack / Dessert</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-stone-700">How much time do you have?</label>
          <select 
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            value={formData.availableTime}
            onChange={e => setFormData({ ...formData, availableTime: e.target.value })}
          >
            <option>15 minutes or less</option>
            <option>30 minutes</option>
            <option>45 minutes</option>
            <option>1 hour+</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-stone-700">Your energy level?</label>
          <div className="flex gap-2">
            {['Lazy', 'Moderate', 'Productive'].map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({ ...formData, energyLevel: level })}
                className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                  formData.energyLevel === level 
                  ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-100' 
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-stone-700 flex justify-between items-center">
            <span>Kitchen Setup</span>
          </label>
          <div 
            onClick={() => setFormData({ ...formData, minimalSetup: !formData.minimalSetup })}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
              formData.minimalSetup 
              ? 'bg-blue-50 border-blue-200 text-blue-700' 
              : 'bg-stone-50 border-stone-200 text-stone-600'
            }`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
              formData.minimalSetup ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-stone-300'
            }`}>
              {formData.minimalSetup && <i className="fas fa-check text-[10px]"></i>}
            </div>
            <span className="text-sm font-medium">Limited/Minimal Setup</span>
            <i className="fas fa-utensils-alt ml-auto opacity-40"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-stone-700">Dietary notes?</label>
          <input 
            type="text"
            placeholder="e.g. Vegetarian, low carb..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            value={formData.dietaryRestrictions}
            onChange={e => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-stone-700">Ingredients (Optional)</label>
          <input 
            type="text"
            placeholder="What needs using up?"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            value={formData.ingredients}
            onChange={e => setFormData({ ...formData, ingredients: e.target.value })}
          />
        </div>
      </div>

      <button 
        type="submit"
        className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <span>Generate Low-Effort Plan</span>
        <i className="fas fa-bolt-lightning text-yellow-400"></i>
      </button>
    </form>
  );
};

export default InputForm;
