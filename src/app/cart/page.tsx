'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ShopNavbar from '@/components/ShopNavbar';

// MUI Core Components
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
  Skeleton,
  Divider,
  CardMedia,
} from '@mui/material';

// MUI Icons
import {
  Remove as MinusIcon,
  Add as PlusIcon,
  DeleteOutline as TrashIcon,
  ShoppingBagOutlined as ShoppingBagIcon,
  ArrowForward as ArrowRightIcon,
} from '@mui/icons-material';


interface CartItem {
  price: number;
  quantity: number;
  id:string;
  image:string;
  name:string;
  productId:string
}

const items: CartItem[] = [];

export default function Cart() {
  // const { user } = useHHGAuth();
  const user = true;
  // const { cart, items, loading, increment, decrement, removeFromCart } = useCart();
  const router = useRouter();
const loading = false;
  // 1. Unauthenticated View
  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#F9F8F4' }}>
        <ShopNavbar />
        <Container maxWidth="sm" sx={{ py: 16, textAlign: 'center' }}>
          <ShoppingBagIcon
            sx={{ fontSize: 40, mb: 2, color: 'rgba(26,26,26,0.2)' }}
          />
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'var(--font-display, serif)',
              fontWeight: 300,
              mb: 1,
              color: 'var(--obsidian, #1a1a1a)',
            }}
          >
            Sign in to view your cart
          </Typography>
          <Button
            component={Link}
            href="/signin"
            variant="contained"
            disableElevation
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              fontSize: '0.875rem',
              fontWeight: 500,
              backgroundColor: 'var(--obsidian, #1a1a1a)',
              color: '#F9F8F4',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(26,26,26,0.85)',
              },
            }}
          >
            SIGN IN
          </Button>
        </Container>
      </Box>
    );
  }

  // const subtotal =
  //   cart?.subtotal ||
  //   items.reduce((s, i) => s + (i?.price || 0) * (i?.quantity || 0), 0);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F9F8F4' }}>
      <ShopNavbar />
      <Container maxWidth="lg" sx={{ py: 5, px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontFamily: 'var(--font-display, serif)',
            fontWeight: 300,
            mb: 4,
            color: 'var(--obsidian, #1a1a1a)',
          }}
        >
          Your Cart
        </Typography>

        {/* 2. Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={96}
                sx={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(26,26,26,0.06)',
                }}
              />
            ))}
          </Box>
        ) : items.length === 0 ? (
          /* 3. Empty Cart State */
          <Box sx={{ py: 12, textAlign: 'center' }}>
            <ShoppingBagIcon
              sx={{ fontSize: 48, mb: 2, color: 'rgba(26,26,26,0.15)' }}
            />
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'var(--font-display, serif)',
                fontWeight: 300,
                mb: 1,
                color: 'var(--obsidian, #1a1a1a)',
              }}
            >
              Your cart is empty
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 3, color: 'rgba(26,26,26,0.45)' }}
            >
              Start adding some fresh products
            </Typography>
            <Button
              component={Link}
              href="/shop"
              variant="contained"
              disableElevation
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '0.875rem',
                fontWeight: 500,
                backgroundColor: 'var(--bronze, #C5A059)',
                color: '#F9F8F4',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'var(--bronze, #b38f4d)',
                },
              }}
            >
              BROWSE SHOP
            </Button>
          </Box>
        ) : (
          /* 4. Cart Items & Summary Grid */
          <Grid container spacing={4}>
            {/* Items List Column */}
            <Grid size={{ xs: 12, lg: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {items.map(
                  (item, idx) =>
                    item && (
                      <Paper
                        key={item.id || idx}
                        elevation={0}
                        sx={{
                          display: 'flex',
                          gap: 2,
                          p: 2,
                          backgroundColor: '#ffffff',
                          border: '1px solid rgba(26,26,26,0.07)',
                          borderRadius: 0,
                        }}
                      >
                        {item.image ? (
                          <CardMedia
                            component="img"
                            image={item.image}
                            alt={item.name || 'Product'}
                            sx={{
                              width: 80,
                              height: 80,
                              objectFit: 'cover',
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              flexShrink: 0,
                              backgroundColor: 'rgba(197,160,89,0.08)',
                            }}
                          />
                        )}

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            noWrap
                            sx={{
                              fontWeight: 500,
                              mb: 0.5,
                              color: 'var(--obsidian, #1a1a1a)',
                            }}
                          >
                            {item.name ||
                              `Product #${item.productId?.slice(0, 8)}`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mb: 1.5, color: 'rgba(26,26,26,0.45)' }}
                          >
                            ₦{(item.price || 0).toLocaleString()}
                          </Typography>

                          {/* Controls */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <IconButton
                              size="small"
                              // onClick={() => decrement(item.productId)}
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: 0,
                                border: '1px solid rgba(26,26,26,0.15)',
                                '&:hover': { backgroundColor: '#f5f5f5' },
                              }}
                            >
                              <MinusIcon sx={{ fontSize: 12 }} />
                            </IconButton>

                            <Typography
                              variant="body2"
                              sx={{
                                width: 24,
                                textAlign: 'center',
                                fontWeight: 500,
                              }}
                            >
                              {item.quantity}
                            </Typography>

                            <IconButton
                              size="small"
                              // onClick={() => increment(item.productId)}
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: 0,
                                border: '1px solid rgba(26,26,26,0.15)',
                                '&:hover': { backgroundColor: '#f5f5f5' },
                              }}
                            >
                              <PlusIcon sx={{ fontSize: 12 }} />
                            </IconButton>

                            <IconButton
                              size="small"
                              // onClick={() => removeFromCart(item.productId)}
                              sx={{
                                ml: 1,
                                p: 0.75,
                                borderRadius: 0,
                                '&:hover': { backgroundColor: '#fee2e2' },
                              }}
                            >
                              <TrashIcon
                                sx={{ fontSize: 16, color: '#dc2626' }}
                              />
                            </IconButton>
                          </Box>
                        </Box>

                        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontFamily: 'var(--font-display, serif)',
                              fontWeight: 500,
                              color: 'var(--obsidian, #1a1a1a)',
                            }}
                          >
                            ₦
                            {(
                              (item.price || 0) * (item.quantity || 0)
                            ).toLocaleString()}
                          </Typography>
                        </Box>
                      </Paper>
                    )
                )}
              </Box>
            </Grid>

            {/* Order Summary Column */}
              <Grid size={{ xs: 12, lg: 8 }}>
                <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(26,26,26,0.08)',
                  borderRadius: 0,
                  position: { lg: 'sticky' },
                  top: { lg: 96 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'var(--font-display, serif)',
                    fontWeight: 300,
                    mb: 2.5,
                    color: 'var(--obsidian, #1a1a1a)',
                  }}
                >
                  Order Summary
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    mb: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'rgba(26,26,26,0.6)',
                    }}
                  >
                    <Typography variant="body2">
                      Subtotal ({items.length} items)
                    </Typography>
                    <Typography variant="body2">
                      ₦{'30000'}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'rgba(26,26,26,0.6)',
                    }}
                  >
                    <Typography variant="body2">Delivery</Typography>
                    <Typography variant="body2" sx={{ color: '#16a34a' }}>
                      Calculated at checkout
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 3, borderColor: 'rgba(26,26,26,0.08)' }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 3,
                    color: 'var(--obsidian, #1a1a1a)',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontFamily: 'var(--font-display, serif)',
                      fontWeight: 500,
                    }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontFamily: 'var(--font-display, serif)',
                      fontWeight: 500,
                    }}
                  >
                    {/* ₦{(subtotal || 0).toLocaleString()} */}
                    #30000
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={() => router.push('/checkout')}
                  endIcon={<ArrowRightIcon sx={{ fontSize: 15 }} />}
                  sx={{
                    py: 2,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    backgroundColor: 'var(--obsidian, #1a1a1a)',
                    color: '#F9F8F4',
                    letterSpacing: '0.08em',
                    borderRadius: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(26,26,26,0.85)',
                    },
                  }}
                >
                  PROCEED TO CHECKOUT
                </Button>

                <Typography
                  component={Link}
                  href="/shop"
                  variant="caption"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    mt: 2,
                    color: 'rgba(26,26,26,0.45)',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Continue shopping
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}