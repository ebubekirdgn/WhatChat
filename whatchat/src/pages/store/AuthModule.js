import firebase from 'firebase';

const AuthModule = {
    state: {
        signed_up: false
    },
    getters: {
        signed_up: state => state.signed_up
    },
    mutations: {
        setSignedUp(state, payload) {
            state.signed_up = payload
        }
    },
    actions: {
        signUp({ commit }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(data => {
                    firebase.database().ref('users').child(data.user.uid).set({
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
                            commit('setSignedUp',true)
                            console.log("Updated Profile")
                        }).catch(err => {
                            console.log(err.message)
                            commit('setAlertMessage', err.message)
                        })
                }).catch(err => {
                    console.log(err.message)
                    commit('setAlertMessage', err.message)
                });
        }
    }
}
export default AuthModule