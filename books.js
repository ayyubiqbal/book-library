const loadData = () => {
    const searchField = document.getElementById('input-box');
    const searchText = searchField.value;
    // clear search box
    searchField.value = '';
    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.docs))
}

const displayData = (books) => {
    const searchResult = document.getElementById('search-result');
    // clear previous result 
    searchResult.textContent = '';

    // Total Books Number
    const bookNumber = books.length;
    const booksNumberShow = document.getElementById('books-number');
    booksNumberShow.innerText = bookNumber;

    // error text showing
    if (books.length === 0) {
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
        <h2 class="card-title">No result found</h2>  
        `;
        searchResult.appendChild(div)
    }

    // search result 
    else {
        books.forEach(book => {
            const div = document.createElement('div')
            div.classList.add('col');
            const img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            div.innerHTML = `
                    <div  class="card h-100">
                        
                        <div class="card-body">
                        <img src="${img}" class="card-img-top" alt="...">
                            <h5 class="card-title">Book Name: ${book.title}</h5>
                            <p class="card-text">Author: ${book.author_name}</p>
                            <p class="card-text">first publish year: ${book.first_publish_year}</p>
                            <p class="card-text">publisher: ${book.publisher}</p>
                        </div>
                     </div>`;
            searchResult.appendChild(div);
        })
    }
}