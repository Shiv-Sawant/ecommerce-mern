import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
    const data = useSelector((state) => {
        return state.app
    })

    console.log(data, "protected route")

    return (
        <>
            {
                console.log("into protected ")

            }
            {
                data.loading === false && (
                    <Routes>
                        <Route
                            path='/process/payment'
                            {...rest}
                            render={(props) => {
                                if (data?.isAuthenticate === false) {
                                    return <Navigate to="/login" />
                                }

                                if (isAdmin === true && data?.userInfo?.data?.user?.role !== 'admin') {
                                    return <Navigate to="/login" />
                                }

                                return <Element {...props} />
                            }}
                        />
                    </Routes>
                )
            }
        </>
    )
}

export default ProtectedRoute