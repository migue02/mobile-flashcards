import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { gray, purple } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Deck ({ title, questions }) {
    return (
        <View style={styles.deck} >
            <View style={[styles.iconContainer]}>
                <MaterialCommunityIcons
                    name='card'
                    color={purple}
                    size={35}
                />
            </View>
            <View>
                <Text style={{fontSize: 20}}>
                    {title}
                </Text>
                <Text style={{fontSize: 16, color: gray}}>
                    { questions.length } card{ questions.length > 1 && 's' }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        marginTop: 12
    },
    iconContainer: {
        padding: 5,
        borderRadius: 8,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    }
})