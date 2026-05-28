import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../lib/theme";
import { Ionicons } from "@expo/vector-icons";

export function HomeHeader() {
  return (
    <View style={styles.row}>
      <Ionicons name="menu-outline" size={26} color={theme.colors.textPrimary} />
      <Text style={styles.logo}>ShipLogistics</Text>
      <Ionicons name="help-circle-outline" size={26} color={theme.colors.textPrimary} />
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
  }
});

