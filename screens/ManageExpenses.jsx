import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";
import { useDispatch } from "react-redux";
import {
  addExpense,
  deleteExpense,
  getTimestamp,
  updateExpense,
} from "../features/expenseSlice";

function ManageExpenses({ route, navigation }) {
  const dispatch = useDispatch();
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId; //to turn a value into a boolean --> falsy value to false and truthy value to true

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense",
    });
  }, [expenseId, navigation]);

  function deleteItem() {
    dispatch(deleteExpense(expenseId));
    navigation.goBack();
  }

  function cancel() {
    navigation.goBack();
  }

  function handleConfirm() {
    console.log("yo");
    const newExpense = {
      title: "milk",
      amount: 12,
      date: getTimestamp(new Date("2023-05-31")),
    };
    if (isEditing) {
      dispatch(updateExpense({ id: expenseId, ...newExpense }));
    } else {
      dispatch(addExpense(newExpense));
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text>{expenseId}</Text>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={cancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirm}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteItem}
          />
        </View>
      )}
    </View>
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
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
    backgroundColor: "white",
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
