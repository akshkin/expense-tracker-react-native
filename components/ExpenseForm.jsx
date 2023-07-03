import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "./ui/Button";
import { getFormattedDate, getTimestamp } from "../utils/date";
import DatePickerAndroid from "@react-native-community/datetimepicker";
import { nanoid } from "@reduxjs/toolkit";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";

function ExpenseForm({ handleConfirm, cancel, isEditing, selectedExpense }) {
  const [formData, setFormData] = useState(
    selectedExpense
      ? { ...selectedExpense }
      : { id: nanoid(), title: "", amount: "", date: getTimestamp(new Date()) }
  );
  const [open, setOpen] = useState(false);

  const { id, title, amount, date } = formData;

  const expenseData = {
    id: id,
    title: title,
    amount: parseInt(amount),
    date: getFormattedDate(date),
  };
  const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
  const isDateValid = new Date(date) !== "Invalid Date";
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

    handleConfirm(expenseData);
  }

  return (
    <View style={styles.container}>
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
      <Button onPress={() => setOpen(true)}>Pick date</Button>
      {open && (
        <DatePickerAndroid
          value={new Date(date)}
          mode="date"
          display="default"
          onChange={(value) => {
            handleChange("date", value.nativeEvent.timestamp);
            setOpen(false);
          }}
        />
      )}
      <View style={styles.selectedDateContainer}>
        <Ionicons
          name="calendar"
          size={24}
          color={GlobalStyles.colors.primary50}
        />
        <Text style={styles.selectedDate}>{getFormattedDate(date)}</Text>
      </View>
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
  container: {
    width: "100%",
    marginHorizontal: "auto",
  },
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
  selectedDateContainer: {
    padding: 4,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  selectedDate: {
    color: GlobalStyles.colors.primary50,
  },
});
