import { Box, Container, Link, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="h6" color={"white"} align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://syedsamsudeen.netlify.app/">
        A Syed Samsudeen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 1,
          backgroundColor: "#1976D2"
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h6" align="center" gutterBottom color={"white"}>
            Thank You
          </Typography>
          <Copyright  />
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
