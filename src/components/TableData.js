import React, { useState,useEffect, useMemo } from "react";
import { COLUMNS } from "./Columns";
import {useTable,useSortBy,usePagination} from "react-table"
import './table.css'
import "bootstrap/dist/css/bootstrap.css";
import _ from "loadsh"


export default function TableData(props){

    const [tableData,setTableData] = useState([])
    const [currentPage,setCurrentPage] = useState(1)

     useEffect(() => {
       fetch(`https://api.coincap.io/v2/assets/${props.searchData}/markets`)
         .then((res) => res.json())
         .then((data) => setTableData(data.data));
     }, [props.searchData]);
     
     const columns = useMemo(()=>COLUMNS,[])
     const data = useMemo(()=> tableData,[tableData])

     const {
       getTableBodyProps,
       getTableProps,
       headerGroups,
       prepareRow, 
       page,
    //    previousPage,
    //    nextPage,
    //    canPreviousPage,
    //    canNextPage,
    //    pageOptions,
    //    pageCount,
       gotoPage
     } = useTable({ columns, data }, useSortBy,usePagination);
     
     const pageSize = 10
     const pageCount = tableData ? Math.ceil(tableData.length / pageSize) : 0;
     const pages = _.range(1, pageCount + 1);

    function pageNumber(page){
        gotoPage(page-1)
        setCurrentPage(page)
    }
    
   
    return (
      <div>
        <br></br>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br></br>
        <span className="d-flex justify-content-center">
          <ul className="pagination">
            {pages.map((page, index) => (
              <li
                key={index}
                className={page===currentPage ? "page-item active" : "page-item"}
                onClick={() => pageNumber(page)}
              >
                <p className="page-link">{page}</p>
              </li>
            ))}
          </ul>
        </span>
      </div>
    );
}