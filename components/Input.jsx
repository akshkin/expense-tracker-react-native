import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ErrorText from "./ErrorText";

function Input({ label, textInput, invalid, errorText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={
          textInput?.multiline
            ? [styles.input, styles.inputMultiline]
            : styles.input
        }
        {...textInput}
      />
      {invalid && <ErrorText errorText={errorText} />}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginVertical: 8,
  },
  label: {
    color: GlobalStyles.colors.primary50,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 6,
    marginVertical: 4,
    borderRadius: 6,
    color: GlobalStyles.colors.primary800,
  },
  inputMultiline: {
    textAlignVertical: "top",
    minHeight: 100,
  },
});
