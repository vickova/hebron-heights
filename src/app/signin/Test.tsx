"use client"
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  EmailOutlined,
  LockOutlined,
  LoginOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { FcGoogle } from "react-icons/fc";

import AuthLayout from "@/components/AuthLayout/AuthLayout";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const handleSubmit = async (
  //   e: FormEvent<HTMLFormElement>
  // ) => {
  //   e.preventDefault();

  //   setError("");
  //   setLoading(true);

  //   try {
  //     await base44.auth.loginViaEmailPassword(
  //       email,
  //       password
  //     );

  //     router.push("/");
  //   } catch (err) {
  //     setError(
  //       err instanceof Error
  //         ? err.message
  //         : "Invalid email or password"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGoogle = () => {
  //   base44.auth.loginWithProvider("google", "/");
  // };

  return (
    <AuthLayout
      icon={LoginOutlined}
      title="Welcome back"
      subtitle="Log in to your account"
      footer={
        <>
          Don't have an account?{" "}
          <MuiLink
            component={Link}
            href="/register"
            underline="hover"
          >
            Create one
          </MuiLink>
        </>
      }
    >
      <Box
  sx={{
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "1.1fr 0.9fr",
    },
  }}
>
  {/* Left Image */}
  <Box
    sx={{
      position: "relative",
      display: {
        xs: "none",
        md: "block",
      },
    }}
  >
    <Image
      src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"
      alt="Hebron Height Gardens"
      fill
      priority
      style={{
        objectFit: "cover",
      }}
    />

    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to bottom, rgba(0,0,0,.25), rgba(0,0,0,.7))",
      }}
    />

    <Box
      sx={{
        position: "absolute",
        bottom: 60,
        left: 60,
        color: "#fff",
        maxWidth: 420,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          letterSpacing: 4,
          color: "primary.main",
        }}
      >
        HEBRON HEIGHT GARDENS
      </Typography>

      <Typography
        variant="h2"
        sx={{
          mt: 2,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        Luxury Living,
        <br />
        Naturally.
      </Typography>

      <Typography
        sx={{
          mt: 3,
          opacity: 0.9,
          fontSize: 18,
          lineHeight: 1.8,
        }}
      >
        Premium farmland, executive automobiles,
        fresh produce and exceptional gastronomy,
        all in one destination.
      </Typography>
    </Box>
  </Box>

  {/* Right Side */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "background.default",
      p: 4,
    }}
  >
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 460,
        p: 5,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Your existing login form goes here */}
      <Button
        fullWidth
        variant="outlined"
        size="large"
        startIcon={<FcGoogle size={22} />}
        sx={{
          py: 1.5,
          borderRadius: 3,
          borderColor: "divider",
          textTransform: "none",
          fontWeight: 600,
          fontSize: 15,
          mb: 4,
          "&:hover": {
            bgcolor: "grey.50",
            borderColor: "grey.400",
          },
        }}
      >
        Continue with Google
      </Button>
      
      <Divider sx={{ mb: 4 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 1 }}
        >
          OR CONTINUE WITH EMAIL
        </Typography>
      </Divider>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Stack
        component="form"
        spacing={3}
        // onSubmit={handleSubmit}
      >
        <TextField
          label="Email address"
          fullWidth
          autoFocus
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined color="action" />
              </InputAdornment>
            ),
          }}
        />
      
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Remember me"
          />
      
          <MuiLink
            component={Link}
            href="/forgot-password"
            underline="hover"
            fontSize={14}
          >
            Forgot password?
          </MuiLink>
        </Stack>
      
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={!loading && <LoginOutlined />}
          disabled={loading}
          sx={{
            py: 1.6,
            borderRadius: 3,
            textTransform: "none",
            fontSize: 16,
            fontWeight: 700,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 10px 30px rgba(0,0,0,.12)",
            },
          }}
        >
          {loading ? (
            <>
              <CircularProgress
                size={18}
                color="inherit"
                sx={{ mr: 1 }}
              />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </Stack>
    </Paper>
  </Box>
</Box>
</AuthLayout>
  );
}