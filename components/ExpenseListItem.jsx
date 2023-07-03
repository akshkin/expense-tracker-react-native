import React from "react";
import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { getFormattedDate } from "../utils/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseListItem({ expense }) {
  const navigation = useNavigation();

  if (!expense) return;

  const { id, title, date, amount } = expense;

  function handlePress() {
    navigation.navigate("Manage Expenses", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      android_ripple={{ color: GlobalStyles.colors.gray500 }}
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
      onPress={handlePress}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.text, styles.title]}>{title}</Text>
          <Text style={styles.text}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>SEK {amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseListItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary400,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  expenseItem: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary400,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
