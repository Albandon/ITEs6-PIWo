import { useContext, useState } from "react";
import { BooksContext } from "../Context/BooksContext";
import { addDoc, collection } from "firebase/firestore";
import { firestore, auth } from "../../config/firebase";

export default function AddBook() {
    const { booksList, setBooksList } = useContext(BooksContext);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [pages, setPages] = useState('');
    const [image, setImage] = useState('');
    const [coverType, setCoverType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = {
            title,
            author,
            description,
            price,
            pages,
            // cover: image ? URL.createObjectURL(image) : null,
            cover: '/witcher.jpg',
            coverType,
        };
        setBooksList((prev) => prev.concat([newBook]))

        setTitle("");
        setAuthor("");
        setDescription("");
        setPrice("");
        setPages("");
        setCoverType("");

        setImage(null);

        console.log("Dodano książkę:", newBook);
        console.log(booksList);

        const handleAddBook = async (bookData) => {
            const user = auth.currentUser;
            await addDoc(collection(firestore, "books"), {
                ...bookData,
                userId: user ? user.uid : null,
            });
        };

        handleAddBook(newBook);
    };
    return (
        <div className="main-container-add">
            <h1 className="view-header">Dodawanie ogłoszenia</h1>
            <form className="add-parameters-container" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="book-add-title" className="add-book-label">Tytuł</label>
                    <input
                        id="book-add-title"
                        className="add-book-value"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="book-add-Author" className="add-book-label">Autor</label>
                    <input
                        id="book-add-Author"
                        className="add-book-value"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="book-add-description" className="add-book-label">Opis</label>
                    <input
                        id="book-add-description"
                        className="add-book-value"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="book-add-price" className="add-book-label">Cena</label>
                    <input
                        id="book-add-price"
                        className="add-book-value"
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="book-add-page-number" className="add-book-label">Liczba stron</label>
                    <input
                        id="book-add-page-number"
                        className="add-book-value"
                        type="number"
                        min="1"
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="filter-cover" className="add-book-label">Okładka</label>
                    <select
                        id="filter-cover"
                        className="add-book-value"
                        value={coverType}
                        onChange={(e) => setCoverType(e.target.value)}
                        required
                    >
                        <option value="">Wybierz</option>
                        <option value="soft">Miękka</option>
                        <option value="hard">Twarda</option>
                    </select>
                </div>
                <div className="book-add-title">
                    <label htmlFor="image" className="add-book-label">Okładka książki:</label>
                    <input
                        type="file"
                        className="add-book-value"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div>
                    <button className="cart-links" type="submit">Dodaj książkę</button>
                </div>
            </form>
        </div>
    );
};