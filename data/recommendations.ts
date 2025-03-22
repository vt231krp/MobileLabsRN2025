import { IRecommendation } from "../types";

export const recommendations: IRecommendation[] = [
  {
    id: "dead-by-daylight",
    name: "Dead by Daylight",
    image: require("../assets/images/dead-by-daylight.png"),
    price: 5,
    oldPrice: 18,
    discountPercentage: 70,
    os: "Windows",
    recommendedBy: "Player",
  },
  {
    id: "battlefield-2042",
    name: "Battlefield 2042",
    image: require("../assets/images/battlefield.png"),
    price: 5,
    oldPrice: 18,
    discountPercentage: 70,
    os: "Windows",
    recommendedBy: "Player",
  },
];
