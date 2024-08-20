//import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cuadro from "../components/pulseras/pulseras";
import Navbar from "../components/navbar/Navbar";
import { Grid } from "@mui/joy";
import Sidebar from "../components/sidebar/Sidebar";
import { styled } from "@mui/material";

function Main() {
    return (
        <>
        <Navbar />
        <ContentLayout />
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={8}>
            <Cuadro />
          </Grid>
          <Grid xs={4}>
            <Sidebar />
          </Grid>
        </Grid>
        
        </>
    )
}

/* Material UI styled components */
const ContentLayout = styled("div")(({ theme }) => ({
    // necessary for content to be below app bar
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

export default Main;