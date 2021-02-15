import React, { Component } from 'react'
import { gray, strongRed, green, white, black, lightGray } from '../utils/colors'
import { View, StyleSheet, Platform, Text } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CardFlip from 'react-native-card-flip'
import Result from './Result'
import { CommonActions } from '@react-navigation/native'

class Quiz extends Component {
    state = {
        indexCard: 0,
        score: 0,
        flipIndex: 0
    }

    updateScore = (increase) => {
        const { flipIndex } = this.state

        if (flipIndex === 1) {
            this.card.flip()
        }

        this.setState((state) => {
            return {
                ...state,
                score: state.score + (increase && 1),
                indexCard: state.indexCard + 1,
                flipIndex: 0
            }
        })
    }

    handleOnFlip = (flipIndex) => {
        this.setState({
            flipIndex
        })
    }

    reset = () => {
        const { flipIndex } = this.state

        if (flipIndex === 1) {
            this.card.flip()
        }

        this.setState(() => ({
            indexCard: 0,
            score: 0,
            flipIndex: 0,
        }))
    }

    toHome = (key) => {
        this.props.navigation.dispatch(
            CommonActions.goBack({
                key: key,
            }))
    }

    render() {
        const { deck } = this.props
        const { title, questions } = deck
        const { indexCard, score, flipIndex } = this.state
        const totalCards = questions.length

        if (questions.length === 0) {
            return <Text style={styles.noQuestions}>You will have to create some questions in order to start the quiz...</Text>
        }

        if (questions.length <= indexCard) {
            const result = {
                questions: questions.length,
                score: score
            }
            return <Result {...result} onReset={this.reset} toHome={this.toHome} />
        }

        const { question, answer } = questions[indexCard]

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{indexCard + 1} / {totalCards}</Text>
                    <Text style={styles.headerText}>Score: {score}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} onFlip={this.handleOnFlip}>
                        <TouchableOpacity
                            style={[styles.card, styles.card1]}
                            onPress={() => this.card.flip()}>
                            <Text style={styles.label}>{question}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.card, styles.card2]}
                            onPress={() => this.card.flip()}>
                            <Text style={styles.label}>{answer}</Text>
                        </TouchableOpacity>
                    </CardFlip>
                    <Text style={styles.hint}>Touch the card to see the {flipIndex === 1 ? 'question' : 'answer'}...</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={[styles.btn, {backgroundColor: green}]}
                            onPress={() => this.updateScore(true)}
                        >
                            <Text style={[styles.text, {textAlign: 'center'}]} >Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, {backgroundColor: strongRed}]}
                            onPress={() => this.updateScore(false)}
                        >
                            <Text style={[styles.text, {textAlign: 'center'}]} >Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 30,
    },
    headerText: {
        color: gray,
    },
    title: {
        fontSize: 45,
        marginBottom: 20,
        textAlign: 'center',
    },
    noQuestions: {
        flex:1,
        fontSize: 35,
        margin: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    hint: {
        fontSize: 10,
        color: gray,
        marginBottom: 20,
        textAlign: 'center',
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
    cardContainer: {
        flex: 1,
        margin: 30,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    card: {
        justifyContent: 'center',
        height: '100%',
        padding: 20,
    },
    card1: {
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        backgroundColor: white,
    },
    card2: {
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        backgroundColor: lightGray,
    },
    question: {
        fontSize: 20,
        textAlign: 'center',
        color: gray
    },
    answer: {
        fontSize: 20,
        textAlign: 'center',
        color: black
    },
    text: {
        fontSize: 20
    },
    label: {
        fontSize: 20,
        textAlign: 'center',
        color: black
    },
})


function mapStateToProps({}, { route }) {
    const { deck } = route.params;

    return {
        deck
    }
}

export default connect(mapStateToProps)(Quiz);