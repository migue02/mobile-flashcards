import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native'
import { gray, black, white } from '../utils/colors'
import TextButton from './TextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

class DeckDetail extends Component {

    startQuiz = () => {
        // const { remove, goBack, entryId } = this.props

        // remove()
        // goBack()
        // removeEntry(entryId)
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            title: this.props.route.params.id
        });
    }

    render() {
        const { item } = this.props;
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
                        style={[styles.btn, styles.addBtn]}
                        onPress={() => this.props.navigation.navigate(
                            'AddCard',
                            { id: item.title }
                        )}
                    >
                        <Text>Add Card</Text>
                    </TouchableOpacity>
                    <TextButton style={[styles.btn, styles.startBtn]} onPress={this.startQuiz}>
                        Star Quiz
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
        fontSize: 16,
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
    addBtn: {
        backgroundColor: white,
        color: black,
    },
    startBtn: {
        backgroundColor: black,
        color: white,
    },
})

function mapStateToProps(state, { route }) {
    const { id } = route.params;

    return {
        id,
        state,
        item: state[id],
    }
}

function mapDispatchToProps(dispatch, { route, navigation }) {
    // const { entryId } = route.params;
    return {
        // remove: () => dispatch(addEntry({
        //     [entryId]: timeToString() === entryId
        //         ? getDailyReminderValue()
        //         : null
        // })),
        // goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);