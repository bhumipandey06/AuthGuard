import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { assets } from "../assets/assets";

const QuotesPage = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AppContent); // get login state from context

  const [quoteText, setQuoteText] = useState("");
  const [author, setAuthor] = useState("");
  const [quotes, setQuotes] = useState([]);

  // Redirect user to login if not logged in
  useEffect(() => {
    if (!isLoggedin) {
      navigate("/login"); // or your login route
    }
  }, [isLoggedin, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!quoteText.trim()) return;
    setQuotes([...quotes, { text: quoteText.trim(), author: author.trim() }]);
    setQuoteText("");
    setAuthor("");
  };

  const deleteHandler = (index) => {
    const copy = [...quotes];
    copy.splice(index, 1);
    setQuotes(copy);
  };

  let renderQuotes = (
    <h2 className="text-center text-gray-900 mt-8 text-lg font-medium">
      No Quotes Available
    </h2>
  );

  if (quotes.length > 0) {
    renderQuotes = quotes.map((q, i) => (
      <li
        key={i}
        className="flex items-center justify-between mb-5 bg-[#222943] p-5 rounded-xl max-w-3xl mx-auto"
      >
        <div className="flex flex-col max-w-[85%]">
          <p className="italic text-indigo-300 text-lg leading-relaxed mb-2 break-words">
            “{q.text}”
          </p>
          <p className="text-indigo-500 font-semibold text-right text-sm truncate">
            — {q.author || "Unknown"}
          </p>
        </div>
        <button
          onClick={() => deleteHandler(i)}
          className="bg-gradient-to-r from-indigo-500 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white px-4 py-2 rounded-full font-semibold transition"
        >
          Delete
        </button>
      </li>
    ));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 py-12 px-6 sm:px-0">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <h1 className="text-blue-950 text-4xl sm:text-5xl font-extrabold text-center mb-12">
        Manage Your Quotes
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-[#222943] max-w-md mx-auto p-8 rounded-xl shadow-lg"
      >
        <textarea
          rows={3}
          placeholder="Enter quote text here"
          className="
            w-full
            rounded-2xl
            bg-[#333A5C]
            px-6
            py-4
            mb-5
            text-gray-100
            text-lg
            placeholder-gray-100
            outline-none
            resize-none
            focus:ring-2
            focus:ring-indigo-500
            transition
          "
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
          required
          aria-label="Quote Text"
        />
        <input
          type="text"
          placeholder="Author (optional)"
          className="
            w-full
            rounded-2xl
            bg-[#333A5C]
            px-6
            py-4
            mb-5
            text-gray-100
            text-lg
            placeholder-gray-100
            outline-none
            focus:ring-2
            focus:ring-indigo-500
            transition
          "
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          aria-label="Author Name"
        />
        <button
          type="submit"
          className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-indigo-500
            to-indigo-800
            py-4
            text-white
            font-semibold
            text-xl
            hover:from-indigo-600
            hover:to-indigo-900
            transition
          "
        >
          Add Quote
        </button>
      </form>

      <ul className="mt-14 max-w-4xl mx-auto">{renderQuotes}</ul>
    </div>
  );
};

export default QuotesPage; 