import React from "react";

export default function Columnfilter({ column }) {
    const {filterValue,setFilter} = column
  return (
    <div>

      <input value={filterValue || ""} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
}
