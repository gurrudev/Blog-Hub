/* eslint-disable no-empty-pattern */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

export const createBlog = createAsyncThunk('blogs/createBlog', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/blogs/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json()
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteBlog = createAsyncThunk ('blogs/deleteBlog', async (id, { rejectWithValue }) =>{
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/blogs/${id}`, {method:'DELETE'})
        return response.json()
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/blogs/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: [],
        isLoading: false,
        error: null,
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs.push(action.payload);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlog.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

    }
})

// Action creators are generated for each case reducer function
export const {  } = blogsSlice.actions
export default blogsSlice.reducer