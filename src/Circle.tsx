interface CircleProps {
  size: number;
  position: { x: number; y: number };
  randomColor: string;
}

const Circle = ({ size, position, randomColor }: CircleProps) => {
  return (
    <div
      className={`transition duration-200 ease-in-out transform hover:scale-110 `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: `${randomColor}`,
        borderRadius: "50%",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default Circle;
