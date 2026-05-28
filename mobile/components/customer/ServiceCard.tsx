import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../lib/theme";
import { AppCard } from "../ui/AppPrimitives";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ServiceCardProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function ServiceCard({ icon, label, active, onPress }: ServiceCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <AppCard style={[styles.card, active ? styles.activeCard : styles.softCard]}>
        <View style={[styles.iconWrap, active ? styles.iconWrapActive : styles.iconWrapSoft]}>
          <MaterialCommunityIcons 
            name={icon} 
            size={24} 
            color={active ? "#FFFFFF" : theme.colors.primary} 
          />
        </View>
        <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1
  },
  card: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: 96,
    paddingVertical: theme.spacing.md
  },
  activeCard: {
    backgroundColor: "#D8F2E9"
  },
  softCard: {
    backgroundColor: theme.colors.surfaceSoft
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: theme.radius.md,
    height: 38,
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
    width: 38
  },
  iconWrapActive: {
    backgroundColor: theme.colors.primary
  },
  iconWrapSoft: {
    backgroundColor: "rgba(11, 143, 100, 0.08)"
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "700"
  },
  activeLabel: {
    color: theme.colors.primaryDark
  }
});

