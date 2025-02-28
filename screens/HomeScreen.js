import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.sectionContainer}>
            <View style={styles.container} >
       
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    sectionContainer: {
        flex: 1,
        padding: 24,
        height: '100%'
      },
})
export default HomeScreen