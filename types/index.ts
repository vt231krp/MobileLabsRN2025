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

export interface IChat {
  id: string;
  userName: string;
  userImage: any;
  lastMessage: string;
  lastMessageTime: number;
  isUnread: boolean;
  unreadMessages: number;
  isOnline: boolean;
  isFriend: boolean;
}

export interface ITab {
  id: string;
  label: string;
}
