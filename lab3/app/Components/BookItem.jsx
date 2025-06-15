import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useContext } from "react";
import { BooksContext } from "../Context/BooksContext";
import { CartContext } from "../Context/CartContext";

export default function BookItem({ book, onEdit, onDelete }) {
    const { user } = useContext(BooksContext);
    const { cart, dispatch } = useContext(CartContext);
    const inCart = cart.some(item => item.id === book.id);

    const handleDelete = async () => {
        const bookDoc = doc(firestore, "books", book.id);
        await deleteDoc(bookDoc);
        if (onDelete) onDelete();
    };

    return (
        <div className="book-item" key={book.id}>
            <div className="book-cover-image">
                {book.cover && <img src={book.cover} alt="Okładka"/>}
            </div>
            <div className="book-information-main">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">Autor: {book.author}</p>
                <p className="book-description">{book.description}</p>
            </div>
            <div className="book-information-side">
                <div className="book-information-money">
                    <div className="book-price">{book.price}</div>
                    <div className="book-currency" style={{ marginLeft: 4 }}>zł</div>
                </div>
                <div className="book-page-number">{book.pages} stron</div>
                <button
                    className="book-down-button"
                    style={{ marginTop: "0.5em", background: inCart ? "#ccc" : "#ffeb3b" }}
                    disabled={inCart}
                    onClick={() => dispatch({ type: "ADD_TO_CART", book })}
                >
                    {inCart ? "W koszyku" : "Dodaj do koszyka"}
                </button>
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