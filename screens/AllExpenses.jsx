import React from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { useSelector } from "react-redux";
import { selectExpense } from "../features/expenseSlice";

function AllExpenses() {
  const expenses = useSelector(selectExpense);
  // console.log(expenses);
  return <ExpensesOutput expenses={expenses} period="Total" />;
}

export default AllExpenses;
