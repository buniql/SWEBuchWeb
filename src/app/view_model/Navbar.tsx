"use client";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab/Fab";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Link from "next/link";
import CreateBuchDialog from "../view_model/CreateBuchDialog";
import { Search, SearchIconWrapper, StyledInputBase } from "../theme";
import { Dialog } from "@mui/material";
import Container from "@mui/material/Container/Container";
import { SearchContext } from "../SearchContext";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { getCookie , hasCookie , deleteCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import LoginForm from "./LoginForm";

export default function Navbar() {
  
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);

    setSearchValue(event.target.value); // Wert der Eingabe aus dem Event extrahieren
  };
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    console.log(searchValue);
}, [searchValue]);

  useEffect(() => {
    async function fetchLoggedInUser() {
      if(hasCookie("auth")) {
        const auth = getCookie("auth");
        const decoded = jwt.decode(`${auth}`, { json: true }) as { username: string };
        setLoggedInUser(decoded.username);
        return decoded ? decoded.username : null;
      }
    }
    fetchLoggedInUser();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [createAnchorEl, setCreateAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isCreateOpen = Boolean(createAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    
    setAnchorEl(null);
  };

  const handleCreateClick = (event: React.MouseEvent<HTMLElement>) => {
    setCreateAnchorEl(event.currentTarget);
  };
  const handleCreateClose = () => {
    setCreateAnchorEl(null);
  };

  const handleLogout = () => {
    deleteCookie("auth");
    setLoggedInUser(null);
    handleMenuClose();
  };

  function handleLogin(username: string)  {
    setLoggedInUser(username);
    
  };
  const createId = "create-form";
  const renderCreateMenu = (
    <Menu
      anchorEl={createAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={createId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isCreateOpen}
      onClose={handleCreateClose}
      sx={{ height: "90vh"  }}
    >
      <Box sx={{px: 2}}>
      <CreateBuchDialog/>
      </Box>
    </Menu>
  );

  const logoutId = "logout-menu";
  const renderLogoutMenu = (
    loggedInUser ? 
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={logoutId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu> : <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    id={logoutId}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <LoginForm onLogin={(username) => {
      setLoggedInUser(username);
    }}/>
    </Menu>
  );

  const renderFab = (
    loggedInUser === 'admin' ? 
    <Fab
          sx={{ position: "fixed", bottom: "16px", right: "16px" }}
          color="primary"
          aria-label="add"
          onClick={handleCreateClick}
        >
          <AddIcon />
        </Fab> : null
  )

  return (
      <Box sx={{ flexGrow: 1, flexWrap: "nowrap" }}>
        <AppBar>
          <Toolbar>
          
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleInputChange}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex" }}>
            <IconButton
                color="inherit"
                href={`/`}
                LinkComponent={Link}
              >
              <AutoStoriesIcon color="inherit" />
              </IconButton>
              <IconButton
                color="inherit"
                href={`/tabelle`} // Set the href attribute
                LinkComponent={Link}
              >
                {searchValue}
                <ListAltIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={logoutId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              > 
              {loggedInUser}
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderLogoutMenu}
        {renderCreateMenu}
        {renderFab}
      </Box>
  );
}
