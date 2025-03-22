import { IChat } from "../types";
import { UserStatus } from "../types";

export const chats: IChat[] = [
  {
    id: "1",
    userName: "John Doe",
    userImage: require("../assets/images/user1.png"),
    lastMessage: "Hey, how are you?",
    lastMessageTime: 1630320000000,
    isMyLastMessage: true,
    isUnread: false,
    unreadMessages: 0,
    status: UserStatus.ONLINE,
    isFriend: true,
  },
  {
    id: "2",
    userName: "Jane Smith",
    userImage: require("../assets/images/user2.png"),
    lastMessage: "Let's catch up soon!",
    lastMessageTime: 1630410000000,
    isMyLastMessage: false,
    isUnread: false,
    unreadMessages: 0,
    status: UserStatus.OFFLINE,
    isFriend: true,
  },
  {
    id: "3",
    userName: "Alice Johnson",
    userImage: require("../assets/images/user3.png"),
    lastMessage: "Can you send me the file?",
    lastMessageTime: 1630500000000,
    isMyLastMessage: false,
    isUnread: true,
    unreadMessages: 1,
    status: UserStatus.ONLINE,
    isFriend: false,
  },
  {
    id: "4",
    userName: "Bob Brown",
    userImage: require("../assets/images/user1.png"),
    lastMessage: "Thanks for the help!",
    lastMessageTime: 1630590000000,
    isMyLastMessage: true,
    isUnread: false,
    unreadMessages: 0,
    status: UserStatus.OFFLINE,
    isFriend: true,
  },
  {
    id: "5",
    userName: "Charlie Green",
    userImage: require("../assets/images/user1.png"),
    lastMessage: "See you tomorrow.",
    lastMessageTime: 1630680000000,
    isMyLastMessage: false,
    isUnread: true,
    unreadMessages: 2,
    status: UserStatus.ONLINE,
    isFriend: false,
  },
  {
    id: "6",
    userName: "Diana White",
    userImage: require("../assets/images/user2.png"),
    lastMessage: "Happy Birthday!",
    lastMessageTime: 1630770000000,
    isMyLastMessage: true,
    isUnread: false,
    unreadMessages: 0,
    status: UserStatus.OFFLINE,
    isFriend: true,
  },
  {
    id: "7",
    userName: "Ethan Black",
    userImage: require("../assets/images/user3.png"),
    lastMessage: "Can we reschedule?",
    lastMessageTime: 1630860000000,
    isMyLastMessage: false,
    isUnread: true,
    unreadMessages: 1,
    status: UserStatus.ONLINE,
    isFriend: false,
  },
  {
    id: "8",
    userName: "Fiona Blue",
    userImage: require("../assets/images/user3.png"),
    lastMessage: "I'll call you later.",
    lastMessageTime: 1630950000000,
    isMyLastMessage: true,
    isUnread: false,
    unreadMessages: 0,
    status: UserStatus.OFFLINE,
    isFriend: true,
  },
  {
    id: "9",
    userName: "George Yellow",
    userImage: require("../assets/images/user3.png"),
    lastMessage: "Where are you?",
    lastMessageTime: 1631040000000,
    isMyLastMessage: false,
    isUnread: true,
    unreadMessages: 4,
    status: UserStatus.ONLINE,
    isFriend: false,
  },
  {
    id: "10",
    userName: "Hannah Red",
    userImage: require("../assets/images/user1.png"),
    lastMessage: "Good night!",
    lastMessageTime: 1631130000000,
    isMyLastMessage: true,
    isUnread: false,
    unreadMessages: 0,
    status: UserStatus.OFFLINE,
    isFriend: true,
  },
  {
    id: "11",
    userName: "Ian Gray",
    userImage: require("../assets/images/user1.png"),
    lastMessage: "Let's meet at 5 PM.",
    lastMessageTime: 1631220000000,
    isMyLastMessage: false,
    isUnread: true,
    unreadMessages: 1,
    status: UserStatus.ONLINE,
    isFriend: false,
  },
  {
    id: "12",
    userName: "Julia Pink",
    userImage: require("../assets/images/user2.png"),
    lastMessage: "Thank you!",
    lastMessageTime: 1631310000000,
    isMyLastMessage: true,
    isUnread: false,
    unreadMessages: 0,
    status: UserStatus.OFFLINE,
    isFriend: true,
  },
  {
    id: "13",
    userName: "Kevin Orange",
    userImage: require("../assets/images/user3.png"),
    lastMessage: "I'll be there in 10 minutes.",
    lastMessageTime: 1631400000000,
    isMyLastMessage: false,
    isUnread: true,
    unreadMessages: 2,
    status: UserStatus.ONLINE,
    isFriend: false,
  },
  {
    id: "14",
    userName: "Laura Purple",
    userImage: require("../assets/images/user1.png"),
    lastMessage: "Can you help me with this?",
    lastMessageTime: 1631490000000,
    isMyLastMessage: true,
    isUnread: false,
    unreadMessages: 0,
    status: UserStatus.OFFLINE,
    isFriend: true,
  },
  {
    id: "15",
    userName: "Michael Cyan",
    userImage: require("../assets/images/user1.png"),
    lastMessage: "See you at the meeting.",
    lastMessageTime: 1631580000000,
    isMyLastMessage: false,
    isUnread: true,
    unreadMessages: 3,
    status: UserStatus.ONLINE,
    isFriend: false,
  },
];
