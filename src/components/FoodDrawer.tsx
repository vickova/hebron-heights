"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import {
  Backdrop,
  Box,
  Chip,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { X } from "lucide-react";

import WhatsAppButton from "./WhatsappButton";

interface FoodItem {
  id: string;
  name: string;
  image: string;
  category: string;
  price: string;
  description: string;
  tags: string[];
}

interface FoodDrawerProps {
  item: FoodItem | null;
  onClose: () => void;
}

export default function FoodDrawer({
  item,
  onClose,
}: FoodDrawerProps) {
  return (
    <AnimatePresence>
      {item && (
        <>
          <Backdrop
            open
            onClick={onClose}
            sx={{
              zIndex: 199,
              bgcolor: "rgba(17,17,17,.2)",
              backdropFilter: "blur(4px)",
            }}
          />

          <Drawer
            anchor="right"
            open={Boolean(item)}
            onClose={onClose}
            PaperProps={{
              sx: {
                width: {
                  xs: "100%",
                  sm: 420,
                },
                bgcolor: "background.default",
              },
            }}
          >
            {/* Image */}
            <Box
              sx={{
                position: "relative",
                height: 300,
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{
                  objectFit: "cover",
                }}
              />

              <IconButton
                onClick={onClose}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  bgcolor: "rgba(0,0,0,.55)",
                  color: "#fff",

                  "&:hover": {
                    bgcolor: "rgba(0,0,0,.75)",
                  },
                }}
              >
                <X size={18} />
              </IconButton>

              <Chip
                label={item.category.toUpperCase()}
                sx={{
                  position: "absolute",
                  left: 16,
                  bottom: 16,
                  bgcolor: "primary.main",
                  color: "#fff",
                  borderRadius: 0,
                  letterSpacing: 2,
                }}
              />
            </Box>

            {/* Content */}
            <Stack
              spacing={3}
              sx={{
                p: 4,
                flex: 1,
                overflowY: "auto",
              }}
            >
              <Box>
                <Typography
                  variant="overline"
                  color="primary.main"
                  letterSpacing={3}
                >
                  {item.category.toUpperCase()}
                </Typography>

                <Typography
                  component="h2"
                  variant="h4"
                  sx={{
                    mt: 1,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {item.name}
                </Typography>

                <Typography
                  variant="h5"
                  color="primary.main"
                  sx={{
                    mt: 1,
                    fontFamily: "var(--font-heading)",
                    fontStyle: "italic",
                  }}
                >
                  {item.price}
                </Typography>
              </Box>

              <Typography
                color="text.secondary"
                lineHeight={1.8}
              >
                {item.description}
              </Typography>

              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1}
              >
                {item.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag.toUpperCase()}
                    variant="outlined"
                    sx={{
                      borderRadius: 0,
                      letterSpacing: 1,
                    }}
                  />
                ))}
              </Stack>

              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "divider",
                  pt: 3,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={3}
                >
                  Tap below to place your order via WhatsApp. We'll
                  confirm your order and delivery details.
                </Typography>

                <WhatsAppButton
                  itemName={item.name}
                  category="Gastronomy"
                  size="large"
                />
              </Box>
            </Stack>
          </Drawer>
        </>
      )}
    </AnimatePresence>
  );
}