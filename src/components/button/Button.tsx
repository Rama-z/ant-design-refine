import React from "react";
import "./button.css";

interface ButtonProps {
  number?: number;
  priorities?: "primary" | "secondary" | "disabled";
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
  label?: string;
}

export const Button = ({
  priorities = "primary",
  number = 1,
  backgroundColor,
  borderRadius = "10px",
  padding = "10px 20px",
  label = "Button no",
  ...props
}: ButtonProps) => {
  const priority: string =
    priorities === "primary"
      ? "primary-button"
      : priorities === "secondary"
      ? "secondary-button"
      : "disabled-button";
  return (
    <>
      <button
        className={priority}
        style={{
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          padding: padding,
        }}
      >{`${label}.${number}`}</button>
    </>
  );
};
