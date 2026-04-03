"use client";
import { useEffect } from "react";

export function CursorSpotlight() {
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      document.documentElement.style.setProperty("--spotlight-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--spotlight-y", `${e.clientY}px`);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  return null;
}
