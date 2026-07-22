"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import SectionHeader from '../SectionHeader';
import FoodDrawer from "../FoodDrawer";
import { FOODS } from "@/data/data";

export default function GastronomySection() {
  const [selected, setSelected] = useState<any>(null);
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(FOODS.map((food) => food.category))),
  ];

  const filtered =
    filter === "All"
      ? FOODS
      : FOODS.filter((food) => food.category === filter);

  return (
    <Box
      component="section"
      id="gastronomy"
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
          <SectionHeader
            eyebrow="— GASTRONOMY"
            title={
              <>
                Savour
                <br />
                the Moment.
              </>
            }
            subtitle="Signature dishes and curated beverages, crafted for those who appreciate the extraordinary."
          />

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? "contained" : "outlined"}
                sx={{
                  borderRadius: 0,
                  px: 3,
                  py: 1.2,
                  letterSpacing: ".12em",
                  fontSize: 12,

                  ...(filter === cat
                    ? {
                        bgcolor: "text.primary",
                        color: "#fff",

                        "&:hover": {
                          bgcolor: "text.primary",
                        },
                      }
                    : {
                        color: "text.primary",
                        borderColor: "divider",
                      }),
                }}
              >
                {cat.toUpperCase()}
              </Button>
            ))}
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {filtered.map((item, index) => {
            const featured = index === 0 || index === 4;

            return (
              <Grid
                key={item.id}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 4,
                }}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                  }}
                >
                  <Box
                    onClick={() => setSelected(item)}
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      height: 420,
                      transition: ".4s",
                      "& img": {
                        transition: "transform .6s ease",
                      },
                      "&:hover img": {
                        transform: "scale(1.08)",
                      },
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

                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,.9), rgba(0,0,0,.25), transparent)",
                      }}
                    />

                    <Chip
                      label={item.tags[0]?.toUpperCase()}
                      sx={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        bgcolor: "primary.main",
                        color: "#fff",
                        borderRadius: 0,
                        letterSpacing: 1,
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 4,
                      }}
                    >
                      <Typography
                        variant="overline"
                        color="primary.main"
                        sx={{
                          letterSpacing: 3,
                        }}
                      >
                        {item.category.toUpperCase()}
                      </Typography>

                      <Typography
                        variant="h5"
                        sx={{
                          color: "#fff",
                          fontFamily: "var(--font-heading)",
                          mt: 1,
                        }}
                      >
                        {item.name}
                      </Typography>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={3}
                      >
                        <Typography
                          sx={{
                            color: "primary.main",
                            fontSize: 22,
                            fontFamily: "var(--font-heading)",
                            fontStyle: "italic",
                          }}
                        >
                          {item.price}
                        </Typography>

                        <Typography
                          sx={{
                            color: "rgba(255,255,255,.7)",
                            letterSpacing: ".12em",
                            fontSize: 12,
                          }}
                        >
                          ORDER →
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <FoodDrawer
        item={selected}
        onClose={() => setSelected(null)}
      />
    </Box>
  );
}