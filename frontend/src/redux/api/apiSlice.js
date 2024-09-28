import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../constant";

// const baseQuery = fetchBaseQuery({ baseUrl: base_url })
const baseQuery = fetchBaseQuery({ baseUrl: base_url })


export const apiSlice = createApi({
    baseQuery,
    reducerPath: "api",
    endpoints: () => ({}),
    tagTypes: ["User", "Image"]

})