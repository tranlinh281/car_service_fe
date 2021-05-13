import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import { Build, GroupAddOutlined } from "@material-ui/icons";

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Tổng quan" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Dịch Vụ" />
    </ListItem>
    <ListItem button to="/customer" component={Link}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Khách hàng" />
    </ListItem>
    <ListItem button component={Link} to="/accessories">
      <ListItemIcon>
        <Build />
      </ListItemIcon>
      <ListItemText primary="Link kiện" />
    </ListItem>
    <ListItem button to="/report" component={Link}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Báo cáo" />
    </ListItem>
    <ListItem button to="/employee" component={Link}>
      <ListItemIcon>
        <GroupAddOutlined />
      </ListItemIcon>
      <ListItemText primary="Nhân Viên" />
    </ListItem>
    <ListItem button to="/createemployee" component={Link}>
      <ListItemIcon>
        <GroupAddOutlined />
      </ListItemIcon>
      <ListItemText primary="Tạo Nhân Viên" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
