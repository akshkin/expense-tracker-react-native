import React from "react";
import { FlatList } from "react-native";
import ExpenseListItem from "./ExpenseListItem";

function ExpensesList({ expenses }) {
  function renderExpenseItem(itemData) {
    return <ExpenseListItem expense={itemData.item} />;
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item?.id}
      renderItem={(itemData) => renderExpenseItem(itemData)}
    />
  );
}

export default ExpensesList;
