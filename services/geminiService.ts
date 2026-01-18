
import { GoogleGenAI, Type } from "@google/genai";
import { UserInputs, TaskCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateCookingPlan = async (inputs: UserInputs) => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Act as a professional sous-chef and productivity expert. 
    Create a highly efficient and realistic cooking to-do list for a user with the following context:
    - Meal Type: ${inputs.mealType}
    - Available Time: ${inputs.availableTime}
    - Energy Level: ${inputs.energyLevel} (Adjust instructions: if Low, prioritize minimal physical movement)
    - Kitchen Setup: ${inputs.minimalSetup ? 'Minimal/Limited (Avoid complex appliances, use one-pot methods)' : 'Standard'}
    - Ingredients on hand: ${inputs.ingredients}
    - Dietary Restrictions: ${inputs.dietaryRestrictions}

    GOAL: Produce a cooking plan that minimizes effort and avoids unnecessary steps.
    
    GUIDELINES:
    1. For Low Energy/Minimal Time: Focus on one-pot/pan meals, pre-cut shortcuts, and passive cooking.
    2. Practicality: Ensure tasks follow a logical sequence that saves time (e.g., boil water while chopping).
    3. Cleanup: Integrate "Clean as you go" tasks naturally.
    4. Simplicity: If energy is Low or Setup is Minimal, skip non-essential garnishes or multi-stage prep.
    5. Actionable: Every task must be a clear, simple command.

    Breakdown the process into prep, cook, clean, and serve tasks.
  `;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          mealName: { type: Type.STRING },
          description: { type: Type.STRING },
          totalTime: { type: Type.STRING },
          difficulty: { type: Type.STRING },
          tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                task: { type: Type.STRING },
                category: { 
                    type: Type.STRING,
                    description: 'One of: prep, cook, clean, serve'
                },
                duration: { type: Type.STRING }
              },
              required: ["task", "category", "duration"]
            }
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["mealName", "description", "totalTime", "difficulty", "tasks", "tips"]
      }
    }
  });

  const rawText = response.text;
  try {
    const data = JSON.parse(rawText);
    // Add unique IDs to tasks for React mapping
    data.tasks = data.tasks.map((task: any, index: number) => ({
      ...task,
      id: `task-${index}`,
      isCompleted: false
    }));
    return data;
  } catch (e) {
    console.error("Failed to parse AI response:", e);
    throw new Error("The chef had a little trouble thinking. Try again!");
  }
};
