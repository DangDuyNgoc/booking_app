import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabBar } from "../components/customer/BottomTabBar";
import { AppCard } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";

function PaperItem({ title, sub, status, statusColor }: { title: string; sub: string; status: string; statusColor: string }) {
  return (
    <AppCard style={styles.paperCard}>
      <View style={styles.paperIconWrap}><Text>📄</Text></View>
      <View style={styles.paperInfo}>
        <Text style={styles.paperTitle}>{title}</Text>
        <Text style={styles.paperSub}>{sub}</Text>
      </View>
      <Text style={[styles.paperStatus, { color: statusColor }]}>{status}</Text>
    </AppCard>
  );
}

export default function DriverVehicleProfileScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={15}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primaryDark} />
        </Pressable>
        <Text style={styles.title}>Hồ sơ của tôi</Text>
        <Text style={styles.bell}>◔</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>ẢNH XE</Text>
        <View style={styles.imageArea}>
          <View style={styles.uploadCard}>
            <Text style={styles.uploadIcon}>📷</Text>
            <Text style={styles.uploadText}>Tải lên ảnh xe mới</Text>
            <Text style={styles.uploadSub}>PNG, JPG tối đa 5MB</Text>
          </View>
        </View>

        <Text style={styles.label}>THÔNG TIN XE</Text>
        <AppCard style={styles.vehicleCard}>
          <Text style={styles.fieldTitle}>Biển số xe</Text>
          <View style={styles.plateRow}>
            <Text style={styles.plate}>29A-888.88</Text>
            <Text style={styles.edit}>✎</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Loại xe</Text>
              <Text style={styles.metaValue}>Xe tải 1.5 Tấn</Text>
            </View>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Màu sắc</Text>
              <Text style={styles.metaValue}>Trắng</Text>
            </View>
          </View>
        </AppCard>

        <View style={styles.paperHeader}>
          <Text style={styles.label}>DANH SÁCH GIẤY TỜ</Text>
          <Text style={styles.sync}>Cập nhật lúc 10:30 Hôm nay</Text>
        </View>

        <View style={styles.paperList}>
          <PaperItem title="Bằng lái xe (GPLX)" sub="Hạng C • Hết hạn 2028" status="● Đã duyệt" statusColor={theme.colors.primary} />
          <PaperItem title="Đăng ký xe (Cà vẹt)" sub="Đang kiểm tra thông tin" status="◉ Đang chờ" statusColor="#C2410C" />
          <PaperItem title="Bảo hiểm xe" sub="Bảo hiểm dân sự bắt buộc" status="● Đã duyệt" statusColor={theme.colors.primary} />
        </View>

        <View style={styles.saveBtn}><Text style={styles.saveText}>◧ Lưu Thay Đổi</Text></View>
      </ScrollView>

      <View style={styles.bottomBarWrap}>
        <BottomTabBar activeTab="account" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: "row", alignItems: "center", paddingTop: theme.spacing.xxl, paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.md, borderBottomWidth: 1, borderBottomColor: "#DEE6F2" },
  title: { flex: 1, color: theme.colors.textPrimary, fontSize: 30, fontWeight: "800" },
  bell: { color: theme.colors.textPrimary },
  content: { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md, paddingBottom: 140 },
  label: { color: theme.colors.textSecondary, fontSize: 11, fontWeight: "700", marginBottom: theme.spacing.sm },
  imageArea: { height: 148, borderRadius: theme.radius.lg, backgroundColor: "#B6C4CE", alignItems: "center", justifyContent: "center", marginBottom: theme.spacing.md },
  uploadCard: { backgroundColor: "rgba(255,255,255,0.85)", borderRadius: theme.radius.md, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.md, alignItems: "center" },
  uploadIcon: { color: theme.colors.primary, fontSize: 18 },
  uploadText: { color: theme.colors.textPrimary, fontSize: 13, fontWeight: "700", marginTop: 4 },
  uploadSub: { color: theme.colors.textSecondary, fontSize: 11, marginTop: 2 },
  vehicleCard: { paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md },
  fieldTitle: { color: theme.colors.textSecondary, fontSize: 11 },
  plateRow: { marginTop: theme.spacing.sm, backgroundColor: "#EAF0F8", borderRadius: theme.radius.md, minHeight: 46, alignItems: "center", paddingHorizontal: theme.spacing.md, flexDirection: "row", justifyContent: "space-between" },
  plate: { color: theme.colors.textPrimary, fontSize: 30, fontWeight: "900" },
  edit: { color: theme.colors.primary, fontSize: 16 },
  metaRow: { marginTop: theme.spacing.sm, flexDirection: "row", gap: theme.spacing.sm },
  metaBox: { flex: 1, backgroundColor: "#F1F5FB", borderRadius: theme.radius.md, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.sm },
  metaLabel: { color: theme.colors.textSecondary, fontSize: 11 },
  metaValue: { color: theme.colors.textPrimary, fontSize: 12, fontWeight: "700", marginTop: 2 },
  paperHeader: { marginTop: theme.spacing.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sync: { color: theme.colors.primary, fontSize: 10, fontWeight: "700" },
  paperList: { gap: theme.spacing.sm },
  paperCard: { flexDirection: "row", alignItems: "center", paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md },
  paperIconWrap: { width: 34, height: 34, borderRadius: theme.radius.md, backgroundColor: "#E5F5EF", alignItems: "center", justifyContent: "center" },
  paperInfo: { flex: 1, marginLeft: theme.spacing.sm },
  paperTitle: { color: theme.colors.textPrimary, fontSize: 12, fontWeight: "700" },
  paperSub: { color: theme.colors.textSecondary, fontSize: 11, marginTop: 2 },
  paperStatus: { fontSize: 11, fontWeight: "700" },
  saveBtn: { marginTop: theme.spacing.lg, backgroundColor: theme.colors.primaryDark, borderRadius: theme.radius.pill, minHeight: 50, alignItems: "center", justifyContent: "center" },
  saveText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  bottomBarWrap: { position: "absolute", left: 0, right: 0, bottom: 0 }
});
