import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useGetFounder, useGetFounderSections } from '@workspace/api-client-react';
import { useColors } from '@/hooks/useColors';

export default function FounderDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { data: founder, isLoading: loadingFounder, isError } = useGetFounder(slug ?? '');
  // locale arg omitted — dist types don't expose it; API defaults to 'en'
  const { data: sections, isLoading: loadingSections } = useGetFounderSections(
    slug ?? ''
  );

  const s = styles(colors);
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  if (loadingFounder) {
    return (
      <View style={[s.root, { paddingTop: topPad }]}>
        <View style={s.backRow}>
          <Pressable style={s.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color={colors.foreground} />
          </Pressable>
        </View>
        <View style={s.center}>
          <ActivityIndicator size="large" color={colors.editorial} />
        </View>
      </View>
    );
  }

  if (isError || !founder) {
    return (
      <View style={[s.root, { paddingTop: topPad }]}>
        <View style={s.backRow}>
          <Pressable style={s.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color={colors.foreground} />
          </Pressable>
        </View>
        <View style={s.center}>
          <Feather name="alert-circle" size={32} color={colors.mutedForeground} />
          <Text style={s.emptyTitle}>Profile not found</Text>
        </View>
      </View>
    );
  }

  const textSections = sections?.filter(
    (s) => s.sectionKey !== 'Awards' && s.sectionKey !== 'Interviews'
  ) ?? [];

  return (
    <View style={[s.root, { paddingTop: topPad }]}>
      {/* Top bar */}
      <View style={s.topBar}>
        <Pressable style={s.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <Text style={s.topTitle} numberOfLines={1}>{founder.name}</Text>
        <View style={[
          s.pubBadge,
          { backgroundColor: founder.published ? colors.publishedBg : colors.draftBg },
        ]}>
          <Text style={[
            s.pubText,
            { color: founder.published ? colors.published : colors.draft },
          ]}>
            {founder.published ? 'Published' : 'Draft'}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          s.scroll,
          Platform.OS === 'web' && { paddingBottom: 34 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={s.hero}>
          {founder.photoUrl ? (
            <Image source={{ uri: founder.photoUrl }} style={s.photo} />
          ) : (
            <View style={[s.photo, s.photoFallback]}>
              <Text style={s.photoInitial}>
                {founder.name?.charAt(0)?.toUpperCase() ?? '?'}
              </Text>
            </View>
          )}
          <Text style={s.heroName}>{founder.name}</Text>
          <Text style={s.heroDesig}>{founder.designation}</Text>
          {founder.category && (
            <View style={s.heroCatBadge}>
              <Text style={s.heroCatText}>{founder.category}</Text>
            </View>
          )}
        </View>

        {/* Divider */}
        <View style={s.divider} />

        {/* Stats grid */}
        <View style={s.statsGrid}>
          {founder.location && <StatCell label="Location" value={founder.location} colors={colors} />}
          {founder.founded && <StatCell label="Founded" value={founder.founded} colors={colors} />}
          {founder.revenue && <StatCell label="Revenue" value={founder.revenue} colors={colors} />}
          {founder.employees && <StatCell label="Employees" value={founder.employees} colors={colors} />}
          {founder.age && <StatCell label="Age" value={founder.age} colors={colors} />}
        </View>

        {/* One-liner */}
        {founder.oneLiner && (
          <View style={s.oneLinerBox}>
            <Text style={s.oneLiner}>"{founder.oneLiner}"</Text>
          </View>
        )}

        {/* Executive Summary */}
        {founder.executiveSummary && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Executive Summary</Text>
            <Text style={s.bodyText}>{founder.executiveSummary}</Text>
          </View>
        )}

        {/* Story Sections */}
        {loadingSections ? (
          <View style={s.sectionsLoading}>
            <ActivityIndicator size="small" color={colors.mutedForeground} />
            <Text style={s.sectionsLoadingText}>Loading story...</Text>
          </View>
        ) : textSections.length > 0 ? (
          <View style={s.storySections}>
            <Text style={s.storySectionsTitle}>Story Sections</Text>
            {textSections.map((sec, i) => (
              <View key={sec.sectionKey} style={s.storyCard}>
                <View style={s.storyCardHeader}>
                  <Text style={s.storyNum}>
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <Text style={s.storyKey}>{sec.sectionKey}</Text>
                </View>
                {sec.pullQuote ? (
                  <Text style={s.pullQuote}>"{sec.pullQuote}"</Text>
                ) : null}
                {sec.bodyParagraphs?.[0] ? (
                  <Text style={s.storyPreview} numberOfLines={3}>
                    {sec.bodyParagraphs[0]}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

function StatCell({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: ReturnType<typeof useColors>;
}) {
  const s = StyleSheet.create({
    cell: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: colors.muted,
      borderRadius: 10,
      padding: 12,
      margin: 4,
    },
    cellLabel: {
      fontSize: 10,
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600' as const,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 4,
    },
    cellValue: {
      fontSize: 14,
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600' as const,
      color: colors.foreground,
    },
  });
  return (
    <View style={s.cell}>
      <Text style={s.cellLabel}>{label}</Text>
      <Text style={s.cellValue}>{value}</Text>
    </View>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    backBtn: { padding: 6 },
    backRow: { paddingHorizontal: 16, paddingVertical: 12 },
    topTitle: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600' as const,
      fontFamily: 'Inter_600SemiBold',
      color: colors.foreground,
    },
    pubBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
    pubText: {
      fontSize: 11,
      fontFamily: 'Inter_700Bold',
      fontWeight: '700' as const,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    scroll: { paddingBottom: 32 },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    emptyTitle: {
      fontSize: 16,
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600' as const,
      color: colors.mutedForeground,
      marginTop: 8,
    },
    hero: {
      alignItems: 'center',
      paddingTop: 28,
      paddingBottom: 20,
      paddingHorizontal: 24,
    },
    photo: {
      width: 88,
      height: 88,
      borderRadius: 44,
      marginBottom: 14,
    },
    photoFallback: {
      backgroundColor: colors.authority,
      alignItems: 'center',
      justifyContent: 'center',
    },
    photoInitial: {
      fontSize: 32,
      fontWeight: '700' as const,
      fontFamily: 'Inter_700Bold',
      color: '#ffffff',
    },
    heroName: {
      fontSize: 22,
      fontWeight: '700' as const,
      fontFamily: 'Inter_700Bold',
      color: colors.foreground,
      textAlign: 'center',
      marginBottom: 4,
    },
    heroDesig: {
      fontSize: 14,
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
      textAlign: 'center',
      marginBottom: 10,
    },
    heroCatBadge: {
      backgroundColor: colors.muted,
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    heroCatText: {
      fontSize: 11,
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600' as const,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginHorizontal: 20,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 12,
    },
    oneLinerBox: {
      marginHorizontal: 20,
      marginVertical: 8,
      borderLeftWidth: 3,
      borderLeftColor: colors.editorial,
      paddingLeft: 14,
      paddingVertical: 8,
    },
    oneLiner: {
      fontSize: 15,
      fontFamily: 'Inter_400Regular',
      fontStyle: 'italic',
      color: colors.foreground,
      lineHeight: 22,
    },
    section: {
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    sectionTitle: {
      fontSize: 12,
      fontFamily: 'Inter_700Bold',
      fontWeight: '700' as const,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 8,
    },
    bodyText: {
      fontSize: 14,
      fontFamily: 'Inter_400Regular',
      color: colors.foreground,
      lineHeight: 22,
    },
    storySections: {
      paddingHorizontal: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    storySectionsTitle: {
      fontSize: 12,
      fontFamily: 'Inter_700Bold',
      fontWeight: '700' as const,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 12,
    },
    storyCard: {
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 14,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    storyCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6,
    },
    storyNum: {
      fontSize: 11,
      fontFamily: 'Inter_700Bold',
      fontWeight: '700' as const,
      color: colors.editorial,
      letterSpacing: 1,
    },
    storyKey: {
      fontSize: 13,
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600' as const,
      color: colors.foreground,
    },
    pullQuote: {
      fontSize: 13,
      fontFamily: 'Inter_400Regular',
      fontStyle: 'italic',
      color: colors.mutedForeground,
      marginBottom: 4,
    },
    storyPreview: {
      fontSize: 13,
      fontFamily: 'Inter_400Regular',
      color: colors.foreground,
      lineHeight: 19,
    },
    sectionsLoading: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      padding: 20,
    },
    sectionsLoadingText: {
      fontSize: 13,
      color: colors.mutedForeground,
      fontFamily: 'Inter_400Regular',
    },
  });
