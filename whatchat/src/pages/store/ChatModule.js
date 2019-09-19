import firebase from 'firebase';
import * as db from './db';


const ChatModule = {
    state: {
        contacts: []
    },
    getters: {
        contacts: state => state.contacts,
    },
    mutations: {
        setContacts(state, payload) {
            state.contacts = payload
        },
    },
    actions: {
        getAllUsers({ commit }) {
            var promise = new Promise((resolve, reject) => {
                firebase.database().ref('users').on('value', function (snapshot) {
                    console.log(snapshot.val())
                    commit('setContacts', snapshot.val())
                    resolve(snapshot.val())
                })
            })
            return promise
        },
        sendRequest({ commit }, payload) {
            var promise = new Promise((resolve, reject) => {
                db.firerequest.child(payload.receipent).push({ sender: payload.sender })
                    .then(() => {
                        resolve({ success: true })
                    }).catch(err => {
                        reject(err)
                    })
            })
        }
    }
}
export default ChatModule