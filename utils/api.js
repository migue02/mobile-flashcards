import AsyncStorage from '@react-native-community/async-storage'

const DECKS_STORAGE_KEY = 'UdaciFitness:calendar'


export function getDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => JSON.parse(decks));
}

export function getDeck (id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function saveDeckTitle (title) {
    const newDeck = JSON.stringify({
        [title]: {
            title: title,
            questions: []
        },
    })

    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, newDeck)
}

export function addCardToDeck ({ title, card }) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)

            data[title] = {
                title: title,
                questions: data[title].questions.concat([card]),
            }
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export async function clearAllData() {
    try {
        await AsyncStorage.removeItem(DECKS_STORAGE_KEY)
    } catch(e) {
        // remove error
    }
}

export function deleteDeck (title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)

            data[title] = undefined
            delete data[title]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}