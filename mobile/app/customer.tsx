import { StyleSheet, Text, View } from "react-native";

export default function CustomerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Home</Text>
      <Text style={styles.copy}>
        This screen will host map search, pickup/dropoff input, vehicle selection, booking, and
        live order tracking.
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
