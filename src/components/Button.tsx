import React from "react";
import { css } from "@linaria/core";

const button = css`
  background-color: blue;
  color: white;
`;

const Button = () => {
  return <button className={button}>Test</button>;
};

export default Button;
