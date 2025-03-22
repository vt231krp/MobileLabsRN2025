export interface IGame {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  image: any;
  os: string;
  tags?: string[];
}

export interface IRecommendation extends IGame {
  recommendedBy?: string;
}
