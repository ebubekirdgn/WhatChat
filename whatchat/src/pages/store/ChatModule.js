import firebase from 'firebase';
import { resolve, reject } from 'q';

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
        getAllUsers({commit}){
            var promise = new Promise((resolve,reject)=> {
                firebase.database().ref('users').on('value',function(snapshot){
                    console.log(snapshot.val())
                    commit('setContacts',snapshot.val())
                    resolve(snapshot.val())
                })
            })
            return promise
        }
    }
}
export default ChatModule