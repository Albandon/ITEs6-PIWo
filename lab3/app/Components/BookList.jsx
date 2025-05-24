import { useState, useContext } from "react";
import { BooksContext } from "../Context/BooksContext";
import BookItem from "./BookItem";
import EditBook from "./EditBook";

export default function BookList({ books }) {
    const { user, showMine, setShowMine, getBookList } = useContext(BooksContext);
    const [editingBook, setEditingBook] = useState(null);

    return (
        <div className="book-list-container">
            {user && (
                <button onClick={() => setShowMine(m => !m)}>
                    {showMine ? "Pokaż wszystkie" : "MOJE"}
                </button>
            )}
            {books.map((book) => (
                <BookItem key={book.id} book={book} onDelete={getBookList} onEdit={setEditingBook} />
            ))}
            {editingBook && (
                <div className="modal-backdrop" onClick={() => setEditingBook(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <EditBook
                            book={editingBook}
                            onClose={() => setEditingBook(null)}
                            onSave={getBookList}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}