"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import {
  ArrowBack,
  EmailOutlined,
} from "@mui/icons-material";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";

import AuthLayout from "@/components/AuthLayout/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

//   const handleSubmit = async (
//     e: FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     setLoading(true);

//     try {
//       await base44.auth.resetPasswordRequest(email);
//     } catch {
//       // Always show success to avoid exposing whether an account exists.
//     } finally {
//       setLoading(false);
//       setSent(true);
//     }
//   };

  return (
    <AuthLayout
      icon={EmailOutlined}
      title="Reset Password"
      subtitle="We'll send you a link to reset your password."
      footer={
        <MuiLink
          component={Link}
          href="/login"
          underline="hover"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <ArrowBack fontSize="small" />
          Back to Login
        </MuiLink>
      }
    >
      {sent ? (
        <Alert severity="success">
          If an account exists with that email address,
          you'll receive a password reset link shortly.
        </Alert>
      ) : (
        <Box
          component="form"
        >
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            autoFocus
            autoComplete="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={18}
                  sx={{ mr: 1, color: "inherit" }}
                />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </Box>
      )}
    </AuthLayout>
  );
}