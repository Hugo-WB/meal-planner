export interface Recipe {
  name: string;
  description: string;
  imageSrc: string;
  ingredients: string[];
  steps: string;
  id?: string;
  owner?: any; // <-- Fix this to whatever
  takeAway?: boolean;
}
