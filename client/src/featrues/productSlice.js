import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import axios from 'axios'


// getting products data
export const getProducts = createAsyncThunk('getProducts', async (args, { rejectWithValue }) => {
    console.log(args, "from controller")
    try {
        const res = await axios.get(`http://localhost:3500/api/v1/products?page=${args?.currentPage ? args?.currentPage : 1}&price[gte]=${args?.price[0] || 0}&price[lte]=${args?.price[1] || 25000}`)
        // const res = await axios.get(`http://localhost:3500/api/v1/products?page=${args.currentPage}`)
        console.log(res)
        return res
    } catch (error) {
        return rejectWithValue(error)
    }
})


//getting product detail
export const productDetail = createAsyncThunk('productDetail', async (id, { rejectWithValue }) => {
    try {
        console.log(id, "from slice")
        const res = await axios.get(`http://localhost:3500/api/v1/product/${id}`)
        console.log(res, "resres")
        return res
    } catch (error) {
        return rejectWithValue(error)
    }
})

//user login
export const userLogin = createAsyncThunk('userLogin', async (args, { rejectWithValue }) => {
    try {
        console.log(args, "args login")

        let data = {
            email: args.loginEmail,
            password: args.loginPassword
        }

        const re = await axios.post('http://localhost:3500/api/v1/login', data,
            { withCredentials: true, },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })

        return re
        // return res.json()
    } catch (error) {
        return rejectWithValue(error)
    }
})

//user register
export const userRegister = createAsyncThunk('userRegister', async (args, { rejectWithValue }) => {
    console.log(args, "from register route")
    try {
        let registerData = {
            name: args.name,
            email: args.email,
            password: args.password,
            avatar: args.avatar
        }
        const re = await axios.post('http://localhost:3500/api/v1/register', registerData)
        return re
    } catch (error) {
        return rejectWithValue(error)
    }
})

//user account info
export const userAccountInfo = createAsyncThunk('userAccountInfo', async (args, { rejectWithValue }) => {
    try {
        let re = await axios.get('http://localhost:3500/api/v1/me',
            { withCredentials: true },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
        return re
    } catch (error) {
        return rejectWithValue(error)
    }
})

// user logout
export const userLogout = createAsyncThunk('userLogout', async (args, { rejectWithValue }) => {
    try {
        let re = await axios.get('http://localhost:3500/api/v1/logout',
            { withCredentials: true },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
        return re
    }
    catch (error) {
        rejectWithValue(error)
    }
})

//user update
export const userUpdate = createAsyncThunk('userUpdate', async (args, { rejectWithValue }) => {
    console.log(args, "from register route")
    try {
        let registerData = {
            name: args.updateNameInput,
            email: args.updateEmailInput,
            avatar: args.updateAvatarInput
        }
        const re = await axios.put('http://localhost:3500/api/v1/me/update', registerData,
            { withCredentials: true },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        return re
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        products: [],
        productDetails: [],
        loading: false,
        error: null,
        user: [],
        isAuthenticate: false,
        userInfo: []
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.loading = true
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false
            state.products = action.payload
        },
        [getProducts.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [productDetail.pending]: (state) => {
            state.loading = true
        },
        [productDetail.fulfilled]: (state, action) => {
            state.loading = false
            state.productDetails = action.payload
        },
        [productDetail.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [userLogin.pending]: (state) => {
            state.loading = true
            state.isAuthenticate = false

        },
        [userLogin.fulfilled]: (state, action) => {
            console.log("into the userLogin slice")
            state.loading = false
            state.isAuthenticate = true
            state.user = action.payload
        },
        [userLogin.rejected]: (state, action) => {
            state.loading = false
            state.isAuthenticate = false
            state.error = action.payload
        },
        [userRegister.pending]: (state) => {
            state.loading = true
        },
        [userRegister.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        [userRegister.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [userAccountInfo.pending]: (state) => {
            state.loading = true
            state.isAuthenticate = false
        },
        [userAccountInfo.fulfilled]: (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.isAuthenticate = true
        },
        [userAccountInfo.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticate = false
        },
        [userLogout.pending]: (state) => {
            state.loading = true
            state.isAuthenticate = true
        },
        [userLogout.fulfilled]: (state, action) => {
            state.loading = false
            state.userInfo = null
            state.isAuthenticate = false
        },
        [userLogout.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticate = true
        },
        [userUpdate.pending]: (state) => {
            state.loading = true
            state.isAuthenticate = false
        },
        [userUpdate.fulfilled]: (state, action) => {
            state.loading = false
            // state.userInfo = action.payload
            state.isAuthenticate = true
        },
        [userUpdate.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticate = false
        }
    }
})

export default productSlice.reducer