import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { black, gray, green, red, strongRed, white } from '../utils/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

export default function Result ({ questions, score, onReset, toHome }) {
    const percentage = Math.floor((score * 100)/questions)

    clearLocalNotification()
        .then(setLocalNotification)

    return (
        <View style={styles.container}>
            <Text style={percentage > 50 ? styles.congratulations : styles.tryAgain}>{percentage > 50 ? 'Congratulations!' : "Don't give up, take a break and try again!"}</Text>
            <View>
                <View style={styles.result}>
                    <Text style={styles.title}>Questions:</Text>
                    <Text style={styles.score}>{questions}</Text>
                </View>
                <View style={styles.result}>
                    <Text style={styles.title}>Total score:</Text>
                    <Text style={styles.score}>{score}</Text>
                </View>
                <View style={styles.result}>
                    <Text style={styles.title}>You have answered:</Text>
                    <Text style={styles.score}>{percentage}%</Text>
                </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={[styles.btn, {backgroundColor: red}]}
                    onPress={onReset}
                >
                    <Text style={[styles.text, {color: white}]} >Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, {backgroundColor: white}]}
                    onPress={() => toHome('Result')}
                >
                    <Text style={styles.text} >Go back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    congratulations: {
        fontSize: 40,
        textAlign: 'center',
        color: green,
    },
    tryAgain: {
        fontSize: 30,
        textAlign: 'center',
        color: strongRed,
    },
    result: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    title: {
        textAlign: 'left',
        color: black,
        fontSize: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center'
    },
    score: {
        marginLeft: 20,
        fontSize: 20,
        color: gray
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    btn: {
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 30,
        margin: 30,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
})