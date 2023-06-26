import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { apiSlice } from "../../app/api/apiSlice";

const shoesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.release_date.localeCompare(b.release_date),
});

const initialState = shoesAdapter.getInitialState();

export const shoesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShoes: builder.query({
      query: (shoeName = "") => `/shoes?shoeName=${shoeName}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedShoes = responseData.map((shoe) => {
          shoe.id = shoe._id;
          return shoe;
        });
        return shoesAdapter.setAll(initialState, loadedShoes);
      },
      providesTags: ["Shoe"],
    }),
    addNewShoe: builder.mutation({
      query: (initialShoe) => ({
        url: "/shoes",
        method: "POST",
        body: {
          ...initialShoe,
        },
      }),
      invalidatesTags: ["Shoe"],
    }),
    updateShoe: builder.mutation({
      query: (initialShoe) => ({
        url: "/shoes",
        method: "PATCH",
        body: {
          ...initialShoe,
        },
      }),
      invalidatesTags: ["Shoe"],
    }),
    deleteShoe: builder.mutation({
      query: ({ id }) => ({
        url: "/shoes",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Shoe"],
    }),
    addNewComment: builder.mutation({
      query: (commentData) => ({
        url: `/shoes/${commentData.shoeId}/comments`,
        method: "POST",
        body: {
          content: commentData.content,
          username: commentData.username,
        },
      }),
      invalidatesTags: ["Shoe"],
    }),
    getShoesWithPriceOver100: builder.query({
      query: () => "/shoes/countWithPrice",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Shoe"],
    }),
    getShoesWithCollaboration: builder.query({
      query: () => "/shoes/countWithCollaboration",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Shoe"],
    }),
    getShoesWithoutCollaboration: builder.query({
      query: () => "/shoes/countWithoutCollaboration",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Shoe"],
    }),
    getShoesCount: builder.query({
      query: () => "/shoes/count",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Shoe"],
    }),
    getShoesAveragePrice: builder.query({
      query: () => "/shoes/countAveragePrice",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Shoe"],
    }),
    getShoesHighestPrice: builder.query({
      query: () => "/shoes/highestPrice",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Shoe"],
    }),
    getShoesLowestPrice: builder.query({
      query: () => "/shoes/lowestPrice",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Shoe"],
    }),
    getShoesMostComments: builder.query({
      query: () => "/shoes/MostComments",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Shoe"],
    }),
    getShoesTotalComments: builder.query({
      query: () => "/shoes/totalComments",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Shoe"],
    }),
  }),
});

export const {
  useGetShoesQuery,
  useAddNewShoeMutation,
  useUpdateShoeMutation,
  useDeleteShoeMutation,
  useAddNewCommentMutation,
  useDeleteCommentMutation,
  useGetShoesWithPriceOver100Query,
  useGetShoesAveragePriceQuery,
  useGetShoesWithCollaborationQuery,
  useGetShoesCountQuery,
  useGetShoesWithoutCollaborationQuery,
  useGetShoesHighestPriceQuery,
  useGetShoesLowestPriceQuery,
  useGetShoesMostCommentsQuery,
  useGetShoesTotalCommentsQuery
} = shoesApiSlice;



export const selectShoesResult = shoesApiSlice.endpoints.getShoes.select();


const selectShoesData = createSelector(
  selectShoesResult,
  (shoesResult) => shoesResult.data
);

export const {
  selectAll: selectAllShoes,
  selectById: selectShoeById,
  selectIds: selectShoeIds,
} = shoesAdapter.getSelectors(
  (state) => selectShoesData(state) ?? initialState
);
