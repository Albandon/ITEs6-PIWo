import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, NavLink, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, createContext, useState, useContext } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
function Header() {
  return /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsxs("div", { className: "top", children: [
    /* @__PURE__ */ jsx("div", { className: "top-login", children: /* @__PURE__ */ jsx(NavLink, { className: "top-text", to: "/Login", children: "Zaloguj się" }) }),
    /* @__PURE__ */ jsx("div", { className: "logo", children: /* @__PURE__ */ jsx(NavLink, { to: "/", children: /* @__PURE__ */ jsx("img", { src: "logo.png", className: "logo-image", alt: "Logo" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "top-register", children: /* @__PURE__ */ jsx(NavLink, { className: "top-text", to: "/Register", children: "Zarejestruj się" }) }),
    /* @__PURE__ */ jsxs("div", { className: "cart", children: [
      /* @__PURE__ */ jsx(NavLink, { className: "cart-links", to: "/Cart", children: "Koszyk" }),
      /* @__PURE__ */ jsx(NavLink, { className: "cart-links", to: "/New", children: "Dodaj książkę" })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "footer", children: /* @__PURE__ */ jsx("p", { className: "footer-copyright", children: "2025 LiBeer" }) });
}
const stylesheet = "/assets/app-DpWHUjY6.css";
const BooksContext = createContext();
const BooksProvider = ({ children }) => {
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
    }
  ]);
  return /* @__PURE__ */ jsx(BooksContext.Provider, { value: { booksList, setBooksList }, children });
};
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: stylesheet
}];
function meta$1() {
  return [{
    title: "LiBeer"
  }, {
    name: "opis",
    content: "Księgarnia internetowa"
  }];
}
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "pl",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("main", {
        children
      }), /* @__PURE__ */ jsx(Footer, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(BooksProvider, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const BookItem = ({ book }) => {
  return /* @__PURE__ */ jsxs("div", { className: "book-item", children: [
    /* @__PURE__ */ jsx("div", { className: "book-cover-image", children: /* @__PURE__ */ jsx("img", { src: book.cover, alt: book.title }) }),
    /* @__PURE__ */ jsxs("div", { className: "book-information-main", children: [
      /* @__PURE__ */ jsx("h3", { className: "book-title", children: book.title }),
      /* @__PURE__ */ jsxs("p", { className: "book-author", children: [
        "Autor: ",
        book.author
      ] }),
      /* @__PURE__ */ jsx("p", { className: "book-description", children: book.description })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "book-information-side", children: [
      /* @__PURE__ */ jsxs("button", { className: "book-information-money", children: [
        /* @__PURE__ */ jsx("div", { className: "book-price", children: book.price }),
        /* @__PURE__ */ jsx("div", { className: "book-currency", children: "zł" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "book-page-number", children: [
        book.pages,
        " stron"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "book-down-button-container", children: [
        /* @__PURE__ */ jsx("button", { className: "book-down-button", children: "Edytuj" }),
        /* @__PURE__ */ jsx("button", { className: "book-down-button", children: "Usuń" })
      ] })
    ] })
  ] }, book.id);
};
function BookList({ books }) {
  return /* @__PURE__ */ jsx("div", { className: "book-list-container", children: books.map(
    (book) => /* @__PURE__ */ jsx(BookItem, { book }, book.id)
  ) });
}
function Filters({ setPriceFilter, setCoverFilter, setPageCountFilter, setAuthorFilter, setDescriptionFilter }) {
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    if (id === "filter-price") setPriceFilter(value);
    if (id === "filter-cover") setCoverFilter(value);
    if (id === "filter-page-count") setPageCountFilter(value);
    if (id === "filter-page-Author") setAuthorFilter(value);
    if (id === "filter-page-desc") setDescriptionFilter(value);
  };
  return /* @__PURE__ */ jsxs("div", { className: "filters-bar", children: [
    /* @__PURE__ */ jsx("h2", { className: "filters-header", children: "Filtry" }),
    /* @__PURE__ */ jsxs("div", { className: "filters-bar-filters", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "filter-price", className: "filters", children: "Cena" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "filter-price",
            className: "filters-value",
            type: "number",
            min: "0",
            onBlur: handleFilterChange
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "filter-cover", className: "filters", children: "Okładka" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "filter-cover",
            className: "filters-value",
            onBlur: handleFilterChange,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Wybierz" }),
              /* @__PURE__ */ jsx("option", { value: "soft", children: "Miękka" }),
              /* @__PURE__ */ jsx("option", { value: "hard", children: "Twarda" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "filter-page-count", className: "filters", children: "Ilość stron" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "filter-page-count",
            className: "filters-value",
            type: "number",
            min: "1",
            onBlur: handleFilterChange
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "filter-page-Author", className: "filters", children: "Autor" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "filter-page-Author",
            className: "filters-value",
            type: "search",
            onBlur: handleFilterChange
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "filter-page-desc", className: "filters", children: "Zawarty w opisie" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "filter-page-desc",
            className: "filters-value",
            type: "text",
            onBlur: handleFilterChange
          }
        )
      ] })
    ] })
  ] });
}
function meta() {
  return [{
    title: "LiBeer"
  }, {
    name: "Opis",
    content: "Księgarnia internetowa"
  }];
}
const home = withComponentProps(function Home() {
  const {
    booksList
  } = useContext(BooksContext);
  const [priceFilter, setPriceFilter] = useState("");
  const [coverFilter, setCoverFilter] = useState("");
  const [pageCountFilter, setPageCountFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [query, setQuery] = useState("");
  const filteredBooks = booksList.filter((book) => {
    const matchesPrice = priceFilter === "" || book.price <= priceFilter;
    const matchesCover = coverFilter === "" || book.coverType === coverFilter;
    const matchesPageCount = pageCountFilter === "" || book.pages <= pageCountFilter;
    const matchesAuthor = authorFilter === "" || book.author.toLowerCase().includes(authorFilter.toLowerCase());
    const matchesDescription = descriptionFilter === "" || book.description.toLowerCase().includes(descriptionFilter.toLowerCase());
    const matchesSearchQuery = book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase());
    return matchesPrice && matchesCover && matchesPageCount && matchesAuthor && matchesDescription && matchesSearchQuery;
  });
  return /* @__PURE__ */ jsxs("main", {
    children: [/* @__PURE__ */ jsx("div", {
      className: "announcements-top-bar",
      children: /* @__PURE__ */ jsx("div", {
        className: "search-bar",
        children: /* @__PURE__ */ jsx("input", {
          type: "search",
          placeholder: "Szukasz jakiegoś tytułu?",
          value: query,
          onChange: (e) => setQuery(e.target.value)
        })
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "main-container",
      children: [/* @__PURE__ */ jsx(Filters, {
        setPriceFilter,
        setCoverFilter,
        setPageCountFilter,
        setAuthorFilter,
        setDescriptionFilter
      }), /* @__PURE__ */ jsx(BookList, {
        books: filteredBooks
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function AddBook() {
  const { booksList, setBooksList } = useContext(BooksContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [image, setImage] = useState("");
  const [coverType, setCoverType] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: booksList.length + 1,
      title,
      author,
      description,
      price,
      pageCount,
      cover: image ? URL.createObjectURL(image) : null,
      coverType
    };
    setBooksList((prev) => prev.concat([newBook]));
    setTitle("");
    setAuthor("");
    setDescription("");
    setPrice("");
    setPageCount("");
    setCoverType("");
    setImage(null);
    console.log("Dodano książkę:", newBook);
    console.log(booksList);
  };
  return /* @__PURE__ */ jsxs("div", { className: "main-container-add", children: [
    /* @__PURE__ */ jsx("h1", { className: "view-header", children: "Dodawanie ogłoszenia" }),
    /* @__PURE__ */ jsxs("form", { className: "add-parameters-container", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "book-add-title", className: "add-book-label", children: "Tytuł" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "book-add-title",
            className: "add-book-value",
            type: "text",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "book-add-Author", className: "add-book-label", children: "Autor" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "book-add-Author",
            className: "add-book-value",
            type: "text",
            value: author,
            onChange: (e) => setAuthor(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "book-add-description", className: "add-book-label", children: "Opis" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "book-add-description",
            className: "add-book-value",
            type: "text",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "book-add-price", className: "add-book-label", children: "Cena" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "book-add-price",
            className: "add-book-value",
            type: "number",
            min: "0",
            value: price,
            onChange: (e) => setPrice(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "book-add-page-number", className: "add-book-label", children: "Liczba stron" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "book-add-page-number",
            className: "add-book-value",
            type: "number",
            min: "1",
            value: pageCount,
            onChange: (e) => setPageCount(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "filter-cover", className: "add-book-label", children: "Okładka" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "filter-cover",
            className: "add-book-value",
            value: coverType,
            onChange: (e) => setCoverType(e.target.value),
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Wybierz" }),
              /* @__PURE__ */ jsx("option", { value: "soft", children: "Miękka" }),
              /* @__PURE__ */ jsx("option", { value: "hard", children: "Twarda" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "book-add-title", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "image", className: "add-book-label", children: "Okładka książki:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            className: "add-book-value",
            accept: "image/*",
            onChange: (e) => setImage(e.target.files[0]),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { className: "cart-links", type: "submit", children: "Dodaj książkę" }) })
    ] })
  ] });
}
const _new = withComponentProps(function New() {
  return /* @__PURE__ */ jsx("main", {
    children: /* @__PURE__ */ jsx(AddBook, {})
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _new
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B7mEkZa2.js", "imports": ["/assets/chunk-BAXFHI7N-DRA5_ntC.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BrZl0N2V.js", "imports": ["/assets/chunk-BAXFHI7N-DRA5_ntC.js", "/assets/BooksContext-pEgNFiFK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BKLFOM4F.js", "imports": ["/assets/BooksContext-pEgNFiFK.js", "/assets/chunk-BAXFHI7N-DRA5_ntC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/new": { "id": "routes/new", "parentId": "root", "path": "new", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/new-CtzYv1q2.js", "imports": ["/assets/BooksContext-pEgNFiFK.js", "/assets/chunk-BAXFHI7N-DRA5_ntC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-fd0b77c2.js", "version": "fd0b77c2", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/new": {
    id: "routes/new",
    parentId: "root",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
