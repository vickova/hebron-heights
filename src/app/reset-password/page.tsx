"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

import {
  LockOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";

import AuthLayout from "@/components/AuthLayout/AuthLayout";

export default function ResetPasswordPage() {
  const router = useRouter();
  // const searchParams = useSearchParams();

  // const resetToken = searchParams.get("token");
  const resetToken = 'reset'

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const handleSubmit = async (
  //   e: FormEvent<HTMLFormElement>
  // ) => {
  //   e.preventDefault();

  //   setError("");

  //   if (newPassword !== confirmPassword) {
  //     setError("Passwords do not match.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     await base44.auth.resetPassword({
  //       resetToken,
  //       newPassword,
  //     });

  //     router.push("/login");
  //   } catch (err) {
  //     setError(
  //       err instanceof Error
  //         ? err.message
  //         : "Failed to reset password."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (!resetToken) {
    return (
      <AuthLayout
        icon={WarningAmberOutlined}
        title="Invalid Reset Link"
        subtitle="This password reset link is missing or invalid."
        footer={
          <MuiLink
            component={Link}
            href="/forgot-password"
            underline="hover"
          >
            Request a new link
          </MuiLink>
        }
      >
        <Typography
          align="center"
          variant="body2"
        >
          The link you used appears to be incomplete.
          Please request a new password reset email.
        </Typography>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={LockOutlined}
      title="Create New Password"
      subtitle="Enter your new password below."
    >
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      <Box
        component="form"
      >
        <TextField
          label="New Password"
          type="password"
          autoFocus
          fullWidth
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
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
                sx={{
                  color: "inherit",
                  mr: 1,
                }}
              />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </Box>
    </AuthLayout>
  );
}