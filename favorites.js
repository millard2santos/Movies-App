const movies = JSON.parse(localStorage.getItem('favorites'))

const div = document.createElement('div')
div.innerHTML = ` 
                <img src="${movies[0].Poster}" alt="">
                <p>${movies[0].Year}</p>
                <p>${movies[0].Title}</p>
                `
console.log(movies[0]);
document.querySelector('#container').append(div)