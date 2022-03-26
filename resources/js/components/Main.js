import React, { Component, useState, lazy } from "react";
import ReactDOM from "react-dom";

// Mui
import {
  Drawer,
  Divider,
  AppBar,
  Toolbar,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import TransactionIcon from "@material-ui/icons/ImportExport";
import DocumentIcon from "@material-ui/icons/Description";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import MasterDompet from "/resources/js/components/Master/Dompet";
import MasterKategori from "/resources/js/components/Master/Kategori";
import TransMasuk from "/resources/js/components/Transaksi/Masuk";
import TransKeluar from "/resources/js/components/Transaksi/Keluar";
import Laporan from "/resources/js/components/Laporan/Laporan";

/* An example React component */
function Main() {
  const [open, setOpen] = useState(false);
  const [collapseMaster, setCollapseMaster] = useState(false);
  const [collapseTransaction, setCollapseTransaction] = useState(false);
  const [collapseLaporan, setCOllapseLaporan] = useState(false);
  const [content, setContent] = useState(0);

  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCollapseMaster = () => {
    setCollapseMaster(!collapseMaster);
  };

  const handleCollapseTransaction = () => {
    setCollapseTransaction(!collapseTransaction);
  };

  const handleCollapseLaporan = () => {
    setCOllapseLaporan(!collapseLaporan);
  };

  const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(5),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  }));

  const handleContent = (state) => {
    switch (state) {
      case 1:
        return <MasterKategori />;
      case 2:
        return <TransMasuk />;
      case 3:
        return <TransKeluar />;
      case 4:
        return <Laporan />;

      default:
        return <MasterDompet />;
    }
  };

  const classes = useStyles();

  return (
    <>
      <div className="d-flex">
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <h6>Dompet Mikhael</h6>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerContainer}>
            <IconButton onClick={handleDrawerClose}>
              {open === false ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>

          <List>
            <ListItem button onClick={handleCollapseMaster}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Master" />
              {collapseMaster ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={collapseMaster} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => setContent(0)}
                >
                  <ListItemText primary="Dompet" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => setContent(1)}
                >
                  <ListItemText primary="Kategori" />
                </ListItem>
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleCollapseTransaction}>
              <ListItemIcon>
                <TransactionIcon />
              </ListItemIcon>
              <ListItemText primary="Transaksi" />
              {collapseTransaction ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={collapseTransaction} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => setContent(2)}
                >
                  <ListItemText primary="Dompet Masuk" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => setContent(3)}
                >
                  <ListItemText primary="Dompet Keluar" />
                </ListItem>
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleCollapseLaporan}>
              <ListItemIcon>
                <DocumentIcon />
              </ListItemIcon>
              <ListItemText primary="Laporan" />
              {collapseLaporan ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={collapseLaporan} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => setContent(4)}
                >
                  <ListItemText primary="Laporan Transaksi" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Drawer>

        {/* Content */}
        <div className={classes.content}>
          <div className={classes.toolbar} />
          {handleContent(content)}
        </div>
      </div>
    </>
  );
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
 */

if (document.getElementById("root")) {
  ReactDOM.render(<Main />, document.getElementById("root"));
}
