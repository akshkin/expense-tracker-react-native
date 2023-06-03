import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.buttonContainer, styles.pressed]
          : styles.buttonContainer
      }
      android_ripple={{ color: "#ccc" }}
      onPress={onPress}
    >
      <View>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 4,
  },
  pressed: {
    opacity: 0.5,
  },
});
