import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, getDocs, setDoc, getDoc, doc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

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

const container = document.querySelector('#container')

const printFavorites = async () => {

    let favorites = await getDoc(doc(db, 'favorites', 'user1'))

    let moviesCreated = await getDocs(collection(db, "movies")).then(res => {
        let movies = []
        res.forEach( e=> movies.push(e.data()))
     
        return movies
    })
    console.log(moviesCreated);
    if (favorites.exists()) {
        favorites = favorites.data().favorites
        console.log('existe');
    } else {
        favorites = []
        console.log('No tienes peliculas Favoritas');
    }


    favorites.forEach(pelicula => {
        console.log(pelicula);
        const article = document.createElement('article')
        article.innerHTML = ` 
                            <img src="${pelicula.Poster}" alt="" class="h-[321px] mb-2">
                            <p>${pelicula.Title}</p>
                            <div class="flex gap-1 justify-between">
                                <p>${pelicula.Year}</p>
                                <i class="fa-solid fa-heart absolute right-5 hover:scale-125 transition duration-300 z-10" ></i>
                            </div>
                                `

        if (pelicula.imdbID === moviesCreated.find(e=> e.imdbID === pelicula.imdbID)?.imdbID) {
            console.log('YEEES');
            article.children[0].addEventListener('click', () => window.open(`/pages/movie.html?t=${pelicula.Title}`, '_self'))
        } else {
            article.children[0].addEventListener('click', () => window.open(`/pages/movie.html?i=${pelicula.imdbID}`, '_self'))
        }
        article.classList.add('relative', 'w-60', 'rounded-xl', 'bg-slate-900', 'p-3', 'text-white', 'cursor-pointer', 'hover:scale-105', 'transition', 'duration-300', 'h-[430px]')

        const heartIcon = article.children[2].children[1]

        heartIcon.addEventListener('click', async () => {

            heartIcon.classList.toggle('fa-solid')
            heartIcon.classList.toggle('fa-regular')

            if (heartIcon.className.includes('fa-solid')) {
                favorites.push(pelicula)
                setDoc(doc(db, 'favorites', 'user1'), { favorites })


            } else {
                favorites.splice(favorites.findIndex(e => e.imdbID === pelicula.imdbID), 1)
                article.classList.add('hidden')
                setDoc(doc(db, 'favorites', 'user1'), { favorites })
            }

        })

        container.append(article)
    })
}

printFavorites()



