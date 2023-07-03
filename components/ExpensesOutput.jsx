import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

function ExpensesOutput({ expenses, period }) {
  if (!expenses?.length) return <Text>No expenses added in {period}</Text>;

  return (
    <>
      {expenses && expenses?.length > 0 ? (
        <View style={styles.container}>
          <ExpensesSummary expenses={expenses} period={period} />
          <ExpensesList expenses={expenses} />
        </View>
      ) : (
        <Text style={styles.text}>No expenses</Text>
      )}
    </>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // backgroundColor: GlobalStyles.colors.primar700,
  },
  text: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 18,
  },
});
