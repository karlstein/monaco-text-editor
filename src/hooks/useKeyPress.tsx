import { useEffect, useState } from "react";

export default function useKeyPress(targetKey: any) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler(value: any) {
    if (value.key === targetKey) {
      setKeyPressed;
    }
  }

  function upHandler(value: any) {
    if (value.key === targetKey) {
      setKeyPressed;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", downHandler);
    document.addEventListener("keyup", upHandler);

    return () => {
      document.removeEventListener("keydown", downHandler);
      document.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
}
