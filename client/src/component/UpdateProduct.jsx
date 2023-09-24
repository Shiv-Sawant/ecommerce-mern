import React, { useEffect, useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import { Link, useParams } from "react-router-dom";
import img from '../assets/logo.png'
import Loader from './Loader'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, productDetail, updateProduct } from '../featrues/productSlice';

const UpdateProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alerts = useAlert()
  const data = useSelector((state) => {
    return state.app
  })
  const [file, setFile] = useState([data?.productDetails?.data?.product?.images[0].url])

  const [createProductInput, setCreateProductInput] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageInput: null
  })

  console.log(data, "datadata")

  const params = useParams()
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  let updateData = {
    id: params.id,
    name: createProductInput.name,
    price: createProductInput.price,
    description: createProductInput.description,
    category: createProductInput.category,
    Stock: createProductInput.stock,
    images: [
      {
        public_id: "updated id",
        url: file[0]
      }
    ]
  }

  const handleUpdate = () => {
    dispatch(updateProduct({ updateData, id: params.id }))

    navigate('/admin/products')
    alerts.success('product updated successfully')
  }

  const handleImage = (e) => {
    const files = Array.from(e.target.files)

    setFile([])
    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFile((prevState) => [...prevState, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })

  }

  let prodId = params.id

  useEffect(() => {
    if (data?.productDetails?.data?.product._id !== prodId) {
      dispatch(productDetail(params.id))
    } else {
      setCreateProductInput({
        name: data?.productDetails?.data?.product?.name,
        price: data?.productDetails?.data?.product?.price,
        description: data?.productDetails?.data?.product?.description,
        category: data?.productDetails?.data?.product?.category,
        stock: data?.productDetails?.data?.product?.Stock,
        imageInput: data?.productDetails?.data?.product?.images[0].url
      })
    }

    if (data?.error !== null) {
      alerts.error(data?.error?.message)
      dispatch(clearErrors())
    }


  }, [dispatch, data])

  return (
    <>
      {
        data.loading ?
          <>
            <Loader />
          </>
          :
          <div className='dashoardcontainer'>
            <div className='dashboardnavbar'>
              <Link to='/admin/dashboard'>
                <img src={img} alt="" />
              </Link>
            </div>
            <div className='dashboarddivided'>
              <DashboardSidebar />
              <div className='createproducts'>
                <form action="">
                  <div className='createbox'>
                    <div><h1>Update Product</h1></div>

                    <div>
                      <SpellcheckIcon />
                      <input type="text" value={createProductInput.name} placeholder='Product Name' onChange={(e) => { setCreateProductInput((prevState) => ({ ...prevState, name: e.target.value })) }} />
                    </div>

                    <div>
                      <AttachMoneyIcon />
                      <input type="text" value={createProductInput.price} placeholder='Price' onChange={(e) => { setCreateProductInput((prevState) => ({ ...prevState, price: e.target.value })) }} />
                    </div>

                    <div>
                      <DescriptionIcon />
                      <input type="text" value={createProductInput.description} placeholder='Product Description' onChange={(e) => { setCreateProductInput((prevState) => ({ ...prevState, description: e.target.value })) }} />
                    </div>

                    <div>
                      <AccountTreeIcon />
                      <select type="text" value={createProductInput.category} placeholder='Product Category' onChange={(e) => { setCreateProductInput((prevState) => ({ ...prevState, category: e.target.value })) }} >
                        <option value="">Product Category</option>
                        {
                          categories.map((options) => (
                            <option value={options}>{options}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div>
                      <StorageIcon />
                      <input type="text" value={createProductInput.stock} placeholder='Stock' onChange={(e) => { setCreateProductInput((prevState) => ({ ...prevState, stock: e.target.value })) }} />
                    </div>

                    <div>
                      <input type="file" id='avatar' accept='image/*' multiple name='avatar' className='createproductfileinput' onChange={(e) => {
                        handleImage(e)
                      }} />
                    </div>

                    <div>
                      img
                    </div>

                    <div>
                      <button onClick={handleUpdate}>
                        Update
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>


          </div>
      }
    </>

  )
}

export default UpdateProduct