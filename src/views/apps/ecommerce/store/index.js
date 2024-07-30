// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { getRandomInt, paginateArray, randomDate, sortCompare, nextWeek, nextDay} from "@src/@fake-db/utils"
import { Assets } from "@src/assets/images"

const data = {
  products: [
    {
      id: 1,
      name: 'Pot of Tea or Coffee',
      description: 'A pot of freshly brewed tea or coffee, served with a selection of accompaniments including milk, sugar, and lemon.',
      price: 400.0,
      discount: 5.0,
      image: Assets.cofee,
      subCategory: 'TEA_COFFEE',
      mainCategory: 'TEA_TIME',
      mealType: 'SRI_LANKAN',
      status: 'ACTIVE',
      rating: 3,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    },
    {
      id: 2,
      name: 'Water Melon with Lime',
      description: 'A refreshing drink made with fresh watermelon juice and a hint of lime, perfect for a hot day.',
      price: 600.0,
      discount: 0.0,
      image: Assets.watermelon,
      subCategory: 'FRESH_JUICE',
      mainCategory: 'BREAKFAST',
      mealType: 'SRI_LANKAN',
      status: 'ACTIVE',
      rating: 5,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    },
    {
      id: 3,
      name: 'Mongolian Rice',
      description: 'A savory rice dish cooked with a mix of vegetables, eggs, and a variety of meats, seasoned with a special Mongolian sauce.',
      price: 1400.0,
      discount: 10.0,
      image: Assets.mongoliyan,
      subCategory: 'EXTRA',
      mainCategory: 'DINNER',
      mealType: 'SRI_LANKAN',
      status: 'ACTIVE',
      rating: 4,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    },
    {
      id: 4,
      name: 'Fruit Salad with Ice Cream',
      description: 'A delightful mix of fresh seasonal fruits served with a scoop of vanilla ice cream and drizzled with a honey-lime dressing.',
      price: 800.0,
      discount: 5.0,
      image: Assets.fruitesalad,
      subCategory: 'DESSERT',
      mainCategory: 'LUNCH',
      mealType: 'SRI_LANKAN',
      status: 'ACTIVE',
      rating: 5,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    },
    {
      id: 5,
      name: 'Chicken Sandwich',
      description: 'A delicious sandwich filled with grilled chicken, fresh lettuce, tomatoes, and a creamy mayonnaise sauce, served on a toasted bun.',
      price: 900.0,
      discount: 2.0,
      image: Assets.sandwich,
      subCategory: 'SANDWICH',
      mainCategory: 'BREAKFAST',
      mealType: 'FRENCH',
      status: 'ACTIVE',
      rating: 4,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    },
    {
      id: 6,
      name: 'Beef Spaghetti Carbonara',
      description: 'A classic Italian pasta dish made with tender beef strips, creamy egg-based sauce, parmesan cheese, and a touch of black pepper.',
      price: 1600.0,
      discount: 5.0,
      image: Assets.spaghetti,
      subCategory: 'INTERNATIONAL',
      mainCategory: 'LUNCH',
      mealType: 'ITALIAN',
      status: 'ACTIVE',
      rating: 5,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    },
    {
      id: 7,
      name: 'Tom Yam Gong Soup',
      description: 'A spicy and sour Thai soup with shrimp, mushrooms, and a blend of lemongrass, kaffir lime leaves, galangal, lime juice, fish sauce, and crushed chili peppers.',
      price: 1200.0,
      discount: 8.0,
      image: Assets.soup,
      subCategory: 'STARTERS_SOUP',
      mainCategory: 'BREAKFAST',
      mealType: 'FRENCH',
      status: 'ACTIVE',
      rating: 4,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    },
    {
      id: 8,
      name: 'Chicken Biriyani',
      description: 'Aromatic basmati rice cooked with tender pieces of chicken, flavored with saffron, and a blend of spices, garnished with fried onions and fresh coriander.',
      price: 1800.0,
      discount: 11.0,
      image: Assets.biriyani,
      subCategory: 'BIRIYANI',
      mainCategory: 'LUNCH',
      mealType: 'INDIAN',
      status: 'ACTIVE',
      rating: 5,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    },
    {
      id: 9,
      name: 'Grilled Chicken Coated Mushroom Sauce',
      description: 'Juicy grilled chicken breasts coated in a creamy mushroom sauce, served with a side of sautéed vegetables and mashed potatoes.',
      price: 2000.0,
      discount: 12.0,
      image: Assets.chicken,
      subCategory: 'CHICKEN',
      mainCategory: 'DINNER',
      mealType: 'SRI_LANKAN',
      status: 'ACTIVE',
      rating: 4,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    },
    {
      id: 10,
      name: 'Seafood & Herbs Salad',
      description: 'A refreshing salad with a mix of seafood including shrimp, squid, and mussels, tossed with fresh herbs, greens, and a tangy dressing.',
      price: 1500.0,
      discount: 6.0,
      image: Assets.salad,
      subCategory: 'SALAD',
      mainCategory: 'LUNCH',
      mealType: 'SRI_LANKAN',
      status: 'ACTIVE',
      rating: 5,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    },
    {
      id: 11,
      name: 'Grilled Pork Chop',
      description: 'Succulent pork chops grilled to perfection, served with a smoky BBQ sauce, and accompanied by roasted vegetables and garlic bread.',
      price: 2200.0,
      discount: 15.0,
      image: Assets.pork,
      subCategory: 'BBQ',
      mainCategory: 'DINNER',
      mealType: 'SRI_LANKAN',
      status: 'ACTIVE',
      rating: 4,
      createdDate: '2024-07-24T01:04:22.000+00:00',
      updatedDate: '2024-07-24T01:05:07.000+00:00'
    }
  ],
  userWishlist: [],
  userCart: []
}


