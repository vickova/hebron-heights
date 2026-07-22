'use client';

import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useCart } from '@/lib/cartContext';
// import { useHHGAuth } from '@/lib/authContext';

// MUI Components
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';

// MUI Icons
import { Add as PlusIcon, Check as CheckIcon } from '@mui/icons-material';

interface Product {
  id: string;
  name: string;
  price: number | string;
  image?: string;
  status?: string;
  category?: string;
  subCategory?: string;
  merchant?: {
    businessName: string;
  };
}

export default function ProductCard({ product }: { product: Product }) {
//   const { addToCart } = useCart();
//   const { user } = useHHGAuth();
  const router = useRouter();

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
const user = true;
  const handleAdd = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevents navigating to product detail page on button click
    e.stopPropagation();

    if (!user) {
      router.push('/signin');
      return;
    }

    // setAdding(true);
    // await addToCart(product.id);
    // setAdding(false);
    // setAdded(true);
    // setTimeout(() => setAdded(false), 2000);
  };

  const price =
    typeof product.price === 'number'
      ? `₦${product.price.toLocaleString()}`
      : product.price;

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        border: '1px solid rgba(26,26,26,0.08)',
        borderRadius: 0,
        transition: 'all 300ms ease',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          '& .product-card-media': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={`/product/${product.id}`}
        disableRipple
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100%',
        }}
      >
        {/* Image Container */}
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '1 / 1',
            overflow: 'hidden',
            backgroundColor: 'grey.50',
            width: '100%',
          }}
        >
          {product.image ? (
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              className="product-card-media"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 500ms ease',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(197,160,89,0.08)',
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'rgba(26,26,26,0.25)' }}
              >
                No image
              </Typography>
            </Box>
          )}

          {/* Status Badge */}
          {product.status && product.status !== 'available' && (
            <Chip
              label={product.status.toUpperCase()}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                borderRadius: 0,
                height: 'auto',
                px: 0.5,
                py: 0.25,
                fontSize: '0.75rem',
                fontWeight: 500,
                backgroundColor: 'rgba(26,26,26,0.7)',
                color: '#F9F8F4',
                '& .MuiChip-label': { px: 0.5 },
              }}
            />
          )}

          {/* Category Badge */}
          {product.category && (
            <Chip
              label={product.category}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                borderRadius: 0,
                height: 'auto',
                px: 0.5,
                py: 0.25,
                fontSize: '0.75rem',
                backgroundColor: 'var(--bronze, #C5A059)',
                color: '#F9F8F4',
                '& .MuiChip-label': { px: 0.5 },
              }}
            />
          )}
        </Box>

        {/* Details Container */}
        <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {product.merchant && (
            <Typography
              variant="caption"
              component="p"
              sx={{
                color: 'var(--bronze, #C5A059)',
                letterSpacing: '0.08em',
                mb: 0.5,
              }}
            >
              {product.merchant.businessName}
            </Typography>
          )}

          <Typography
            variant="body2"
            component="h3"
            sx={{
              fontWeight: 500,
              color: 'var(--obsidian, #1a1a1a)',
              mb: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.5em',
            }}
          >
            {product.name}
          </Typography>

          {product.subCategory && (
            <Typography
              variant="caption"
              component="p"
              sx={{ color: 'rgba(26,26,26,0.4)', mb: 1 }}
            >
              {product.subCategory}
            </Typography>
          )}

          {/* Price & Action Row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 'auto',
              pt: 1.5,
            }}
          >
            <Typography
              variant="subtitle1"
              component="span"
              sx={{
                fontFamily: 'var(--font-display, serif)',
                fontWeight: 500,
                color: 'var(--obsidian, #1a1a1a)',
              }}
            >
              {price}
            </Typography>

            <Button
              onClick={handleAdd}
              disabled={adding}
              size="small"
              disableElevation
              startIcon={
                added ? (
                  <CheckIcon sx={{ fontSize: '13px !important' }} />
                ) : adding ? (
                  <CircularProgress size={12} color="inherit" />
                ) : (
                  <PlusIcon sx={{ fontSize: '13px !important' }} />
                )
              }
              sx={{
                backgroundColor: added ? '#16a34a' : 'var(--obsidian, #1a1a1a)',
                color: '#F9F8F4',
                fontSize: '0.75rem',
                fontWeight: 500,
                px: 1.5,
                py: 0.75,
                borderRadius: 0,
                textTransform: 'none',
                minWidth: 'auto',
                transition: 'all 200ms ease',
                '&:hover': {
                  backgroundColor: added
                    ? '#15803d'
                    : 'rgba(26,26,26,0.85)',
                },
              }}
            >
              {added ? 'Added' : 'Add'}
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}