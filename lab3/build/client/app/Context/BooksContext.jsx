import { createContext, useState } from 'react';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [booksList, setBooksList] = useState([
        {
            id: 1,
            title: "Ostatnie życzenie. Wiedźmin. Tom 1",
            author: "Andrzej Sapkowski",
            description: "Wiedźmin to mistrz miecza...",
            price: 33,
            pages: 246,
            cover: "Wiedźmin.jpg",
            coverType: "hard"
        },
        {
            id: 2,
            title: "Książka 2",
            author: "Autor 2",
            description: "Opis książki 2",
            price: 25,
            pages: 300,
            cover: "Wiedźmin.jpg",
            coverType: "soft"
        },
    ]);

    return (
        <BooksContext.Provider value={{ booksList, setBooksList}}>
            {children}
        </BooksContext.Provider>
    );
};
