import React, { useEffect } from 'react'
import DashboardSidebar from './DashboardSidebar'
import img from '../assets/logo.png'
import { Link, useParams } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from 'react-redux'
import { allUser, clearErrors, deleteUser } from '../featrues/productSlice';
import { useAlert } from 'react-alert'

const AdminUsers = () => {
  let alerts = useAlert()
  const params = useParams()
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    return state.app
  })

  console.log(data, "datadata")

  useEffect(() => {
    dispatch(allUser())
  }, [dispatch])

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      // cellClassName: (params) => {
      //   return params.getValue(params.id, "role") === "admin"
      //     ? "greenColor"
      //     : "redColor";
      // },
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
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon />
            </Link >

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

  for (let i = 0; i < data?.user?.data?.users?.length; i++) {
    rows.push({
      id: data?.user?.data?.users[i]._id,
      email: data?.user?.data?.users[i].email,
      name: data?.user?.data?.users[i].name,
      role: data?.user?.data?.users[i].role,
    })
  }

  const handleDelete = (id) => {
    console.log(id, "id")
    if (data?.error != null) {
      alerts.error(data?.error?.message)
      dispatch(clearErrors())
    }

    dispatch(deleteUser(id))
  }

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

export default AdminUsers