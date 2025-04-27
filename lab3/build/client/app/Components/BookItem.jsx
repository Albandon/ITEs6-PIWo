export default ({ book }) => {
    return (
        <div className="book-item" key={book.id}>
            <div className="book-cover-image">
                <img src={book.cover} alt={book.title} />
            </div>
            <div className="book-information-main">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">Autor: {book.author}</p>
                <p className="book-description">{book.description}</p>
            </div>
            <div className="book-information-side">
                <button className="book-information-money">
                    <div className="book-price">{book.price}</div>
                    <div className="book-currency">zł</div>
                </button>
                <div className="book-page-number">{book.pages} stron</div>
                <div className="book-down-button-container">
                    <button className="book-down-button">Edytuj</button>
                    <button className="book-down-button">Usuń</button>
                </div>
            </div>
        </div>
    );
}