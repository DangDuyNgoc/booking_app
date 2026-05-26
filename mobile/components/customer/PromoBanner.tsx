import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../lib/theme";

export function PromoBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.badge}>Ưu đãi mới</Text>
      <Text style={styles.title}>Giảm 30% cho đơn đầu tiên</Text>
      <Text style={styles.sub}>Dành riêng cho khách hàng mới</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#8BC9B8",
    borderRadius: theme.radius.lg,
    minHeight: 132,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.warning,
    borderRadius: theme.radius.pill,
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: theme.spacing.sm,
    overflow: "hidden",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4
  },
  title: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: 0.2,
    lineHeight: 39,
    maxWidth: 190,
    textTransform: "uppercase"
  },
  sub: {
    color: "#E6FFF6",
    fontSize: 12,
    fontWeight: "600",
    marginTop: theme.spacing.sm
  }
});
