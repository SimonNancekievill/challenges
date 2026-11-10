import { Character } from "@/context/CharacterContext";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "@/components/ListItem";
import SearchBar from "@/components/SearchBar";

type CharacterResponse = {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
};

export default function Gallery() {
    const [data, setData] = useState<Character[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    async function getCharacters() {
        try {
            const response = await fetch(
                "https://rickandmortyapi.com/api/character/",
            );
            const json = (await response.json()) as CharacterResponse;
            setData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCharacters();
    }, []);

    const filtered = data.filter((character) => character.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["top","left", "right"]}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ListItem character={item} />}
                    bounces={true}
                    alwaysBounceVertical={true}
                    decelerationRate="fast"
                    overScrollMode="always"
                    showsVerticalScrollIndicator={false}
                /></>
            )}
        </SafeAreaView>
    );
}
