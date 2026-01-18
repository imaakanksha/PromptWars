
export enum TaskCategory {
  PREP = 'prep',
  COOK = 'cook',
  CLEAN = 'clean',
  SERVE = 'serve'
}

export interface CookingTask {
  id: string;
  task: string;
  category: TaskCategory;
  duration: string;
  isCompleted: boolean;
}

export interface CookingPlan {
  mealName: string;
  description: string;
  totalTime: string;
  difficulty: string;
  tasks: CookingTask[];
  tips: string[];
}

export interface UserInputs {
  mealType: string;
  availableTime: string;
  energyLevel: string;
  ingredients: string;
  dietaryRestrictions: string;
  minimalSetup: boolean;
}
