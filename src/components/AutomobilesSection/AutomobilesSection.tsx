"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SectionHeader from "../SectionHeader";
import WhatsAppButton from "../WhatsappButton";
import { CARS } from "@/data/data";


export default function AutomobilesSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: number) => {
    const el = scrollRef.current;

    if (!el) return;

    el.scrollBy({
      left: dir * el.clientWidth,
      behavior: "smooth",
    });
  };


  return (
    <Box
      component="section"
      id="automobiles"
      sx={{
        py: {
          xs: 10,
          md: 16,
        },
        bgcolor: "secondary.main",
      }}
    >

      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: {
            xs: 3,
            md: 6,
          },
        }}
      >

        {/* Header */}
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
          gap={4}
          mb={{
            xs: 6,
            md: 8,
          }}
        >

          <Box>

            <Typography
              sx={{
                color: "primary.main",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                mb: 2,
              }}
            >
              — AUTOMOBILES
            </Typography>


            <Typography
              component="h2"
              sx={{
                color: "#F9F8F4",
                fontSize: {
                  xs: "2.4rem",
                  md: "5rem",
                },
                fontWeight: 300,
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Command
              <br />
              the Road.
            </Typography>


            <Typography
              sx={{
                color: "rgba(249,248,244,0.45)",
                maxWidth: 520,
                fontSize: "1rem",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Hand-picked executive and luxury vehicles. Each car rigorously
              inspected, every document verified.
            </Typography>


            <Box
              sx={{
                mt: 3,
                width: 64,
                height: "1px",
                bgcolor: "primary.main",
              }}
            />

          </Box>



          <Stack direction="row" gap={1.5}>

            {[ChevronLeft, ChevronRight].map(
              (Icon, index) => (
                <IconButton
                  key={index}
                  onClick={() =>
                    scroll(index === 0 ? -1 : 1)
                  }
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 0,
                    border:
                      "1px solid rgba(249,248,244,0.2)",
                    color: "#F9F8F4",

                    "&:hover": {
                      borderColor:
                        "primary.main",
                      color:
                        "primary.main",
                    },
                  }}
                >
                  <Icon size={18}/>
                </IconButton>
              )
            )}

          </Stack>


        </Stack>

      </Box>



      {/* Cars carousel */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",

          pl:{
            xs:3,
            md:12,
          },

          "&::-webkit-scrollbar":{
            display:"none"
          }
        }}
      >


        {CARS.map((car,i)=>(

          <Box
            key={car.id}
            component={motion.div}
            initial={{
              opacity:0,
              y:24
            }}
            whileInView={{
              opacity:1,
              y:0
            }}
            viewport={{
              once:true,
              margin:"-60px"
            }}
            transition={{
              duration:.6,
              delay:i*.1,
            }}

            sx={{
              flex:"0 0 auto",

              width:{
                xs:"88vw",
                md:"70vw",
                lg:"58vw",
              },

              mr:3,
              scrollSnapAlign:"start",
            }}
          >


            <Box
              sx={{
                display:"flex",

                flexDirection:{
                  xs:"column",
                  lg:"row",
                },

                minHeight:{
                  lg:520
                },

                border:
                "1px solid rgba(249,248,244,0.08)"
              }}
            >


              {/* Image */}

              <Box
                sx={{
                  position:"relative",

                  width:{
                    lg:"55%"
                  },

                  height:{
                    xs:288,
                    lg:"auto"
                  },

                  overflow:"hidden"
                }}
              >

                <Box
                  component="img"
                  src={car.image}
                  alt={car.name}

                  sx={{
                    width:"100%",
                    height:"100%",
                    objectFit:"cover",

                    filter:
                    "brightness(.92)",

                    transition:
                    "transform .5s ease",

                    "&:hover":{
                      transform:"scale(1.05)"
                    }
                  }}
                />


                <StatusBadge>
                  {car.status.toUpperCase()}
                </StatusBadge>


              </Box>



              {/* Details */}

              <Box
                sx={{
                  flex:1,
                  p:{
                    xs:4,
                    lg:5
                  },
                  bgcolor:"#222",
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"space-between"
                }}
              >


                <Box>

                  <Typography
                    sx={{
                      color:"var(--bronze)",
                      fontSize:"12px",
                      letterSpacing:".15em"
                    }}
                  >
                    {car.year} MODEL
                  </Typography>


                  <Typography
                    sx={{
                      color:"#F9F8F4",
                      fontSize:"1.4rem",
                      fontWeight:500,
                      mt:1
                    }}
                  >
                    {car.name}
                  </Typography>



                  <Typography
                    sx={{
                      color:"rgba(249,248,244,.35)",
                      fontSize:"12px",
                      mt:1
                    }}
                  >
                    {car.mileage} · {car.condition}
                  </Typography>


                  <Typography
                    sx={{
                      color:"rgba(249,248,244,.5)",
                      mt:3,
                      lineHeight:1.7
                    }}
                  >
                    {car.description}
                  </Typography>



                  <Box
                    sx={{
                      display:"grid",
                      gridTemplateColumns:"repeat(2,1fr)",
                      gap:2,
                      mt:3
                    }}
                  >

                    {car.specs.map((s)=>(
                      <Box key={s.label}>

                        <Typography
                          sx={{
                            fontSize:"12px",
                            color:"rgba(249,248,244,.25)"
                          }}
                        >
                          {s.label.toUpperCase()}
                        </Typography>


                        <Typography
                          sx={{
                            color:"#F9F8F4",
                            mt:.5
                          }}
                        >
                          {s.value}
                        </Typography>


                      </Box>
                    ))}

                  </Box>


                </Box>



                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={4}
                >

                  <Box>

                    <Typography
                      sx={{
                        fontSize:"12px",
                        color:"rgba(249,248,244,.25)"
                      }}
                    >
                      ASKING PRICE
                    </Typography>

                    <Typography
                      sx={{
                        color:"#F9F8F4",
                        fontSize:"1.4rem"
                      }}
                    >
                      {car.price}
                    </Typography>

                  </Box>


                  {
                    car.status==="Available"
                    ?
                    <WhatsAppButton
                      itemName={car.name}
                      category="Automobiles"
                    />
                    :
                    <Typography
                      sx={{
                        px:3,
                        py:1.5,
                        bgcolor:"rgba(249,248,244,.08)",
                        color:"rgba(249,248,244,.4)",
                        fontSize:"12px"
                      }}
                    >
                      SOLD
                    </Typography>
                  }


                </Stack>


              </Box>

            </Box>


          </Box>

        ))}


      </Box>


    </Box>
  );
}



function StatusBadge({
  children
}:{
  children:React.ReactNode
}){

  return (
    <Box
      sx={{
        position:"absolute",
        top:16,
        left:16,
        px:1.5,
        py:.5,
        bgcolor:"var(--bronze)",
        color:"#F9F8F4",
        fontSize:"12px",
        letterSpacing:".12em"
      }}
    >
      {children}
    </Box>
  )

}