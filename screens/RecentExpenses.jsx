import React, { useEffect } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import {
  errorState,
  fetchExpenses,
  loadingState,
  selectExpense,
} from "../features/expenseSlice";
import { getDateMinusDays } from "../utils/date";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function RecentExpenses({ navigation }) {
  const expenses = useSelector(selectExpense);
  const isLoading = useSelector(loadingState);
  const error = useSelector(errorState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);

    return expense.date > date7daysAgo;
  });

  if (error && !isLoading) return <ErrorOverlay error={error} />;

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <ExpensesOutput expenses={recentExpenses} period="Last 7 days" />
      )}
    </>
  );
}

export default RecentExpenses;
