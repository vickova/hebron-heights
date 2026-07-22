"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
// import { hhgApi } from "@/lib/hhgApi";
// import { useHHGAuth } from "@/lib/authContext";
import ShopNavbar from "@/components/ShopNavbar";

type OrderStatus =
  | "pending"
  | "processing"
  | "fulfilled"
  | "failed"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

const STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "fulfilled",
  "failed",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

interface StatusStyle {
  bg: string;
  color: string;
}

const STATUS_STYLE: Record<OrderStatus, StatusStyle> = {
  pending: { bg: "rgba(251,191,36,0.1)", color: "#d97706" },
  processing: { bg: "rgba(59,130,246,0.1)", color: "#2563eb" },
  fulfilled: { bg: "rgba(139,92,246,0.1)", color: "#7c3aed" },
  failed: { bg: "rgba(220,38,38,0.1)", color: "#dc2626" },
  out_for_delivery: { bg: "rgba(234,88,12,0.1)", color: "#ea580c" },
  delivered: { bg: "rgba(22,163,74,0.1)", color: "#16a34a" },
  cancelled: { bg: "rgba(220,38,38,0.1)", color: "#dc2626" },
};

interface OrderItem {
  productId?: string;
  quantity?: number;
  lineTotal?: number;
}

interface Order {
  id?: string;
  orderStatus?: OrderStatus;
  subtotal?: number;
}

interface OrdersResponse {
  order: Order;
  order_items?: OrderItem[];
}

export default function Orders() {
  // const { user } = useHHGAuth();
  const user = false;
const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<OrderStatus>("pending");
  const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
        router.push("/signin");
      return;
    }
    setLoading(true);
    // hhgApi.getOrdersByStatus(activeStatus).then((res) => {
    //   if (res.ok && res.data?.data) {
    //     setOrders(res.data.data);
    //   } else {
    //     setOrders(null);
    //   }
    //   setLoading(false);
    // });
  }, [user, activeStatus, router]);

  const handleCancel = async (orderId?: string) => {
    if (!orderId) return;
    if (!window.confirm("Cancel this order?")) return;
    // await hhgApi.cancelOrder(orderId);
    setActiveStatus((s) => s); // re-trigger
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#F9F8F4" }}>
      <ShopNavbar />
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            color: "var(--obsidian)",
            mb: 3,
          }}
        >
          My Orders
        </Typography>

        {/* Status tabs */}
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
          {STATUSES.map((s) => {
            const st = STATUS_STYLE[s] || {};
            const active = s === activeStatus;
            return (
              <Chip
                key={s}
                label={s}
                onClick={() => setActiveStatus(s)}
                sx={{
                  textTransform: "capitalize",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  borderRadius: 0,
                  px: 1,
                  background: active ? st.bg || "rgba(26,26,26,0.08)" : "white",
                  color: active ? st.color || "var(--obsidian)" : "rgba(26,26,26,0.5)",
                  border: `1px solid ${
                    active
                      ? (st.color || "rgba(26,26,26,0.2)") + "40"
                      : "rgba(26,26,26,0.1)"
                  }`,
                  transition: "all 0.2s",
                }}
              />
            );
          })}
        </Stack>

        {loading ? (
          <Stack spacing={1.5}>
            {[1, 2].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={112}
                sx={{ border: "1px solid rgba(26,26,26,0.06)" }}
              />
            ))}
          </Stack>
        ) : !orders || !orders.order ? (
          <Box sx={{ py: 12, textAlign: "center" }}>
            <Inventory2OutlinedIcon
              sx={{ fontSize: 40, color: "rgba(26,26,26,0.15)", mb: 2 }}
            />
            <Typography
              sx={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "1.25rem",
                color: "var(--obsidian)",
                mb: 0.5,
              }}
            >
              No {activeStatus} orders
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "rgba(26,26,26,0.4)",
              }}
            >
              Your {activeStatus} orders will appear here
            </Typography>
            <Button
              component={Link}
              href="/shop"
              sx={{
                display: "inline-block",
                mt: 3,
                px: 3,
                py: 1.25,
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                borderRadius: 0,
                background: "var(--bronze)",
                color: "#F9F8F4",
                "&:hover": { background: "var(--bronze)", opacity: 0.9 },
              }}
            >
              SHOP NOW
            </Button>
          </Box>
        ) : (
          <Stack spacing={2}>
            {/* Single order with items */}
            <Paper
              elevation={0}
              sx={{ background: "white", border: "1px solid rgba(26,26,26,0.08)", borderRadius: 0 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  p: 2.5,
                  borderBottom: "1px solid rgba(26,26,26,0.07)",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "rgba(26,26,26,0.35)",
                      letterSpacing: "0.08em",
                      mb: 0.5,
                    }}
                  >
                    ORDER ID
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--obsidian)",
                    }}
                  >
                    {orders.order.id?.slice(0, 16)}…
                  </Typography>
                </Box>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Chip
                    label={orders.order.orderStatus}
                    sx={{
                      textTransform: "capitalize",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      borderRadius: 0,
                      ...(orders.order.orderStatus
                        ? STATUS_STYLE[orders.order.orderStatus]
                        : {}),
                    }}
                  />
                  {orders.order.orderStatus === "pending" && (
                    <IconButton
                      onClick={() => handleCancel(orders.order.id)}
                      title="Cancel order"
                      size="small"
                      sx={{
                        borderRadius: 0.5,
                        "&:hover": { background: "rgba(220,38,38,0.05)" },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 14, color: "#dc2626" }} />
                    </IconButton>
                  )}
                </Stack>
              </Box>

              {/* Items */}
              {orders.order_items && orders.order_items.length > 0 && (
                <Box>
                  {orders.order_items.map((item, i) => (
                    <Box key={i}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          px: 2.5,
                          py: 1.5,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "var(--obsidian)",
                            }}
                          >
                            Product #{item.productId?.slice(0, 8)}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.75rem",
                              color: "rgba(26,26,26,0.4)",
                            }}
                          >
                            Qty: {item.quantity}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1rem",
                            color: "var(--obsidian)",
                          }}
                        >
                          ₦{(item.lineTotal || 0).toLocaleString()}
                        </Typography>
                      </Box>
                      {i < (orders.order_items?.length || 0) - 1 && (
                        <Divider sx={{ borderColor: "rgba(26,26,26,0.05)" }} />
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              {/* Subtotal */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2.5,
                  py: 2,
                  borderTop: "1px solid rgba(26,26,26,0.07)",
                }}
              >
                <Typography
                  sx={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(26,26,26,0.5)" }}
                >
                  Subtotal
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    color: "var(--obsidian)",
                  }}
                >
                  ₦{(orders.order.subtotal || 0).toLocaleString()}
                </Typography>
              </Box>
            </Paper>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
