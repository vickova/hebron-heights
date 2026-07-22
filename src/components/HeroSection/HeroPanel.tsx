"use client";

import { Dispatch, SetStateAction } from "react";
import { Box, Typography } from "@mui/material";

interface HeroPanelData {
  id: string;
  eyebrow: string;
  headline: string;
  sub: string;
  href: string;
  bg: string;
}

interface HeroPanelProps {
  panel: HeroPanelData;
  index: number;
  hovered: string | null;
  setHovered: Dispatch<SetStateAction<string | null>>;
}

export default function HeroPanel({
  panel,
  index,
  hovered,
  setHovered,
}: HeroPanelProps) {
  const isHovered = hovered === panel.id;
  const otherHovered = hovered !== null && hovered !== panel.id;

  const scrollToSection = () => {
    document
      .querySelector(panel.href)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      component="button"
      onClick={scrollToSection}
      onMouseEnter={() => setHovered(panel.id)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(panel.id)}
      onBlur={() => setHovered(null)}
      sx={{
        position: "relative",
        flex: isHovered ? "2.5 1 0%" : otherHovered ? "0.6 1 0%" : "1 1 0%",
        overflow: "hidden",
        border: "none",
        outline: "none",
        cursor: "pointer",
        background: "transparent",
        textAlign: "left",
        transition: "flex .45s ease",
        p: 0,

        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
        },
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${panel.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: isHovered ? "scale(1.04)" : "scale(1.08)",
          transition: "transform .5s ease",
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          transition: "all .35s ease",
          background: `
            linear-gradient(
              to top,
              rgba(10,10,10,0.88) 0%,
              rgba(17,17,17,0.55) 45%,
              rgba(17,17,17,0.20) 100%
            )
          `,
        }}
      />

      {/* Divider */}
      {index < 2 && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 1,
            bgcolor: "rgba(249,248,244,.15)",
          }}
        />
      )}

      {/* Panel Number */}
      <Typography
        sx={{
          position: "absolute",
          top: 48,
          left: 48,
          color: "rgba(249,248,244,.3)",
          fontSize: 12,
          letterSpacing: ".15em",
          opacity: otherHovered ? .5 : 1,
          transition: ".3s",
        }}
      >
        {`0${index + 1}`}
      </Typography>

      {/* Content */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: {
            xs: 4,
            md: 6,
          },
          pb: {
            xs: 8,
            md: 10,
          },
        }}
      >
        {/* Eyebrow */}
        <Typography
          sx={{
            color: "primary.main",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: ".2em",
            mb: 2,
            opacity: isHovered ? 1 : .7,
            transition: ".3s",
          }}
        >
          {panel.eyebrow}
        </Typography>

        {/* Headline */}
        <Typography
          component="h2"
          sx={{
            whiteSpace: "pre-line",
            color: "#fff",
            lineHeight: 1,
            fontWeight: 300,
            fontFamily: "var(--font-display)",
            fontSize: isHovered
              ? "clamp(3rem,6vw,7rem)"
              : "clamp(2rem,3.5vw,4.5rem)",
            transition: ".35s",
            mb: 3,
          }}
        >
          {panel.headline}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: "rgba(249,248,244,.7)",
            maxHeight: isHovered ? 40 : 0,
            opacity: isHovered ? 1 : 0,
            overflow: "hidden",
            transition: ".35s",
            mb: 3,
          }}
        >
          {panel.sub}
        </Typography>

        {/* CTA */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            opacity: isHovered ? 1 : 0,
            transition: ".35s",
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 1,
              bgcolor: "primary.main",
            }}
          />

          <Typography
            sx={{
              color: "primary.main",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".18em",
            }}
          >
            EXPLORE
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}