import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../../lib/theme";
import { Ionicons } from "@expo/vector-icons";

export function SearchInput() {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="#6B7A90" />
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
  input: {
    color: theme.colors.textPrimary,
    flex: 1,
    fontSize: 14
  }
});

