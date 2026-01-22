import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface ImagePickerButtonProps {
    onImageSelected: (uri: string) => void;
}

export const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({ onImageSelected }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(status === 'granted');
        return status === 'granted';
    };

    const pickImage = async () => {
        const permitted = hasPermission ?? await requestPermission();

        if (!permitted) {
            Alert.alert(
                'Permission Required',
                'Please grant camera roll permissions to upload images.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            onImageSelected(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Please grant camera permissions to take photos.'
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            onImageSelected(result.assets[0].uri);
        }
    };

    const showOptions = () => {
        Alert.alert(
            'Upload Image',
            'Choose an option',
            [
                {
                    text: 'Take Photo',
                    onPress: takePhoto,
                },
                {
                    text: 'Choose from Library',
                    onPress: pickImage,
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <Pressable style={styles.button} onPress={showOptions}>
            <Ionicons name="camera" size={20} color={theme.colors.textPrimary} />
            <Text style={styles.buttonText}>Upload Image</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surfaceDark,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.button,
        gap: theme.spacing.sm,
    },
    buttonText: {
        ...theme.textStyles.button,
        color: theme.colors.textPrimary,
    },
});
