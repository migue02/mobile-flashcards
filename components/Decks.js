import React, { Component } from 'react'
import Deck from './Deck'
import { white } from '../utils/colors'
import { View, StyleSheet, Platform, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import AppLoading from 'expo-app-loading'
import { TouchableOpacity } from 'react-native-gesture-handler'

class Decks extends Component {
    state = {
        ready: false
    }

    componentDidMount () {
        const { dispatch } = this.props

        getDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({ready: true})))
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate(
                        'DeckDetail',
                        { id: item.title }
                    )}
                >
                    <Deck { ...item } />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { decks } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={decks}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
    },
    item: {
        flex: 1,
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    }
})


function mapStateToProps (decks) {
    return {
        decks: Object.entries(decks).map((deck)=> deck[1])
    }
}

export default connect(
    mapStateToProps,
)(Decks)