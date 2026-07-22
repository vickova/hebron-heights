"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Box,
  ButtonBase,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { SITE } from "@/data/siteData";

interface SocialIconProps {
  href: string;
  label: string;
  children: ReactNode;
}

const SocialIcon = ({ href, label, children }: SocialIconProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    underline="none"
    sx={{
      width: 48,
      height: 48,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid",
      borderColor: "rgba(249,248,244,0.15)",
      color: "rgba(249,248,244,0.5)",
      transition: "all .4s ease",
      "&:hover": {
        borderColor: "var(--bronze)",
        color: "var(--bronze)",
      },
    }}
  >
    {children}
  </Link>
);

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: "secondary.main",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          spacing={{ xs: 8, lg: 12 }}
          mb={{ xs: 8, md: 12 }}
        >
          {/* Brand */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            sx={{ maxWidth: 360 }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#F9F8F4",
                fontWeight: 300,
                mb: 2,
                fontSize: "2rem",
                lineHeight: 1.2,
              }}
            >
              {SITE.name}
            </Typography>

            <Typography
              sx={{
                color: "rgba(249,248,244,0.4)",
                fontSize: 14,
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              Fresh, locally sourced produce, premium land, and executive
              automobiles. Hebron Height Gardens — quality delivered direct.
            </Typography>

            <Link
              href={`https://wa.me/${SITE.whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              underline="none"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                px: 2.5,
                py: 1.75,
                bgcolor: "rgba(37,211,102,0.1)",
                border: "1px solid rgba(37,211,102,0.25)",
                transition: ".3s",
                "&:hover": {
                  opacity: .85,
                },
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "#25D366",
                  animation: "pulse 1.5s infinite",
                }}
              />

              <Typography
                sx={{
                  color: "#25D366",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: ".12em",
                }}
              >
                ACTIVE ON WHATSAPP
              </Typography>
            </Link>
          </Box>

          {/* Navigation */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={10}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: .1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: ".18em",
                  mb: 3,
                }}
              >
                CATALOGUE
              </Typography>

              <Stack spacing={2}>
                {[
                  { label: "Landed Properties", href: "#properties" },
                  { label: "Automobiles", href: "#automobiles" },
                  { label: "Food & Drinks", href: "#gastronomy" },
                ].map((item) => (
                  <ButtonBase
                    key={item.label}
                    onClick={() => scrollTo(item.href)}
                    sx={{
                      justifyContent: "flex-start",
                      color: "rgba(249,248,244,.45)",
                      fontSize: 14,
                      fontWeight: 300,
                      "&:hover": {
                        color: "var(--bronze)",
                      },
                    }}
                  >
                    {item.label}
                  </ButtonBase>
                ))}
              </Stack>
            </Box>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: .15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: ".18em",
                  mb: 3,
                }}
              >
                CONNECT
              </Typography>

              <Stack direction="row" spacing={1.5}>
                <SocialIcon href={SITE.social.instagram} label="Instagram">
                  <FaInstagram size={18} />
                </SocialIcon>

                <SocialIcon href={SITE.social.facebook} label="Facebook">
                  <FaFacebookF size={18} />
                </SocialIcon>

                <SocialIcon href={SITE.social.tiktok} label="TikTok">
                  <FaTiktok size={18} />
                </SocialIcon>

                <SocialIcon href={SITE.social.twitter} label="Twitter / X">
                  <FaXTwitter size={18} />
                </SocialIcon>
              </Stack>

              <Box mt={4}>
                <Typography
                  sx={{
                    color: "primary.main",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: ".18em",
                    mb: 1,
                  }}
                >
                  WHATSAPP
                </Typography>

                <Link
                  href={`https://wa.me/${SITE.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  underline="none"
                  sx={{
                    color: "rgba(249,248,244,.45)",
                    fontSize: 14,
                    fontWeight: 300,
                    "&:hover": {
                      color: "var(--bronze)",
                    },
                  }}
                >
                  {SITE.whatsappNumber}
                </Link>
              </Box>
            </Box>
          </Stack>
        </Stack>

        <Divider
          sx={{
            borderColor: "rgba(249,248,244,0.06)",
            my: 4,
          }}
        />

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Typography
            sx={{
              color: "rgba(249,248,244,.2)",
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: ".08em",
            }}
          >
            © {year} {SITE.name}. All rights reserved.
          </Typography>

          <Typography
            sx={{
              color: "rgba(249,248,244,.15)",
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: ".06em",
            }}
          >
            Fresh Produce · Land · Automobiles · Gastronomy
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}