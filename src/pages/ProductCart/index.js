import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Header from "../../components/Header";

function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        item.quantity = newQuantity;
        item.totalPrice = (item.price * newQuantity).toFixed(2);
      }
      return item;
    });

    // Update cart in state and localStorage
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);

    // Update cart in state and localStorage
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Show success message
    toast.success("Product removed from the cart!");
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.totalPrice), 0)
      .toFixed(2);
  };

  return (
    <Container>
      <Header />
      <Box sx={{ marginTop: 3 }}>
        <Table
          sx={{ width: "100%", tableLayout: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.totalPrice}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="h6">No Product Added yet!</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Total row placed at the bottom */}
          {cart.length > 0 && (
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell align="right">
                <Typography variant="h6">Total: ${calculateTotal()}</Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          )}
        </Table>

        <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
            disabled={cart.length === 0}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cart;
