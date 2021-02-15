import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native'
import { gray, white, red } from '../utils/colors'
import TextButton from './TextButton';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { removeDeck } from '../actions'
import { deleteDeck } from '../utils/api'
import { CommonActions } from '@react-navigation/native';

class DeckDetail extends Component {

    deleteDeck = () => {
        const { id } = this.props

        this.toHome();
        deleteDeck(id)
        this.props.dispatch(removeDeck(id))
    }

    toHome = () => {
        this.props.navigation.dispatch(
            CommonActions.goBack({
                key: 'DetailDeck',
            }))
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            title: this.props.route.params.id
        });
    }

    render() {
        const { item } = this.props;

        if (!item) {
            return <View />
        }

        const { title, questions } = item

        return (
            <View style={styles.deck} >
                <View style={styles.info}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.questions}>
                        { questions.length } card{ questions.length > 1 && 's' }
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: white}]}
                        onPress={() => this.props.navigation.navigate(
                            'AddCard',
                            { id: title }
                        )}
                    >
                        <Text style={{textAlign: 'center'}}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: red}]}
                        onPress={() => this.props.navigation.navigate(
                            'Quiz',
                            { deck: item }
                        )}
                    >
                        <Text style={{textAlign: 'center', color: white}} >Star Quiz</Text>
                    </TouchableOpacity>
                    <TextButton style={{marginTop: 20, color: gray}} onPress={this.deleteDeck}>
                        Delete Deck
                    </TextButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 50,
        height: '100%',
    },
    info: {
        flex: 1,
    },
    buttons: {
        marginBottom: 60,
    },
    title: {
        fontSize: 20,
        padding: 30,
        justifyContent: 'center',
        textAlign: 'center',
    },
    questions: {
        fontSize: 16,
        color: gray,
        padding: 20,
        textAlign: 'center',
    },
    btn: {
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 30,
        margin: 10,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
})

function mapStateToProps(state, { route }) {
    const { id, fromAdd } = route.params;

    return {
        id,
        fromAdd,
        state,
        item: state[id],
    }
}

export default connect(mapStateToProps)(DeckDetail);