import { useContext, useState } from 'react';
import { BooksContext } from '../Context/BooksContext';
import AddBook from '../Components/AddBook';

export default function New() {
    return (
        <main>
            <AddBook/>
        </main>
    )
}