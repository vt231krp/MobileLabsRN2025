import { IPost } from "../types";

export const posts: IPost[] = [
  {
    id: "post1",
    userName: "Eurogamer",
    userImage: require("../assets/images/eurogamer.png"),
    postImage: require("../assets/images/kingdom.jpg"),
    postedAt: Date.now(),
    title:
      "Florida tourist attraction sues Fortnite, seeks removal of in-game castle",
    description:
      "Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.",
    likes: 324,
    comments: 12,
    isNews: true,
    tags: ["Videos", "Guides"],
  },
  {
    id: "post2",
    userName: "Eurogamer",
    userImage: require("../assets/images/eurogamer.png"),
    postImage: require("../assets/images/kingdom.jpg"),
    postedAt: Date.now(),
    title:
      "Florida tourist attraction sues Fortnite, seeks removal of in-game castle",
    description:
      "Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.",
    likes: 324,
    comments: 12,
    isNews: false,
    tags: ["Videos", "Guides"],
  },
  {
    id: "post3",
    userName: "Eurogamer",
    userImage: require("../assets/images/eurogamer.png"),
    postImage: require("../assets/images/kingdom.jpg"),
    postedAt: Date.now(),
    title:
      "Florida tourist attraction sues Fortnite, seeks removal of in-game castle",
    description:
      "Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.",
    likes: 324,
    comments: 12,
    isNews: false,
    tags: ["Videos", "Guides"],
  },
  {
    id: "post4",
    userName: "Eurogamer",
    userImage: require("../assets/images/eurogamer.png"),
    postImage: require("../assets/images/kingdom.jpg"),
    postedAt: Date.now(),
    title:
      "Florida tourist attraction sues Fortnite, seeks removal of in-game castle",
    description:
      "Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.",
    likes: 324,
    comments: 12,
    isNews: false,
    tags: ["Videos", "Guides"],
  },
];
