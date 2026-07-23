import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import {
  getListFoundersQueryKey,
  useListFounders,
  useUpdateFounder,
} from '@workspace/api-client-react';
import { useColors } from '@/hooks/useColors';
import { useAuth } from '@/context/AuthContext';

export default function FoundersScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch, isFetching } = useListFounders();
  const updateMutation = useUpdateFounder();
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);

  const handleTogglePublished = useCallback(
    async (slug: string, currentPublished: boolean, founderData: any) => {
      setTogglingSlug(slug);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      try {
        await updateMutation.mutateAsync({
          slug,
          data: {
            name: founderData.name,
            designation: founderData.designation,
            published: !currentPublished,
          },
        });
        queryClient.invalidateQueries({ queryKey: getListFoundersQueryKey() });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } finally {
        setTogglingSlug(null);
      }
    },
    [updateMutation, queryClient]
  );

  const s = styles(colors);
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      style={({ pressed }) => [s.row, pressed && s.rowPressed]}
      onPress={() => router.push(`/founder/${item.slug}`)}
    >
      {/* Avatar */}
      <View style={s.avatar}>
        {item.photoUrl ? (
          <Image source={{ uri: item.photoUrl }} style={s.avatarImg} />
        ) : (
          <View style={[s.avatarImg, s.avatarFallback]}>
            <Text style={s.avatarInitial}>
              {item.name?.charAt(0)?.toUpperCase() ?? '?'}
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={s.rowBody}>
        <Text style={s.rowName} numberOfLines={1}>{item.name}</Text>
        <Text style={s.rowDesig} numberOfLines={1}>{item.designation}</Text>
        {item.category ? (
          <View style={s.catBadge}>
            <Text style={s.catText}>{item.category}</Text>
          </View>
        ) : null}
      </View>

      {/* Toggle */}
      <View style={s.toggleWrap}>
        {togglingSlug === item.slug ? (
          <ActivityIndicator size="small" color={colors.editorial} />
        ) : (
          <Switch
            value={!!item.published}
            onValueChange={() =>
              handleTogglePublished(item.slug, item.published, item)
            }
            trackColor={{ false: colors.border, true: colors.editorial }}
            thumbColor={Platform.OS === 'android' ? colors.card : undefined}
            ios_backgroundColor={colors.border}
          />
        )}
      </View>

      <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
    </Pressable>
  );

  return (
    <View style={[s.root, { paddingTop: topPad }]}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.headerTitle}>ProfileBizz</Text>
          <Text style={s.headerSub}>
            {user?.username ? `@${user.username}` : 'Admin'}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [s.logoutBtn, pressed && { opacity: 0.6 }]}
          onPress={logout}
        >
          <Feather name="log-out" size={20} color={colors.mutedForeground} />
        </Pressable>
      </View>

      {/* Section label */}
      <View style={s.sectionHeader}>
        <Text style={s.sectionLabel}>Founders</Text>
        <Text style={s.sectionHint}>Toggle to publish / unpublish</Text>
      </View>

      {isLoading ? (
        <View style={s.center}>
          <ActivityIndicator size="large" color={colors.editorial} />
        </View>
      ) : isError ? (
        <View style={s.center}>
          <Feather name="alert-circle" size={32} color={colors.mutedForeground} />
          <Text style={s.emptyTitle}>Could not load founders</Text>
          <Pressable style={s.retryBtn} onPress={() => refetch()}>
            <Text style={s.retryText}>Retry</Text>
          </Pressable>
        </View>
      ) : !data?.length ? (
        <View style={s.center}>
          <Feather name="users" size={40} color={colors.border} />
          <Text style={s.emptyTitle}>No founders yet</Text>
          <Text style={s.emptySub}>Add profiles from the web admin panel</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.slug}
          renderItem={renderItem}
          contentContainerStyle={[
            s.list,
            Platform.OS === 'web' && { paddingBottom: 34 },
          ]}
          scrollEnabled={!!(data && data.length > 0)}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
              tintColor={colors.editorial}
            />
          }
          ItemSeparatorComponent={() => <View style={s.sep} />}
        />
      )}
    </View>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700' as const,
      fontFamily: 'Inter_700Bold',
      color: colors.foreground,
    },
    headerSub: {
      fontSize: 12,
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
    },
    logoutBtn: { padding: 8 },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 8,
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 10,
    },
    sectionLabel: {
      fontSize: 13,
      fontWeight: '700' as const,
      fontFamily: 'Inter_700Bold',
      color: colors.foreground,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    sectionHint: {
      fontSize: 11,
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
    },
    list: { paddingHorizontal: 16, paddingBottom: 24 },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 14,
      gap: 12,
    },
    rowPressed: { opacity: 0.75 },
    sep: { height: 8 },
    avatar: { width: 46, height: 46 },
    avatarImg: { width: 46, height: 46, borderRadius: 23 },
    avatarFallback: {
      backgroundColor: colors.authority,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarInitial: {
      fontSize: 18,
      fontWeight: '700' as const,
      fontFamily: 'Inter_700Bold',
      color: '#ffffff',
    },
    rowBody: { flex: 1, minWidth: 0 },
    rowName: {
      fontSize: 15,
      fontWeight: '600' as const,
      fontFamily: 'Inter_600SemiBold',
      color: colors.foreground,
      marginBottom: 2,
    },
    rowDesig: {
      fontSize: 12,
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      marginBottom: 4,
    },
    catBadge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.muted,
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    catText: {
      fontSize: 10,
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600' as const,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    toggleWrap: { width: 52, alignItems: 'center' },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: 32,
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: '600' as const,
      fontFamily: 'Inter_600SemiBold',
      color: colors.foreground,
      marginTop: 8,
    },
    emptySub: {
      fontSize: 13,
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      textAlign: 'center',
    },
    retryBtn: {
      marginTop: 12,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: colors.muted,
    },
    retryText: {
      fontSize: 14,
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600' as const,
      color: colors.foreground,
    },
  });
