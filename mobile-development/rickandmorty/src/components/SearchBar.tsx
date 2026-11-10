import {StyleSheet, Text, View, TextInput} from "react-native";

export default function SearchBar({value, onChangeText}:{ value: string, onChangeText: (text: string) => void }) {

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder={"Search"} placeholderTextColor="#999" onChangeText={onChangeText} value={value} autoCapitalize="none"  />
        </View>

    )
}
const styles = StyleSheet.create ({
inputContainer: {

    alignItems: "flex-start",

},
    textInput: {
        height: 45,
        width: 300,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
    }
})