import AsyncStorage from '@react-native-community/async-storage'

const DECKS_STORAGE_KEY = 'UdaciFitness:calendar'

const DummyData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    JavaScrip2t: {
        title: 'JavaScript2',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    JavaScrip3t: {
        title: 'JavaScri3pt',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    JavaSc1ipt: {
        title: 'JavaSc1ipt',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    JavaS1cr2ipt: {
        title: 'JavaS1cr2ipt',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    JavaS21cr2ipt: {
        title: 'JavaS21cr2ipt',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    JavaS21cr2ipt1: {
        title: 'JavaS21cr2ipt1',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

export function getDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(() => DummyData);
}

export function getDeck (id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function saveDeckTitle ({ title }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        },
    }))
}

export function addCardToDeck ({ title, card }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: [card]
        },
    }))
}

export function removeDeck (key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)

            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}