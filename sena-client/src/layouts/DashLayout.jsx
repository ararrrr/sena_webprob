import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const drawerSurface = {
  background:
    'linear-gradient(180deg, rgba(24,24,27,0.98) 0%, rgba(9,9,11,1) 72%)',
  color: '#f4f4f5',
  borderRight: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '16px 0 36px rgba(0,0,0,0.28)',
};

const dashboardNavItems = [
  {
    label: 'Dashboard',
    title: 'Dashboard',
    to: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'Reports',
    title: 'Reports',
    to: '/dashboard/reports',
    icon: AssessmentIcon,
  },
  {
    label: 'Users',
    title: 'Users',
    to: '/dashboard/users',
    icon: PeopleIcon,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  ...drawerSurface,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  ...drawerSurface,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  minHeight: 76,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'rgba(9,9,11,0.88)',
  color: '#f4f4f5',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 12px 30px rgba(0,0,0,0.28)',
  backdropFilter: 'blur(14px)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.1)',
  backgroundColor: alpha(theme.palette.common.white, 0.06),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find(({ to }) => to === pathname)?.title ?? 'Welcome';

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = getPageTitle(location.pathname);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#09090b' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ minHeight: 76 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              mr: { xs: 2, sm: 4 },
              width: 42,
              height: 42,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.06)',
              '&:hover': { bgcolor: 'rgba(139,92,246,0.18)' },
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {pageTitle}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: 'rgba(255,255,255,0.2)',
              borderRadius: 2,
              '&:hover': { borderColor: 'rgba(196,181,253,0.7)', bgcolor: 'rgba(196,181,253,0.08)' },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: open ? 'space-between' : 'center', px: 1.25, minHeight: 76 }}>
          {open ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: 'rgba(139,92,246,0.18)',
                  border: '1px solid rgba(196,181,253,0.22)',
                  color: '#ddd6fe',
                  fontWeight: 800,
                }}
              >
                U
              </Box>
              <Box sx={{ minWidth: 0 }}>
              <Typography variant="overline" sx={{ color: '#c4b5fd', letterSpacing: '0.18em' }}>
                Universe
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: -0.75, fontWeight: 700 }}>
                Admin
              </Typography>
              </Box>
            </Box>
          ) : null}
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: '#f4f4f5',
              width: 42,
              height: 42,
              borderRadius: 2,
              bgcolor: open ? 'rgba(255,255,255,0.04)' : 'rgba(139,92,246,0.18)',
              '&:hover': { bgcolor: 'rgba(139,92,246,0.24)' },
            }}
          >
            {open ? (
              theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        <List sx={{ px: 0, py: 1.25 }}>
          {dashboardNavItems.map(({ label, to, icon: Icon }) => (
            <ListItem key={to} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
                sx={{
                  minHeight: 48,
                  width: open ? 'auto' : 56,
                  height: open ? 48 : 56,
                  px: open ? 2 : 0,
                  mx: open ? 1.25 : 'auto',
                  my: 0.75,
                  borderRadius: 2,
                  display: open ? 'flex' : 'grid',
                  justifyContent: open ? 'initial' : 'center',
                  alignItems: 'center',
                  placeItems: open ? 'initial' : 'center',
                  color: location.pathname === to ? '#ffffff' : '#a1a1aa',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(139,92,246,0.22)',
                    border: '1px solid rgba(196,181,253,0.26)',
                    color: '#ffffff',
                    boxShadow: '0 10px 24px rgba(124,58,237,0.16)',
                  },
                  '&.Mui-selected:hover, &:hover': {
                    bgcolor: 'rgba(139,92,246,0.12)',
                    color: '#ffffff',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    mr: open ? 2 : 0,
                    display: 'grid',
                    placeItems: 'center',
                    flex: '0 0 32px',
                    color: 'inherit',
                    '& svg': {
                      display: 'block',
                      width: 24,
                      height: 24,
                      margin: 0,
                      transform: 'translateX(0)',
                    },
                  }}
                >
                  {React.createElement(Icon)}
                </Box>
                {open ? <ListItemText primary={label} /> : null}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, md: 3 },
          color: '#f4f4f5',
          background:
            'radial-gradient(circle at top right, rgba(124,58,237,0.16), transparent 34%), #09090b',
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;
