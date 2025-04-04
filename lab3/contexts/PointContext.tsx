import { createContext, ReactNode, useState } from "react";

interface IPointContenxt {
  score: number;
  incPoints: (points: number) => void;
  decPoints: (points: number) => void;
  resetPoints: () => void;
}

export const PointContext = createContext<IPointContenxt | null>(null);

export const PointProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState<number>(0);

  const incPoints = (points: number) => {
    if (score + points > 0) {
      setScore(score + points);
    } else {
      setScore(0);
    }
  };

  const decPoints = (points: number) => {
    if (score - points > 0) {
      setScore(score - points);
    } else {
      setScore(0);
    }
  };

  const resetPoints = () => {
    setScore(0);
  };

  return (
    <PointContext.Provider value={{ score, incPoints, decPoints, resetPoints }}>
      {children}
    </PointContext.Provider>
  );
};
