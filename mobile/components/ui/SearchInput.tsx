import { StyleSheet, TextInput, View, Text } from "react-native";
import { theme } from "../../lib/theme";

export function SearchInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput placeholder="Giao đến đâu?" placeholderTextColor="#8A99AF" style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceSoft,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    flexDirection: "row",
    gap: theme.spacing.sm,
    height: 52,
    paddingHorizontal: theme.spacing.lg
  },
  icon: {
    color: "#6B7A90",
    fontSize: 16,
    fontWeight: "700"
  },
  input: {
    color: theme.colors.textPrimary,
    flex: 1,
    fontSize: 14
  }
});
