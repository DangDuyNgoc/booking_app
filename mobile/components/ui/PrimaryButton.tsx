import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../lib/theme";
import { Ionicons } from "@expo/vector-icons";

type PrimaryButtonProps = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export function PrimaryButton({ label, icon, onPress }: PrimaryButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        {icon && <Ionicons name={icon} size={18} color="#FFFFFF" style={styles.icon} />}
        <Text style={styles.text}>{label}</Text>
      </View>
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
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    marginRight: 6
  },
  text: {
    color: "#FFFFFF",
    fontSize: theme.typography.button,
    fontWeight: "700"
  }
});

