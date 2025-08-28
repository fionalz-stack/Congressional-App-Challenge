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
  TouchableOpacity,
  View,
} from "react-native";

type UserRole = "passenger" | "taxi_driver" | "transit_driver";

export default function SignupScreen() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("passenger");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    // TODO: Implement Supabase authentication
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)/map");
    }, 1000);
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  const roles = [
    {
      id: "passenger",
      title: "Passenger",
      description: "I want to ride the bus or taxi",
    },
    {
      id: "taxi_driver",
      title: "Taxi Driver",
      description: "I provide taxi services",
    },
    {
      id: "transit_driver",
      title: "Transit Driver",
      description: "I drive public buses",
    },
  ];

  return (
    <View className="flex-1 bg-background-50 dark:bg-background-0">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-cnmi-primary rounded-2xl items-center justify-center mb-4">
              <Text className="text-white text-4xl">🚌</Text>
            </View>
            <Text className="mb-2 text-center text-2xl font-bold text-typography-900 dark:text-typography-100">
              Join TRANSIT CNMI
            </Text>
            <Text className="text-center text-typography-600 dark:text-typography-400">
              Create your account to get started
            </Text>
          </View>

          {/* Signup Form */}
          <CNMICard variant="elevated" className="mb-6">
            <Text className="mb-6 text-center text-xl font-semibold text-typography-900 dark:text-typography-100">
              Sign Up
            </Text>

            {/* Role Selection */}
            <View className="mb-6">
              <Text className="mb-3 text-typography-700 dark:text-typography-300">
                I am a:
              </Text>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.id}
                  onPress={() => setSelectedRole(role.id as UserRole)}
                  className={`border rounded-lg p-4 mb-3 ${
                    selectedRole === role.id
                      ? "border-cnmi-primary bg-cnmi-light dark:bg-cnmi-dark/20"
                      : "border-outline-300 dark:border-outline-600 bg-background-0 dark:bg-background-50"
                  }`}
                >
                  <Text
                    className={`font-semibold text-typography-900 dark:text-typography-100 ${
                      selectedRole === role.id ? "cnmi-text-interactive" : ""
                    }`}
                  >
                    {role.title}
                  </Text>
                  <Text className="mt-1 text-sm text-typography-600 dark:text-typography-400">
                    {role.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

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
                autoCapitalize="none"
                className="border border-outline-300 dark:border-outline-600 rounded-lg px-4 py-3 bg-background-0 dark:bg-background-800"
                style={{
                  fontSize: 17,
                  color: theme === "dark" ? "#F9FAFB" : "#111827",
                }}
              />
            </View>

            <View className="mb-4">
              <Text className="mb-2 text-typography-700 dark:text-typography-300">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                secureTextEntry
                className="border border-outline-300 dark:border-outline-600 rounded-lg px-4 py-3 bg-background-0 dark:bg-background-800"
                style={{
                  fontSize: 17,
                  color: theme === "dark" ? "#F9FAFB" : "#111827",
                }}
              />
            </View>

            <View className="mb-6">
              <Text className="mb-2 text-typography-700 dark:text-typography-300">
                Confirm Password
              </Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                secureTextEntry
                className="border border-outline-300 dark:border-outline-600 rounded-lg px-4 py-3 bg-background-0 dark:bg-background-800"
                style={{
                  fontSize: 17,
                  color: theme === "dark" ? "#F9FAFB" : "#111827",
                }}
              />
            </View>

            <CNMIButton
              title="Create Account"
              onPress={handleSignup}
              loading={loading}
              className="mb-4"
            />

            <CNMIButton
              title="Already have an account? Login"
              onPress={handleLogin}
              variant="ghost"
            />
          </CNMICard>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
