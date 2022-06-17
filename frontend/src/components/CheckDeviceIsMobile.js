import { useState, useEffect } from "react";

function getWindowWidth() {
  const width = window.innerWidth;
  return width;
}

export default function CheckDeviceIsMobile() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowWidth <= 900) {
    return true;
  } else {
    return false;
  }
}