export const getProducts = createAsyncThunk('appEcommerce/getProducts', async params => {
  // Extract parameters
  const { q = '', sortBy = 'featured', perPage = 9, page = 1 } = params

  const queryLowered = q.toLowerCase()

  // Filter products based on the query
  const filteredData = data.products.filter(product => product.name.toLowerCase().includes(queryLowered))

  let sortDesc = false
  const sortByKey = (() => {
    if (sortBy === 'price-desc') {
      sortDesc = true
      return 'price'
    }
    if (sortBy === 'price-asc') {
      return 'price'
    }
    sortDesc = true
    return 'id'
  })()

  // Sort filtered data
  const sortedData = filteredData.sort(sortCompare(sortByKey))
  if (sortDesc) sortedData.reverse()

  // Paginate sorted data
  const paginatedData = JSON.parse(JSON.stringify(paginateArray(sortedData, perPage, page)))

  // Add wishlist and cart information
  paginatedData.forEach(product => {
    product.isInWishlist = data.userWishlist.findIndex(p => p.productId === product.id) > -1
    product.isInCart = data.userCart.findIndex(p => p.productId === product.id) > -1
  })

  // Simulate the response structure
  const response = {
    products: paginatedData,
    total: filteredData.length,
    userWishlist: data.userWishlist,
    userCart: data.userCart
  }

  return { params, data: response }
})

export const getProduct = createAsyncThunk('appEcommerce/getProduct', async id => {


  const productId = Number(id)

  // Find the product by ID
  const productIndex = data.products.findIndex(p => p.id === productId)
  const product = data.products[productIndex]

  if (product) {
    // Add data of wishlist and cart
    product.isInWishlist = data.userWishlist.findIndex(p => p.productId === product.id) > -1
    product.isInCart = data.userCart.findIndex(p => p.productId === product.id) > -1

    // Add Dummy data for details page
    product.colorOptions = ['primary', 'success', 'warning', 'danger', 'info']

    return { product }
  } else {
    throw new Error('Product not found')
  }
})

export const addToCart = createAsyncThunk('appEcommerce/addToCart', async (id, { dispatch, getState }) => {

  const productId = id

  // Get the length of the user cart
  const { length } = data.userCart
  let lastId = 0
  if (length) lastId = data.userCart[length - 1].i

  // Add the new product to the cart
  data.userCart.push({
    id: lastId + 1,
    productId,
    qty: 1
  })

  // Dispatch the getProducts action to refresh the product list
  await dispatch(getProducts(getState().ecommerce.params))

  // Return a successful response
  return { id: lastId + 1, productId, qty: 1 }
})

