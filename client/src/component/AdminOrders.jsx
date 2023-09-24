import React, { useEffect } from 'react'
import DashboardSidebar from './DashboardSidebar'
import img from '../assets/logo.png'
import { Link, useParams } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteOrder, deleteProduct, getAdminAllProducts, getAllOrders } from '../featrues/productSlice';
import { useAlert } from 'react-alert'
import { alertClasses } from '@mui/material';


const AdminOrders = () => {
  let alerts = useAlert()
  const params = useParams()
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    return state.app
  })

  const handleDelete = (id) => {
    dispatch(deleteOrder(id))
    alerts.success('order deleted successfully')
  }

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
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
        console.log(params, "paramsparams")
        return (
          <>
            <Link to={`/admin/order/${params.row.id}`}>
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



  const rows = [];

  for (let i = 0; i < data?.orders?.data?.order?.length; i++) {
    rows.push({
      id: data?.orders?.data?.order[i]._id,
      status: data?.orders?.data?.order[i].orderStatus,
      itemsQty: data?.orders?.data?.order[i].orderItems.length,
      amount: data?.orders?.data?.order[i].totalPrice,
    })
  }

  console.log(rows, "rows")
  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch,deleteOrder])

  return (
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
  )
}

export default AdminOrders