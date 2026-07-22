"use client";

import { ReactNode, ElementType } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface AuthLayoutProps {
  icon: ElementType;
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function AuthLayout({
  icon: Icon,
  title,
  subtitle,
  footer,
  children,
}: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={5}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Icon sx={{ fontSize: 30 }} />
          </Box>

          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Card */}
        <Card
          elevation={2}
          sx={{
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {children}
          </CardContent>
        </Card>

        {/* Footer */}
        {footer && (
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mt={4}
          >
            {footer}
          </Typography>
        )}
      </Box>
    </Box>
  );
}