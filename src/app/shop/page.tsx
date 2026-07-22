'use client';
import { useState, useEffect, useCallback, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ShopNavbar from '@/components/ShopNavbar';
import ProductCard from '@/components/ProductCard';

// MUI Core Components
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  InputBase,
  Paper,
  Skeleton,
  Pagination,
} from '@mui/material';

// MUI Icons
import { Search as SearchIcon } from '@mui/icons-material';

const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Herbs', 'Organic', 'Fresh'];

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

interface PaginationMeta {
  totalPages: number;
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>(initialCategory);
  const [search, setSearch] = useState<string>(initialSearch);
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [page, setPage] = useState<number>(1);

  const load = useCallback(async () => {
    setLoading(true);
    // try {
    //   const res = await hhgApi.getProducts({
    //     search,
    //     category: category || undefined,
    //     pageNumber: page,
    //     pageSize: 12,
    //   });

    //   if (res.ok) {
    //     const payload = res.data?.data;
    //     // Handle both {products: [], pagination: {}} and a direct array
    //     if (Array.isArray(payload)) {
    //       setProducts(payload);
    //       setPagination(null);
    //     } else if (payload) {
    //       setProducts(payload.products || payload.items || []);
    //       setPagination(payload.pagination || payload.meta || null);
    //     } else {
    //       setProducts([]);
    //     }
    //   } else {
    //     setProducts([]);
    //   }
    // } catch {
    //   setProducts([]);
    // } finally {
    //   setLoading(false);
    // }
  }, [search, category, page]);

  useEffect(() => {
    load();
  }, [load]);

  const applySearch = (e: FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput) {
      params.set('search', searchInput);
    } else {
      params.delete('search');
    }
    router.push(`/shop?${params.toString()}`);
  };

  const setFilter = (cat: string) => {
    const selectedCategory = cat === 'All' ? '' : cat;
    setCategory(selectedCategory);
    setPage(1);

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    router.push(`/shop?${params.toString()}`);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F9F8F4' }}>
      <ShopNavbar />

      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontFamily: 'var(--font-display, serif)',
              fontWeight: 300,
              mb: 0.5,
              color: 'var(--obsidian, #1a1a1a)',
            }}
          >
            Our Products
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(26,26,26,0.5)' }}
          >
            Fresh, locally sourced produce from Hebron Height Gardens
          </Typography>
        </Box>

        {/* Filters Row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
            mb: 4,
          }}
        >
          {/* Search Form */}
          <Box
            component="form"
            onSubmit={applySearch}
            sx={{ display: 'flex', gap: 1 }}
          >
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 1.5,
                py: 0.5,
                border: '1px solid rgba(26,26,26,0.12)',
                borderRadius: 0,
                width: { xs: '100%', sm: 220 },
                backgroundColor: '#ffffff',
                '&:focus-within': {
                  borderColor: 'var(--bronze, #C5A059)',
                },
              }}
            >
              <SearchIcon
                sx={{ fontSize: 18, color: 'rgba(26,26,26,0.35)', mr: 1 }}
              />
              <InputBase
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products…"
                fullWidth
                sx={{
                  fontSize: '0.875rem',
                  color: 'var(--obsidian, #1a1a1a)',
                  '& input': { p: 0 },
                }}
              />
            </Paper>
            <Button
              type="submit"
              variant="contained"
              disableElevation
              sx={{
                px: 2.5,
                fontSize: '0.75rem',
                fontWeight: 500,
                backgroundColor: 'var(--obsidian, #1a1a1a)',
                color: '#F9F8F4',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'rgba(26,26,26,0.85)',
                },
              }}
            >
              GO
            </Button>
          </Box>

          {/* Category Chips */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {CATEGORIES.map((cat) => {
              const active = (cat === 'All' && !category) || cat === category;
              return (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => setFilter(cat)}
                  sx={{
                    borderRadius: 0,
                    px: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    backgroundColor: active
                      ? 'var(--bronze, #C5A059)'
                      : '#ffffff',
                    color: active ? '#F9F8F4' : 'rgba(26,26,26,0.6)',
                    border: `1px solid ${
                      active
                        ? 'var(--bronze, #C5A059)'
                        : 'rgba(26,26,26,0.12)'
                    }`,
                    transition: 'all 200ms ease',
                    '&:hover': {
                      backgroundColor: active
                        ? 'var(--bronze, #C5A059)'
                        : 'rgba(26,26,26,0.05)',
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Product Grid */}
        {loading ? (
          <Grid container spacing={2}>
            {[...Array(8)].map((_, i) => (
              <Grid item key={i} xs={6} md={4} lg={3}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '100%',
                    height:'300px',
                    aspectRatio: '1 / 1',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(26,26,26,0.06)',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : products.length === 0 ? (
          <Box sx={{ py: 12, textAlign: 'center' }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'var(--font-display, serif)',
                fontWeight: 300,
                mb: 1,
                color: 'var(--obsidian, #1a1a1a)',
              }}
            >
              No products found
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(26,26,26,0.45)' }}
            >
              Try a different search or category
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {products.map((p) => (
              <Grid item key={p.id} xs={6} md={4} lg={3}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Pagination
              count={pagination.totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 0,
                  borderColor: 'rgba(26,26,26,0.15)',
                  color: 'rgba(26,26,26,0.6)',
                  '&.Mui-selected': {
                    backgroundColor: 'var(--obsidian, #1a1a1a)',
                    color: '#F9F8F4',
                    '&:hover': {
                      backgroundColor: 'rgba(26,26,26,0.85)',
                    },
                  },
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}