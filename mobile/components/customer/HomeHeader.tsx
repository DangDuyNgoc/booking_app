import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../lib/theme";

export function HomeHeader() {
  return (
    <View style={styles.row}>
      <Text style={styles.icon}>=</Text>
      <Text style={styles.logo}>ShipLogistics</Text>
      <Text style={styles.icon}>?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg
  },
  logo: {
    color: theme.colors.primaryDark,
    fontSize: 29,
    fontWeight: "800"
  },
  icon: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    width: 22,
    textAlign: "center"
  }
});
