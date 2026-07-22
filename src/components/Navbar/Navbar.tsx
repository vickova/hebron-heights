"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { SITE } from "@/data/siteData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    {
      label: "Shop",
      href: "/shop",
      isRoute: true,
    },
    {
      label: "Properties",
      href: "#properties",
    },
    {
      label: "Automobiles",
      href: "#automobiles",
    },
    {
      label: "Gastronomy",
      href: "#gastronomy",
    },
    {
      label: "Contact",
      href: "#footer",
    },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);

    document
      .querySelector(href)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? "rgba(249,248,244,0.96)"
            : "transparent",
          backdropFilter: scrolled
            ? "blur(12px)"
            : "none",
          borderBottom: scrolled
            ? "1px solid rgba(26,26,26,.08)"
            : "none",
          transition: "all .6s",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1400,
            width: "100%",
            mx: "auto",
            px: {
              xs: 3,
              md: 6,
            },
            minHeight: {
              xs: 64,
              md: 80,
            },
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}

          <Typography
            component="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            sx={{
              cursor: "pointer",
              background: "none",
              border: 0,
              fontFamily: "Cormorant Garamond",
              fontWeight: 500,
              fontSize: 20,
              color: scrolled
                ? "var(--obsidian)"
                : "#fff",
            }}
          >
            {SITE.name}
          </Typography>

          {/* Desktop */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              gap: 4,
            }}
          >
            {navLinks.map((link) =>
              link.isRoute ? (
                <Button
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: scrolled
                      ? "var(--obsidian)"
                      : "#fff",
                    letterSpacing: ".14em",
                  }}
                >
                  {link.label.toUpperCase()}
                </Button>
              ) : (
                <Button
                  key={link.label}
                  onClick={() =>
                    scrollTo(link.href)
                  }
                  sx={{
                    color: scrolled
                      ? "var(--obsidian)"
                      : "#fff",
                    letterSpacing: ".14em",
                  }}
                >
                  {link.label.toUpperCase()}
                </Button>
              )
            )}

            <Button
              component="a"
              href={`https://wa.me/${SITE.whatsappNumber.replace(
                /\D/g,
                ""
              )}`}
              target="_blank"
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                px: 3,
                borderRadius: 0,
                letterSpacing: ".12em",

                // "&:hover": {
                //   bgcolor: "var(--bronze)",
                //   opacity: 0.9,
                // },
              }}
            >
              ENQUIRE
            </Button>
          </Box>

          {/* Mobile */}

          <IconButton
            onClick={() =>
              setMenuOpen(true)
            }
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              color: scrolled
                ? "var(--obsidian)"
                : "#fff",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      >
        <Box
          sx={{
            width: 300,
            p: 3,
          }}
        >
          <Box
          >
            <IconButton
              onClick={() =>
                setMenuOpen(false)
              }
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.label}
                disablePadding
              >
                {link.isRoute ? (
                  <ListItemButton
                    component={Link}
                    href={link.href}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >
                    <ListItemText
                      primary={link.label.toUpperCase()}
                    />
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    onClick={() =>
                      scrollTo(link.href)
                    }
                  >
                    <ListItemText
                      primary={link.label.toUpperCase()}
                    />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>

          <Button
            fullWidth
            variant="contained"
            component="a"
            href={`https://wa.me/${SITE.whatsappNumber.replace(
              /\D/g,
              ""
            )}`}
            target="_blank"
            sx={{
              mt: 4,
              bgcolor: "var(--bronze)",

              "&:hover": {
                bgcolor: "var(--bronze)",
              },
            }}
          >
            ENQUIRE ON WHATSAPP
          </Button>
        </Box>
      </Drawer>
    </>
  );
}