"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <Box
      sx={{
        mb: {
          xs: 6,
          md: 8,
        },
      }}
    >
      {/* Eyebrow */}
      <Typography
        component="span"
        sx={{
          display: "block",
          color: "primary.main",
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.2em",
          mb: 2,
          textTransform: "uppercase",
          fontFamily: "var(--font-body)",
        }}
      >
        {eyebrow}
      </Typography>

      {/* Heading */}
      <Typography
        component="h2"
        sx={{
          color: "text.primary",
          fontFamily: "var(--font-heading)",
          fontWeight: 300,
          lineHeight: 1.1,
          fontSize: "clamp(2.4rem, 5vw, 5rem)",
          mb: 2,
        }}
      >
        {title}
      </Typography>

      {/* Subtitle */}
      {subtitle && (
        <Typography
          sx={{
            color: "text.secondary",
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: 600,
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Accent Line */}
      <Box
        sx={{
          mt: 3,
          width: 64,
          height: 1,
          bgcolor: "primary.main",
        }}
      />
    </Box>
  );
}