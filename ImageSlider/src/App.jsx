import { useEffect } from "react";
import { useState } from "react";

const baseURL = "http://picsum.photos/v2/list";
const limit = 10;

function App() {
  const [imageData, setImageData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  async function fetchImage(url) {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}?page=1&limit=${limit}`);
      const resData = await response.json();

      if (resData) {
        setImageData(resData);
        setIsLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchImage(baseURL);
  }, []);

  if (isLoading) {
    return <h1>Fetching data! please wait .....</h1>;
  }

  if (error) {
    return (
      <>
        <h1>Opsss!!</h1>
        <p>There is an error, please try again later.</p>
      </>
    );
  }

  console.log(selectedImage);

  function handleLeft() {
    setSelectedImage(
      selectedImage === imageData.length - 1 ? 0 : selectedImage + 1
    );
  }
  function handleRight() {
    setSelectedImage(
      selectedImage === 0 ? imageData.length - 1 : selectedImage - 1
    );
  }

  return (
    <>
      <div className="container">
        <i className="fa-solid fa-angle-left" onClick={handleRight}></i>
        <div className="img_container">
          {imageData.map((image, index) => (
            <img
              key={index}
              className={selectedImage === index ? "image" : "image hide-image"}
              src={image.download_url}
              alt={image.author}
            />
          ))}
        </div>
        <i className="fa-solid fa-angle-right" onClick={handleLeft}></i>
        <div className="image_indicator">
          {imageData.map((image, index) => {
            return (
              <button
                key={index}
                className={selectedImage === index ? "btn_active" : undefined}
              ></button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
