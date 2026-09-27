import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const images = [
  {
    id: 1,
    title: "Mountain Escape",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1500534623283-312aade485b7"
  },
  {
    id: 2,
    title: "Beautiful Beach",
    category: "Travel",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    id: 3,
    title: "Deep Forest",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b"
  },
  {
    id: 4,
    title: "Modern City",
    category: "City",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
  },
  {
    id: 5,
    title: "Peaceful Lake",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1439853949127-fa647821eba0"
  },
  {
    id: 6,
    title: "Road Trip",
    category: "Travel",
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredImages = images.filter((image) => {
    const searchMatch = image.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || image.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <div className="page">

      <header>
        <p className="small-title">EXPLORE • DISCOVER • CAPTURE</p>
        <h1>Visual <span>Gallery</span></h1>
        <p className="description">
          Discover beautiful moments from nature, travel and city life.
        </p>
      </header>

      <div className="controls">

        <input
          type="text"
          placeholder="Search images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="categories">
          {["All", "Nature", "Travel", "City"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

      </div>

      <div className="gallery">

        {filteredImages.map((image) => (
          <div
            className="card"
            key={image.id}
            onClick={() => setSelected(image)}
          >
            <img src={image.url} alt={image.title} />

            <div className="overlay">
              <span>{image.category}</span>
              <h2>{image.title}</h2>
              <p>View image →</p>
            </div>
          </div>
        ))}

      </div>

      {filteredImages.length === 0 && (
        <p className="no-results">No images found.</p>
      )}

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>

          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <img src={selected.url} alt={selected.title} />

            <h2>{selected.title}</h2>
            <p>{selected.category}</p>
          </div>

        </div>
      )}

    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(<App />);