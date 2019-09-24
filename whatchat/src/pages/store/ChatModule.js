import firebase from 'firebase';
import * as db from './db';


const ChatModule = {
    state: {
        contacts: [],
        friend_requests: [],
    },
    getters: {
        contacts: state => state.contacts,
        friend_requests: state => state.friend_requests,
    },
    mutations: {
        setContacts(state, payload) {
            state.contacts = payload
        },
        setFriendRequests(state, payload) {
            state.friend_requests = payload
        },
    },
    actions: {
        async getMyRequests({ commit, dispatch }) {
            var users = await dispatch('getAllUsers')

            db.firerequest.child(firebase.auth().currentUser.uid)
                .on('value', snapshot => {
                    var frd_request_id = _.map(snapshot.val(), "sender")
                    var userdetails = []
                    console.log('frd_request_id', frd_request_id)
                    console.log('users', users)
                    _.forEach(frd_request_id, uid => {
                        var user = _.find(users, ["uid", uid])
                        userdetails.push(user)
                    })
                    commit('setFriendRequests',userdetails)
                })
        },
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