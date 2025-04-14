export interface HelpPost {
  id: string;
  ngoName: string;
  location: string;
  helpType: string;
  description: string;
  availableFrom: Date;
  availableTo?: Date;
  initialQuantity?: number;
  remainingQuantity?: number;
  postedDate: Date;
  isVerified: boolean;
}
