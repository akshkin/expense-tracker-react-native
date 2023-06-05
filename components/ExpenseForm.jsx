import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "./ui/Button";
import { getTimestamp } from "../utils/date";

function ExpenseForm({ handleConfirm, cancel, isEditing, selectedExpense }) {
  const [formData, setFormData] = useState(
    selectedExpense
      ? { ...selectedExpense }
      : { title: "", amount: "", date: "" }
  );

  const { title, amount, date } = formData;

  const expenseData = {
    title: title,
    amount: parseInt(amount),
    date: getTimestamp(date),
  };
  const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
  const isDateValid =
    date.length === 10 && new Date(date).toString() !== "Invalid Date";
  const isTitleValid = expenseData.title.trim().length > 0;

  function handleChange(name, enteredValue) {
    setFormData((prevValues) => {
      return {
        ...prevValues,
        [name]: enteredValue,
      };
    });
  }

  function handleSubmit() {
    if (!isDateValid || !isAmountValid || !isTitleValid) {
      // Alert.alert("Invalid input", "Please check your input values");
      return;
    }

    console.log(expenseData);
    handleConfirm(expenseData);
  }

  return (
    <View>
      <Text style={styles.text}>{isEditing ? "Edit" : "New"} expense</Text>
      <Input
        label="Title"
        invalid={!isTitleValid}
        errorText="Title must not be empty"
        textInput={{
          keyboardType: "default",
          multiline: true,
          autoCorrect: false,
          value: title,
          onChangeText: (value) => handleChange("title", value),
        }}
      />
      <Input
        label="Amount"
        invalid={!isAmountValid}
        errorText="Amount must be a positive number"
        textInput={{
          keyboardType: "decimal-pad",
          value: amount,
          onChangeText: (value) => handleChange("amount", value),
        }}
      />
      <Input
        label="Date"
        invalid={!isDateValid}
        errorText="Date must be entered in the form YYYY-MM-DD"
        textInput={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          keyboardType: "decimal-pad",
          value: date,
          onChangeText: (value) => handleChange("date", value),
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={cancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmit}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
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
