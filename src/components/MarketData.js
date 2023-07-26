import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css"
import _ from "loadsh"


export default function MarketData(props){

    const [marketData,setMarketData] = useState([])
    const [paginatedData,setPaginatedData] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [order,setOrder] = useState("ASC")
    
    

     useEffect(() => {
       fetch(`https://api.coincap.io/v2/assets/${props.searchData}/markets`)
         .then((res) => res.json())
         .then((data) => setMarketData(data.data));
     }, [props.searchData]);
     
     useEffect(() => {
       fetch(`https://api.coincap.io/v2/assets/${props.searchData}/markets`)
         .then((res) => res.json())
         .then((data) => setPaginatedData((data.data).slice(0,pageSize)))
     }, [props.searchData]);

     const pageSize = 10
     const pageCount = marketData ? Math.ceil(marketData.length/pageSize) : 0
     const pages = _.range(1,pageCount+1)

     const pagination = (page)=>{
      setCurrentPage(page)
      const currentPageIndex = (page-1)*10
      const newPaginatedData = (marketData).slice(currentPageIndex,(pageSize*page))
      setPaginatedData(newPaginatedData)
     }

     const sorting = (col)=>{
      
      if(order==="ASC"){
        const sorted = [...paginatedData].sort((a,b)=>
        a[col].toLowerCase()>b[col].toLowerCase()? 1:-1
        )
        setPaginatedData(sorted)
        setOrder("DSC")
      }
      if (order === "DSC") {
        const sorted = [...paginatedData].sort((a, b) =>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setPaginatedData(sorted);
        setOrder("ASC");
      }
     }
    
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th onClick={() => sorting("exchangeId")}>exchangeId</th>
              <th onClick={() => sorting("baseId")}>baseId</th>
              <th onClick={() => sorting("quoteId")}>quoteId</th>
              <th onClick={() => sorting("baseSymbol")}>baseSymbol</th>
              <th onClick={() => sorting("quoteSymbol")}>quoteSymbol</th>
              <th onClick={() => sorting("volumeUsd24Hr")}>volumeUsd24Hr</th>
              <th onClick={() => sorting("priceUsd")}>priceUsd</th>
              <th onClick={() => sorting("volumePercent")}>volumePercent</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((value, index) => (
              <tr key={index}>
                <td>{value.exchangeId}</td>
                <td>{value.baseId}</td>
                <td>{value.quoteId}</td>
                <td>{value.baseSymbol}</td>
                <td>{value.quoteSymbol}</td>
                <td>{value.volumeUsd24Hr}</td>
                <td>{value.priceUsd}</td>
                <td>{value.volumePercent}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {pages.map((page,index) => (
              <li key={index}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <p className="page-link" onClick={() => pagination(page)}>
                  {page}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
}