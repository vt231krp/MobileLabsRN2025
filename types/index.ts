export interface IGame {
  name: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  image: any;
  os: string;
  recommendedBy?: string;
}
