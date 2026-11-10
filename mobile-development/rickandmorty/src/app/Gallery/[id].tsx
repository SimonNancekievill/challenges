import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Character } from "@/context/CharacterContext";

export default function DetailPage() {
    const { id } = useLocalSearchParams();
    const [character, setCharacter] = useState<Character | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(
                    `https://rickandmortyapi.com/api/character/${id}`,
                );

                if (!response.ok) {
                    throw new Error("Character not found");
                }
                const data = await response.json();
                setCharacter(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        if (id) {
            fetchCharacter();
        }
    }, [id]);

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    if (!character) {
        return <Text>Character not found.</Text>;
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.card}>
                <Image source={{ uri: character.image }} style={styles.image} />
                <Text style={styles.name}>{character.name}</Text>
                <Text>Status: {character.status}</Text>
                <Text>Species: {character.species}</Text>
                <Text>Gender: {character.gender}</Text>
                <Text>Origin: {character.origin.name}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        margin: 10,
        alignItems: "center",
        elevation: 3,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
    },
});
