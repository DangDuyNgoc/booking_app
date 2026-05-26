import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../lib/theme";
import { AppCard } from "../ui/AppPrimitives";

type ServiceCardProps = {
  icon: string;
  label: string;
  active?: boolean;
};

export function ServiceCard({ icon, label, active }: ServiceCardProps) {
  return (
    <AppCard style={[styles.card, active ? styles.activeCard : styles.softCard]}>
      <View style={[styles.iconWrap, active ? styles.iconWrapActive : styles.iconWrapSoft]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#E5F0FF"
  },
  icon: {
    fontSize: 18
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
