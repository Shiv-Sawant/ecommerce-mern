import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'


// getting products data
export const getProducts = createAsyncThunk('getProducts', async (args, { rejectWithValue }) => {
    // console.log(args, "from controller")
    try {
        const res = await axios.get(`http://localhost:3500/api/v1/products?page=${args?.currentPage ? args?.currentPage : 1}`)
        // const res = await axios.get(`http://localhost:3500/api/v1/products?page=${args.currentPage}`)
        // console.log(res)
        return res
    } catch (error) {
        return rejectWithValue(error)
    }
})


//getting product detail
export const productDetail = createAsyncThunk('productDetail', async (id, { rejectWithValue }) => {
    try {
        // console.log(id, "from slice")
        const res = await axios.get(`http://localhost:3500/api/v1/product/${id}`)
        // console.log(res, "resres")
        return res
    } catch (error) {
        return rejectWithValue(error)
    }
})

//user login
export const userLogin = createAsyncThunk('userLogin', async (args, { rejectWithValue }) => {
    try {
        // console.log(args, "args login")

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
    // console.log(args, "from register route")
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
    // console.log(args, "from register route")
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

// cart items
export const cartItems = createAsyncThunk('cartItems', async (args, { rejectWithValue }) => {
    try {

        // console.log(args, "args")
        const res = await axios.get(`http://localhost:3500/api/v1/product/${args.product}`)

        let data = {
            product: args.product,
            name: res.data.product.name,
            price: res.data.product.price,
            image: res.data.product.images[0].url,
            stock: res.data.product.Stock,
            quantity: args.item
        }
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const saveShipping = createAsyncThunk('saveShipping', async (args, { rejectWithValue }) => {
    try {
        // console.log(args, "argsargs")
        return args
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const removeCartItem = createAsyncThunk('removeCartItem', async (args, { rejectWithValue }) => {
    try {
        return args
    } catch (error) {
        rejectWithValue(error)
    }
})

// export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: CLEAR_ERRORS });
//   };

export const clearErrors = createAsyncThunk('clearError', async (args, { rejectWithValue }) => {
    // console.log('clear error')
})

export const newOrder = createAsyncThunk('newOrder', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.post('http://localhost:3500/api/v1/order/new', args, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getOrders = createAsyncThunk('getOrders', async (args, { rejectWithValue }) => {
    try {

        const re = await axios.get('http://localhost:3500/api/v1/admin/all/orders', { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        // console.log(re, "rere")
        return re

    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getOrderDetail = createAsyncThunk('getOrderDetail', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.get(`http://localhost:3500/api/v1/get/order/${args}`, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const createProductReview = createAsyncThunk('createProductReview', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.post('http://localhost:3500/api/v1/review', args, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const getProductReview = createAsyncThunk('getProductReview', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.get(`http://localhost:3500/api/v1/reviews?id=${args}`, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const getAdminAllProducts = createAsyncThunk('getAdminAllProducts', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.get('http://localhost:3500/api/v1/admin/products', { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const createAdminProduct = createAsyncThunk('createAdminProduct', async (args, { rejectWithValue }) => {
    try {
        // console.log(args)
        const re = await axios.post('http://localhost:3500/api/v1/admin/product/new', args, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.delete(`http://localhost:3500/api/v1/admin/product/${args}`, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const updateProduct = createAsyncThunk('updateProduct', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.put(`http://localhost:3500/api/v1/admin/product/${args.id}`, args.updateData, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const getAllOrders = createAsyncThunk('getAllOrders', async (args, { rejectWithValue }) => {
    try {

        const re = await axios.get('http://localhost:3500/api/v1/admin/all/orders', { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        // console.log(re, "rere")
        return re

    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateOrder = createAsyncThunk('updateOrder', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.put(`http://localhost:3500/api/v1/admin/order/${args.id}`, args.update, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        // console.log(args, "args")
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const deleteOrder = createAsyncThunk('deleteOrder', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.delete(`http://localhost:3500/api/v1/admin/order/${args}`, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const allUser = createAsyncThunk('allUser', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.get(`http://localhost:3500/api/v1/admin/users`, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})


export const singleUserDetail = createAsyncThunk('singleUserDetail', async (args, { rejectWithValue }) => {
    try {
        // console.log(args, "args")
        const re = await axios.get(`http://localhost:3500/api/v1/admin/user/${args}`, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const updateUsers = createAsyncThunk('updateUsers', async (args, { rejectWithValue }) => {
    try {
        // console.log(args, "args")
        const re = await axios.put(`http://localhost:3500/api/v1/admin/user/${args.id}`, args, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const deleteUser = createAsyncThunk('deleteUser', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.delete(`http://localhost:3500/api/v1/admin/user/${args}`, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const getReview = createAsyncThunk('getReview', async (args, { rejectWithValue }) => {
    try {
        const re = await axios.get(`http://localhost:3500/api/v1/reviews?id=${args}`, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const deleteReview = createAsyncThunk('deleteReview', async (args, { rejectWithValue }) => {
    try {
        // console.log(args, "args")
        const re = await axios.delete(`http://localhost:3500/api/v1/reviews?productId=${args.productId}&id=${args.id}`, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        return re
    } catch (err) {
        return rejectWithValue(err)
    }
})

let intialCartState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],

}

let intialShippingState = {
    shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : []
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        products: [],
        productDetails: [],
        loading: false,
        error: null,
        user: [],
        isAuthenticate: false,
        userInfo: [],
        cart: intialCartState.cartItems,
        shipping: intialShippingState.shippingInfo,
        newOrder: [],
        orders: [],
        orderDetail: [],
        allReviews: [],
        singleUser: [],
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.loading = true
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = null
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
            // console.log("into the userLogin slice")
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
        },
        [cartItems.pending]: (state, action) => {
            state.loading = true
        },
        [cartItems.fulfilled]: (state, action) => {
            state.loading = false

            // console.log('into the action')

            const item = action.payload
            let carty = current(state)

            let isItemExist = carty.cart.find(
                (i) => i.product === item.product
            )
            // console.log(item, "itemitem")

            if (isItemExist !== undefined) {
                state.cart = state.cart.map((i) =>
                    i.product === item.product ? item : i
                )

            } else {
                state.cart = [...state?.cart || [], item]
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
            // console.log('exit reducer')
        },
        [cartItems.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [removeCartItem.pending]: (state) => {
            state.loading = true
            state = { ...state }
        },
        [removeCartItem.fulfilled]: (state, action) => {
            state.loading = false
            state.cart = state.cart.filter((i) => i.product !== action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
            // state.userInfo = action.payload
        },
        [removeCartItem.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [saveShipping.pending]: (state) => {
            state.loading = true
            state = { ...state }
        },
        [saveShipping.fulfilled]: (state, action) => {
            state.loading = false
            state.shipping = action.payload
            state.error = null
            localStorage.setItem('shippingInfo', JSON.stringify(state.shipping))
            // state.userInfo = action.payload
        },
        [saveShipping.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [clearErrors.pending]: (state) => {
            // state.isAuthenticate = true
            state.loading = true
        },
        [clearErrors.fulfilled]: (state, action) => {
            state.error = null
            state.loading = false
        },
        [clearErrors.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false

        },
        [newOrder.pending]: (state) => {
            state.loading = true
        },
        [newOrder.fulfilled]: (state, action) => {
            state.newOrder = action.payload
            state.loading = false
        },
        [newOrder.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
        [getOrders.fulfilled]: (state, action) => {
            state.orders = action.payload
            state.loading = false
        },
        [getOrders.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [getOrderDetail.pending]: (state) => {
            state.loading = true
        },
        [getOrderDetail.fulfilled]: (state, action) => {
            state.orderDetail = action.payload
            state.loading = false
        },
        [getOrderDetail.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [createProductReview.pending]: (state) => {
            state.loading = true
        },
        [createProductReview.fulfilled]: (state, action) => {
            state.loading = false
        },
        [createProductReview.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [getProductReview.pending]: (state) => {
            state.loading = true
        },
        [getProductReview.fulfilled]: (state, action) => {
            state.loading = false
            state.allReviews = action.payload
        },
        [getProductReview.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [getAdminAllProducts.pending]: (state) => {
            state.loading = true
        },
        [getAdminAllProducts.fulfilled]: (state, action) => {
            state.loading = false
            state.products = action.payload
        },
        [getAdminAllProducts.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [createAdminProduct.pending]: (state) => {
            state.loading = true
        },
        [createAdminProduct.fulfilled]: (state, action) => {
            state.loading = false
        },
        [createAdminProduct.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [deleteProduct.pending]: (state) => {
            state.loading = true
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false
        },
        [deleteProduct.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [updateProduct.pending]: (state) => {
            state.loading = true
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false

        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [getAllOrders.pending]: (state) => {
            state.loading = true
        },
        [getAllOrders.fulfilled]: (state, action) => {
            state.orders = action.payload
            state.loading = false
        },
        [getAllOrders.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [updateOrder.pending]: (state) => {
            state.loading = true
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.loading = false
        },
        [updateOrder.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [deleteOrder.pending]: (state) => {
            state.loading = true
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.loading = false
        },
        [deleteOrder.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [allUser.pending]: (state) => {
            state.loading = true
        },
        [allUser.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        [allUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [singleUserDetail.pending]: (state) => {
            state.loading = true
        },
        [singleUserDetail.fulfilled]: (state, action) => {
            state.loading = false
            state.singleUser = action.payload
        },
        [singleUserDetail.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [updateUsers.pending]: (state) => {
            state.loading = true
        },
        [updateUsers.fulfilled]: (state, action) => {
            state.loading = false
        },
        [updateUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [getReview.pending]: (state, action) => {
            state.loading = false
        },
        [getReview.fulfilled]: (state, action) => {
            state.loading = false
            state.allReviews = action.payload
        },
        [getReview.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [deleteReview.pending]: (state, action) => {
            state.loading = false
        },
        [deleteReview.fulfilled]: (state, action) => {
            state.loading = false
        },
        [deleteReview.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export default productSlice.reducer