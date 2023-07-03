import React, { useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import {
  errorState,
  getExpensesFromStorage,
  loadingState,
  selectExpense,
} from "../features/expenseSlice";
import { getDateMinusDays, getFormattedDate } from "../utils/date";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import Wrapper from "../components/Wrapper";

function RecentExpenses({ navigation }) {
  const expenses = useSelector(selectExpense);
  const isLoading = useSelector(loadingState);
  const error = useSelector(errorState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpensesFromStorage());
  }, []);

  const recentExpenses = expenses?.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    const formattedDate7daysAgo = getFormattedDate(date7daysAgo);
    return expense?.date > formattedDate7daysAgo;
  });

  if (error && !isLoading) return <ErrorOverlay error={error} />;

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <Wrapper>
          <ExpensesOutput expenses={recentExpenses} period="Last 7 days" />
        </Wrapper>
      )}
    </>
  );
}

export default RecentExpenses;
