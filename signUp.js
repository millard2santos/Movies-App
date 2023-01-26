import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, query, where } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'


const firebaseConfig = {
    apiKey: "AIzaSyDEIGj6mYxYpVCfwQSA8GwqS1IapNyCRBA",
    authDomain: "moviesapp-57fbb.firebaseapp.com",
    projectId: "moviesapp-57fbb",
    storageBucket: "moviesapp-57fbb.appspot.com",
    messagingSenderId: "375122766805",
    appId: "1:375122766805:web:0022256383df155f60eb5c"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

const printSignUp = () => {
    const div = document.createElement('div')
    div.innerText = 'Your account has been created successfully'
    document.body.append(div)
} 

document.querySelector('form').addEventListener('submit', async(event) => {
    event.preventDefault()

    const user = await createUserWithEmailAndPassword(auth, event.target.email.value, event.target.password.value).then(res => res.user)
    console.log(user);
    document.querySelector('form').reset()
    printSignUp()
    setTimeout( () => {
        const nuevaVentana = window.open(`index.html`)
    },2000)
})