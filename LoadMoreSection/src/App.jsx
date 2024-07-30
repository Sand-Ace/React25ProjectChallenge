import { useEffect, useState, useRef } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const hasFetchedInitially = useRef(false);
  const [category, setCategory] = useState("");
  const [filteredProducts, setFilterProducts] = useState([]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      const resData = await response.json();

      if (resData && resData.products && resData.products.length) {
        setProducts((prevProducts) => {
          const newProducts = resData.products.filter(
            (product) => !prevProducts.some((p) => p.id === product.id)
          );
          return [...prevProducts, ...newProducts];
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!hasFetchedInitially.current) {
      fetchProducts();
      hasFetchedInitially.current = true;
    }
  }, []);

  function handleSearchInputChange(event) {
    const searchText = event.target.value.toLowerCase();
    setCategory(searchText);

    setFilterProducts(() => {
      return products.filter(
        (product) =>
          product.title.toLowerCase().includes(category) ||
          product.category.toLowerCase().includes(category)
      );
    });
  }

  console.log(products);

  useEffect(() => {
    if (hasFetchedInitially.current) {
      fetchProducts();
    }
  }, [count]);

  function handleLoadMore() {
    setCount((prevCount) => prevCount + 1);
  }

  if (loading && products.length === 0) {
    return <p className="fallback-text">Fetching Data please wait ....</p>;
  }

  return (
    <>
      <header>
        <h1>This is demo project</h1>
      </header>
      <section className="items-category">
        <h2>Available Items</h2>
        <input
          type="text"
          placeholder="Search"
          className="search_input"
          onChange={(e) => handleSearchInputChange(e)}
        />

        <ul className="items">
          {(filteredProducts.length > 0 ? filteredProducts : products).map(
            (product) => (
              <li key={product.id} className="single_item">
                <button>
                  <img src={product.thumbnail} alt={product.description} />
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                </button>
              </li>
            )
          )}
        </ul>

        {products.length === 100 && <p>You have viewed all items.</p>}
        <button
          disabled={products.length === 100}
          className="loadmore_btn"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </section>
    </>
  );
}

export default App;
