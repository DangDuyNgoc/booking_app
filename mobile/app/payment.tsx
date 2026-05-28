import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabBar } from "../components/customer/BottomTabBar";
import { AppCard, SectionTitle } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type TxStatus = "Thành công" | "Đã hủy";

type TxItem = {
  id: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  time: string;
  amount: string;
  status: TxStatus;
};

const TRANSACTIONS: TxItem[] = [
  {
    id: "t1",
    icon: "motorbike",
    title: "Giao hàng siêu tốc",
    time: "Hôm nay, 14:30",
    amount: "-45.000đ",
    status: "Thành công"
  },
  {
    id: "t2",
    icon: "food",
    title: "Đồ ăn",
    time: "Hôm nay, 19:15",
    amount: "-120.000đ",
    status: "Thành công"
  },
  {
    id: "t3",
    icon: "card",
    title: "Nạp tiền vào ví",
    time: "15/05/2024, 09:00",
    amount: "+500.000đ",
    status: "Thành công"
  },
  {
    id: "t4",
    icon: "truck",
    title: "Vận chuyển hàng hóa",
    time: "14/05/2024, 11:20",
    amount: "-350.000đ",
    status: "Đã hủy"
  }
];

export default function PaymentScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lịch sử thanh toán</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle>Giao dịch gần đây</SectionTitle>

        <View style={styles.list}>
          {TRANSACTIONS.map((item) => {
            const isCancel = item.status === "Đã hủy";
            return (
              <AppCard key={item.id} style={styles.card}>
                <View style={styles.leftIconWrap}>
                  <MaterialCommunityIcons name={item.icon} size={20} color={theme.colors.primary} />
                </View>

                <View style={styles.mainInfo}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>

                <View style={styles.rightInfo}>
                  <Text style={[styles.amount, isCancel && styles.amountCancel]}>{item.amount}</Text>
                  <Text style={[styles.status, isCancel ? styles.statusCancel : styles.statusSuccess]}>
                    {item.status}
                  </Text>
                </View>
              </AppCard>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.bottomBarWrap}>
        <BottomTabBar activeTab="payment" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.background,
    flex: 1
  },
  header: {
    alignItems: "center",
    borderBottomColor: "#DFE7F1",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.md
  },
  headerTitle: {
    color: theme.colors.primaryDark,
    fontSize: 28,
    fontWeight: "800"
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: 140
  },
  list: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm
  },
  card: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md
  },
  leftIconWrap: {
    alignItems: "center",
    backgroundColor: "rgba(11, 143, 100, 0.08)",
    borderRadius: theme.radius.pill,
    height: 38,
    justifyContent: "center",
    width: 38
  },
  mainInfo: {
    flex: 1,
    marginLeft: theme.spacing.md
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "800"
  },
  time: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    marginTop: 2
  },
  rightInfo: {
    alignItems: "flex-end"
  },
  amount: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "800"
  },
  amountCancel: {
    color: "#4B5563"
  },
  status: {
    borderRadius: theme.radius.pill,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 3,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  statusSuccess: {
    backgroundColor: "#DDF6EB",
    color: theme.colors.primary
  },
  statusCancel: {
    backgroundColor: "#FBE0DF",
    color: theme.colors.danger
  },
  bottomBarWrap: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0
  }
});