export const getCartItems = createAsyncThunk('appEcommerce/getCartItems', async () => {
  try {
    const products = data.userCart.map(cartProduct => {
      // Find the product in the data.products array
      const product = data.products.find(p => p.id === cartProduct.productId)

      if (!product) {
        console.log("Product not found -- ", cartProduct.productId)
        return null
      }

      // Create a new object with additional properties
      return {
        ...product,
        isInWishlist: data.userWishlist.some(p => p.productId === cartProduct.productId),
        qty: cartProduct.qty,
        shippingDate: randomDate(nextDay, nextWeek),
        offers: getRandomInt(1, 4),
        discountPercentage: getRandomInt(3, 20),
        totalPrice: product.price * cartProduct.qty
      }
    }).filter(Boolean) // Filter out any null values

    // Return the products in the cart
    return { products }
  } catch (error) {
    console.error("Error in getCartItems thunk -- ", error)
    throw error // Re-throw the error to handle it in the component or store
  }
})

export const deleteCartItem = createAsyncThunk('appEcommerce/deleteCartItem', async (id, { dispatch }) => {
  // Extract productId from id if id is a string
  let productId = id

  // Convert productId to number
  productId = Number(productId)

  // Find the product index by productId
  const productIndex = data.userCart.findIndex(i => i.productId === productId)


  // If the product exists, remove it from the cart
  if (productIndex > -1) {
    data.userCart.splice(productIndex, 1)

  }

  // Dispatch the getCartItems action to update the cart items
  dispatch(getCartItems())

  // Return the id of the deleted product
  return id
})


export const updateCartItemQty = createAsyncThunk('appEcommerce/updateCartItemQty', async ({ id, qty }, { dispatch }) => {
  const productIndex = data.userCart.findIndex(i => i.productId === id)
  if (productIndex > -1) {
    data.userCart[productIndex].qty = qty
  }
  dispatch(getCartItems())
  return { id, qty }
})

export const getWishlistItems = createAsyncThunk('appEcommerce/getWishlistItems', async () => {
  try {

    const products = data.userWishlist.map(wishlistProduct => {

      const product = data.products.find(p => p.id === wishlistProduct.productId)

      if (!product) {
        console.log("Product not found -- ", wishlistProduct.productId)
        return null
      }

      return {
        ...product,
        isInCart: data.userCart.some(p => p.productId === wishlistProduct.productId)
      }
    }).filter(Boolean)

    // Return the products in the wishlist
    return { products }
  } catch (error) {
    console.error("Error in getWishlistItems thunk -- ", error)
    throw error // Re-throw the error to handle it in the component or store
  }
})

export const deleteWishlistItem = createAsyncThunk('appEcommerce/deleteWishlistItem', async (id, { dispatch }) => {
  // Directly manipulate the data object
  const productIndex = data.userWishlist.findIndex(i => i.productId === id)
  if (productIndex > -1) {
    data.userWishlist.splice(productIndex, 1)
  }

  // Dispatch the getWishlistItems action to update the state
  dispatch(getWishlistItems())

  return { success: true } // Return a success response or modify as needed
})

export const addToWishlist = createAsyncThunk('appEcommerce/addToWishlist', async id => {

  const productId = Number(id)
  // Directly implement the logic to add an item to the wishlist
  const { length } = data.userWishlist
  let lastId = 0
  if (length) lastId = data.userWishlist[length - 1].i // Use 'id' for consistency

  data.userWishlist.push({
    id: lastId + 1,
    productId: Number(productId)
  })


  return id

})


export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    cart: [],
    params: {},
    products: [],
    wishlist: [],
    totalProducts: 0,
    productDetail: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.params = action.payload.params
        state.products = action.payload.data.products
        state.totalProducts = action.payload.data.total
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.wishlist = action.payload.products
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload.products
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.product
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        const { id, qty } = action.payload
        const productIndex = state.cart.findIndex(i => i.id === id)
        if (productIndex > -1) state.cart[productIndex].qty = qty
      })
  }
})

export default appEcommerceSlice.reducer