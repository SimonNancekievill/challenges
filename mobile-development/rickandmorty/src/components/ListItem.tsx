import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Character } from "@/context/CharacterContext";

type Props = {
    character: Character;
};
export default function ListItem({ character }: Props) {
    return (
        <View style={styles.card}>
            <Link
                href={{
                    pathname: "/Gallery/[id]",
                    params: { id: String(character.id) },
                }}
            >
                <Image source={{ uri: character.image }} style={styles.image} />
            </Link>
            <Text style={styles.name}>{character.name}</Text>
            <Text>Status: {character.status}</Text>
            <Text>Species: {character.species}</Text>
            <Text>Gender: {character.gender}</Text>
            <Text>Origin: {character.origin.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
