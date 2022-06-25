import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://62adbb71402135c7acc5cbb0.mockapi.io';

const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContactByName: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    createContact: builder.mutation({
      query: contactData => ({
        url: '/contacts',
        method: 'POST',
        body: { name: contactData.name, phone: contactData.phone },
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export default contactsApi;

export const {
  useGetContactByNameQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
  useFilterContactsMutation,
} = contactsApi;
