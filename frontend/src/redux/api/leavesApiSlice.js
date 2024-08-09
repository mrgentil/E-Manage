import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const leavesApiSlice = createApi({
    reducerPath: 'leavesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token'); // Or use getState() to retrieve the token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createLeaveRequest: builder.mutation({
            query: (leaveRequestData) => ({
                url: '/leave-requests',
                method: 'POST',
                body: leaveRequestData,
            }),
        }),
        // Other endpoints...
    }),
});

export const { useCreateLeaveRequestMutation } = leavesApiSlice;
