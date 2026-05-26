import { Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../../lib/theme";

type PrimaryButtonProps = {
  label: string;
};

export function PrimaryButton({ label }: PrimaryButtonProps) {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 18
  },
  text: {
    color: "#FFFFFF",
    fontSize: theme.typography.button,
    fontWeight: "700"
  }
});
