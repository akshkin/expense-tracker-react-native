import React from "react";
import ErrorText from "../ErrorText";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { fetchExpenses } from "../../features/expenseSlice";

function ErrorOverlay({ error }) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <ErrorText errorText={error} />
      {/* <Button onPress={() => dispatch(fetchExpenses())}>Try again</Button> */}
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
