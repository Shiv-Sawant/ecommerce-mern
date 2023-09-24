import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { clearErrors, getOrders } from '../featrues/productSlice';
import { Link } from 'react-router-dom';
import LaunchIcon from "@material-ui/icons/Launch";


const Orders = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => {
        return state.app
    })

    console.log(data, "all orders    ")


    const columns = [
        { field: "id", headername: "Order ids", minWidth: 300, flex: 1 },
        { field: "status", headername: "Status", minWidth: 300, flex: 0.5, cellClassName: (params) => { return (params.row.status === 'Processing' ? "greencolor" : "redcolor") } },
        { field: "itemsQuantity", headername: "Items Qty", minWidth: 300, flex: 0.3 },
        { field: "amount", headername: "Amount", minWidth: 300, flex: 0.5 },
        { field: "actions", headername: "Actions", minWidth: 300, flex: 0.3, sortable: false, renderCell: (params) => { return (<Link to={`/order/${params.id}`} style={{ color: "black" }}><LaunchIcon /></Link>) } },
    ]

    const rows = []

    for (let i = 0; i < data?.orders?.data?.order?.length; i++) {
        rows.push({
            id: data?.orders?.data?.order[i]._id,
            status: data?.orders?.data?.order[i].orderStatus,
            itemsQuantity: data?.orders?.data?.order[i]?.orderItems.length,
            amount: Math.round(data?.orders?.data?.order[i].totalPrice),
        })
    }

    console.log(rows,"rowrow")

    useEffect(() => {
        dispatch(getOrders())
        dispatch(clearErrors())
    }, [dispatch])

    return (
        <div className='order-container'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
            />

        </div>
    )
}

export default Orders