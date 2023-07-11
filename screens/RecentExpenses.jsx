import React, { useState, useEffect } from "react";
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
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/ui/Button";
import { StyleSheet, TextInput, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldSetBadge: false,
    shouldPlaySound: false,
    shouldShowAlert: true,
  }),
});

function RecentExpenses({ navigation }) {
  const [maxLimit, setMaxLimit] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const expenses = useSelector(selectExpense);
  const isLoading = useSelector(loadingState);
  const error = useSelector(errorState);
  const dispatch = useDispatch();

  const recentExpenses = expenses?.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    const formattedDate7daysAgo = getFormattedDate(date7daysAgo);
    return expense?.date > formattedDate7daysAgo;
  });

  const expensesSum = recentExpenses?.reduce(
    (acc, current) => acc + current?.amount,
    0
  );

  function scheduleNotifications() {
    console.log("Scheduling notifications");
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Expense Tracker",
        body: "Expense amount exceeded set limit",
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  useEffect(() => {
    dispatch(getExpensesFromStorage());
  }, []);

  useEffect(() => {
    async function getLimit() {
      const limit = await AsyncStorage.getItem("limit");
      return parseFloat(limit);
    }
    async function checkExpenseLimit() {
      const limit = await getLimit();
      if (expensesSum > limit) {
        scheduleNotifications();
      }
    }

    checkExpenseLimit();
  }, [expensesSum]);

  async function saveExpenseLimit() {
    setIsOpen(false);
    await AsyncStorage.setItem("limit", maxLimit);
  }

  if (error && !isLoading) return <ErrorOverlay error={error} />;

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <Wrapper>
          <Button
            style={{ marginHorizontal: 16 }}
            onPress={() => setIsOpen(true)}
          >
            Set max expense limit
          </Button>
          {isOpen ? (
            <View style={styles.limitContainer}>
              <TextInput
                style={styles.textInput}
                keyboardType="decimal-pad"
                value={maxLimit}
                onChangeText={(value) => setMaxLimit(value)}
              />
              <View style={styles.buttonContainer}>
                <Button
                  style={{
                    width: "49%",
                  }}
                  onPress={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button style={{ width: "49%" }} onPress={saveExpenseLimit}>
                  Save
                </Button>
              </View>
            </View>
          ) : null}
          <ExpensesOutput expenses={recentExpenses} period="Last 7 days" />
        </Wrapper>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding: 8,
    margin: 8,
    borderRadius: 5,
  },
  limitContainer: {
    marginHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

export default RecentExpenses;
