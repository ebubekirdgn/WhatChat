import firebase from 'firebase';

const AuthModule = {
    state: {
        signed_in: false,
        signed_up: false
    },
    getters: {
        signed_in: state => state.signed_in,
        signed_up: state => state.signed_up
    },
    mutations: {
        setSignedIn(state, payload) {
            state.signed_in = payload
        },
        setSignedUp(state, payload) {
            state.signed_up = payload
        }
    },
    actions: {
        signIn({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    //logined in
                    commit('setSignedIn', true)
                })
                .catch(function (error) {
                    // Handle Errors here.
                    commit('setAlertMessage', error)
                    // ...
                });
        },
        signUp({ commit, dispatch }, payload) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(payload.email, payload.password)
                .then(data => {
                    firebase
                        .database()
                        .ref('users')
                        .child(data.user.uid)
                        .set({
                            uid: data.user.uid,
                            name: payload.name,
                            email: payload.email,
                            emailverified: false,
                            photo_url: payload.photoURL
                        });
                    let newUser = data.user;
                    newUser.updateProfile({
                        displayName: payload.name,
                        photoURL: payload.photoURL
                    })
                        .then(() => {
                            dispatch('sendVerification')
                            commit('setSignedUp', true)
                            console.log("Updated Profile")
                        }).catch(err => {
                            console.log(err.message)
                            commit('setAlertMessage', err.message)
                        })
                }).catch(err => {
                    console.log(err.message)
                    commit('setAlertMessage', err.message)
                })
        },
        signOut({ commit }) {
            firebase.auth().signOut().then(() => {
                commit('setSignedIn',false)
            })
        },
        sendVerification({ commit }) {
            var user = firebase.auth().currentUser;
            user.sendEmailVerification()
                .then(function () {
                    //Email Sent
                    commit('setAlertMessage', `A verification email has been sent to ${user.email}`)
                })
                .catch(function (error) {
                    //An error happened
                })
        }
    }
}
export default AuthModule