import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, getDocs,setDoc,doc} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

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

const container = document.querySelector('#container')

const favorites = []

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${event.target.name.value}`)
        .then(res => res.json())
        .then(async() => {
            const checkFavorites = await getDocs(doc(db,'favorites','user1')) || []
            container.innerHTML = ``




            res.Search.forEach(e => {
                const article = document.createElement('article')
                article.innerHTML = ` 
                                    <img src="${e.Poster}" alt="" class="h-[321px] mb-2">
                                    <p>${e.Title}</p>
                                    <div class="flex gap-1 justify-between">
                                        <p>${e.Year}</p>
                                        <i class="fa-regular fa-heart absolute right-5 hover:scale-125 transition duration-300 z-10" ></i>
                                    </div>
                                `

                article.children[0].addEventListener('click', () => window.open(`/pages/movie.html?i=${e.imdbID}`,'_self'))
                article.classList.add('relative' ,'w-60', 'rounded-xl', 'bg-slate-900', 'p-3', 'text-white', 'cursor-pointer')

                const heartIcon = article.children[2].children[1]

                heartIcon.addEventListener('click', async() => {

                    heartIcon.classList.toggle('fa-solid')
                    heartIcon.classList.toggle('fa-regular')

                    if (heartIcon.className.includes('fa-solid')) {
                        favorites.push(e)
                        await setDoc(doc(db, "favorites","user1"),{favorites});
                        
                        console.log(favorites);
                    } else {
                        console.log('no fav');
                    }
                })

                container.append(article)
            }
            )
        })
})

