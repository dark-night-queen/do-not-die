import { UNIT_SYSTEM } from "@/constants/user";

export function cmToFeet(cm: number): string {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}.${inches}`;
}

export function feetToCm(height: string): string {
  const [feetStr, inchesStr] = height.split(".");
  const feet = Number(feetStr) || 0;
  const inches = Number(inchesStr) || 0;
  return Math.round((feet * 12 + inches) * 2.54).toString();
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

export function getDisplayHeight(height: string, unitSystem: string): string {
  if (!height) return height;
  const heightCm = parseFloat(height);
  if (isNaN(heightCm)) return height;

  if (unitSystem === UNIT_SYSTEM.Imperial) {
    return cmToFeet(heightCm);
  } else {
    return feetToCm(height);
  }
}

export function getDisplayWeight(weight: string, unitSystem: string): string {
  if (!weight) return weight;
  const weightKg = parseFloat(weight);
  if (isNaN(weightKg)) return weight;

  if (unitSystem === UNIT_SYSTEM.Imperial) {
    return kgToLbs(weightKg).toFixed(1);
  } else {
    return lbsToKg(weightKg).toFixed(1);
  }
}
