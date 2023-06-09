import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ExpensesSummary({ expenses, period }) {
  const expensesSum = expenses.reduce(
    (acc, current) => acc + current.amount,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.sum}>SEK {expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary800,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
  },
});
