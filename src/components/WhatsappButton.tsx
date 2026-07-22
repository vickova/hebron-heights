"use client";

import Link from "next/link";
import { Button, IconButton, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { SITE } from "@/data/siteData";

interface WhatsAppButtonProps {
  itemName: string;
  category: string;
  size?: "default" | "large" | "icon";
}

export default function WhatsAppButton({
  itemName,
  category,
  size = "default",
}: WhatsAppButtonProps) {
  const msg = encodeURIComponent(
    `Hello, I am interested in the *${itemName}* listed in the *${category}* section. Please provide more details.`
  );

  const href = `https://wa.me/${SITE.whatsappNumber.replace(
    /\D/g,
    ""
  )}?text=${msg}`;

  if (size === "icon") {
    return (
      <Tooltip title="Enquire on WhatsApp">
        <IconButton
          component={Link}
          href={href}
          target="_blank"
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            width: 52,
            height: 52,

            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <WhatsAppIcon />
        </IconButton>
      </Tooltip>
    );
  }

  if (size === "large") {
    return (
      <Button
        component={Link}
        href={href}
        target="_blank"
        variant="contained"
        startIcon={<WhatsAppIcon />}
        fullWidth
        sx={{
          py: 1.8,
          borderRadius: 0,
          letterSpacing: ".12em",
          bgcolor: "primary.main",

          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        ENQUIRE VIA WHATSAPP
      </Button>
    );
  }

  return (
    <Button
      component={Link}
      href={href}
      target="_blank"
      variant="contained"
      startIcon={<WhatsAppIcon />}
      sx={{
        borderRadius: 0,
        px: 3,
        py: 1.5,
        letterSpacing: ".1em",
        bgcolor: "primary.main",

        "&:hover": {
          bgcolor: "primary.dark",
        },
      }}
    >
      ENQUIRE
    </Button>
  );
}