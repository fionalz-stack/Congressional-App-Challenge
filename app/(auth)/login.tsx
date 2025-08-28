import { CNMIButton } from "@/components/ui/CNMIButton";
import { CNMICard } from "@/components/ui/CNMICard";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // TODO: Implement Supabase authentication
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)/map");
    }, 1000);
  };

  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  return (
    <View className="flex-1 bg-background-50 dark:bg-background-0">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          {/* Logo and Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-cnmi-primary rounded-2xl items-center justify-center mb-4">
              <Text className="text-white text-4xl">🚌</Text>
            </View>
            <Text className="mb-2 text-center text-2xl font-bold text-typography-900 dark:text-typography-100">
              TRANSIT CNMI
            </Text>
            <Text className="text-center text-typography-600 dark:text-typography-400">
              Your island transit companion
            </Text>
          </View>

          {/* Login Form */}
          <CNMICard variant="elevated" className="mb-6">
            <Text className="mb-6 text-center text-xl font-semibold text-typography-900 dark:text-typography-100">
              Login
            </Text>

            <View className="mb-4">
              <Text className="mb-2 text-typography-700 dark:text-typography-300">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                autoCorrect={false}
                keyboardAppearance={theme === "dark" ? "dark" : "light"}
                cursorColor={theme === "dark" ? "#F9FAFB" : "#111827"}
                selectionColor={theme === "dark" ? "#6B46C1" : "#6B46C1"}
                autoCapitalize="none"
                className="border border-outline-300 dark:border-outline-600 rounded-lg px-4 py-3 bg-background-0 dark:bg-background-50"
                style={{
                  fontSize: 17,
                  color: theme === "dark" ? "#F9FAFB" : "#111827",
                }}
              />
            </View>

            <View className="mb-6">
              <Text className="mb-2 text-typography-700 dark:text-typography-300">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                secureTextEntry
                textContentType="password"
                autoComplete="password"
                autoCorrect={false}
                keyboardAppearance={theme === "dark" ? "dark" : "light"}
                cursorColor={theme === "dark" ? "#F9FAFB" : "#111827"}
                selectionColor={theme === "dark" ? "#6B46C1" : "#6B46C1"}
                className="border border-outline-300 dark:border-outline-600 rounded-lg px-4 py-3 bg-background-0 dark:bg-background-50"
                style={{
                  fontSize: 17,
                  color: theme === "dark" ? "#F9FAFB" : "#111827",
                }}
              />
            </View>

            <CNMIButton
              title="Login"
              onPress={handleLogin}
              loading={loading}
              className="mb-4"
            />

            <CNMIButton
              title="Create Account"
              onPress={handleSignUp}
              variant="outline"
            />
          </CNMICard>

          {/* Footer */}
          <Text className="text-center text-sm text-typography-600 dark:text-typography-400">
            Connecting the community, one ride at a time
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
