// core dependencies
import React from "react";
import { MotiView } from "moti";
import { Pressable, StyleSheet } from "react-native";

// core components
import { Box } from "@/components/ui";

export const CameraButton = ({ onPress }: { onPress?: () => void }) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePress = async () => {
    setIsPressed(true);
    await onPress?.();
    await new Promise((resolve) => setTimeout(resolve, 60));
    setIsPressed(false);
  };

  return (
    <Pressable onPress={handlePress}>
      <Box style={styles.outerCircle}>
        <MotiView
          animate={{ scale: isPressed ? 0.9 : 1 }}
          transition={{ type: "timing", duration: 150 }}
        >
          <Box style={styles.innerCircle} />
        </MotiView>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  outerCircle: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  innerCircle: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
});
