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

export interface IPost {
  id: string;
  userName: string;
  userImage: any;
  postImage: any;
  postedAt: number;
  title: string;
  description: string;
  likes: number;
  comments: number;
  tags?: string[];
  isNews: boolean;
}
