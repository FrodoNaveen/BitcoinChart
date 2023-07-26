import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ChartData from "./ChartData";
import "bootstrap/dist/css/bootstrap.css";



export default function DashBoard(){
    const navigate = useNavigate()
    const [searchData,setSearchData]=useState("")
    const [displayData,setDisplayData] = useState("")
    const [assets,setAssets] = useState([])
    const [suggestion,setSuggestion] = useState([])
    const [constSuggestion,setConstSuggestion] = useState([])
   
    useEffect(()=>{
        const checkLogIN = Cookies.get("email")
         checkLogIN ? navigate("/dashboard"):navigate("/login")
    },[])

    function logout(){
     Cookies.remove("email")
     navigate('/login')
    }
   
    function changeData(event){
      setSearchData(event.target.value)
      setSuggestion(constSuggestion)
    }

   function displaySearchdata() {
    //  console.log("data---", searchData);
     setDisplayData(searchData);
   }

    useEffect(()=>{
        fetch(`https://api.coincap.io/v2/assets`)
        .then((res)=>res.json())
        .then((data)=>setAssets(data.data))
    },[])

     useEffect(() => {
       fetch(`https://api.coincap.io/v2/assets`)
         .then((res) => res.json())
         .then((data) =>
           setSuggestion(
             data.data.map((ele,index) => {
               return { key:index,name: ele.id };
             })
           )
         );
     }, []);

     useEffect(() => {
       fetch(`https://api.coincap.io/v2/assets`)
         .then((res) => res.json())
         .then((data) =>
           setConstSuggestion(
             data.data.map((ele, index) => {
               return { key: index, name: ele.id };
             })
           )
         );
     }, []);

     const suggestionClick = (ele)=>{
       setSearchData(ele.name)
       setDisplayData(ele.name)
       setSuggestion([])
     }

    
    return (
      <div className="dashboard">
        <div className="dashboardnav">
          <input
            type="search"
            placeholder="search products"
            className="searchinput"
            onChange={changeData}
            value={searchData}
          />
          <button className="searchbtn" onClick={displaySearchdata}>
            search
          </button>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="dropdownn">
          {suggestion
            .filter((item) => {
              const value = searchData.toLowerCase();
              const name = item.name.toLowerCase();

              return value && name.startsWith(value) ;
            })
            .map((ele, index) => (
              <div
                key={index}
                className="dropdownroww"
                onClick={()=>suggestionClick(ele)}
              >
                {ele.name}
              </div>
            ))}
        </div>
        <br />
        <br />
        {displayData ? (
          <ChartData searchData={displayData} />
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Id</th>
                <th>symbol</th>
                <th>name</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((value, index) => (
                <tr key={index}>
                  <td>{value.rank}</td>
                  <td>{value.id}</td>
                  <td>{value.symbol}</td>
                  <td>{value.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
       
      </div>
    );
}