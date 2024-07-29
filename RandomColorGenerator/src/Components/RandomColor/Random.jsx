import { useEffect, useState, useCallback } from "react";
import style from "./RandomStyle.module.css";

const Random = () => {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  const createRandomNumber = useCallback((length) => {
    return Math.floor(Math.random() * length);
  }, []);

  const handleRandomHexColor = useCallback(() => {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[createRandomNumber(hex.length)];
    }
    setColor(hexColor);
  }, [createRandomNumber]);

  const handleRandomRgbColor = useCallback(() => {
    const r = createRandomNumber(256);
    const g = createRandomNumber(256);
    const b = createRandomNumber(256);

    setColor(`rgb(${r},${g},${b})`);
  }, [createRandomNumber]);

  useEffect(() => {
    if (typeOfColor === "hex") {
      handleRandomHexColor();
    } else {
      handleRandomRgbColor();
    }
  }, [typeOfColor, handleRandomHexColor, handleRandomRgbColor]);

  return (
    <div
      className={style.container}
      style={{ width: "100vw", height: "100vh", backgroundColor: color }}
    >
      <button onClick={() => setTypeOfColor("hex")}>Generate HEX color</button>
      <button onClick={() => setTypeOfColor("rgb")}>Generate RGB color</button>
      <button
        onClick={
          typeOfColor === "hex" ? handleRandomHexColor : handleRandomRgbColor
        }
      >
        Generate Random color
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "2rem",
        }}
      >
        <h1>{color}</h1>
        <h3>{typeOfColor === "rgb" ? "RGB COLOR" : "HEX COLOR"}</h3>
      </div>
    </div>
  );
};

export default Random;
