import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    border: "none",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    margin: "5px",
    transform: "translate(-50%, -50%)",
    minWidth: "375px",
  },
};

export default function card({
  imageUrl,
  title,
  date,
  source,
  url,
  desc,
  content,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function limitWords(str, wordLimit) {
    if (str === null || str === undefined) {
      return "";
    }
    const words = str.split(" ");

    if (words.length <= wordLimit) {
      // If not, return the original string
      return str;
    } else {
      const limitedWords = words.slice(0, wordLimit);
      return limitedWords.join(" ") + "...";
    }
  }
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function formatDate(dateString) {
    const date = new Date(dateString);

    // Extract day, month, and year from the Date object
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }
  return (
    <div className="mt-12 flex flex-col mx-2">
      <div className="relative flex w-full flex-col rounded-xl bg-[#f6f6f68b] bg-clip-border text-gray-700 shadow-md m-auto max-w-96">
        <img
          onClick={openModal}
          src={imageUrl}
          onError={(e) =>
            (e.target.src =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6AAbTgrDoBLsKzmru5JlG0T0WqlwAO7GPMaF0k7HZAw&s")
          }
          loading="lazy"
          className="shadow-blue-gray-500/40  mx-4 -mt-6 h-40 overflow-hidden rounded-xl shadow-lg hover:opacity-90 transition duration-150 cursor-pointer"
        ></img>
        <div className="p-6">
          <h5 className="text-blue-gray-900 mb-2 block font-sans text-lg font-semibold leading-snug tracking-normal antialiased">
            {limitWords(title, 15)}
          </h5>
          <p className="font-semibold text-sm my-3 ">
            {source} | date: {formatDate(date)}
          </p>
          <p className="block font-sans text-inherit antialiased text-sm text-neutral-500">
            {limitWords(desc, 30)}
          </p>
        </div>
        <div className="p-6 pt-0">
          <a
            href={url}
            target="_blank"
            data-ripple-light="true"
            type="button"
            className="select-none rounded-lg bg-blue-500 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={openModal}
          >
            Read More
          </a>
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="news model"
          // className={`bg-blue-100 absolute -top-[50%] -left-[50%] p-2 flex items-center justify-center -translate-y-[50%] -translate-x-[50%]`}
        >
          <div className="">
            <div className="relative max-w-xl rounded-lg bg-gray-100 p-6 shadow-sm m-auto">
              <button
                type="button"
                className="absolute -end-1 -top-1 rounded-full border border-gray-200 bg-white p-1 text-gray-400"
                onClick={closeModal}
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <img
                    className="bg-cover rounded-md"
                    alt="image"
                    src={imageUrl}
                    loading="lazy"
                    onError={(e) =>
                      (e.target.src =
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6AAbTgrDoBLsKzmru5JlG0T0WqlwAO7GPMaF0k7HZAw&s")
                    }
                  />
                  <h1 className="font-semibold text-sm my-3">
                    Source: {source} | date: {formatDate(date)}
                  </h1>
                </div>

                <div>
                  <h2 className="text-lg font-medium">{title}</h2>

                  <p className="mt-4 text-sm text-gray-500">{content}</p>

                  <div className="mt-6 sm:text-right">
                    <a
                      href={url}
                      target="_blank"
                      className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                      Find out more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
