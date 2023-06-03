import React from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { useSelector } from "react-redux";
import { selectExpense } from "../features/expenseSlice";
import { getDateMinusDays } from "../utils/date";

function RecentExpenses({ navigation }) {
  const expenses = useSelector(selectExpense);
  // console.log(expenses);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);

    return expense.date > date7daysAgo;
  });

  return <ExpensesOutput expenses={recentExpenses} period="Last 7 days" />;
}

export default RecentExpenses;
