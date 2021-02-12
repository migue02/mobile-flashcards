import React, { Component } from 'react'
import { TouchableOpacity, Text, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
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


class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    submit = () => {
        const title = this.props.route.params.id
        const { question, answer } = this.state
        const newCard = {
            title,
            card: {
                question,
                answer,
            }
        }

        this.props.dispatch(addCard(newCard))

        this.setState(() => ({
            question: '',
            answer: ''
        }))

        this.toHome();

        addCardToDeck(newCard)
    }

    toHome = () => {
        this.props.navigation.dispatch(
            CommonActions.goBack({
                key: 'DeckDetail',
            }))
    }

    handleTextChange = (name, text) => {
        this.setState({
            [name]:text
        })
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            title: 'Add Card'
        });
    }

    render() {
        const { question, answer } = this.state

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.title}>Enter your new card</Text>
                <TextInput
                    value={question}
                    style={[styles.center, styles.input]}
                    onChangeText={(text) => this.handleTextChange('question', text)}
                ></TextInput>
                <TextInput
                    value={answer}
                    style={[styles.center, styles.input]}
                    onChangeText={(text) => this.handleTextChange('answer', text)}
                ></TextInput>
                <SubmitBtn disabled={question === '' || answer === ''} onPress={this.submit} />
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

export default connect()(AddCard)