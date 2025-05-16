export enum Sex {
  Male = "m",
  Female = "f",
}

const FOOD_ITEMS: { calories: number; servings: number }[] = [
  { calories: 137, servings: 4 },
  { calories: 64, servings: 8 },
  { calories: 271, servings: 4 },
  { calories: 40, servings: 12 },
  { calories: 297, servings: 1 },
  { calories: 125, servings: 6 },
  { calories: 482, servings: 2 },
  { calories: 835, servings: 2 },
  { calories: 37, servings: 25 },
  { calories: 59, servings: 20 },
];

const CALORIES_PER_KG = 9000;
const CM_PER_METER = 100;

function calculateBMR(weightKg: number, heightM: number, age: number, sex: Sex): number {
  const heightCm = heightM * CM_PER_METER;
  return Math.ceil(
    sex === Sex.Male
      ? 66.47 + 13.7 * weightKg + 5.003 * heightCm - 6.75 * age
      : 655.1 + 9.563 * weightKg + 1.85 * heightCm - 4.676 * age
  );
}

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;
  if (weightGainKg < 0) {
    throw new Error("This diet is for gaining weight, not losing it!");
  }
  if (ageY < 16 || heightM < 1.5) {
    throw new Error("You do not qualify for this kind of diet.");
  }

  const dailyCaloriesOnDiet = FOOD_ITEMS
    .map(item => item.calories * item.servings)
    .reduce((sum, value) => sum + value, 0);

  const bmr = calculateBMR(currentWeightKg, heightM, ageY, sex);

  const dailyExcessCalories = dailyCaloriesOnDiet - bmr;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }

  return Math.ceil((CALORIES_PER_KG * weightGainKg) / dailyExcessCalories);
}