import "./App.css";
import { lazy, useState, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
const Card = lazy(() => import("./components/card.jsx"));
const CardLoader = lazy(() => import("./components/cardLoader.jsx"));
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);

  const loadMoreArticles = async (category = "general") => {
    try {
      setTimeout(async () => {
        const url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`;
        const response = await fetch(url);
        const newData = await response.json();
        const currentDataLength = data.length;
        const nextArticles = newData.articles.slice(
          currentDataLength,
          currentDataLength + 12
        ); // getting next articles 12 articles

        // Update the state with the next set of articles
        setData((prevData) => [...prevData, ...nextArticles]);
        console.log(data);
        setTotalArticles(newData.articles.length);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const getNews = async (category = "general") => {
    setLoading(true);
    try {
      const url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`;
      const response = await fetch(url);
      const data = await response.json();
      setTotalArticles(data.totalResults);
      setData(data.articles.slice(0, 12));
      console.log(data.articles.slice(0, 12));
      setLoading(false);
    } catch (err) {
      console.log("search error: " + err);
      toast.error("Search is not supported.");
      setLoading(false);
    }
  };
  const getCategory = (value) => {
    getNews(value);
  };

  useEffect(() => {
    getNews("general");
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading)
    return (
      <div className="h-screen w-full  flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  return (
    <div className=" w-full lg:max-w-5xl m-auto overflow-hidden p-3">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar getCategory={getCategory} />
      <div className="flex space-x-4 overflow-x-auto text-xl font-semibold text-slate-900 *:cursor-pointer my-3">
        <span className="p-1 hover:text-blue-600 active:text-blue-400">
          <span onClick={() => getNews("sports")}>sports</span>
        </span>
        <span className="p-1 hover:text-blue-600 active:text-blue-400">
          <span onClick={() => getNews("business")}>business</span>
        </span>
        <span className="p-1 hover:text-blue-600 active:text-blue-400">
          <span onClick={() => getNews("science")}>science</span>
        </span>
        <span className="p-1 hover:text-blue-600 active:text-blue-400">
          <span onClick={() => getNews("health")}>health</span>
        </span>
        <span className="p-1 hover:text-blue-600 active:text-blue-400">
          <span onClick={() => getNews("entertainment")}>entertainment</span>
        </span>
      </div>
      <div>
        <div className="mt-10 text-2xl font-bold">
          <h1>Top Headlines</h1>
        </div>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreArticles}
          hasMore={data.length !== totalArticles}
          loader={
            <div>
              <div className="flex-col gap-4 w-full flex items-center justify-center my-3">
                <div className="w-16 h-16 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  m-auto gap-2">
            {data.map((news, index) => {
              return loading ? (
                <CardLoader />
              ) : (
                <Card
                  key={Date.now() + '-' + index}
                  imageUrl={news.urlToImage}
                  title={news.title}
                  content={news.content}
                  source={news.source.name}
                  date={news.publishedAt}
                  url={news.url}
                  desc={news.description}
                />
              );
            })}

            <button
              type="button"
              className={`fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              onClick={scrollToTop}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
