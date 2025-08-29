import { CNMIButton } from "@/components/ui/CNMIButton";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const handleDriverLogin = () => {
    router.push({ pathname: "/(auth)/signup", params: { role: "driver" } as any });
  };

  const handleTaxiLogin = () => {
    router.push({ pathname: "/(auth)/signup", params: { role: "taxi" } as any });
  };

  const handleContinueAsUser = () => {
    router.replace("/(tabs)/map");
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
            <Image
              source={require("../../assets/images/transit.png")}
              style={{ width: 120, height: 120, borderRadius: 24, marginBottom: 4 }}
              resizeMode="contain"
              accessibilityLabel="SPN Transit logo"
            />
            
            <Text className="text-center text-typography-600 dark:text-typography-400">
            </Text>
          </View>

          {/* Role Selection */}
          <View className="items-center">
            <View style={{ width: 320 }}>
              <View className="flex flex-col gap-6">
                <CNMIButton
                  title="Driver Login"
                  onPress={handleDriverLogin}
                  variant="outline"
                />
                <CNMIButton
                  title="Taxi Login"
                  onPress={handleTaxiLogin}
                  variant="outline"
                />
                <CNMIButton
                  title="Continue as User"
                  onPress={handleContinueAsUser}
                />
              </View>
            </View>
          </View>

          {/* Footer */}
          <Text className="text-center text-sm text-typography-600 dark:text-typography-400 mt-8">
            Connecting the community, one ride at a time
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
