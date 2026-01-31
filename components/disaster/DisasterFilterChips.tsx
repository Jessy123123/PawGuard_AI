import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { FilterOption, SortOption } from '../../types/disaster';

interface DisasterFilterChipsProps {
    activeFilter: FilterOption;
    activeSort: SortOption;
    onFilterChange: (filter: FilterOption) => void;
    onSortChange: (sort: SortOption) => void;
}

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'cats', label: 'Cats' },
    { value: 'dogs', label: 'Dogs' },
    { value: 'critical', label: 'Critical' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'latest', label: 'Latest' },
    { value: 'mostCritical', label: 'Most Critical' },
    { value: 'nearest', label: 'Nearest' },
];

export const DisasterFilterChips: React.FC<DisasterFilterChipsProps> = ({
    activeFilter,
    activeSort,
    onFilterChange,
    onSortChange,
}) => {
    const [showSortMenu, setShowSortMenu] = useState(false);

    const selectedSort = SORT_OPTIONS.find(s => s.value === activeSort);

    return (
        <View style={styles.container}>
            {/* Filter Chips */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsContainer}
            >
                {FILTER_OPTIONS.map((option) => {
                    const isActive = activeFilter === option.value;
                    return (
                        <Pressable
                            key={option.value}
                            style={[
                                styles.chip,
                                isActive && styles.activeChip,
                            ]}
                            onPress={() => onFilterChange(option.value)}
                        >
                            <Text style={[
                                styles.chipText,
                                isActive && styles.activeChipText,
                            ]}>
                                {option.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>

            {/* Sort Dropdown */}
            <View style={styles.sortContainer}>
                <Pressable
                    style={styles.sortButton}
                    onPress={() => setShowSortMenu(!showSortMenu)}
                >
                    <Ionicons
                        name="swap-vertical"
                        size={16}
                        color={colors.minimalist.textMedium}
                    />
                    <Text style={styles.sortText}>{selectedSort?.label}</Text>
                    <Ionicons
                        name={showSortMenu ? 'chevron-up' : 'chevron-down'}
                        size={14}
                        color={colors.minimalist.textMedium}
                    />
                </Pressable>

                {showSortMenu && (
                    <View style={styles.sortMenu}>
                        {SORT_OPTIONS.map((option) => (
                            <Pressable
                                key={option.value}
                                style={[
                                    styles.sortMenuItem,
                                    activeSort === option.value && styles.activeSortMenuItem,
                                ]}
                                onPress={() => {
                                    onSortChange(option.value);
                                    setShowSortMenu(false);
                                }}
                            >
                                <Text style={[
                                    styles.sortMenuText,
                                    activeSort === option.value && styles.activeSortMenuText,
                                ]}>
                                    {option.label}
                                </Text>
                                {activeSort === option.value && (
                                    <Ionicons
                                        name="checkmark"
                                        size={16}
                                        color={colors.minimalist.disasterOrange}
                                    />
                                )}
                            </Pressable>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.minimalist.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.minimalist.border,
    },
    chipsContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        flex: 1,
    },
    chip: {
        paddingHorizontal: spacing.md,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: colors.minimalist.bgLight,
        borderWidth: 1,
        borderColor: colors.minimalist.border,
    },
    activeChip: {
        backgroundColor: colors.minimalist.disasterOrangeLight,
        borderColor: colors.minimalist.disasterOrange,
    },
    chipText: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.minimalist.textMedium,
    },
    activeChipText: {
        color: colors.minimalist.disasterOrange,
        fontWeight: '600',
    },
    sortContainer: {
        position: 'relative',
        marginLeft: spacing.md,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
    },
    sortText: {
        fontSize: 12,
        color: colors.minimalist.textMedium,
    },
    sortMenu: {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: colors.minimalist.white,
        borderRadius: 8,
        minWidth: 140,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: colors.minimalist.border,
        zIndex: 100,
    },
    sortMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    activeSortMenuItem: {
        backgroundColor: colors.minimalist.bgLight,
    },
    sortMenuText: {
        fontSize: 13,
        color: colors.minimalist.textDark,
    },
    activeSortMenuText: {
        color: colors.minimalist.disasterOrange,
        fontWeight: '600',
    },
});
