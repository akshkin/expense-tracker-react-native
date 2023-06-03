import React from "react";
import { View, StyleSheet } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../constants/styles";
import { useSelector } from "react-redux";
import { selectExpense } from "../features/expenseSlice";

function ExpensesOutput({ expenses, period }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primar700,
  },
});
