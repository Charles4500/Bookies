const baseUrl = 'http://localhost:3000/books';

document.addEventListener('DOMContentLoaded', () => {
  fetchBooks();
  const form = document.querySelector('#search-form');
  form.addEventListener('submit' , (event) => {

    event.preventDefault()
    const input = document.querySelector('#search')
    if (input.value) {
      fetchCocktails(input.value);
    }
  });
});

function fetchBooks(searchResult = '') {
  fetch(`${baseUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((books) => {
     
      document.querySelector('#books').innerHTML = '';
      
      if (searchResult) {
       


         books
            .filter((books) =>
            books.title.toLowerCase()
                  .includes(searchResult.toLowerCase())
            )
     .forEach((books) => renderBooks(books));
    } else {
        books.forEach((books) => renderBooks(books));
      }
    })   
    .catch((err) => console.log(err));
}

function renderBooks(books) {
  const bookContainer = document.querySelector('#books');
  const booksList = document.createElement('div');
  booksList.classList.add('card')

  const image = document.createElement('img');
  image.classList.add('card-img-top', 'mt-2');
  image.height = 200;
  image.src = books.imageLink;
  image.alt = books.title;
  image.style.display = 'block';
  image.style.unicodeBidi = 'isolate';

  booksList.appendChild(image);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = books.title;

  const description = document.createElement('p');
  description.classList.add('card-text');
  description.textContent = books.shortDescription;

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Order Now';

  
  cardBody.append(title, description, button);
  booksList.appendChild(cardBody);


  bookContainer.appendChild(booksList);

}
