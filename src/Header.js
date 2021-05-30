import React, { useState, useEffect } from "react";
import { ReactComponent as CloseMenu } from "./assets/x.svg";
import { ReactComponent as MenuIcon } from "./assets/menu.svg";
import "./Header.css";
// import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Header = () => {
  const [click, setClick] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const [pageno, setPageno] = useState(1);
  const [books, setBooks] = useState([]);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const fetchData = async () => {
    // const response = await axios.get("https://reqres.in/api/users?page=1");
    // const response = await axios.get("https://reqres.in/api/users?page=1");
    const res = await fetch(`https://reqres.in/api/users?page=${pageno}`);
    const json = await res.json();
    setBooks((prev) => [...books, ...json.data]);
  };

  const fetchMoreData = () => {
    fetchData();
    if (pageno === 2) {
      setIsNext(false);
    }
    setTimeout(setPageno(pageno + 1), 1000);
  };
  return (
    <>
      <div className="header">
        <div className="logo-nav">
          <div className="logo-container">
            <a href="\" className="">
              LOGO
            </a>
          </div>
          <ul className={click ? "nav-options active" : "nav-options"}>
            <li className="option" onClick={closeMobileMenu}>
              <a href="\">ABOUT</a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="\">CONTACT</a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="\">BLOG</a>
            </li>
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <a
                className="btns"
                onClick={fetchMoreData}
                onDoubleClick={() => setPageno(1)}
              >
                Fetch Data
              </a>
            </li>
          </ul>
        </div>

        <ul className="signin-up">
          <li onClick={closeMobileMenu}>
            <a
              className="btns btnss"
              onClick={fetchMoreData}
              onDoubleClick={() => setPageno(1)}
            >
              Fetch Data
            </a>
          </li>
        </ul>
        <div className="mobile-menu" onClick={handleClick}>
          {click ? (
            <CloseMenu className="menu-icon" />
          ) : (
            <MenuIcon className="menu-icon" />
          )}
        </div>
      </div>
      <InfiniteScroll
        dataLength={books.length} //This is important field to render the next data
        next={() => {
          setTimeout(() => {
            fetchMoreData();
          }, 1000);
        }}
        hasMore={isNext}
        loader={
          <div className="centerload">
            <h4 className="load loader">Loading</h4>
          </div>
        }
        endMessage={
          <p className="load">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="books">
          {books.map((book) => {
            return (
              <div className="book" key={book.id}>
                <div className="details">
                  <p>{book.id}</p>
                  <img key={book.avatar} src={book.avatar} />
                  <p>{book.first_name}</p>
                  <p>{book.last_name}</p>
                  {/* <p>{book.first_name}</p> */}
                  <p> {book.email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Header;
