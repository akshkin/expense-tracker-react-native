import React, { useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import {
  errorState,
  fetchExpenses,
  loadingState,
  selectExpense,
} from "../features/expenseSlice";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import Wrapper from "../components/Wrapper";

function AllExpenses() {
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingState);
  const expenses = useSelector(selectExpense);
  const error = useSelector(errorState);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  if (error && !isLoading) return <ErrorOverlay error={error} />;

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <Wrapper>
          <ExpensesOutput expenses={expenses} period="Total" />
        </Wrapper>
      )}
    </>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
