import { Typography, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation(); // Get current location (URL)

  // Function to check if the button is for the current page
  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        padding: "40px 0 30px 0",
        marginBottom: "30px",
        borderBottom: "1px solid #000",
        textAlign: "center", // Ensure the typography is centered
      }}
    >
      {/* Dynamic Typography based on the current page */}
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: "28px", // smaller font on mobile
            sm: "36px", // default font size for larger screens
          },
          fontWeight: "bold",
          textAlign: "center", // Center the typography
        }}
      >
        {location.pathname === "/products/cart"
          ? "Your Cart"
          : "Welcome To My Store"}
      </Typography>

      {/* Stack buttons horizontally with centered alignment */}
      <Box
        display="flex"
        justifyContent="center" // Center the buttons horizontally
        gap={2} // Space between the buttons
        sx={{ marginTop: 3 }}
      >
        <Button
          variant={isActive("/") ? "contained" : "outlined"}
          color="primary"
          LinkComponent={Link}
          to="/"
          sx={{
            padding: "10px 20px", // Adjust button padding
          }}
        >
          Home
        </Button>

        <Button
          variant={isActive("/products/cart") ? "contained" : "outlined"}
          color="primary"
          LinkComponent={Link}
          to="/products/cart"
          sx={{
            padding: "10px 20px", // Adjust button padding
          }}
        >
          Cart
        </Button>

        <Button
          variant={isActive("/random") ? "contained" : "outlined"}
          color="primary"
          LinkComponent={Link}
          to="/order"
          sx={{
            padding: "10px 20px", // Adjust button padding
          }}
        >
          Order
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
