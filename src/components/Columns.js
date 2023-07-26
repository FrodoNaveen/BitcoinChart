import Columnfilter from "./ColumnFilter";

export const COLUMNS = [
         {
           Header: "ExchangeId",
           accessor: "exchangeId",
           Filter: Columnfilter,
         },
         {
           Header: "BaseId",
           accessor: "baseId",
           Filter: Columnfilter,
           disableFilters: true,
         },
         {
           Header: "QuoteId",
           accessor: "quoteId",
           Filter: Columnfilter,
         },
         {
           Header: "BaseSymbol",
           accessor: "baseSymbol",
           Filter: Columnfilter,
           disableFilters: true,
         },
         {
           Header: "QuoteSymbol",
           accessor: "quoteSymbol",
           Filter: Columnfilter,
         },
         {
           Header: "VolumeUsd24Hr",
           accessor: "volumeUsd24Hr",
           Filter: Columnfilter,
           disableFilters: true,
         },
         {
           Header: "PriceUsd",
           accessor: "priceUsd",
           Filter: Columnfilter,
         },
         {
           Header: "VolumePercent",
           accessor: "volumePercent",
           Filter: Columnfilter,
           disableFilters:true
         },
       ];
