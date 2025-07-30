import React from "react";

import {
  AnimatedCircularProgress,
  AnimatedCircularProgressProps,
} from "react-native-circular-progress";

const CircularProgress = (props: AnimatedCircularProgressProps) => {
  const {
    tintColor = "#8B5CF6",
    backgroundColor = "rgba(156, 163, 175, 0.1)",
    ...otherProps
  } = props;

  return (
    <AnimatedCircularProgress
      rotation={0}
      lineCap="round"
      tintColor={tintColor}
      backgroundColor={backgroundColor}
      {...otherProps}
    />
  );
};

export { CircularProgress };
