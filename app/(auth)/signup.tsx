import { CNMIButton } from "@/components/ui/CNMIButton";
import { CNMICard } from "@/components/ui/CNMICard";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";

type UserRole = "passenger" | "taxi_driver" | "transit_driver";

export default function SignupScreen() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-background-50 dark:bg-background-0">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="flex-1 justify-center px-6">
        
          {/* Signup Form */}
          <CNMICard variant="elevated" className="mb-6">
            <Text className="mb-6 text-center text-xl font-semibold text-typography-900 dark:text-typography-100">
              Sign Up
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

            {/* Phone Number */}
            <View className="mb-6">
              <Text className="mb-2 text-typography-700 dark:text-typography-300">
                Phone Number
              </Text>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter your phone number"
                placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                keyboardType="phone-pad"
                autoComplete="tel"
                textContentType="telephoneNumber"
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
    </TouchableWithoutFeedback>
  );
}
