import { imageUrl } from "../constant";
import { apiSlice } from "./apiSlice";

export const imageSlice = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        uploadImage: builders.mutation({
            query: (data) => ({
                url: `${imageUrl}/uploadImage`,
                body: data,
                method: "POST"
            }),
            invalidatesTags: ["Image"]
        }),
        createImage: builders.mutation({
            query: (data) => ({
                url: `${imageUrl}/createImage`,
                body: data,
                method: "POST"
            }),
            invalidatesTags: ["Image"]
        }),
        updateViews: builders.mutation({
            query: (id) => ({
                url: `${imageUrl}/updateViews/${id}`,
                method: "POST",
            }),
            providesTags: ["Image"]
        }),
        getAllImage: builders.query({
            query: () => ({
                url: `${imageUrl}/getAllImage`
            }),
            providesTags: ["Image"]
        })
    })
})

export const { useUploadImageMutation, useCreateImageMutation, useGetAllImageQuery, useUpdateViewsMutation } = imageSlice;