"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// import SectionHeader from './SectionHeader';
import { MessageCircle } from "lucide-react";
import { PROPERTIES } from "@/data/data";
// import WhatsAppButton from "./WhatsappButton";

export default function PropertiesSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: number) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction * scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <Box
      component="section"
      id="properties"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            md: "flex-end",
          }}
          spacing={4}
          mb={8}
        >
          {/* <SectionHeader
            eyebrow="— LANDED PROPERTIES"
            title={
              <>
                Prime Plots & <br />
                Titled Land
              </>
            }
            subtitle="Each parcel curated for strategic value, clear documentation, and enduring appreciation."
          /> */}

          <Stack direction="row" spacing={2}>
            <IconButton
              onClick={() => scroll(-1)}
              sx={{
                width: 52,
                height: 52,
                border: 1,
                borderColor: "text.primary",
                borderRadius: 0,
                transition: ".3s",

                "&:hover": {
                  bgcolor: "text.primary",
                  color: "#fff",
                },
              }}
            >
              <ChevronLeft size={20} />
            </IconButton>

            <IconButton
              onClick={() => scroll(1)}
              sx={{
                width: 52,
                height: 52,
                border: 1,
                borderColor: "text.primary",
                borderRadius: 0,

                transition: ".3s",

                "&:hover": {
                  bgcolor: "text.primary",
                  color: "#fff",
                },
              }}
            >
              <ChevronRight size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Container>

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3,
          px: {
            xs: 3,
            md: 8,
          },
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",

          "&::-webkit-scrollbar": {
            display: "none",
          },

          scrollbarWidth: "none",
        }}
      >
        {PROPERTIES.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
            style={{
              flex: "0 0 75%",
              scrollSnapAlign: "start",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 0,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Grid container>
                {/* Image */}

                <Grid
                  size={{
                    xs: 12,
                    lg: 6.5,
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: {
                        xs: 300,
                        lg: 560,
                      },
                    }}
                  >
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />

                    <Chip
                      label={property.status.toUpperCase()}
                      sx={{
                        position: "absolute",
                        top: 24,
                        left: 24,
                        bgcolor:
                          property.status === "Available"
                            ? "primary.main"
                            : "rgba(0,0,0,.7)",
                        color: "#fff",
                        letterSpacing: 2,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                </Grid>

                {/* Content */}

                <Grid
                  size={{
                    xs: 12,
                    lg: 5.5,
                  }}
                >
                  <Stack
                    justifyContent="space-between"
                    sx={{
                      height: "100%",
                      p: {
                        xs: 4,
                        md: 6,
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="overline"
                        color="primary.main"
                        letterSpacing={3}
                      >
                        {property.type.toUpperCase()}
                      </Typography>

                      <Typography
                        variant="h4"
                        fontFamily="var(--font-heading)"
                        mt={1}
                      >
                        {property.name}
                      </Typography>

                      <Typography
                        color="text.secondary"
                        mt={1}
                      >
                        📍 {property.location}
                      </Typography>

                      <Typography
                        mt={4}
                        lineHeight={1.9}
                        color="text.secondary"
                      >
                        {property.description}
                      </Typography>

                      <Grid
                        container
                        spacing={3}
                        mt={2}
                      >
                        {property.specs.map((spec) => (
                          <Grid
                            size={6}
                            key={spec.label}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {spec.label.toUpperCase()}
                            </Typography>

                            <Typography
                              fontWeight={600}
                              mt={0.5}
                            >
                              {spec.value}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>

                    <Stack
                      direction={{
                        xs: "column",
                        md: "row",
                      }}
                      justifyContent="space-between"
                      alignItems={{
                        md: "center",
                      }}
                      spacing={3}
                      mt={6}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          ASKING PRICE
                        </Typography>

                        <Typography
                          variant="h5"
                          fontFamily="var(--font-heading)"
                        >
                          {property.price}
                        </Typography>
                      </Box>

                      {/* <WhatsAppButton
                        itemName={property.name}
                        category="Properties"
                      /> */}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        ))}

        <Box
          sx={{
            minWidth: 40,
          }}
        />
      </Box>
    </Box>
  );
}