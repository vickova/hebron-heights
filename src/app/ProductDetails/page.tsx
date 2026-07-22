"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
// import { hhgApi } from "@/lib/hhgApi";
// import { useCart } from "@/lib/cartContext";
// import { useHHGAuth } from "@/lib/authContext";
import ShopNavbar from "@/components/ShopNavbar";
import ProductCard from "@/components/ProductCard";

interface Merchant {
  businessName?: string;
}

interface Product {
  id: string;
  name?: string;
  price?: number | string;
  image?: string;
  category?: string;
  subCategory?: string;
  merchant?: Merchant;
  description?: string;
  additionalData?: Record<string, string | number>;
  quantity?: number;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
//   const { user } = useHHGAuth();
//   const { addToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
    const user = true
  useEffect(() => {
    setLoading(true);
    // hhgApi.getSingleProduct(id).then((res) => {
    //   if (res.ok) {
    //     const p = res.data?.data || res.data;
    //     setProduct(p);
    //     if (p?.category) {
    //       hhgApi.getRelatedProducts(p.category).then((r) => {
    //         if (r.ok) {
    //           const list = r.data?.data?.products || r.data?.data || [];
    //           setRelated(
    //             (Array.isArray(list) ? list : [])
    //               .filter((x: Product) => x.id !== id)
    //               .slice(0, 4)
    //           );
    //         }
    //       });
    //     }
    //   }
    //   setLoading(false);
    // });
  }, [id]);

  const handleAdd = async () => {
    if (!user) {
      router.push("/signin");
      return;
    }
    if (!product) return;
    setAdding(true);
    // await addToCart(product.id);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", background: "#F9F8F4" }}>
        <ShopNavbar />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 5,
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                aspectRatio: "1 / 1",
                width: "100%",
                border: "1px solid rgba(26,26,26,0.06)",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Skeleton variant="rounded" height={24} width="33%" />
              <Skeleton variant="rounded" height={32} width="66%" />
              <Skeleton variant="rounded" height={16} width="100%" />
              <Skeleton variant="rounded" height={16} width="83%" />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ minHeight: "100vh", background: "#F9F8F4" }}>
        <ShopNavbar />
        <Box sx={{ py: 16, textAlign: "center" }}>
          <Inventory2OutlinedIcon
            sx={{ fontSize: 40, color: "rgba(26,26,26,0.2)", mb: 2 }}
          />
          <Typography
            sx={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "1.5rem",
              color: "var(--obsidian)",
            }}
          >
            Product not found
          </Typography>
          <Typography
            component={Link}
            href="/shop"
            sx={{
              display: "inline-block",
              mt: 3,
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--bronze)",
              textDecoration: "none",
            }}
          >
            ← Back to shop
          </Typography>
        </Box>
      </Box>
    );
  }

  const price =
    typeof product.price === "number"
      ? `₦${product.price.toLocaleString()}`
      : product.price;

  return (
    <Box sx={{ minHeight: "100vh", background: "#F9F8F4" }}>
      <ShopNavbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumb */}
        <Typography
          component={Link}
          href="/shop"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            mb: 4,
            color: "rgba(26,26,26,0.5)",
            textDecoration: "none",
            transition: "opacity 0.2s",
            "&:hover": { opacity: 0.7 },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 13 }} /> Back to Shop
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 5,
            mb: 8,
          }}
        >
          {/* Image */}
          <Box>
            <Box
              sx={{
                aspectRatio: "1 / 1",
                overflow: "hidden",
                background: "white",
                border: "1px solid rgba(26,26,26,0.08)",
              }}
            >
              {product.image ? (
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(197,160,89,0.05)",
                  }}
                >
                  <Inventory2OutlinedIcon
                    sx={{ fontSize: 48, color: "rgba(26,26,26,0.2)" }}
                  />
                </Box>
              )}
            </Box>
          </Box>

          {/* Info */}
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {product.category && (
                <Typography
                  sx={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "var(--bronze)",
                    letterSpacing: "0.16em",
                    mb: 1.5,
                  }}
                >
                  {product.category.toUpperCase()}
                  {product.subCategory ? ` · ${product.subCategory}` : ""}
                </Typography>
              )}

              <Typography
                sx={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: { xs: "1.875rem", md: "2.25rem" },
                  color: "var(--obsidian)",
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                {product.name}
              </Typography>

              {product.merchant && (
                <Typography
                  sx={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "rgba(26,26,26,0.45)",
                    mb: 2,
                  }}
                >
                  by{" "}
                  <Box component="span" sx={{ color: "var(--obsidian)" }}>
                    {product.merchant.businessName}
                  </Box>
                </Typography>
              )}

              <Typography
                sx={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "rgba(26,26,26,0.6)",
                  lineHeight: 1.8,
                  mb: 3,
                }}
              >
                {product.description}
              </Typography>

              {/* Additional data */}
              {product.additionalData &&
                Object.keys(product.additionalData).length > 0 && (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 1.5,
                      mb: 3,
                      p: 2,
                      background: "white",
                      border: "1px solid rgba(26,26,26,0.07)",
                    }}
                  >
                    {Object.entries(product.additionalData).map(([k, v]) => (
                      <Box key={k}>
                        <Typography
                          sx={{
                            fontFamily: "monospace",
                            fontSize: "0.75rem",
                            color: "rgba(26,26,26,0.35)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {k.toUpperCase()}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "var(--obsidian)",
                            mt: 0.25,
                          }}
                        >
                          {v}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}

              {/* Quantity available */}
              {product.quantity !== undefined && (
                <Typography
                  sx={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    color: product.quantity > 0 ? "#16a34a" : "#dc2626",
                    mb: 2,
                  }}
                >
                  {product.quantity > 0
                    ? `${product.quantity} in stock`
                    : "Out of stock"}
                </Typography>
              )}

              {/* Price + Add */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  mt: "auto",
                  pt: 3,
                  borderTop: "1px solid rgba(26,26,26,0.08)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "1.875rem",
                    color: "var(--obsidian)",
                  }}
                >
                  {price}
                </Typography>
                <Button
                  onClick={handleAdd}
                  disabled={adding || product.quantity === 0}
                  startIcon={
                    added ? (
                      <CheckIcon sx={{ fontSize: 16 }} />
                    ) : adding ? (
                      <CircularProgress size={16} sx={{ color: "white" }} />
                    ) : (
                      <ShoppingCartIcon sx={{ fontSize: 16 }} />
                    )
                  }
                  sx={{
                    flex: 1,
                    px: 4,
                    py: 1.75,
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    borderRadius: 0,
                    textTransform: "none",
                    background: added
                      ? "#16a34a"
                      : product.quantity === 0
                      ? "rgba(26,26,26,0.15)"
                      : "var(--obsidian)",
                    color: "#F9F8F4",
                    cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                    "&:hover": {
                      background: added
                        ? "#16a34a"
                        : product.quantity === 0
                        ? "rgba(26,26,26,0.15)"
                        : "var(--obsidian)",
                      opacity: 0.9,
                    },
                    "&.Mui-disabled": {
                      color: "#F9F8F4",
                    },
                  }}
                >
                {added ? "Added to cart!" : adding ? "Adding…" : "Add to Cart"}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Related */}
        {related.length > 0 && (
          <Box>
            <Typography
              sx={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "1.5rem",
                color: "var(--obsidian)",
                mb: 3,
              }}
            >
              Related Products
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 2,
              }}
            >
              {related.map((p) => (
                // <ProductCard key={p.id} product={p} />
                <Box>Product Card</Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
