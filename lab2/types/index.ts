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

export enum UserStatus {
  ONLINE = "ONLINE",
  IN_GAME = "IN_GAME",
  OFFLINE = "OFFLINE",
  AWAY = "AWAY",
  BUSY = "BUSY",
}

export interface IChat {
  id: string;
  userName: string;
  userImage: any;
  lastMessage: string;
  lastMessageTime: number;
  isMyLastMessage: boolean;
  isUnread: boolean;
  unreadMessages: number;
  isFriend: boolean;
  status?: UserStatus;
}

export interface ITab {
  id: string;
  label: string;
}
