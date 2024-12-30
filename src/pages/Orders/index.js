import { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../../components/Header";
import {
  getOrders,
  deleteOrder,
  updateOrderStatus,
} from "../../utils/api_orders";
import { toast } from "sonner";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Orders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders on component mount
  useEffect(() => {
    getOrders().then((data) => {
      console.log(data); // Debug to ensure the correct data is fetched
      setOrders(data);
    });
  }, []);

  // Handle deleting an order
  const handleDelete = async (id) => {
    const deleted = await deleteOrder(id);
    if (deleted) {
      toast.success("Product deleted successfully");
      setOrders(orders.filter((order) => order._id !== id)); // Remove deleted order from state
    } else {
      toast.error("Failed to delete product");
    }
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(id, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: updatedOrder.status } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <Container>
      <Header title="My Orders" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Products</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Payment Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((item) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    <div>{item.customerName}</div>({item.customerEmail})
                  </TableCell>
                  <TableCell align="right">
                    {item.products.map((product) => (
                      <div key={product._id}>{product.name}</div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.totalPrice}</TableCell>
                  <TableCell align="right">
                    <FormControl fullWidth>
                      <InputLabel id="status-select-label">Status</InputLabel>
                      <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={item.status}
                        label="Status"
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value)
                        }
                        disabled={item.status === "pending"}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">{item.paid_at}</TableCell>
                  <TableCell align="right">
                    {item.status === "pending" ? (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ textTransform: "none" }}
                        disabled
                      >
                        Deleted
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Orders Found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Orders;
