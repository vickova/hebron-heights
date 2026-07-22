'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useHHGAuth } from '@/lib/authContext';
// import { useCart } from '@/lib/cartContext';

// MUI Core Components
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  InputBase,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

// MUI Icons
import {
  Search as SearchIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
  PersonOutlined as UserIcon,
  Logout as LogOutIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Park as LeafIcon, // Used Park icon as standard replacement for Leaf
} from '@mui/icons-material';

export default function ShopNavbar() {
//   const { user, signOut } = useHHGAuth();
//   const { itemCount } = useCart();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // MUI Popover Menu state for User Profile dropdown
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/shop?search=${encodeURIComponent(search.trim())}`);
    }
  };
const user= true
  const handleSignOut = async () => {
   console.log("hello")
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(26,26,26,0.08)',
        color: 'var(--obsidian, #1a1a1a)',
      }}
    >
      <Toolbar
        sx={{
          maxWidth: '1280px',
          width: '100%',
          mx: 'auto',
          px: { xs: 2, md: 4 },
          minHeight: '64px !important',
          gap: 2,
        }}
      >
        {/* 1. Logo */}
        <Box
          component={Link}
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'var(--bronze, #C5A059)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LeafIcon sx={{ fontSize: 18, color: '#F9F8F4' }} />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: 'var(--font-display, serif)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: 'var(--obsidian, #1a1a1a)',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            HHG
          </Typography>
        </Box>

        {/* 2. Search Field */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            flex: 1,
            maxWidth: '400px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(26,26,26,0.05)',
              borderRadius: '50px',
              px: 1.5,
              py: 0.5,
              border: '1px solid transparent',
              transition: 'border-color 0.2s',
              '&:focus-within': {
                borderColor: 'var(--bronze, #C5A059)',
              },
            }}
          >
            <SearchIcon
              sx={{ fontSize: 18, color: 'rgba(26,26,26,0.35)', mr: 1 }}
            />
            <InputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              fullWidth
              sx={{
                fontSize: '0.875rem',
                color: 'var(--obsidian, #1a1a1a)',
                '& input': {
                  p: 0,
                },
              }}
            />
          </Box>
        </Box>

        {/* 3. Desktop Navigation Links */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 3,
            ml: 1,
          }}
        >
          <Typography
            component={Link}
            href="/shop"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              color: 'var(--obsidian, #1a1a1a)',
              '&:hover': { opacity: 0.8 },
            }}
          >
            SHOP
          </Typography>
          <Typography
            component={Link}
            href="/orders"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              color: 'rgba(26,26,26,0.55)',
              '&:hover': { color: 'var(--obsidian, #1a1a1a)' },
            }}
          >
            ORDERS
          </Typography>
        </Box>

        {/* 4. Action Controls (Cart, User, Mobile Toggle) */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}
        >
          {/* Cart Icon */}
          <IconButton
            component={Link}
            href="/cart"
            aria-label="Cart"
            sx={{ color: 'var(--obsidian, #1a1a1a)' }}
          >
            <Badge
            //   badgeContent={itemCount > 9 ? '9+' : itemCount}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: 'var(--bronze, #C5A059)',
                  color: '#ffffff',
                  fontSize: '10px',
                  height: '18px',
                  minWidth: '18px',
                },
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 22 }} />
            </Badge>
          </IconButton>

          {/* User Account / Profile */}
          {user ? (
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  backgroundColor: 'rgba(197,160,89,0.1)',
                  p: 1,
                  '&:hover': { backgroundColor: 'rgba(197,160,89,0.2)' },
                }}
              >
                <UserIcon sx={{ fontSize: 20, color: 'var(--bronze, #C5A059)' }} />
              </IconButton>

              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    mt: 1.5,
                    minWidth: 192,
                    borderRadius: 0,
                    border: '1px solid rgba(26,26,26,0.08)',
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography
                    variant="caption"
                    component="p"
                    sx={{
                      fontWeight: 600,
                      color: 'var(--obsidian, #1a1a1a)',
                      lineHeight: 1.2,
                    }}
                  >
                    name name
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    sx={{ color: 'rgba(26,26,26,0.5)', fontSize: '0.7rem' }}
                  >
                    email email
                  </Typography>
                </Box>
                <Divider sx={{ my: 0.5, borderColor: 'rgba(26,26,26,0.06)' }} />
                <MenuItem
                  component={Link}
                  href="/orders"
                  onClick={handleCloseUserMenu}
                  sx={{ fontSize: '0.875rem' }}
                >
                  My Orders
                </MenuItem>
                <MenuItem
                  onClick={handleSignOut}
                  sx={{ fontSize: '0.875rem', color: '#ef4444' }}
                >
                  <LogOutIcon sx={{ fontSize: 16, mr: 1 }} /> Sign Out
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              component={Link}
              href="/signin"
              variant="contained"
              disableElevation
              sx={{
                px: 2,
                py: 0.75,
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
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
          )}

          {/* Mobile Menu Toggle */}
          <IconButton
            onClick={() => setMobileMenuOpen((open) => !open)}
            sx={{ display: { md: 'none' }, ml: 0.5 }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      {/* 5. Mobile Navigation Drawer */}
      <Drawer
        anchor="top"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            top: '64px',
            borderRadius: 0,
            borderBottom: '1px solid rgba(26,26,26,0.08)',
            boxShadow: 'none',
          },
        }}
      >
        <List sx={{ px: 2, py: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ListItemText
                primary="Shop"
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  color: 'var(--obsidian, #1a1a1a)',
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/orders"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ListItemText
                primary="My Orders"
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  color: 'rgba(26,26,26,0.55)',
                }}
              />
            </ListItemButton>
          </ListItem>
          {user && (
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon sx={{ minWidth: 28, color: '#ef4444' }}>
                  <LogOutIcon sx={{ fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Sign Out"
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    color: '#ef4444',
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}