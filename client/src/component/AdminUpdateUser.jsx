import React, { useEffect, useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import { Link, useParams } from "react-router-dom";
import img from '../assets/logo.png'
import Loader from './Loader'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, singleUserDetail, updateUsers } from '../featrues/productSlice';

const AdminUpdateUser = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const alerts = useAlert()
    const data = useSelector((state) => {
        return state.app
    })
    const [updateUser, setUpdateUser] = useState({
        name: "",
        email: "",
        role: "",

    })

    const handleUpdate = () => {

        dispatch(updateUsers({
            id: params.id,
            updateUser
        }))

        if (data?.error != null) {
            alerts.error(data?.error?.message)
        }

        alerts.success('user updated successfully')
        navigate('/admin/Users')

    }

    useEffect(() => {
        if (data?.singleUser?.data?.user?._id != params.id) {
            dispatch(singleUserDetail(params.id))
        } else {
            setUpdateUser({
                name: data?.singleUser?.data?.user?.name,
                email: data?.singleUser?.data?.user?.email,
                role: data?.singleUser?.data?.user?.role,
            })
        }

        if (data?.error != null) {
            alerts.error(data?.error?.message)
            dispatch(clearErrors())
        }

    }, [dispatch, alerts, navigate, params.id, data])

    // console.log(updateUser, "updateUserupdateUserupdateUser")

    return (
        <>
            {
                data?.loading !== false ?
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
                                        <div><h1>Update User</h1></div>

                                        <div>
                                            <PersonIcon />
                                            <input type="text" value={updateUser.name} placeholder='Name' onChange={(e) => { setUpdateUser((prevState) => ({ ...prevState, name: e.target.value })) }} />
                                        </div>

                                        <div>
                                            <MailOutlineIcon />
                                            <input type="text" value={updateUser.email} placeholder='Email' onChange={(e) => { setUpdateUser((prevState) => ({ ...prevState, email: e.target.value })) }} />
                                        </div>

                                        <div>
                                            <VerifiedUserIcon />
                                            <input type="text" value={updateUser.role} placeholder='Role' onChange={(e) => { setUpdateUser((prevState) => ({ ...prevState, role: e.target.value })) }} />
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

export default AdminUpdateUser