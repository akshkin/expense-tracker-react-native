import axios from "axios";
import { REACT_APP_URL } from "@env";

const URL = REACT_APP_URL;

export async function storeExpense(expenseData) {
  await axios.post(`${URL}/expenses.json`, expenseData);
}

export async function getExpenses() {
  const response = await axios.get(`${URL}/expenses.json`);
  return response.data;
}

export async function updateExpenses(id, expenseData) {
  await axios.patch(`${URL}/expenses/${id}.json`, expenseData);
}
export async function deleteExpenses(id) {
  await axios.delete(`${URL}/expenses/${id}.json`);
}
