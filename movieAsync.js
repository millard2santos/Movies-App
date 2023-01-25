import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, getDocs, setDoc, getDoc,doc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

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


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const peliculaID = urlParams.get('i')
const peliculaTitle = urlParams.get('t')



const fetchAsync = (url) => {
    return fetch(url).then(res => res.json()).then(data => data)

    // let favorites = await getDoc(doc(db, 'favorites', 'user1'))



    // if(favorites.exists()){
    //     favorites = favorites.data().favorites
    //     console.log('existe');
    // }else{
    //     favorites = []
    // }



    // let heart = 'fa-regular'
    //     if(favorites.find(e=> e.imdbID === movie.imdbID)){
    //         heart = 'fa-solid'
    //     }


    //     const article = document.createElement('article')
    //     article.innerHTML = `
    //                         <img src="${movie.Poster}" alt="" class="h-[321px] mb-2">
    //                         <p>${movie.Title}</p>
    //                         <div class="flex gap-1 justify-between">
    //                             <p>${movie.Year}</p>
    //                             <i class="${heart} fa-heart absolute right-5 hover:scale-125 transition duration-300 z-10" ></i>
    //                         </div>
    //                             `


    //     article.classList.add('relative', 'w-60', 'rounded-xl', 'bg-slate-900', 'p-3', 'text-white', 'cursor-pointer', 'hover:scale-105', 'transition', 'duration-300')

    //     const heartIcon = article.children[2].children[1]

    //     heartIcon.addEventListener('click', async () => {

    //         heartIcon.classList.toggle('fa-solid')
    //         heartIcon.classList.toggle('fa-regular')

    //         if(heartIcon.className.includes('fa-solid')){
    //             favorites.push(movie)
    //             setDoc(doc(db,'favorites','user1'),{favorites})


    //         }else{
    //             favorites.splice(favorites.findIndex(e => e.imdbID === movie.imdbID),1)

    //             setDoc(doc(db,'favorites','user1'),{favorites})
    //         }

    //     })

    //     container.append(article)
}

const printMovie = async(movie) => {
    console.log(movie);
    const divInfo = document.querySelector('.info')
    divInfo.children[0].children[0].innerText = movie.Title
    divInfo.children[1].children[0].innerText = movie.Year
    divInfo.children[2].children[0].innerText = movie.Runtime + 'min'
    divInfo.children[3].children[0].innerText = movie.Director
    divInfo.children[4].children[0].innerText = movie.Plot





    let favorites = await getDoc(doc(db, 'favorites', 'user1'))

    if(favorites.exists()){
        favorites = favorites.data().favorites
        console.log('existe');
    }else{
        favorites = []
    }



    let heart = 'fa-regular'
        if(favorites.find(e=> e.imdbID === movie.imdbID)){
            heart = 'fa-solid'
        }


        const article = document.createElement('article')
        article.innerHTML = `
                            <img src="${movie.Poster}" alt="" class="h-[321px] mb-2">
                            <p>${movie.Title}</p>
                            <div class="flex gap-1 justify-between">
                                <p>${movie.Year}</p>
                                <i class="${heart} fa-heart absolute right-5 hover:scale-125 transition duration-300 z-10" ></i>
                            </div>
                                `


        article.classList.add('relative', 'w-60', 'rounded-xl', 'bg-slate-900', 'p-3', 'text-white', 'cursor-pointer', 'hover:scale-105', 'transition', 'duration-300')

        const heartIcon = article.children[2].children[1]

        heartIcon.addEventListener('click', async () => {

            heartIcon.classList.toggle('fa-solid')
            heartIcon.classList.toggle('fa-regular')

            if(heartIcon.className.includes('fa-solid')){
                favorites.push(movie)
                setDoc(doc(db,'favorites','user1'),{favorites})


            }else{
                favorites.splice(favorites.findIndex(e => e.imdbID === movie.imdbID),1)

                setDoc(doc(db,'favorites','user1'),{favorites})
            }

        })

        container.append(article)
}

getDoc(doc(db,'movies', `${peliculaTitle}`)).then(async(res) => {
    if(res.exists()){
        printMovie(res.data())
    }else{
        fetchAsync(`http://www.omdbapi.com/?apikey=${apiKey}&i=${peliculaID}`)
        .then(res=> printMovie(res))
    }
})

