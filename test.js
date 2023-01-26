await fetch('https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=156de9a632e94cfb9b9a113793c69ef8').then(res => res.json()).then(res => console.log(res))



const movies = await fetch('https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&api_key=156de9a632e94cfb9b9a113793c69ef8').then(res => res.json()).then(res => res.results)


const api = '156de9a632e94cfb9b9a113793c69ef8'


movies.forEach( e => {
    console.log();
    const div = document.createElement('div')
div.innerHTML = `<div>
                    <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="">
                    <p>Fecha:${e.release_date.replace(/-/g,' ')}</p>
                    <p>Nombre: ${e.title}</p>
                </div>`

    document.querySelector('#container').append(div)
})

