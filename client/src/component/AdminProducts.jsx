import React, { useEffect } from 'react'
import DashboardSidebar from './DashboardSidebar'
import img from '../assets/logo.png'
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteProduct, getAdminAllProducts } from '../featrues/productSlice';
import { useAlert } from 'react-alert'

const AdminProducts = () => {
  const data = useSelector((state) => {
    return state.app
  })
  const alerts = useAlert()
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
    alerts.success('product deleted successfully')
  }

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params?.row?.id}`}>
              <EditIcon />
            </Link>

            <button
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </button>
          </>
        );
      },
    },
  ];

  const rows = []

  // console.log(data.products.data.products.length)

  for (let i = 0; i < data?.products?.data?.products.length; i++) {
    rows.push({
      id: data?.products?.data?.products[i]._id,
      name: data?.products?.data?.products[i].name,
      stock: data?.products?.data?.products[i].Stock,
      price: data?.products?.data?.products[i].price,
    })
  }

  useEffect(() => {
    dispatch(getAdminAllProducts())

    if (data?.error != null) {
      alerts.error(data?.error?.message)
      dispatch(clearErrors())
    }
  }, [dispatch])


  return (
    <>
      <div className='dashoardcontainer'>
        <div className='dashboardnavbar'>
          <Link to='/admin/dashboard'>
            <img src={img} alt="" />
          </Link>
        </div>
        <div className='dashboarddivided'>
          <DashboardSidebar />

          <div className='adminproductcontainer'>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className=""
              autoHeight
            />
          </div>
        </div>
      </div>
    </>

  )
}

export default AdminProducts