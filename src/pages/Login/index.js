import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Header from "../../components/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { getUser } from "../../utils/api_login";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async (event) => {
    event.preventDefault();
    // check for error
    if (!email || !password) {
      toast.error("Please fill out all the required fields");
    }

    const UserData = await getUser(email, password);

    // check if the newProductData exists or not
    if (UserData) {
      // show success message
      toast.success("Login successfully");
      console.log(UserData);
      // redirect back to home page
      navigate("/");
    }
  };

  return (
    <Container>
      <Header title="Login to Your Account" />
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
                      label="Email"
                      required
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>
                  <Box mb={4}>
                    <TextField
                      label="Password"
                      type="password"
                      required
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Box>
                  <Button variant="contained" fullWidth onClick={handleAddUser}>
                    Login
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

export default Login;
