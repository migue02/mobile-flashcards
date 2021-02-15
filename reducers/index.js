import { RECEIVE_DECKS, ADD_CARD, ADD_DECK, REMOVE_DECK } from '../actions'

function entries (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck]: {
                    title: action.deck,
                    questions: []
                },
            }
        case REMOVE_DECK:
            return Object.fromEntries(Object.entries(state).filter((deck) => deck[0] !== action.title))
        case ADD_CARD:
            return {
                ...state,
                [action.newCard.title]: {
                    title: action.newCard.title,
                    questions: state[action.newCard.title].questions.concat([action.newCard.card]),
                }
            }
        default:
            return state
    }
}

export default entries