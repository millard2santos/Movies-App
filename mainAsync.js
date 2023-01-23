import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

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


const apiKey = 'aa64160e'

document.querySelector('form').addEventListener('submit', async (event) => {
    
    event.preventDefault()
    

    const fetchResults = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${event.target.name.value}`)
    const peliculas = await fetchResults.json()

    
    let favorites = await getDoc(doc(db, 'favorites', 'user1'))

    if(favorites.exists()){
        favorites = favorites.data().favorites
        console.log('existe');
    }else{
        favorites = []
    }
    console.log(favorites);
    peliculas.Search.forEach(pelicula => {
        
        let heart = 'fa-regular'
        if(favorites.find(e=> e.imdbID === pelicula.imdbID)){
            heart = 'fa-solid'
        }
        

        const article = document.createElement('article')
        article.innerHTML = ` 
                            <img src="${pelicula.Poster}" alt="" class="h-[321px] mb-2">
                            <p>${pelicula.Title}</p>
                            <div class="flex gap-1 justify-between">
                                <p>${pelicula.Year}</p>
                                <i class="${heart} fa-heart absolute right-5 hover:scale-125 transition duration-300 z-10" ></i>
                            </div>
                                `

        article.children[0].addEventListener('click', () => window.open(`/pages/movie.html?i=${pelicula.imdbID}`, '_self'))
        article.classList.add('relative', 'w-60', 'rounded-xl', 'bg-slate-900', 'p-3', 'text-white', 'cursor-pointer')

        const heartIcon = article.children[2].children[1]

        heartIcon.addEventListener('click', async () => {

            heartIcon.classList.toggle('fa-solid')
            heartIcon.classList.toggle('fa-regular')

            if(heartIcon.className.includes('fa-solid')){
                favorites.push(pelicula)
                setDoc(doc(db,'favorites','user1'),{favorites})

                
            }else{
                favorites.splice(favorites.findIndex(e => e.imdbID === pelicula.imdbID),1)
                
                setDoc(doc(db,'favorites','user1'),{favorites})
            }
            
        })

        container.append(article)
    })



})
