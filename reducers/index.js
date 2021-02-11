import { RECEIVE_DECKS, ADD_CARD } from '../actions'

function entries (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            console.log('action.decks', action.decks);
            return {
                ...state,
                ...action.decks,
            }
        case ADD_CARD:
            return {
                ...state,
                ...action.card,
            }
        default:
            return state
    }
}

export default entries