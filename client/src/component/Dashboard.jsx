import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import img from '../assets/logo.png'
import { Chart, registerables } from 'chart.js';
import DashboardSidebar from './DashboardSidebar';
import { useDispatch, useSelector } from 'react-redux'
import { allUser, clearErrors, getAdminAllProducts, getAllOrders } from '../featrues/productSlice';
import { useAlert } from 'react-alert'
Chart.register(...registerables);

const Dashboard = () => {
  const data = useSelector((state) => {
    return state.app
  })

  console.log(data,"dashboard")
  const alerts = useAlert()
  const dispatch = useDispatch()

  let outOfStock = 0

  for (let i = 0; i < data?.products?.data?.products.length; i++) {
    if (data?.products?.data?.products[i].Stock <= 0) {
      outOfStock += 1
    }
  }

  console.log(outOfStock,"outOfStock")


  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, data?.products?.data?.products.length - outOfStock],
      },
    ],
  };

  useEffect(() => {
    dispatch(getAdminAllProducts())
    dispatch(getAllOrders())
    dispatch(allUser())

    if (data?.error) {
      alerts.error(data?.error?.message)
      dispatch(clearErrors())
    }
  }, [dispatch, data?.error])


  return (
    <div className='dashoardcontainer'>

      <div className='dashboardnavbar'>
        <Link to='/admin/dashboard'>
          <img src={img} alt="" className='dashoardcontainerimg' />
        </Link>
      </div>

      <div className='dashboarddivided'>

        <DashboardSidebar />

        <div className='dashboardmain'>

          <div className='dashboardmain-header'>
            <h4>
              Total Amount
            </h4>
            <h4>
              20000
            </h4>
          </div>

          <div className='dashboardmain-buttons'>
            <button className='button-1'>
              <span>Product</span>
              <span>{data?.products?.data?.products?.length}</span>
            </button>

            <button className='button-2'>
              <span>Orders</span>
              <span>{data?.orders?.data?.order?.length}</span>
            </button>

            <button className='button-3'>
              <span>Users</span>
              <span>{data?.user?.data?.users?.length}</span>
            </button>
          </div>

          <div className='linechart'>
            <Line data={lineState} className='linech' />
          </div>

          <div className='donutchart'>
            <Doughnut data={doughnutState} />
          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard