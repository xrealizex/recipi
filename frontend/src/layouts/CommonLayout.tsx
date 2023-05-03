import React, { ReactNode } from "react";
import { Box, Container, Grid } from "@chakra-ui/react";
import { Header } from "../layouts/Header";

type CommonLayoutProps = {
  children: ReactNode;
};

// 全てのページで共通となるレイアウト
export const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxW="container.lg" mt="3rem">
          <Grid templateColumns="1fr" justifyContent="center">
            <Box>
            {children}
            </Box>
          </Grid>
        </Container>
      </main>
    </>
  );
};
