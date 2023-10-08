import React, { useEffect, useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import { Link } from "react-router-dom";
import img from '../assets/logo.png'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createAdminProduct } from '../featrues/productSlice';

const AdminCreateProducts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alerts = useAlert()
  const [file, setFile] = useState([])
  const [createProductInput, setCreateProductInput] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageInput: null
  })

  // console.log(createProductInput, "createProductInputcreateProductInput")

  const data = useSelector((state) => {
    return state.app
  })

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

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

  const handleCreate = (e) => {
    e.preventDefault()
    dispatch(createAdminProduct({
      name: createProductInput.name,
      price: createProductInput.price,
      description: createProductInput.description,
      category: createProductInput.category,
      Stock: createProductInput.stock,
      images: file[0]
    }))

    if (data?.error === null) {
      alerts.success('product created successfully')
    }

    navigate('/admin/dashboard')
  }

  useEffect(() => {
    if (data?.error != null) {
      alerts.error(data?.error?.message)
      dispatch(clearErrors())
    }

  }, [dispatch, data?.error])



  return (
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
              <div><h1>Create Product</h1></div>

              <div>
                <SpellcheckIcon />
                <input type="text" placeholder='Product Name' onChange={(e) => setCreateProductInput((prevState) => ({ ...prevState, name: e.target.value }))} />
              </div>

              <div>
                <AttachMoneyIcon />
                <input type="text" placeholder='Price' onChange={(e) => setCreateProductInput((prevState) => ({ ...prevState, price: e.target.value }))} />
              </div>

              <div>
                <DescriptionIcon />
                <input type="text" placeholder='Product Description' onChange={(e) => setCreateProductInput((prevState) => ({ ...prevState, description: e.target.value }))} />
              </div>

              <div>
                <AccountTreeIcon />
                <select type="text" placeholder='Product Category' onChange={(e) => setCreateProductInput((prevState) => ({ ...prevState, category: e.target.value }))} >
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
                <input type="text" placeholder='Stock' onChange={(e) => setCreateProductInput((prevState) => ({ ...prevState, stock: e.target.value }))} />
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
                <button onClick={handleCreate}>
                  Create
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>


    </div>
  )
}

export default AdminCreateProducts