import { IGame } from "../types";

export const recommendations: IGame[] = [
  {
    name: "Dead by Daylight",
    image: require("../assets/images/dead-by-daylight.png"),
    price: 5,
    oldPrice: 18,
    discountPercentage: 70,
    os: "Windows",
    recommendedBy: "Player",
  },
  {
    name: "Battlefield 2042",
    image: require("../assets/images/battlefield.png"),
    price: 5,
    oldPrice: 18,
    discountPercentage: 70,
    os: "Windows",
    recommendedBy: "Player",
  },
];
