const apiKey = 'aa64160e'



const favorites = []

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${event.target.name.value}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            res.Search.forEach(e => {
                const div = document.createElement('div')
                div.innerHTML = ` 
                                    <img src="${e.Poster}" alt="">
                                    <p>${e.Year}</p>
                                    <p>${e.Title}</p>
                                    <button>Favorite</button>
                                `

                
                div.children[3].addEventListener('click', () => {
                    console.log('hola');
                    const movieFound = favorites.findIndex(k=> k.Title === e.Title)

                    if(movieFound === -1){
                        favorites.push(e)
                        localStorage.setItem('favorites', JSON.stringify(favorites))
                    }
                    window.open(`/pages/movie.html?t=${e.Title}`)
                })
                // a.href = `/pages/movie.html?t=${e.Title}`
                document.querySelector('#container').append(div)
            }
            )
        })
})

