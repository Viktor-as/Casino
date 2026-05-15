interface SpinnerProps {
  color?: string;
  size?: number | string;
}

const Spinner = ({ color = "white", size = 20 }: SpinnerProps) => {
  const sizeValue = typeof size === "number" ? `${size}px` : size;
  const borderWidth = typeof size === "number" ? Math.max(2, Math.floor(size / 10)) : "0.1875rem";

  return (
    <div
      className="rounded-full border-solid animate-spin"
      style={{
        width: sizeValue,
        height: sizeValue,
        borderWidth: borderWidth,
        borderColor: `${color} transparent ${color} ${color}`,
      }}
    />
  );
};

export default Spinner;
