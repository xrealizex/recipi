import React from "react";
import { Box, Container, Grid } from "@chakra-ui/react";
import { Header } from "../layouts/Header";
import { Outlet } from "react-router-dom";

// 全てのページで共通となるレイアウト
export const CommonLayout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxW="container.lg" mt="3rem">
          <Grid templateColumns="1fr" justifyContent="center">
            <Box>
            <Outlet />
            </Box>
          </Grid>
        </Container>
      </main>
    </>
  );
};
