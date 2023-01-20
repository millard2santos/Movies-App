const apiKey = 'aa64160e'


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pelicula = urlParams.get('t')


fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${pelicula}`)
.then(res => res.json())
.then(res => {
    const div = document.createElement('div')
                div.innerHTML = ` 
                                    <img src="${res.Poster}" alt="">
                                    <p>${res.Year}</p>
                                    <p>${res.Title}</p>
                                `

                document.body.append(div)
            
})

