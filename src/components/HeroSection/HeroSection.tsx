"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import HeroPanel from "./HeroPanel";
import {PANELS} from "@/data/heroData";

export default function HeroSection() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                height: "100vh",
                display: "flex",
                overflow: "hidden",
            }}
        >
            {PANELS.map((panel, index) => (
                <HeroPanel
                    key={panel.id}
                    panel={panel}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                />
            ))}

            {/* Scroll Indicator */}
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                sx={{
                    position: "absolute",
                    bottom: 32,
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                ...
            </Box>
        </Box>
    );
}