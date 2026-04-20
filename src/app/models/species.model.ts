/**
 * Represents a galactic species participating in the tournament.
 * Used across components to strongly type the data from the repository.
 */
export interface Species {
  id?: number;
  name: string;
  powerLevel: number;
  specialAbility: string;
  victories: number;
}
