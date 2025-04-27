import { useState } from "react";

export default function Filters({ setPriceFilter, setCoverFilter, setPageCountFilter, setAuthorFilter, setDescriptionFilter }) {
  const handleFilterChange = (e) => {
    const { id, value } = e.target;

    if (id === "filter-price") setPriceFilter(value);
    if (id === "filter-cover") setCoverFilter(value);
    if (id === "filter-page-count") setPageCountFilter(value);
    if (id === "filter-page-Author") setAuthorFilter(value);
    if (id === "filter-page-desc") setDescriptionFilter(value);
  };

  return (
    <div className="filters-bar">
      <h2 className="filters-header">Filtry</h2>
      <div className="filters-bar-filters">
        <div>
          <label htmlFor="filter-price" className="filters">Cena</label>
          <input
            id="filter-price"
            className="filters-value"
            type="number"
            min="0"
            onBlur={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="filter-cover" className="filters">Okładka</label>
          <select
            id="filter-cover"
            className="filters-value"
            onBlur={handleFilterChange}
          >
            <option value="">Wybierz</option>
            <option value="soft">Miękka</option>
            <option value="hard">Twarda</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter-page-count" className="filters">Ilość stron</label>
          <input
            id="filter-page-count"
            className="filters-value"
            type="number"
            min="1"
            onBlur={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="filter-page-Author" className="filters">Autor</label>
          <input
            id="filter-page-Author"
            className="filters-value"
            type="search"
            onBlur={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="filter-page-desc" className="filters">Zawarty w opisie</label>
          <input
            id="filter-page-desc"
            className="filters-value"
            type="text"
            onBlur={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}