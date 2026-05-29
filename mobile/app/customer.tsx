import { ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { BottomTabBar } from "../components/customer/BottomTabBar";
import { HomeHeader } from "../components/customer/HomeHeader";
import { OrderProgressCard } from "../components/customer/OrderProgressCard";
import { PromoBanner } from "../components/customer/PromoBanner";
import { ServiceCard } from "../components/customer/ServiceCard";
import { SectionTitle } from "../components/ui/AppPrimitives";
import { SearchInput } from "../components/ui/SearchInput";
import { theme } from "../lib/theme";
import { Ionicons } from "@expo/vector-icons";

export default function CustomerScreen() {
  const handleDeliveryPress = () => {
    router.push("/booking");
  };

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <SearchInput />
        <View style={styles.block}>
          <PromoBanner />
        </View>

        <SectionTitle>Dịch vụ của chúng tôi</SectionTitle>

        <View style={styles.serviceRows}>
          <View style={styles.mainCol}>
            <ServiceCard active icon="motorbike" label="Giao Xe Máy" onPress={handleDeliveryPress} />
          </View>
          <View style={styles.sideCol}>
            <ServiceCard icon="truck" label="Giao Xe Tải" onPress={handleDeliveryPress} />
            <ServiceCard icon="food" label="Đồ Ăn" />
          </View>
        </View>

        <View style={styles.miniActions}>
          <ServiceCard icon="taxi" label="Gọi Xe" />
          <ServiceCard icon="basket" label="Đi Chợ" />
          <ServiceCard icon="package-variant-closed" label="Gửi Hàng" onPress={handleDeliveryPress} />
          <ServiceCard icon="grid" label="Thêm" />
        </View>

        <View style={styles.block}>
          <SectionTitle>Đơn hàng đang giao</SectionTitle>
          <OrderProgressCard />
        </View>
      </ScrollView>

      <View style={styles.fab}>
        <Ionicons name="headset-outline" size={22} color="#FFFFFF" />
      </View>
      <View style={styles.bottomBarWrap}>
        <BottomTabBar activeTab="home" />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.background,
    flex: 1
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: 170
  },
  block: {
    marginTop: theme.spacing.lg
  },
  serviceRows: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md
  },
  mainCol: {
    flex: 1.2
  },
  sideCol: {
    flex: 1,
    gap: theme.spacing.md
  },
  miniActions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg
  },
  fab: {
    alignItems: "center",
    backgroundColor: theme.colors.warning,
    borderRadius: theme.radius.pill,
    height: 48,
    justifyContent: "center",
    position: "absolute",
    right: theme.spacing.lg,
    bottom: 112,
    width: 48
  },
  bottomBarWrap: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0
  }
});
