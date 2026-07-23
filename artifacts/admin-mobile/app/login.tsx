import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(username.trim(), password.trim());
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/founders');
    } catch (e: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError(e.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const s = styles(colors);

  return (
    <View style={[s.root, { paddingTop: Platform.OS === 'web' ? 67 : insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s.inner}
      >
        {/* Logo */}
        <View style={s.logoBlock}>
          <View style={s.logoMark}>
            <Text style={s.logoLetters}>PB</Text>
          </View>
          <Text style={s.brand}>ProfileBizz</Text>
          <Text style={s.sub}>Editorial Administration</Text>
        </View>

        {/* Card */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Sign in to Desk</Text>

          <View style={s.field}>
            <Text style={s.label}>Username</Text>
            <TextInput
              style={s.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="editor"
              placeholderTextColor={colors.mutedForeground}
              returnKeyType="next"
            />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Password</Text>
            <TextInput
              style={s.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor={colors.mutedForeground}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
          </View>

          {!!error && (
            <View style={s.errorBox}>
              <Text style={s.errorText}>{error}</Text>
            </View>
          )}

          <Pressable
            style={({ pressed }) => [s.btn, pressed && s.btnPressed, loading && s.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={s.btnText}>Sign In</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    inner: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    logoBlock: {
      alignItems: 'center',
      marginBottom: 36,
    },
    logoMark: {
      width: 64,
      height: 64,
      borderRadius: 16,
      backgroundColor: colors.authority,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    logoLetters: {
      fontSize: 24,
      fontWeight: '700' as const,
      color: '#ffffff',
      fontFamily: 'Inter_700Bold',
      letterSpacing: 1,
    },
    brand: {
      fontSize: 22,
      fontWeight: '700' as const,
      fontFamily: 'Inter_700Bold',
      color: colors.foreground,
      letterSpacing: -0.5,
    },
    sub: {
      fontSize: 13,
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      marginTop: 2,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: '600' as const,
      fontFamily: 'Inter_600SemiBold',
      color: colors.foreground,
      marginBottom: 20,
    },
    field: {
      marginBottom: 16,
    },
    label: {
      fontSize: 12,
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600' as const,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 6,
    },
    input: {
      height: 46,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      fontSize: 15,
      fontFamily: 'Inter_400Regular',
      color: colors.foreground,
      backgroundColor: colors.background,
    },
    errorBox: {
      backgroundColor: '#fef2f2',
      borderRadius: 8,
      padding: 10,
      marginBottom: 12,
    },
    errorText: {
      color: colors.editorial,
      fontSize: 13,
      fontFamily: 'Inter_400Regular',
    },
    btn: {
      height: 50,
      borderRadius: 12,
      backgroundColor: colors.authority,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
    },
    btnPressed: { opacity: 0.85 },
    btnDisabled: { opacity: 0.6 },
    btnText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600' as const,
      fontFamily: 'Inter_600SemiBold',
    },
  });
