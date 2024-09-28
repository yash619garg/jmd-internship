import { userUrl } from "../constant";
import { apiSlice } from "./apiSlice";

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        signup: builders.mutation({
            query: (data) => ({
                url: `${userUrl}/signup`,
                body: data,
                method: "POST"

            })
        }),
        login: builders.mutation({
            query: (data) => ({
                url: `${userUrl}/login`,
                body: data,
                method: "POST"
            })
        }),
        logout: builders.mutation({
            query: () => ({
                url: `${userUrl}/logout`,
                method: "POST",
            }),
            invalidatesTags: ["User"]
        }),
        getUser: builders.query({
            query: () => ({
                url: `${userUrl}/getUser`,
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5
        }),



    })
})

export const { useSignupMutation, useLoginMutation, useLogoutMutation, useGetUserQuery } = userSlice;