import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Booking Ship</Text>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.copy}>Phone and OTP login will be implemented in the auth module.</Text>
      <Text style={styles.api}>API: {apiUrl}</Text>
      <View style={styles.actions}>
        <Link href="/customer" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Customer mode</Text>
          </Pressable>
        </Link>
        <Link href="/driver" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Driver mode</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F8FAFC"
  },
  eyebrow: {
    color: "#0F52BA",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase"
  },
  title: {
    color: "#0F172A",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 12
  },
  copy: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24
  },
  api: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 16
  },
  actions: {
    gap: 12,
    marginTop: 32
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#0F52BA",
    borderRadius: 12,
    paddingVertical: 14
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: "#0F52BA",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 14
  },
  secondaryButtonText: {
    color: "#0F52BA",
    fontSize: 16,
    fontWeight: "700"
  }
});
