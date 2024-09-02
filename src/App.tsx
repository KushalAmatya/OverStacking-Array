import React, { useState } from "react";
import Circle from "./Circle";

interface CircleData {
  id: number;
  size: number;
  position: { x: number; y: number };
  color: string;
}

enum CircleColor {
  BLUE = "blue",
  RED = "red",
  GREEN = "green",
  YELLOW = "yellow",
  PURPLE = "purple",
  ORANGE = "orange",
  PINK = "pink",
  CYAN = "cyan",
  BROWN = "brown",
  BLACK = "black",
}

const App = () => {
  const [circles, setCircles] = useState<CircleData[]>([]);

  const handleCollision = (circle: CircleData): CircleData | undefined => {
    const { x, y } = circle.position;
    const circleRadius = circle.size / 2;
    const circleCenter = { x: x + circleRadius, y: y + circleRadius };

    return circles.find((c) => {
      const cRadius = c.size / 2;
      const cCenter = { x: c.position.x + cRadius, y: c.position.y + cRadius };

      const distance = Math.sqrt(
        Math.pow(circleCenter.x - cCenter.x, 2) +
          Math.pow(circleCenter.y - cCenter.y, 2)
      );
      if (distance < circleRadius + cRadius) {
        console.log("collision");
      }
      return distance < circleRadius + cRadius;
    });
  };

  const handleAddCircle = (e: React.MouseEvent) => {
    const randomColor =
      Object.values(CircleColor)[
        Math.floor(Math.random() * Object.values(CircleColor).length)
      ];

    const circleSize = Math.random() * 100 + 50;
    const newCircle: CircleData = {
      id: Date.now(),
      size: circleSize,
      position: {
        x: e.clientX - circleSize / 2,
        y: e.clientY - circleSize / 2,
      },
      color: randomColor,
    };

    setCircles((prevCircles) => {
      const collidingCircle = handleCollision(newCircle);

      if (collidingCircle) {
        if (newCircle.size > collidingCircle.size) {
          return prevCircles.map((circle) =>
            circle.id === collidingCircle.id ? newCircle : circle
          );
        } else {
          return prevCircles;
        }
      }

      if (prevCircles.length === 3) {
        console.log("remove first circle", newCircle);

        return [...prevCircles.slice(1), newCircle];
      }
      console.log("add new circle", Date.now());
      return [...prevCircles, newCircle];
    });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={handleAddCircle}
    >
      {circles.map((circle) => (
        <Circle
          key={circle.id}
          size={circle.size}
          position={circle.position}
          randomColor={circle.color}
        />
      ))}
    </div>
  );
};

export default App;
