import { useEffect, useState } from "react";

function useEffectTrain() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  function handleSize() {
    setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleSize);

    return () => {
      console.log(windowWidth);
    };
  }, [window.innerWidth]);

  return <div>{windowWidth}</div>;
}

export default useEffectTrain;
