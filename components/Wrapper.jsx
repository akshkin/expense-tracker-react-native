import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function Wrapper({ children }) {
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.container} colors={["#cdb4db", "#ffc8dd"]}>
        {children}
      </LinearGradient>
    </View>
  );
}

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
