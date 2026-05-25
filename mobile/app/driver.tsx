import { StyleSheet, Text, View } from "react-native";

export default function DriverScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Mode</Text>
      <Text style={styles.copy}>
        This screen will host online status, ride offers, pickup flow, delivery proof, wallet, and
        payout requests.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F8FAFC"
  },
  title: {
    color: "#0F172A",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12
  },
  copy: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24
  }
});
