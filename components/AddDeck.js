import React, { Component } from 'react'
import { TouchableOpacity, Text, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { gray, red, white } from '../utils/colors'
import { CommonActions } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'

function SubmitBtn ({ disabled, onPress }) {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, disabled && styles.disabled]}
            onPress={onPress}>
                <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}


class AddDeck extends Component {
    state = {
        title: '',
    }

    submit = () => {
        const { title } = this.state

        this.props.dispatch(addDeck(title))

        this.setState(() => ({
            title: ''
        }))


        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                    { name: 'DeckDetail', params: { id: title } },
                ],
            })
        )

        saveDeckTitle(title)
    }

    handleTextChange = (title) => {
        this.setState(() => ({
            title
        }))
    }

    render() {
        const { title } = this.state

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput
                    value={title}
                    style={[styles.center, styles.input]}
                    onChangeText={this.handleTextChange}
                ></TextInput>
                <SubmitBtn disabled={title === ''} onPress={this.submit} />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    title: {
        fontSize: 45,
        textAlign: 'center',
    },
    input: {
        marginTop: 50,
        borderColor: gray,
        borderWidth: 1,
        fontSize: 20,
        borderRadius: Platform.OS === 'ios' ? 7 : 2,
    },
    iosSubmitBtn: {
        marginTop: 50,
        backgroundColor: red,
        padding: 10,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        marginTop: 50,
        backgroundColor: red,
        padding: 10,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    disabled: {
        backgroundColor: gray
    }
})

export default connect()(AddDeck)