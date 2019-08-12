import firebase from 'firebase';

const FileModule = {
    state: {
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png",
        files: null
    },
    getters: {
        image_url: state => state.image_url,
        files: state => state.files
    },
    mutations: {
        setImageURL(state, payload) {
            state.image_url = payload
        },
        setFiles(state, payload) {
            state.files = payload
        }
    },
    actions: {
        readFile({ commit }) {
            const files = event.target.files;
            commit('setFiles', files)
            const fileReader = new FileReader();
            let file = files[0]
            if (file['size'] < 200000) {
                fileReader.readAsDataURL(file)
                fileReader.addEventListener('load', () => {
                    var imageUrl = fileReader.result;
                    commit('setImageURL', imageUrl)
                })
            } else {
                commit('setAlertMessage', 'The image size is greater than 200KB')
                return
            }

        }
    }
}
export default FileModule