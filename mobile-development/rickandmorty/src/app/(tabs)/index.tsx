import { useFonts } from "expo-font";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [fontsLoaded] = useFonts({
    GetSchwifty: require("../../assets/fonts/get_schwifty.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
      <View style={styles.container}>
        <Image
            source={{
              uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Ffeatured%2Frick-and-morty-8rc57d4ds44gqzau.jpg&f=1&nofb=1&ipt=152aa5229fd3380be9ea8e536e55c62f9305604aae387dc89a5c468715ea26eb&ipo=images",
            }}
            style={styles.background}
        />
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Rick And Morty</Text>
        </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backdropFilter: "",
  },
  title: {
    fontSize: 56,
    fontFamily: "GetSchwifty",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    marginBottom: 10,
  },
});
