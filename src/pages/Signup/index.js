import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Header from "../../components/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { addNewUser } from "../../utils/api_signup";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAddNewUser = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill out all the required fields");
    }

    const newUserData = await addNewUser(
      name,
      email,
      password,
      confirmPassword
    );

    // check if the newProductData exists or not
    if (newUserData) {
      // show success message
      toast.success("User has been created successfully");
      console.log(newUserData);
      // redirect back to home page
      navigate("/login");
    }
  };
  return (
    <Container>
      <Header title="Create a New Account" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card sx={{ maxWidth: 600, width: "100%" }}>
                <CardContent>
                  <Box mb={4}>
                    <TextField
                      label="Name"
                      required
                      fullWidth
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Box>
                  <Box mb={4}>
                    <TextField
                      label="Email"
                      required
                      fullWidth
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Box>
                  <Box mb={4}>
                    <TextField
                      label="Password"
                      type="password"
                      required
                      fullWidth
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Box>
                  <Box mb={4}>
                    <TextField
                      label="confirmPassword"
                      type="confirmPassword"
                      required
                      fullWidth
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddNewUser}
                  >
                    Sign Up
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Signup;
