import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, getDocs, getDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

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


const movieCreatedPrint = () => {
    const h2 = document.createElement('h2')
    h2.innerText = 'Your movie has been created!'
    h2.classList.add('font-semibold', 'text-4xl', 'text-center')
    document.body.append(h2)
}

const imdbCreate = () => {
    const chars = 'abcdefghi0123456789'
    
    let password = ''
    for (let i = 0; i < 8; i++) {
        password += chars[Math.floor(Math.random() * chars.length)]
    }
    return password
}

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const movie = {
        Title: event.target.Title.value,
        Year: event.target.Year.value,
        Poster: event.target.Poster.value,
        imdbID: imdbCreate(),
        Runtime: event.target.runtime.value + ' min',
        Director: event.target.director.value,
        Plot: event.target.plot.value
    }

    try {
        await setDoc(doc(db, 'movies', `${movie.Title}`), movie)
        movieCreatedPrint()
    } catch (error) {
        console.log(error);
    }

    document.querySelector('form').reset()

})
