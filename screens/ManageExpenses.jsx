import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  deleteExpense,
  errorState,
  getExpensesFromStorage,
  loadingState,
  selectExpense,
  updateExpense,
} from "../features/expenseSlice";
import ExpenseForm from "../components/ExpenseForm";
import { getFormattedDate } from "../utils/date";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorText from "../components/ErrorText";

function ManageExpenses({ route, navigation }) {
  const expenses = useSelector(selectExpense);
  const isLoading = useSelector(loadingState);
  const dispatch = useDispatch();
  const error = useSelector(errorState);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId; //to turn a value into a boolean --> falsy value to false and truthy value to true

  const selectedExpense = expenses?.find(
    (expense) => expense?.id === expenseId
  );
  const formattedSelectedExpense = selectedExpense && {
    ...selectedExpense,
    amount: selectedExpense?.amount?.toString(),
    date: getFormattedDate(selectedExpense?.date),
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense",
    });
  }, [expenseId, navigation]);

  function deleteItem() {
    dispatch(deleteExpense({ expenseId, expenses }));
    navigation.goBack();
    dispatch(getExpensesFromStorage());
  }

  async function cancel() {
    navigation.goBack();
  }

  async function handleConfirm(expenseData) {
    if (isEditing) {
      dispatch(updateExpense({ expenseId, expenseData, expenses }));
    } else {
      dispatch(addExpense({ expenseData, expenses }));
    }
    navigation.goBack();

    dispatch(getExpensesFromStorage());
  }

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <View style={styles.container}>
          {error && <ErrorText errorText={error} />}
          <ExpenseForm
            cancel={cancel}
            handleConfirm={handleConfirm}
            isEditing={isEditing}
            selectedExpense={formattedSelectedExpense}
          />
          {isEditing && (
            <View style={styles.deleteContainer}>
              <IconButton
                icon="trash"
                color={GlobalStyles.colors.error50}
                size={36}
                onPress={deleteItem}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary100,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "50%",
  },
});
