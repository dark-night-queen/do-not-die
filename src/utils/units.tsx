import { UNIT_SYSTEM } from "@/constants/user";

export function cmToFeet(cm: number): number {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return parseFloat(`${feet}.${inches}`);
}

export function feetToCm(height: number): number {
  const [feetStr, inchesStr] = height.toString().split(".");
  const feet = parseInt(feetStr) || 0;
  const inches = parseInt(inchesStr) || 0;
  return Math.round((feet * 12 + inches) * 2.54);
}

export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462);
}

export function lbsToKg(lbs: number): number {
  return Math.round(lbs / 2.20462);
}

export function getHeightUnitSystem(unitSystem: string): string {
  return unitSystem === UNIT_SYSTEM.Imperial ? "ft" : "cm";
}

export function getWeightUnitSystem(unitSystem: string): string {
  return unitSystem === UNIT_SYSTEM.Imperial ? "lbs" : "kg";
}

export function getDisplayHeight(height: number, unitSystem: string): number {
  if (!height) return height;
  const heightCm = height;
  if (isNaN(heightCm)) return height;

  if (unitSystem === UNIT_SYSTEM.Imperial) {
    return cmToFeet(heightCm);
  } else {
    return feetToCm(height);
  }
}

export function getDisplayWeight(weight: number, unitSystem: string): number {
  if (!weight) return weight;
  const weightKg = weight;
  if (isNaN(weightKg)) return weight;

  if (unitSystem === UNIT_SYSTEM.Imperial) {
    return parseFloat(kgToLbs(weightKg).toFixed(1));
  } else {
    return parseFloat(lbsToKg(weightKg).toFixed(1));
  }
}
