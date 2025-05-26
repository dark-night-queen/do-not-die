import { Apple, Bone, Heart, Leaf, LucideIcon, Zap } from 'lucide-react-native';
import { create } from 'zustand';

type Micronutrient = {
  name: string;
  value: number;
  shortName: string;
  target: number;
  unit: string;
  description: string;
  importance: string;
  icon: LucideIcon;
};

interface NutrientState {
  caloriesConsumed: number;
  targetCalories: number;
  proteinConsumed: number;
  targetProtein: number;
  carbsConsumed: number;
  targetCarbs: number;
  fatsConsumed: number;
  targetFats: number;

  healthScore: number;
  micronutrients: Micronutrient[];
}

export const useNutrientStore = create<NutrientState>((set, get) => ({
  caloriesConsumed: 400,
  targetCalories: 1458,

  proteinConsumed: 15,
  targetProtein: 150,

  carbsConsumed: 45,
  targetCarbs: 300,

  fatsConsumed: 0,
  targetFats: 65,

  healthScore: 80,

  micronutrients: [
    {
      name: 'Fiber',
      shortName: 'Fib',
      value: 0,
      target: 30,
      unit: 'g',
      description: 'Fiber aids digestion and helps maintain a healthy gut. Aim for 30g daily.',
      importance: 'Essential for digestive health and maintaining steady blood sugar levels.',
      icon: Leaf,
    },
    {
      name: 'Vitamin C',
      shortName: 'VitC',
      value: 0,
      target: 90,
      unit: 'mg',
      description: 'Vitamin C boosts immunity and aids in collagen production. Aim for 90mg daily.',
      importance:
        'Critical for immune function and skin health. Found in citrus fruits and vegetables.',
      icon: Apple,
    },
    {
      name: 'Calcium',
      shortName: 'Cal',
      target: 1000,
      unit: 'mg',
      description: 'Calcium is vital for bone health. Aim for 1000mg daily.',
      importance: 'Essential for strong bones and teeth. Also important for muscle function.',
      icon: Bone,
      value: 0,
    },
    {
      name: 'Iron',
      shortName: 'Iro',
      target: 18,
      unit: 'mg',
      description: 'Iron is essential for blood health and energy. Aim for 18mg daily.',
      importance: 'Crucial for oxygen transport in blood and preventing fatigue.',
      icon: Heart,
      value: 0,
    },
    {
      name: 'Potassium',
      shortName: 'Pot',
      target: 3500,
      unit: 'mg',
      description:
        'Potassium regulates fluid balance and supports heart health. Aim for 3500mg daily.',
      importance: 'Vital for heart rhythm, muscle contractions, and blood pressure regulation.',
      icon: Zap,
      value: 0,
    },
  ],
}));

interface MicronutrientStore {}

export const useMicroNutrientStore = create<MicronutrientStore>((set, get) => ({}));
