import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabBar } from "../components/customer/BottomTabBar";
import { AppCard, SectionTitle } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";

function OrderItem({ id, time, from, to, service, price }: { id: string; time: string; from: string; to: string; service: string; price: string }) {
  return (
    <AppCard style={styles.orderCard}>
      <View style={styles.orderTop}>
        <Text style={styles.orderId}>ID: {id}</Text>
        <Text style={styles.doneTag}>Đã hoàn thành</Text>
      </View>
      <Text style={styles.orderTime}>{time}</Text>
      <Text style={styles.route}>• {from}</Text>
      <Text style={styles.routeMuted}>• {to}</Text>
      <View style={styles.orderBottom}>
        <Text style={styles.service}>Dịch vụ: <Text style={styles.serviceStrong}>{service}</Text></Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </AppCard>
  );
}

export default function DriverOrdersScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.menu}>≡</Text>
        <Text style={styles.logo}>ShipLogistics</Text>
        <Text style={styles.bell}>◔</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle>Lịch sử Đơn hàng</SectionTitle>
        <Text style={styles.subtitle}>Quản lý và theo dõi các hành trình của bạn.</Text>

        <View style={styles.segmentWrap}>
          <View style={[styles.segmentBtn, styles.segmentBtnActive]}><Text style={styles.segmentActive}>Hoàn thành</Text></View>
          <View style={styles.segmentBtn}><Text style={styles.segment}>Đã hủy</Text></View>
        </View>

        <View style={styles.ordersList}>
          <OrderItem
            id="#SL-98234"
            time="14:20, 20 Th10 2023"
            from="235 Nguyễn Văn Cừ, Quận 5, TP.HCM"
            to="Vinhomes Central Park, Bình Thạnh"
            service="Giao hàng Nhanh"
            price="45.000đ"
          />
          <OrderItem
            id="#SL-98112"
            time="09:15, 18 Th10 2023"
            from="Cảng Cát Lái, Quận 2, TP.HCM"
            to="Khu Công Nghệ Cao, Quận 9"
            service="Vận tải Xe Tải"
            price="1.250.000đ"
          />
        </View>

        <SectionTitle>Khu vực hoạt động gần đây</SectionTitle>
        <View style={styles.mapCard}>
          <Text style={styles.focusTag}>◉ Tập trung: Quận 1, Quận 5</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBarWrap}>
        <BottomTabBar activeTab="activity" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: "row", alignItems: "center", paddingTop: theme.spacing.xxl, paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.md, borderBottomWidth: 1, borderBottomColor: "#DEE6F2" },
  menu: { color: theme.colors.primary, width: 24 },
  logo: { flex: 1, color: theme.colors.primaryDark, fontSize: 29, fontWeight: "800" },
  bell: { color: theme.colors.textPrimary },
  content: { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md, paddingBottom: 140 },
  subtitle: { color: theme.colors.textSecondary, fontSize: 12, marginTop: -6 },
  segmentWrap: { flexDirection: "row", backgroundColor: "#EAF0F8", borderRadius: theme.radius.pill, padding: 4, gap: 6, marginTop: theme.spacing.md, marginBottom: theme.spacing.md },
  segmentBtn: { flex: 1, alignItems: "center", borderRadius: theme.radius.pill, paddingVertical: 9 },
  segmentBtnActive: { backgroundColor: theme.colors.primary },
  segmentActive: { color: "#FFF", fontWeight: "700", fontSize: 13 },
  segment: { color: theme.colors.textSecondary, fontWeight: "700", fontSize: 13 },
  ordersList: { gap: theme.spacing.sm },
  orderCard: { paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md },
  orderTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  orderId: { color: theme.colors.textPrimary, fontSize: 13, fontWeight: "800" },
  doneTag: { color: theme.colors.primary, backgroundColor: "#DDF8E9", borderRadius: theme.radius.pill, paddingHorizontal: 8, paddingVertical: 3, fontSize: 10, fontWeight: "700", overflow: "hidden" },
  orderTime: { color: theme.colors.textSecondary, fontSize: 11, marginTop: 2 },
  route: { color: theme.colors.textPrimary, fontSize: 12, marginTop: theme.spacing.sm },
  routeMuted: { color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 },
  orderBottom: { marginTop: theme.spacing.sm, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  service: { color: theme.colors.textSecondary, fontSize: 12 },
  serviceStrong: { color: theme.colors.textPrimary, fontWeight: "700" },
  price: { color: theme.colors.primary, fontSize: 29, fontWeight: "800" },
  mapCard: { marginTop: theme.spacing.sm, borderRadius: theme.radius.lg, backgroundColor: "#D2D8E2", height: 120, justifyContent: "flex-end", padding: theme.spacing.md },
  focusTag: { alignSelf: "flex-start", color: theme.colors.textPrimary, backgroundColor: "#EEF3FA", borderRadius: theme.radius.pill, paddingHorizontal: theme.spacing.sm, paddingVertical: 6, fontSize: 12, overflow: "hidden" },
  bottomBarWrap: { position: "absolute", left: 0, right: 0, bottom: 0 }
});
