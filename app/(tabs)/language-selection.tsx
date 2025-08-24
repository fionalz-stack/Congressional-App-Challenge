import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';

interface Language {
  id: string;
  name: string;
  nativeName: string;
  code: string;
}

const languages: Language[] = [
  { id: 'en', name: 'English', nativeName: 'English', code: 'en' },
  { id: 'ko', name: 'Korean', nativeName: '한국어', code: 'ko' },
  { id: 'ja', name: 'Japanese', nativeName: '日本語', code: 'ja' },
  { id: 'ch', name: 'Chamorro', nativeName: 'Chamoru', code: 'ch' },
  { id: 'zh-cn', name: 'Chinese (Simplified)', nativeName: '简体中文', code: 'zh-CN' },
  { id: 'zh-tw', name: 'Chinese (Traditional)', nativeName: '繁體中文', code: 'zh-TW' },
];

export default function LanguageSelectionScreen() {
  const colorScheme = useColorScheme();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const selectLanguage = (languageId: string) => {
    setSelectedLanguage(languageId);
  };

  const handleSave = () => {
    console.log('Selected language:', selectedLanguage);
    
    Alert.alert(
      'Language Updated',
      `You have selected ${languages.find(lang => lang.id === selectedLanguage)?.name}`,
      [
        {
          text: 'OK',
          onPress: () => router.back()
        }
      ]
    );
  };

  const LanguageItem = ({ language }: { language: Language }) => {
    const isSelected = selectedLanguage === language.id;

    return (
      <TouchableOpacity
        style={[
          styles.languageItem,
          { 
            backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
            borderColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB'
          }
        ]}
        onPress={() => selectLanguage(language.id)}
      >
        <View style={styles.languageLeft}>
          <View style={[
            styles.flagContainer,
            { backgroundColor: colorScheme === 'dark' ? '#374151' : '#F3F4F6' }
          ]}>
            <Text style={styles.flagEmoji}>
              {language.id === 'en' ? '🇺🇸' : 
               language.id === 'ko' ? '🇰🇷' :
               language.id === 'ja' ? '🇯🇵' :
               language.id === 'ch' ? '🇬🇺' :
               language.id === 'zh-cn' ? '🇨🇳' :
               language.id === 'zh-tw' ? '🇹🇼' : '🌐'}
            </Text>
          </View>
          <View style={styles.languageText}>
            <Text style={[
              styles.languageName,
              { color: colorScheme === 'dark' ? '#F9FAFB' : '#111827' }
            ]}>
              {language.name}
            </Text>
            <Text style={[
              styles.languageNative,
              { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
            ]}>
              {language.nativeName}
            </Text>
          </View>
        </View>
        
        <View style={styles.languageRight}>
          <View style={[
            styles.radioButton,
            {
              backgroundColor: isSelected ? '#6B46C1' : 'transparent',
              borderColor: isSelected ? '#6B46C1' : (colorScheme === 'dark' ? '#6B7280' : '#D1D5DB'),
            }
          ]}>
            {isSelected && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={colorScheme === 'dark' ? '#F9FAFB' : '#111827'} 
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colorScheme === 'dark' ? '#F9FAFB' : '#111827' }]}>
          Language Selection
        </Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={[styles.description, { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }]}>
        Select the language you want to use in the app.
      </Text>

      <ScrollView style={styles.languageList} showsVerticalScrollIndicator={false}>
        {languages.map((language) => (
          <LanguageItem key={language.id} language={language} />
        ))}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: '#6B46C1' }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Language</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
    lineHeight: 20,
  },
  languageList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  flagEmoji: {
    fontSize: 20,
  },
  languageText: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  languageNative: {
    fontSize: 14,
  },
  languageRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
