import { useContext, useState, useEffect } from "react";
import BookList from "../Components/BookList";
import Filters from "../Components/Filters";
import { BooksContext } from "../Context/BooksContext";

export function meta() {
  return [
    { title: "LiBeer" },
    { name: "Opis", content: "Księgarnia internetowa" },
  ];
}

export default function Home() {
  const { booksList } = useContext(BooksContext);

  const [priceFilter, setPriceFilter] = useState('');
  const [coverFilter, setCoverFilter] = useState('');
  const [pageCountFilter, setPageCountFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [query, setQuery] = useState('');

  const filteredBooks = booksList.filter((book) => {
    const matchesPrice = priceFilter === '' || book.price <= priceFilter;
    const matchesCover = coverFilter === '' || book.coverType === coverFilter;
    const matchesPageCount = pageCountFilter === '' || book.pages <= pageCountFilter;
    const matchesAuthor = authorFilter === '' || book.author.toLowerCase().includes(authorFilter.toLowerCase());
    const matchesDescription = descriptionFilter === '' || book.description.toLowerCase().includes(descriptionFilter.toLowerCase());
    const matchesSearchQuery = book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase());

    return matchesPrice && matchesCover && matchesPageCount && matchesAuthor && matchesDescription && matchesSearchQuery;
  });

  return (
    <main>
      <div className="announcements-top-bar">
        <div className="search-bar">
          <input
            type="search"
            placeholder="Szukasz jakiegoś tytułu?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="main-container">
        <Filters 
          setPriceFilter={setPriceFilter}
          setCoverFilter={setCoverFilter}
          setPageCountFilter={setPageCountFilter}
          setAuthorFilter={setAuthorFilter}
          setDescriptionFilter={setDescriptionFilter}
        />
        <BookList books={filteredBooks} />
      </div>
    </main>
  );
}
