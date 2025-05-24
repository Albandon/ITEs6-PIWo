import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useContext } from "react";
import { BooksContext } from "../Context/BooksContext";

export default function BookItem({ book, onEdit, onDelete }) {
    const { user } = useContext(BooksContext);

    const handleDelete = async () => {
        const bookDoc = doc(firestore, "books", book.id);
        await deleteDoc(bookDoc);
        if (onDelete) onDelete();
    };

    return (
        <div className="book-item" key={book.id}>
            <div className="book-cover-image">
                {book.cover && <img src={book.cover} alt="Okładka" style={{maxWidth: 120}} />}
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
                {user && book.userId === user.uid && (
                    <div className="book-down-button-container">
                        <button className="book-down-button" onClick={() => onEdit(book)}>Edytuj</button>
                        <button className="book-down-button" onClick={handleDelete}>Usuń</button>
                    </div>
                )}
            </div>
        </div>
    );
}