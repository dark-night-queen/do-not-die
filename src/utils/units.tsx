import { UnitSystemOptions } from "@/constants/user.bodyMetric.type";

export function cmToFeet(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

export function feetToCm(feet: number, inches: number): number {
  return Math.round((feet * 12 + inches) * 2.54);
}

export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462);
}

export function lbsToKg(lbs: number): number {
  return Math.round(lbs / 2.20462);
}

export function getHeightUnitSystem(unitSystem: string): string {
  return unitSystem === UnitSystemOptions.Imperial ? "ft" : "cm";
}

export function getWeightUnitSystem(unitSystem: string): string {
  return unitSystem === UnitSystemOptions.Imperial ? "lbs" : "kg";
}
