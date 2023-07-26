import React,{useEffect,useState} from "react";
import{ResponsiveContainer,AreaChart,Area,XAxis,YAxis,Tooltip,CartesianGrid} from "recharts"
// import MarketData from "./MarketData";
// import TableData from "./TableData";
import DatePicker from "react-datepicker";
import FilterTable from "./FilterTable";
import "react-datepicker/dist/react-datepicker.css";
import "./table.css";

export default function ChartData(props){

    const [defaultData,setDefaultData] = useState([])
    const [chartData,setChartdata] = useState([])
    const [date,setDate] = useState([])
    const [Yaxis,setYaxis] = useState([])
    const [Xaxis,setXaxis] = useState([])
    const [selectedDate,setSelectedDate] = useState(null)
    const [selectedToDate, setSelectedToDate] = useState(null);
    const [value,setValue] = useState()
    

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

     useEffect(() => {
       fetch(`https://api.coincap.io/v2/assets/${props.searchData}/history?interval=d1`)
         .then((res) => res.json())
         .then((data) =>
           setDefaultData(
             data.data.map((ele) => {
               return {
                 priceUsd: ele.priceUsd,
                 time: `${new Date(ele.time).getDate()} ${months[
                   new Date(ele.time).getMonth()
                 ].slice(0, 3)} ${new Date(ele.time).getFullYear()}`,
               };
             })
           )
         );
     }, []);

    
    useEffect(()=>{
        fetch(`https://api.coincap.io/v2/assets/${props.searchData}/history?interval=d1`)
          .then((res)=>res.json())
          .then((data)=>setChartdata(data.data.map((ele)=>{
            return {priceUsd:ele.priceUsd,time:`${new Date(ele.time).getDate()} ${months[new Date(ele.time).getMonth()].slice(0,3)} ${new Date(ele.time).getFullYear()}`}
          })))
    },[props.searchData])

    useEffect(() => {
      fetch(`https://api.coincap.io/v2/assets/${props.searchData}/history?interval=d1`)
        .then((res) => res.json())
        .then((data) =>
          setDate(
            data.data.map((ele) => {
              return `${new Date(ele.time).getDate()} ${months[
                new Date(ele.time).getMonth()
              ].slice(0, 3)} ${new Date(ele.time).getFullYear()}`;
            })
          )
        );
    }, []);

    useEffect(()=>{
     setYaxis(chartData.map((ele)=>{
      return(ele.priceUsd)
     }))
    },[chartData])


   useEffect(()=>{
    setXaxis(chartData.map((ele)=>{
        return(ele.time)
    }))
   },[chartData])



   function displayNewData(){
     setValue(selectedDate && selectedToDate ? changeValue :null )
   }
  
  
   const changeValue = () =>{
    const selectFromDate = `${selectedDate.getDate()} ${months[selectedDate.getMonth()].slice(0,3)} ${selectedDate.getFullYear()}`
    const fromDate = date.indexOf(selectFromDate)
    const sk = `${selectedToDate.getDate()} ${months[selectedToDate.getMonth()].slice(0,3)} ${selectedToDate.getFullYear()}`
    const toDate = date.indexOf(sk)
    
    const num = []

    for(let i=fromDate; i<=toDate; i++){
      num.push(defaultData[i])
      setChartdata(num);
    } 
  }

     const yaxis = Math.ceil(Math.max(...Yaxis) / 6);
     const xminaxis = Xaxis[0]
     const xmaxaxis = Xaxis[Xaxis.length-1]
     const xcenaxis = Xaxis[Math.round(Xaxis.length/2)]
  
    return (
      <div>
        <div>
          <DatePicker
            className="datepicker"
            placeholderText="fromdate"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            minDate={new Date("2022-05-03")}
          />
          <br />
          <br />
          <DatePicker
          className="datepicker"
            placeholderText="todate"
            selected={selectedToDate}
            onChange={(date) => setSelectedToDate(date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date("2023-05-14")}
            minDate={new Date("2022-05-15")}
          />
        </div>
        <br></br>
        <button className="datepicker" onClick={displayNewData}>GetValue</button>
        <br></br>
        <nav className="chartdata">
          <ResponsiveContainer
            className="chartcontainer"
            width="100%"
            height={400}
          >
            <AreaChart data={chartData}>
              <Area dataKey="priceUsd" stroke="#2451B7" fill="#303233" />
              <XAxis ticks={[xminaxis, xcenaxis, xmaxaxis]} dataKey="time" />
              <YAxis
                ticks={[
                  yaxis * 1,
                  yaxis * 2,
                  yaxis * 3,
                  yaxis * 4,
                  yaxis * 5,
                  yaxis * 6,
                ]}
                dataKey="priceUsd"
              />
              <Tooltip />
              <CartesianGrid vertical={false} opacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </nav>
        <br></br>
        <br></br>
        <div>
          {/* <MarketData searchData={props.searchData} /> */}
          {/* <TableData searchData={props.searchData} /> */}
          <FilterTable searchData={props.searchData} />
        </div>
      </div>
    );

}