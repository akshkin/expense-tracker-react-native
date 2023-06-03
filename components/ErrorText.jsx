import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";

function ErrorText({ errorText }) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="error"
        size={24}
        color={GlobalStyles.colors.error500}
      />
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

export default ErrorText;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    color: GlobalStyles.colors.error500,
    padding: 6,
    marginVertical: 8,
    gap: 8,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    flexWrap: "wrap",
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    fontWeight: "bold",
    // marginHorizontal: 8,
  },
});
