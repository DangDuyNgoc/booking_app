import { useState, useEffect } from "react";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppCard } from "../components/ui/AppPrimitives";
import { theme } from "../lib/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type TrackingState = 
  | "arriving" 
  | "delivering" 
  | "chat" 
  | "call" 
  | "rating" 
  | "rating_success";

const SERVICES = {
  moto: { id: "moto_express", name: "Ship Siêu Tốc", icon: "motorbike" as const },
  truck: { id: "truck_500", name: "Xe Tải 500kg", icon: "truck" as const }
};

export default function TrackingScreen() {
  const { state, type } = useLocalSearchParams<{ state?: string; type?: string }>();
  const [bookingState, setBookingState] = useState<TrackingState>("arriving");
  const [previousState, setPreviousState] = useState<TrackingState>("arriving");
  const [callConnected, setCallConnected] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [ratingStars, setRatingStars] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  // Determine current service (moto or truck)
  const currentService = type === "truck" ? SERVICES.truck : SERVICES.moto;

  useEffect(() => {
    if (state === "arriving") {
      setBookingState("arriving");
      setPreviousState("arriving");
    } else if (state === "delivering") {
      setBookingState("delivering");
      setPreviousState("delivering");
    }
  }, [state]);

  useEffect(() => {
    if (bookingState === "call") {
      setCallConnected(false);
      setCallSeconds(0);

      // Transition to connected call after 2.5 seconds
      const connectionTimer = setTimeout(() => {
        setCallConnected(true);
      }, 2500);

      return () => clearTimeout(connectionTimer);
    }
  }, [bookingState]);

  useEffect(() => {
    let interval: any;
    if (bookingState === "call" && callConnected) {
      interval = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [bookingState, callConnected]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    return `${pad(mins)}:${pad(remainingSecs)}`;
  };

  // State: DRIVER ARRIVING (Tài xế đang đến)
  if (bookingState === "arriving") {
    return (
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/activity")} hitSlop={15}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.primaryDark} />
          </Pressable>
          <Text style={styles.logo}>ShipLogistics</Text>
          <Ionicons name="notifications-outline" size={24} color={theme.colors.textPrimary} />
        </View>

        {/* Map Background with floating banner & route */}
        <ImageBackground
          source={require("../assets/map_bg.png")}
          style={styles.searchMap}
          resizeMode="cover"
        >
          {/* Floating Banner */}
          <View style={styles.floatingBanner}>
            <View style={styles.bannerLeft}>
              <MaterialCommunityIcons name={currentService.icon} size={18} color={theme.colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.bannerText}>Tài xế đang đến • Driver is arriving</Text>
            </View>
            <Text style={styles.bannerEta}>2 phút</Text>
          </View>

          {/* Simulated Route */}
          <View style={styles.routeContainer}>
            {/* Start location (green dot) */}
            <View style={[styles.routeDot, { top: "28%", left: "55%" }]} />
            {/* Dashed route line */}
            <View style={[styles.routeSmallDot, { top: "33%", left: "57%" }]} />
            <View style={[styles.routeSmallDot, { top: "38%", left: "59%" }]} />
            
            {/* Driver Vehicle Icon badge in middle of route */}
            <View style={[styles.vehicleBadge, { top: "42%", left: "57%" }]}>
              <MaterialCommunityIcons name={currentService.icon} size={16} color="#FFFFFF" />
            </View>

            <View style={[styles.routeSmallDot, { top: "49%", left: "52%" }]} />
            <View style={[styles.routeSmallDot, { top: "54%", left: "47%" }]} />
            <View style={[styles.routeSmallDot, { top: "59%", left: "42%" }]} />
            
            {/* Destination Location pin */}
            <View style={[styles.destinationPin, { top: "62%", left: "37%" }]}>
              <Ionicons name="location" size={18} color={theme.colors.danger} />
            </View>
          </View>
        </ImageBackground>

        {/* Driver Arriving Bottom Sheet */}
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />

          {/* Driver profile row */}
          <View style={styles.driverProfileRow}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
                style={styles.driverAvatar as any}
              />
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={10} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.driverNameWrap}>
              <Text style={styles.driverName}>Michael T.</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 3, marginTop: 2 }}>
                <Ionicons name="star" size={12} color="#FBBF24" />
                <Text style={styles.driverRating}>4.9 (2,400+ chuyến)</Text>
              </View>
            </View>

            <View style={styles.licensePlateBox}>
              <Text style={styles.licensePlateLabel}>BIỂN SỐ XE</Text>
              <Text style={styles.licensePlateValue}>29A-{"\n"}123.45</Text>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionButtonsRow}>
            <Pressable 
              style={styles.actionBtn} 
              onPress={() => {
                setPreviousState("arriving");
                setBookingState("chat");
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="chatbubble-ellipses-outline" size={16} color={theme.colors.textPrimary} style={{ marginRight: 6 }} />
                <Text style={styles.actionBtnText}>Nhắn tin</Text>
              </View>
            </Pressable>
            <Pressable 
              style={styles.actionBtn} 
              onPress={() => {
                setPreviousState("arriving");
                setBookingState("call");
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="call-outline" size={16} color={theme.colors.textPrimary} style={{ marginRight: 6 }} />
                <Text style={styles.actionBtnText}>Gọi tài xế</Text>
              </View>
            </Pressable>
          </View>

          {/* Order banner (Click to advance state to delivering) */}
          <Pressable 
            style={styles.orderBanner}
            onPress={() => setBookingState("delivering")}
          >
            <View style={orderBannerStyles.orderBannerLeft}>
              <Ionicons name="cube-outline" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.orderBannerTitle}>Đơn hàng hiện tại</Text>
                <Text style={styles.orderBannerSub}>Giao hàng nhanh • 0.5km còn lại</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#64748B" />
          </Pressable>
        </View>
      </View>
    );
  }

  // State: DELIVERING (Đang giao hàng)
  if (bookingState === "delivering") {
    return (
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/activity")} hitSlop={15}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.primaryDark} />
          </Pressable>
          <Text style={styles.logo}>ShipLogistics</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Map Background with route & ETA tag */}
        <ImageBackground
          source={require("../assets/map_bg.png")}
          style={styles.searchMap}
          resizeMode="cover"
        >
          {/* Simulated Route */}
          <View style={styles.routeContainer}>
            {/* Route dots */}
            <View style={[styles.routeSmallDot, { top: "35%", left: "37%" }]} />
            <View style={[styles.routeSmallDot, { top: "40%", left: "42%" }]} />
            <View style={[styles.routeSmallDot, { top: "45%", left: "47%" }]} />
            <View style={[styles.routeSmallDot, { top: "50%", left: "51%" }]} />
            <View style={[styles.routeSmallDot, { top: "55%", left: "55%" }]} />
            
            {/* Destination orange dot */}
            <View style={[styles.orangeDot, { top: "30%", left: "33%" }]} />

            {/* ETA Tooltip tag */}
            <View style={[styles.etaTooltip, { top: "22%", left: "21%" }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="time-outline" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.etaTooltipText}>Dự kiến: 12 phút</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Delivering Bottom Sheet */}
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />

          {/* Status block */}
          <View style={styles.statusBlock}>
            <View style={styles.statusTitleRow}>
              <View style={styles.greenStatusDot} />
              <Text style={styles.statusTitle}>Đang giao hàng</Text>
            </View>
            <Text style={styles.statusSubtitle}>Đơn hàng #8472910</Text>
          </View>

          {/* Horizontal Divider */}
          <View style={styles.divider} />

          {/* Simple driver info */}
          <View style={styles.simpleDriverRow}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.driverAvatarSmall as any}
            />
            <View style={styles.simpleDriverInfo}>
              <Text style={styles.simpleDriverName}>Michael T.</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 3, marginTop: 2 }}>
                <Ionicons name="star" size={12} color="#FBBF24" />
                <Text style={styles.simpleDriverRating}>4.9 (124 chuyến)</Text>
              </View>
            </View>
          </View>

          {/* Action buttons (Nhắn tin, Gọi điện) */}
          <View style={styles.actionButtonsRow}>
            <Pressable 
              style={[styles.actionBtn, { flex: 1 }]} 
              onPress={() => {
                setPreviousState("delivering");
                setBookingState("chat");
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="chatbubble-ellipses-outline" size={16} color={theme.colors.textPrimary} style={{ marginRight: 6 }} />
                <Text style={styles.actionBtnText}>Nhắn tin</Text>
              </View>
            </Pressable>
            <Pressable 
              style={[styles.actionBtn, styles.callBtnGreen, { flex: 1.2 }]} 
              onPress={() => {
                setPreviousState("delivering");
                setBookingState("call");
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="call" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.callBtnText}>Gọi điện</Text>
              </View>
            </Pressable>
          </View>

          {/* Helper Simulation Reset Button */}
          <Pressable 
            style={styles.resetBtn} 
            onPress={() => setBookingState("rating")}
          >
            <Text style={styles.resetBtnText}>Hoàn tất đơn hàng (Mô phỏng)</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // State: CHAT SCREEN
  if (bookingState === "chat") {
    return (
      <View style={styles.page}>
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <View style={styles.chatHeaderLeft}>
            <Pressable onPress={() => setBookingState(previousState)} hitSlop={15}>
              <Ionicons name="chevron-back" size={24} color={theme.colors.primaryDark} style={styles.chatBackIcon} />
            </Pressable>
            <View style={styles.chatAvatarContainer}>
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
                style={styles.chatAvatar as any}
              />
              <View style={styles.chatOnlineDot} />
            </View>
            <View>
              <Text style={styles.chatDriverName}>Michael T.</Text>
              <Text style={styles.chatDriverStatus}>Đang hoạt động</Text>
            </View>
          </View>
          <View style={styles.chatHeaderRight}>
            <Pressable 
              onPress={() => {
                setPreviousState("chat");
                setBookingState("call");
              }}
              hitSlop={15}
            >
              <Ionicons name="call" size={22} color={theme.colors.textPrimary} style={styles.chatPhoneIcon} />
            </Pressable>
            <Ionicons name="ellipsis-vertical" size={22} color={theme.colors.textPrimary} style={styles.chatMenuIcon} />
          </View>
        </View>

        {/* Messages List */}
        <ScrollView contentContainerStyle={styles.chatMessagesList} showsVerticalScrollIndicator={false}>
          {/* Date pill */}
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>Hôm nay</Text>
          </View>

          {/* Msg 1: Driver */}
          <View style={styles.msgLeftContainer}>
            <View style={styles.msgLeftBubble}>
              <Text style={styles.msgTextLeft}>
                Chào bạn, tôi là Michael. Tôi đang chuẩn bị nhận đơn hàng của bạn.
              </Text>
            </View>
            <Text style={styles.msgTimeLeft}>14:20</Text>
          </View>

          {/* Msg 2: Customer */}
          <View style={styles.msgRightContainer}>
            <View style={styles.msgRightBubble}>
              <Text style={styles.msgTextRight}>
                Vâng chào anh. Anh vui lòng kiểm tra kỹ số lượng hàng giúp em nhé.
              </Text>
            </View>
            <View style={styles.msgRightMeta}>
              <Text style={styles.msgTimeRight}>14:22</Text>
              <Text style={styles.msgCheckmark}>✓✓</Text>
            </View>
          </View>

          {/* Msg 3: Driver */}
          <View style={styles.msgLeftContainer}>
            <View style={styles.msgLeftBubble}>
              <Text style={styles.msgTextLeft}>
                Đã rõ ạ. Tôi sẽ chụp ảnh hàng hóa gửi bạn khi nhận xong.
              </Text>
            </View>
            <Text style={styles.msgTimeLeft}>14:23</Text>
          </View>

          {/* Msg 4: Driver photo */}
          <View style={styles.msgLeftContainer}>
            <View style={[styles.msgLeftBubble, { padding: 8, width: 220 }]}>
              <Image
                source={require("../assets/warehouse_pkg.png")}
                style={styles.msgImage as any}
                resizeMode="cover"
              />
              <Text style={[styles.msgTextLeft, { marginTop: 4 }]}>
                Hàng đã lên xe rồi bạn nhé!
              </Text>
            </View>
            <Text style={styles.msgTimeLeft}>14:45</Text>
          </View>
        </ScrollView>

        {/* Quick replies bar */}
        <View style={{ height: 48, borderTopWidth: 1, borderTopColor: "#F1F5F9", backgroundColor: "#FFF" }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.quickRepliesContainer}
          >
            <Pressable style={styles.quickReplyPill}>
              <Text style={styles.quickReplyText}>Tôi đang đến</Text>
            </Pressable>
            <Pressable style={styles.quickReplyPill}>
              <Text style={styles.quickReplyText}>Bạn đang ở đâu?</Text>
            </Pressable>
            <Pressable style={styles.quickReplyPill}>
              <Text style={styles.quickReplyText}>Đã nhận hàng</Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Input Bar */}
        <View style={styles.chatInputBar}>
          <Pressable style={styles.plusBtn}>
            <Ionicons name="add" size={24} color="#64748B" />
          </Pressable>
          
          <View style={styles.inputBubble}>
            <Text style={styles.inputPlaceholder}>Nhập tin nhắn...</Text>
          </View>

          <Pressable style={styles.sendBtn}>
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    );
  }

  // State: CALL SCREEN
  if (bookingState === "call") {
    return (
      <View style={styles.page}>
        {/* Call Header */}
        <View style={styles.callHeader}>
          <Pressable onPress={() => setBookingState(previousState === "chat" ? "arriving" : previousState)} hitSlop={15}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.primaryDark} style={styles.callHeaderBackIcon} />
          </Pressable>
          <Text style={styles.callHeaderLogo}>ShipLogistics</Text>
          <View style={[styles.callingBadge, !callConnected && { backgroundColor: "#FEF3C7" }]}>
            <View style={[styles.callingBadgeDot, !callConnected && { backgroundColor: "#D97706" }]} />
            <Text style={[styles.callingBadgeText, !callConnected && { color: "#D97706" }]}>
              {callConnected ? "ĐANG GỌI" : "ĐANG KẾT NỐI"}
            </Text>
          </View>
        </View>

        {/* Call Body */}
        <View style={styles.callBody}>
          {/* Concordant circular avatars */}
          <View style={styles.callAvatarOuter}>
            <View style={styles.callAvatarMiddle}>
              <View style={styles.callAvatarInnerContainer}>
                <Image
                  source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
                  style={styles.callAvatarImage as any}
                />
                <View style={[styles.callRatingBadge, { flexDirection: "row", alignItems: "center" }]}>
                  <Ionicons name="star" size={12} color="#FBBF24" style={{ marginRight: 2 }} />
                  <Text style={styles.callRatingBadgeText}>4.9</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.callingDriverName}>Michael T.</Text>
          <Text style={styles.callingDriverSub}>Tài xế đang vận chuyển đơn hàng #SL-9920</Text>
          
          {callConnected ? (
            <Text style={styles.callDuration}>{formatTime(callSeconds)}</Text>
          ) : (
            <Text style={[styles.callDuration, { fontSize: 20, color: "#64748B", fontWeight: "600", marginTop: 22 }]}>
              Đang kết nối...
            </Text>
          )}
          <View style={styles.callDurationPill} />
        </View>

        {/* Control Buttons */}
        <View style={styles.callControlsRow}>
          <View style={styles.controlBtnContainer}>
            <Pressable style={styles.controlCircleBtn}>
              <Ionicons name="volume-high" size={22} color={theme.colors.textPrimary} />
            </Pressable>
            <Text style={styles.controlLabel}>Loa ngoài</Text>
          </View>

          <View style={styles.controlBtnContainer}>
            <Pressable style={styles.controlCircleBtn}>
              <Ionicons name="mic-off" size={22} color={theme.colors.textPrimary} />
            </Pressable>
            <Text style={styles.controlLabel}>Tắt tiếng</Text>
          </View>
        </View>

        {/* End Call Button */}
        <View style={styles.endCallContainer}>
          <Pressable 
            style={styles.endCallBtn} 
            onPress={() => setBookingState(previousState === "chat" ? "arriving" : previousState)}
          >
            <View style={styles.endCallIconCircle}>
              <Ionicons name="call" size={20} color="#FFFFFF" style={{ transform: [{ rotate: "135deg" }] }} />
            </View>
            <Text style={styles.endCallText}>Kết thúc</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // State: TRIP RATING (Đánh giá chuyến đi)
  if (bookingState === "rating") {
    const tags = ["Giao hàng đúng hẹn", "Thân thiện", "Lái xe an toàn"];
    const handleTagPress = (tag: string) => {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    };

    return (
      <View style={styles.page}>
        {/* Rating Header */}
        <View style={styles.ratingHeader}>
          <Pressable onPress={() => router.push("/activity")} hitSlop={15}>
            <Ionicons name="close" size={24} color={theme.colors.textPrimary} style={styles.ratingCloseIcon} />
          </Pressable>
          <Text style={styles.ratingHeaderTitle}>Đánh giá</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Rating Body */}
        <ScrollView contentContainerStyle={styles.ratingBodyContainer} showsVerticalScrollIndicator={false}>
          {/* Driver profile avatar with verified badge */}
          <View style={styles.ratingAvatarWrapper}>
            <View style={styles.ratingAvatarBorder}>
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
                style={styles.ratingAvatarImage as any}
              />
              <View style={styles.ratingVerifiedBadge}>
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <Text style={styles.ratingDriverName}>Michael T.</Text>
          <Text style={styles.ratingDriverSub}>Tài xế của bạn • Chuyến đi SL-9921</Text>

          {/* Rating box with star buttons */}
          <View style={styles.ratingBox}>
            <Text style={styles.ratingBoxTitle}>BẠN THẤY CHUYẾN ĐI THẾ NÀO?</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((starNum) => (
                <Pressable key={starNum} onPress={() => setRatingStars(starNum)} hitSlop={10}>
                  <Ionicons 
                    name={ratingStars >= starNum ? "star" : "star-outline"} 
                    size={32} 
                    color={ratingStars >= starNum ? "#FBBF24" : "#CBD5E1"} 
                    style={{ marginHorizontal: 4 }}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Service Tag Selectors */}
          <View style={styles.tagsContainer}>
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <Pressable
                  key={tag}
                  style={[styles.tagPill, isSelected && styles.tagPillActive]}
                  onPress={() => handleTagPress(tag)}
                >
                  <Text style={[styles.tagText, isSelected && styles.tagTextActive]}>
                    {tag}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Tip & Submit Bar */}
        <View style={styles.ratingFooter}>
          <View style={styles.tipRow}>
            <Text style={styles.tipLabel}>Tiền tip cho tài xế?</Text>
            <View style={styles.tipOptions}>
              <Pressable
                style={[styles.tipPill, selectedTip === 10000 && styles.tipPillActive]}
                onPress={() => setSelectedTip(selectedTip === 10000 ? null : 10000)}
              >
                <Text style={[styles.tipText, selectedTip === 10000 && styles.tipTextActive]}>
                  +10.000đ
                </Text>
              </Pressable>
              <Pressable
                style={[styles.tipPill, selectedTip === 20000 && styles.tipPillActive]}
                onPress={() => setSelectedTip(selectedTip === 20000 ? null : 20000)}
              >
                <Text style={[styles.tipText, selectedTip === 20000 && styles.tipTextActive]}>
                  +20.000đ
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable 
            style={styles.ratingSubmitBtn}
            onPress={() => setBookingState("rating_success")}
          >
            <Text style={styles.ratingSubmitText}>Gửi Đánh Giá</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // State: RATING SUCCESS (Success Screen)
  if (bookingState === "rating_success") {
    return (
      <View style={[styles.page, { backgroundColor: "#FFF" }]}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <Pressable onPress={() => router.push("/customer")} hitSlop={15}>
            <Ionicons name="close" size={24} color={theme.colors.textPrimary} style={styles.successCloseIcon} />
          </Pressable>
          <Text style={styles.successHeaderTitle}>Rating Submitted</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Success Body */}
        <View style={styles.successBody}>
          {/* Celebratory Check badge */}
          <View style={styles.successOuterBadge}>
            <View style={styles.successInnerBadge}>
              <Ionicons name="checkmark" size={32} color="#FFFFFF" />
            </View>
            {/* Small accent floating dots to match mockup style */}
            <View style={[styles.successAccentDot, { top: -10, right: -15, width: 12, height: 12 }]} />
            <View style={[styles.successAccentDot, { bottom: 15, left: -20, width: 16, height: 16 }]} />
          </View>

          <Text style={styles.successTitleText}>Cảm ơn bạn đã đóng góp ý kiến!</Text>
          <Text style={styles.successSubtitleText}>
            Phản hồi của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn mỗi ngày.
          </Text>
        </View>

        {/* Action Buttons Footer */}
        <View style={styles.successFooter}>
          <Pressable 
            style={styles.successHomeBtn}
            onPress={() => {
              router.push("/customer");
            }}
          >
            <Text style={styles.successHomeBtnText}>Quay về Trang chủ</Text>
          </Pressable>

          <Pressable 
            style={styles.successHistoryBtn}
            onPress={() => {
              router.push("/activity?tab=history");
            }}
          >
            <Text style={styles.successHistoryBtnText}>Xem lịch sử đơn hàng</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return null;
}

// Special wrapper style for flex-direction row on order banner left to avoid nesting conflicts
const orderBannerStyles = StyleSheet.create({
  orderBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md
  }
});

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: "#FFF",
    borderBottomColor: "#E4EAF4",
    borderBottomWidth: 1
  },
  logo: { color: theme.colors.primaryDark, fontSize: 26, fontWeight: "800" },
  searchMap: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10
  },
  sheetHandle: {
    width: 48,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginTop: 4,
    marginBottom: theme.spacing.lg
  },
  floatingBanner: {
    position: "absolute",
    top: theme.spacing.md,
    left: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: "#086449",
    borderRadius: theme.radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5
  },
  bannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm
  },
  bannerText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600"
  },
  bannerEta: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700"
  },
  routeContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1
  },
  routeDot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0B8F64",
    borderWidth: 2,
    borderColor: "#FFF"
  },
  routeSmallDot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0B8F64"
  },
  vehicleBadge: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4
  },
  destinationPin: {
    position: "absolute",
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  driverProfileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md
  },
  avatarContainer: {
    position: "relative"
  },
  driverAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#0B8F64",
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF"
  },
  driverNameWrap: {
    flex: 1
  },
  driverName: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "800"
  },
  driverRating: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    marginTop: 2
  },
  licensePlateBox: {
    alignItems: "flex-end"
  },
  licensePlateLabel: {
    color: theme.colors.textSecondary,
    fontSize: 9,
    fontWeight: "700"
  },
  licensePlateValue: {
    color: "#086449",
    fontSize: 19,
    fontWeight: "800",
    textAlign: "right",
    lineHeight: 22
  },
  actionButtonsRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "#EBF2FC",
    borderRadius: theme.radius.pill,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  actionBtnText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "700"
  },
  orderBanner: {
    backgroundColor: "#F0F4FC",
    borderWidth: 1,
    borderColor: "#D3E1F5",
    borderRadius: theme.radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.md
  },
  orderBannerTitle: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: "600"
  },
  orderBannerSub: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2
  },

  // Delivering Screen Styles
  orangeDot: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#F97316",
    borderWidth: 2,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3
  },
  etaTooltip: {
    position: "absolute",
    backgroundColor: "#0B8F64",
    borderRadius: theme.radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3
  },
  etaTooltipText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700"
  },
  statusBlock: {
    marginBottom: theme.spacing.md
  },
  statusTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm
  },
  greenStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0B8F64"
  },
  statusTitle: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "800"
  },
  statusSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    marginTop: 2
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: theme.spacing.md
  },
  simpleDriverRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md
  },
  driverAvatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19
  },
  simpleDriverInfo: {
    flex: 1
  },
  simpleDriverName: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  simpleDriverRating: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    marginTop: 1
  },
  callBtnGreen: {
    backgroundColor: "#086449"
  },
  callBtnText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700"
  },
  resetBtn: {
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.xs
  },
  resetBtnText: {
    color: "#64748B",
    fontSize: 11,
    textDecorationLine: "underline"
  },

  // CHAT SCREEN STYLES
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: "#FFF",
    borderBottomColor: "#E4EAF4",
    borderBottomWidth: 1
  },
  chatHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm
  },
  chatBackIcon: {
    marginRight: 4
  },
  chatAvatarContainer: {
    position: "relative"
  },
  chatAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19
  },
  chatOnlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0B8F64",
    borderWidth: 2,
    borderColor: "#FFF"
  },
  chatDriverName: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  chatDriverStatus: {
    color: "#0B8F64",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 1
  },
  chatHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.lg
  },
  chatPhoneIcon: {
    fontSize: 18,
    color: theme.colors.primaryDark
  },
  chatMenuIcon: {
    fontSize: 22,
    color: theme.colors.textSecondary
  },
  chatMessagesList: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl
  },
  datePill: {
    alignSelf: "center",
    backgroundColor: "#E2E8F0",
    borderRadius: theme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginVertical: theme.spacing.lg
  },
  datePillText: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: "700"
  },
  msgLeftContainer: {
    alignSelf: "flex-start",
    maxWidth: "80%",
    marginBottom: theme.spacing.md
  },
  msgLeftBubble: {
    backgroundColor: "#E5F0FF",
    borderRadius: theme.radius.md,
    borderTopLeftRadius: 2,
    padding: theme.spacing.md
  },
  msgTextLeft: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    lineHeight: 18
  },
  msgTimeLeft: {
    color: theme.colors.textSecondary,
    fontSize: 9,
    marginTop: 4,
    marginLeft: 4
  },
  msgRightContainer: {
    alignSelf: "flex-end",
    maxWidth: "80%",
    marginBottom: theme.spacing.md
  },
  msgRightBubble: {
    backgroundColor: "#086449",
    borderRadius: theme.radius.md,
    borderTopRightRadius: 2,
    padding: theme.spacing.md
  },
  msgTextRight: {
    color: "#FFF",
    fontSize: 13,
    lineHeight: 18
  },
  msgRightMeta: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    marginRight: 4
  },
  msgTimeRight: {
    color: theme.colors.textSecondary,
    fontSize: 9
  },
  msgCheckmark: {
    color: "#0B8F64",
    fontSize: 9,
    fontWeight: "bold"
  },
  msgImage: {
    width: "100%",
    height: 140,
    borderRadius: theme.radius.sm,
    marginBottom: 4
  },
  quickRepliesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 8
  },
  quickReplyPill: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: theme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  quickReplyText: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: "600"
  },
  chatInputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm
  },
  plusBtn: {
    backgroundColor: "#E5F0FF",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  inputBubble: {
    flex: 1,
    backgroundColor: "#F0F4FC",
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    justifyContent: "center",
    minHeight: 36
  },
  inputPlaceholder: {
    color: "#94A3B8",
    fontSize: 13
  },
  sendBtn: {
    backgroundColor: "#086449",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  },

  // CALL SCREEN STYLES
  callHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: "#F2F5FB"
  },
  callHeaderBackIcon: {
    color: theme.colors.primaryDark,
    fontSize: 22
  },
  callHeaderLogo: {
    color: theme.colors.primaryDark,
    fontSize: 18,
    fontWeight: "800"
  },
  callingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#E6F4EA",
    borderRadius: theme.radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  callingBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0B8F64"
  },
  callingBadgeText: {
    color: "#0B8F64",
    fontSize: 9,
    fontWeight: "700"
  },
  callBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing.xxl
  },
  callAvatarOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(11, 143, 100, 0.06)",
    alignItems: "center",
    justifyContent: "center"
  },
  callAvatarMiddle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(11, 143, 100, 0.12)",
    alignItems: "center",
    justifyContent: "center"
  },
  callAvatarInnerContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFF",
    borderWidth: 3,
    borderColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#0B8F64",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8
  },
  callAvatarImage: {
    width: 134,
    height: 134,
    borderRadius: 67
  },
  callRatingBadge: {
    position: "absolute",
    bottom: -6,
    backgroundColor: "#0B8F64",
    borderRadius: theme.radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "center"
  },
  callRatingBadgeText: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "700"
  },
  callingDriverName: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 20
  },
  callingDriverSub: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: theme.spacing.xl
  },
  callDuration: {
    color: "#0B8F64",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 15
  },
  callDurationPill: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#CBD5E1",
    marginTop: 8
  },
  callControlsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginBottom: theme.spacing.xxl
  },
  controlBtnContainer: {
    alignItems: "center"
  },
  controlCircleBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3
  },
  controlLabel: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: "600",
    marginTop: theme.spacing.sm
  },
  endCallContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl
  },
  endCallBtn: {
    backgroundColor: "#DC2626",
    borderRadius: theme.radius.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: theme.spacing.md,
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6
  },
  endCallIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "135deg" }]
  },
  endCallText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700"
  },

  // RATING SCREEN STYLES
  ratingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0"
  },
  ratingCloseIcon: {
    fontSize: 20,
    color: theme.colors.textSecondary
  },
  ratingHeaderTitle: {
    color: "#086449",
    fontSize: 18,
    fontWeight: "700"
  },
  ratingBodyContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 120,
    alignItems: "center"
  },
  ratingAvatarWrapper: {
    marginBottom: theme.spacing.md
  },
  ratingAvatarBorder: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2.5,
    borderColor: "#0B8F64",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  ratingAvatarImage: {
    width: 76,
    height: 76,
    borderRadius: 38
  },
  ratingVerifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0B8F64",
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF"
  },
  ratingDriverName: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "800"
  },
  ratingDriverSub: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    textAlign: "center"
  },
  ratingBox: {
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
    padding: theme.spacing.lg,
    width: "100%",
    alignItems: "center",
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.lg
  },
  ratingBoxTitle: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: theme.spacing.md
  },
  starsRow: {
    flexDirection: "row",
    gap: 12
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: theme.spacing.sm,
    width: "100%",
    marginTop: theme.spacing.sm
  },
  tagPill: {
    backgroundColor: "#F1F5F9",
    borderRadius: theme.radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "transparent"
  },
  tagPillActive: {
    backgroundColor: "#DFF4EB",
    borderColor: "#0B8F64"
  },
  tagText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "600"
  },
  tagTextActive: {
    color: "#0B8F64"
  },
  ratingFooter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md
  },
  tipLabel: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "600"
  },
  tipOptions: {
    flexDirection: "row",
    gap: theme.spacing.sm
  },
  tipPill: {
    backgroundColor: "#F1F5F9",
    borderRadius: theme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  tipPillActive: {
    backgroundColor: "#DFF4EB",
    borderWidth: 1,
    borderColor: "#0B8F64"
  },
  tipText: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "700"
  },
  tipTextActive: {
    color: "#0B8F64"
  },
  ratingSubmitBtn: {
    backgroundColor: "#086449",
    borderRadius: theme.radius.pill,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  ratingSubmitText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700"
  },

  // SUCCESS SCREEN STYLES
  successHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: "#FFF"
  },
  successCloseIcon: {
    fontSize: 20,
    color: "#0B8F64",
    fontWeight: "bold"
  },
  successHeaderTitle: {
    color: "#0B8F64",
    fontSize: 18,
    fontWeight: "700"
  },
  successBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl
  },
  successOuterBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#DFF4EB",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: theme.spacing.xxl
  },
  successInnerBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0B8F64",
    alignItems: "center",
    justifyContent: "center"
  },
  successAccentDot: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "#A7F3D0"
  },
  successTitleText: {
    color: "#086449",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 28,
    paddingHorizontal: theme.spacing.lg
  },
  successSubtitleText: {
    color: "#475569",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg
  },
  successFooter: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.md
  },
  successHomeBtn: {
    backgroundColor: "#086449",
    borderRadius: theme.radius.pill,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  successHomeBtnText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700"
  },
  successHistoryBtn: {
    backgroundColor: "#27272A",
    borderRadius: theme.radius.pill,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  successHistoryBtnText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700"
  }
});


