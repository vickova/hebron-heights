"use client";

import { ChangeEvent, FormEvent, useState } from "react";
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
  AccountCircleOutlined,
  EmailOutlined,
  LockOutlined,
  PersonAddOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { FcGoogle } from "react-icons/fc";

import AuthLayout from "@/components/AuthLayout/AuthLayout";
import Image from "next/image";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleSubmit = async (
  //   e: FormEvent<HTMLFormElement>
  // ) => {
  //   e.preventDefault();

  //   setError("");

  //   if (!acceptTerms) {
  //     setError("Please accept the Terms & Conditions.");
  //     return;
  //   }

  //   if (form.password !== form.confirm) {
  //     setError("Passwords do not match.");
  //     return;
  //   }

  //   if (form.password.length < 8) {
  //     setError("Password must be at least 8 characters.");
  //     return;
  //   }

  //   setLoading(true);

  //   const res = await signUp(
  //     form.name,
  //     form.email,
  //     form.password
  //   );

  //   setLoading(false);

  //   if (res.ok) {
  //     router.push("/");
  //   } else {
  //     setError(
  //       res.data?.message ??
  //         "Unable to create your account."
  //     );
  //   }
  // };

  return (
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
      overflow="hidden"
        sx={{
          position: "relative",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
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
      <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          fontSize="1.5rem"
          textAlign="center"
        >
          Create your account
        </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            mb={4}
          >
            Join Hebron Height Gardens
          </Typography>
      {/* Your existing login form goes here */}
      <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<FcGoogle size={22} />}
              sx={{
                py: 1.6,
                mb: 4,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "divider",
                "&:hover": {
                  bgcolor: "grey.50",
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
                OR CREATE WITH EMAIL
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
                label="Full Name"
                name="name"
                fullWidth
                value={form.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlined color="action" />
                    </InputAdornment>
                  ),
                }}
              />
      
              <TextField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
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
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={form.password}
                onChange={handleChange}
                helperText="Use at least 8 characters."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
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
                      <TextField
                label="Confirm Password"
                name="confirm"
                type={showConfirm ? "text" : "password"}
                fullWidth
                value={form.confirm}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirm(!showConfirm)
                        }
                      >
                        {showConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
      
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptTerms}
                    onChange={(e) =>
                      setAcceptTerms(e.target.checked)
                    }
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    I agree to the{" "}
                    <MuiLink href="#" underline="hover">
                      Terms
                    </MuiLink>{" "}
                    and{" "}
                    <MuiLink href="#" underline="hover">
                      Privacy Policy
                    </MuiLink>
                  </Typography>
                }
              />
      
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={
                  !loading && <PersonAddOutlined />
                }
                disabled={loading}
                sx={{
                  py: 1.7,
                  mt: 1,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow:
                      "0 12px 30px rgba(0,0,0,.15)",
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
      
              <Typography
                textAlign="center"
                variant="body2"
                color="text.secondary"
              >
                By creating an account, you can save favourites,
                track your orders and enjoy a faster checkout
                experience.
              </Typography>
      
              <Box textAlign="center">
                <MuiLink
                  component={Link}
                  href="/"
                  underline="hover"
                  color="text.secondary"
                >
                  ← Back to Home
                </MuiLink>
              </Box>
            </Stack>
    </Paper>
  </Box>
</Box>
    );
}