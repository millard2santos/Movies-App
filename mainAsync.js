import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, query, where } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

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
// const ui = new firebaseui.auth.AuthUI(firebase.auth());


const apiKey = 'aa64160e'

document.querySelector('form').addEventListener('submit', async (event) => {

    
    event.preventDefault()
    container.innerHTML= ``
    
    const peliculas = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${event.target.name.value}`).then(res => res.json()).catch(err => console.log(err)) || []
    let favorites = await getDoc(doc(db, 'favorites', 'user1'))
    let moviesCreated = await getDocs(collection(db, "movies")).then(res => {
        let movies = []
        res.forEach( e=> movies.push(e.data()))
     
        return movies
    })
    .then(res => res.filter(e=> e.Title === event.target.name.value ))
    
    console.log(moviesCreated);
    console.log(peliculas);
    if(favorites.exists()){
        favorites = favorites.data().favorites
        console.log('existe');
    }else{
        favorites = []
    }



    let fullSearch = moviesCreated.concat(peliculas.Search)
    console.log(fullSearch.length);
    console.log(fullSearch.includes(undefined));
    if((fullSearch.length <= 0) || fullSearch.includes(undefined)){
        const h3 = document.createElement('h3')
        h3.innerText = 'We cannot find the movie :('
        h3.classList.add('font-semibold','text-xl')
        container.append(h3)
        return
    } 
    
    fullSearch.forEach(pelicula => {
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



        if(pelicula.imdbID === peliculas.Search.find(e=> e.imdbID === pelicula.imdbID)?.imdbID){
            article.children[0].addEventListener('click', () => window.open(`/pages/movie.html?i=${pelicula.imdbID}`, '_self'))
        }else{
            article.children[0].addEventListener('click', () => window.open(`/pages/movie.html?t=${pelicula.Title}`, '_self'))
        }


        article.classList.add('relative', 'w-60', 'rounded-xl', 'bg-slate-900', 'p-3', 'text-white', 'cursor-pointer', 'hover:scale-105', 'transition', 'duration-300')

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

