import { Container, Link, Typography } from "@mui/material";
import React from "react";

const ErrorPage = () => {
  return (
    <Container fluid>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        sx={{ margin: 10, marginBottom: 0, textAlign: "center" }}
      >
        404 PAGE NOT FOUND
        <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" href="http://localhost:3000/">
            HOME PAGE REDIRECTION
          </Link>{" "}
        </Typography>
      </Typography>
    </Container>
  );
};

export default ErrorPage;
