import React, { useEffect, useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import img from '../assets/logo.png'
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteReview, getReview } from '../featrues/productSlice';

const AdminAllReviews = () => {
  const dispatch = useDispatch()
  const alerts = useAlert()
  const [searchInput, setSearchInput] = useState([])
  const data = useSelector((state) => {
    return state.app
  })

  // console.log(data, "datadatadata")

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      // cellClassName: (params) => {
      //   return params.getValue(params.id, "rating") >= 3
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
        // console.log(params)
        return (
          <>
            <button
              onClick={() => handleDelete(params.row.id, searchInput)}
            >
              <DeleteIcon />
            </button>
          </>
        );
      },
    },
  ];
  const handleDelete = (reviewId, productId) => {
    // console.log(reviewId, productId)
    dispatch(deleteReview({ productId: productId, id: reviewId }))

    if (data?.error != null) {
      alerts.error(data?.error?.message)
      dispatch(clearErrors())
    }

    alerts.success('review deleted successfully')
  }

  const rows = [];
  const handleSearch = () => {
    dispatch(getReview(searchInput))
    if (data?.error != null) {
      alerts.error(data?.error?.message)
      dispatch(clearErrors())
    }
  }

  for (let i = 0; i < data?.allReviews?.data?.reviews.length; i++) {
    rows.push({
      id: data?.allReviews?.data?.reviews[i]._id,
      user: data?.allReviews?.data?.reviews[i].user,
      comment: data?.allReviews?.data?.reviews[i].comment,
      rating: data?.allReviews?.data?.reviews[i].rating,
    })
  }

  useEffect(() => {
    if (data?.error != null) {
      alerts.error(data?.error?.message)
      dispatch(clearErrors())
    }
  }, [dispatch, data, searchInput, handleDelete])

  return (
    <div className='dashoardcontainer'>
      <div className='dashboardnavbar'>
        <Link to='/admin/dashboard'>
          <img src={img} alt="" />
        </Link>
      </div>
      <div className='dashboarddivided'>
        <DashboardSidebar />

        <div className='reviewcontainer'>
          <div className='reviewcontainer-firstdiv'>
            <div><h1>ALL REVIEWS</h1></div>
            <div><Star className='review-svg' /><input type="text" placeholder='Search Product' onChange={(e) => setSearchInput(e.target.value)} /></div>
            <div><button onClick={handleSearch}>SEARCH</button></div>
          </div>

          <div className=''>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              // disableSelectionOnClick
              className=""
              autoHeight
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAllReviews