"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import login from "../model/Login";
import { Dialog } from "@mui/material";
import { useState } from "react";

interface LoginFormProps {
  open: boolean;
  onLogin: (username: string) => void;
  onClose: () => void;
}

// LoginFormular Komponente
export default function LoginForm({ open, onLogin, onClose }: LoginFormProps) {
  const [errorText, setErrorText] = useState<string | null>(null);

  // Wenn auf den Anmelden-Button gedrückt wird
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      // Warten auf Antwort der GraphQL Login Mutation
      const result = await login(
        data.get("username") as string,
        data.get("password") as string
      );
      console.log(result);
      // Ergebnis ist nicht fehlerhaft -> korrekter Login
      if (result !== undefined) {
        console.log(result);
        onLogin(data.get("username") as string);
        setErrorText(null);
      } else {
        setErrorText("Error logging in: ");
      }
    } catch (error) {
      console.log("Error logging in: " + error);
      setErrorText("" + error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Anmelden
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={!!errorText}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              error={!!errorText}
              helperText={errorText}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Passwort"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Anmelden
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
}
