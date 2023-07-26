import React, { useState, useEffect, useMemo } from "react";
import { COLUMNS } from "./Columns";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";
import "./table.css";
import "bootstrap/dist/css/bootstrap.css";
import _ from "loadsh";
import MultiRangeSlider from "multi-range-slider-react";


export default function FilterTable(props) {
  const [defaultTableData, setDefaultTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const [constFilterData,setConstFilterData] = useState([])
  const [searchData, setSearchData] = useState("");
  const [displaySearchdata,setDisplaySearchData] = useState("")
  const [value,setValue] = useState([])
  

  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets/${props.searchData}/markets`)
      .then((res) => res.json())
      .then((data) => setTableData(data.data));
  }, [props.searchData]);

  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets/${props.searchData}/markets`)
      .then((res) => res.json())
      .then((data) => setDefaultTableData(data.data));
  }, [props.searchData]);

  
  useEffect(() => {
    setFilterData(
      defaultTableData.map((ele, index) => {
        return { key: index, name: ele.exchangeId };
      })
    );
    setConstFilterData(
      defaultTableData.map((ele, index) => {
        return { key: index, name: ele.exchangeId };
      })
    );
    setSearchData("");

    setValue(
       defaultTableData.map((ele) => {
         return ele.priceUsd;
       })
     );

  }, [defaultTableData]);


useEffect(()=>{
    if(searchData){
        setTableData(defaultTableData.filter((ele)=>{
            if(ele.exchangeId===searchData){
                return ele
            }
        }))
    }
   
},[displaySearchdata])



const columns = useMemo(() => COLUMNS, []);
const data = useMemo(() => tableData, [tableData]);

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
  gotoPage,
} = useTable(
  { columns, data },
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination
);

const pageSize = 10;
const pageCount = tableData ? Math.ceil(tableData.length / pageSize) : 0;
const pages = _.range(1, pageCount + 1);

function pageNumber(page) {
  gotoPage(page - 1);
  setCurrentPage(page);
}

  const minRange = Math.trunc(Math.min(...value))
  const maxRange = Math.trunc(Math.max(...value));
  
   const [minValue, set_minValue] = useState();
   const [maxValue, set_maxValue] = useState();

   const handleInput = (e) => {
     set_minValue(e.minValue);
     set_maxValue(e.maxValue);
    
    };

    useEffect(()=>{
       if(minValue>=minRange && searchData){
        setTableData(defaultTableData.filter((ele)=>{
            if(ele.exchangeId===searchData && ele.priceUsd>=minValue && ele.priceUsd<=maxValue){
                return ele
            }
        }))
       }
       if (minValue >= minRange && !searchData) {
         setTableData(
           defaultTableData.filter((ele) => {
             if (
               ele.priceUsd >= minValue &&
               ele.priceUsd <= maxValue
             ) {
               return ele;
             }
           })
         );
       }
       
    },[minValue])

    useEffect(() => {
      if (maxValue <= maxRange && searchData) {
        setTableData(
          defaultTableData.filter((ele) => {
            if (
              ele.exchangeId === searchData &&
              ele.priceUsd >= minValue &&
              ele.priceUsd <= maxValue
            ) {
              return ele;
            }
          })
        );
      }
      if (maxValue <= maxRange && !searchData) {
        setTableData(
          defaultTableData.filter((ele) => {
            if (ele.priceUsd >= minValue && ele.priceUsd <= maxValue) {
              return ele;
            }
          })
        );
      }

      
    }, [maxValue]);
  
  
 function updateFilterData(e) {
    setSearchData(e.target.value)
    setFilterData(constFilterData)
  }
 
  const newTableData = ()=>{
        if (searchData) {
          setTableData(
            defaultTableData.filter((ele) => {
              if (
                ele.exchangeId === searchData &&
                ele.priceUsd >= minValue &&
                ele.priceUsd <= maxValue
              ) {
                return ele;
              }
            })
          );
        }
        if (!searchData) {
          setTableData(
            defaultTableData.filter((ele) => {
              if (ele.priceUsd >= minValue && ele.priceUsd <= maxValue) {
                return ele;
              }
            })
          );

        }
  }

function getFilteredTable() {
  newTableData()
}

const filterSearchClick = (ele)=>{
    setSearchData(ele.name)
    setDisplaySearchData(ele.name);
    setFilterData([]) 
}



  return (
    <div>
      <div className="filterdata">
        <p className="filterId">ExchangeId</p>
        <input
          className="filterinput"
          onChange={updateFilterData}
          value={searchData}
        />
        <div className="dropdown">
          {filterData
            .filter((item) => {
              const value = searchData.toLowerCase();
              const name = item.name.toLowerCase();
              return value && name.startsWith(value);
            })
            .map((ele, index) => (
              <div
                key={index}
                className="dropdownrow"
                onClick={() => filterSearchClick(ele)}
              >
                {ele.name}
              </div>
            ))}
        </div>
        <p className="filterPrice">Price in $</p>
        <MultiRangeSlider
          className="pricesliderx"
          min={minRange}
          max={maxRange}
          ruler="false"
          minValue={minRange}
          maxValue={maxRange}
          onInput={(e) => {
            handleInput(e);
          }}
          />
        <button className="filterbtn" onClick={getFilteredTable}>
          Filter
        </button>
      </div>

      <div className="tabledata">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
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
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
                onClick={() => pageNumber(page)}
              >
                <p className="page-link">{page}</p>
              </li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
}
