import { RECEIVE_DECKS, ADD_CARD, ADD_DECK } from '../actions'

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
        case ADD_CARD:
            return {
                ...state,
                [action.card.title]: {
                    title: action.card.title,
                    questions: state[action.card.title].questions.concat([action.card.question]),
                }
            }
        default:
            return state
    }
}

export default entries