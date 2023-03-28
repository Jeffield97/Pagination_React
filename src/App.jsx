import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [arr, setarr] = useState([]);
  const [ammountElements, setammountElements] = useState(25);
  const [numPages, setnumPages] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  /**
   * 0=0*3
   * [0,1,2] ->pag1
   *
   * 6=1*3
   * [3,4,5] ->pag2
   *
   * 6=2*3
   * [6,7,8] ->pag3
   *
   * 9=3*3
   * [9]     ->pag4
   *
   * ?Límite inferior= numPag-1*amountElements
   * ?Límite superior= Límite inferior+amountElements
   */
  const getData = async () => {
    try {
      const res = await axios.get("https://restcountries.com/v3.1/all");
      const data = await res.data;
      console.log(data);
      setnumPages(Math.ceil(arr.length / ammountElements));
      setarr(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
   setnumPages(Math.ceil(arr.length / ammountElements));
  }, [ammountElements]);

  const lowerLimit = (currentPage - 1) * ammountElements;
  const upperLimit = lowerLimit + ammountElements;
  const elementToshow = arr.slice(lowerLimit, upperLimit);
  const nextPage = () => {
    if (currentPage < numPages) {
      const nextPage = currentPage + 1;
      setcurrentPage(nextPage);
    }
  };
  const backPage = () => {
    if (currentPage > 1) {
      const backPage = currentPage - 1;
      setcurrentPage(backPage);
    }
  };
  const pages = Array(numPages)
    .fill()
    .map((_, i) => i);
  const changePage = (e) => {
    setammountElements(e.target.value);
  };
  const selectPage = (e) => {
    const newCurrentPage=parseInt(e.target.id)+1
    setcurrentPage(newCurrentPage)
  };
  return (
    <div className="App">
      <div className="flex gap-10 m-10 justify-center">
        <button onClick={backPage}>Back Page</button>
        {pages.map((page) => (
          <span
            key={page}
            className={`w-7 h-7 flex justify-center items-center rounded-full hover:bg-gray-500  hover:cursor-pointer ${
              currentPage - 1 === page ? "bg-cyan-600" : "bg-slate-800"
            }`}
            id={page}
            onClick={selectPage}
          >
            {page + 1}
          </span>
        ))}
        <button onClick={nextPage}>Next Page</button>
      </div>
      <div>{`Current Page: ${currentPage}`}</div>
      <div>Paginas {numPages}</div>
      <div className={"flex flex-wrap gap-5 justify-center"}>
        {elementToshow.map((element) => (
          <div className={"w-3/12  mt-10 "} key={element.name.official}>
            <img className={""} src={element.flags.svg} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;