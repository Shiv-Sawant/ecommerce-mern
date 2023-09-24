import React from 'react'
import { Link } from "react-router-dom";

import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
const DashboardSidebar = () => {
    return (
        
        <div className='dashboardsidebar'>

            <Link to='/admin/dashboard'>
                <h2><DashboardIcon />Dashboard</h2>
            </Link>

            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>

            <Link to="/admin/orders">
                <h2>
                    <ListAltIcon />
                    Orders</h2>
            </Link>


            <Link to="/admin/Users">
                <h2><PeopleIcon />Users</h2>
            </Link>


            <Link to="/admin/Reviews">
                <h2>  <RateReviewIcon />Reviews</h2>
            </Link>
        </div>
    )
}

export default DashboardSidebar