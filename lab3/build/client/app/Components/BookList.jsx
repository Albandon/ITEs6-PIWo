import { useContext } from "react";
import { BooksContext } from "../Context/BooksContext";
import BookItem from "./BookItem";

export default function BookList({ books }) {
    return (
        <div className="book-list-container">
            {books.map((book) =>
                (<BookItem key={book.id} book={book}/>)
            )}
        </div>
    )
}