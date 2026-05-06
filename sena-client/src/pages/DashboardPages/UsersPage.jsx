import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '');
const normalize = (value) => String(value ?? '').trim();

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: normalize(user.firstName),
        lastName: normalize(user.lastName),
        age: normalize(user.age),
        gender: genders.includes(normalize(user.gender).toLowerCase())
          ? normalize(user.gender).toLowerCase()
          : '',
        contactNumber: normalize(user.contactNumber),
        email: normalize(user.email).toLowerCase(),
        role: roles.includes(normalize(user.role).toLowerCase())
          ? normalize(user.role).toLowerCase()
          : 'editor',
        username: normalize(user.username).toLowerCase(),
        password: String(user.password ?? ''),
        address: normalize(user.address),
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: '',
    };
  } catch {
    return {
      users: [],
      error: 'Unable to read users from src/data/users.json.',
    };
  }
};

const seed = loadUsers();

const surfaceSx = {
  borderRadius: 3,
  bgcolor: 'rgba(24,24,27,0.88)',
  color: '#f4f4f5',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 18px 40px rgba(0,0,0,0.26)',
  backdropFilter: 'blur(8px)',
};

const textFieldSx = {
  '& .MuiInputBase-root': {
    bgcolor: 'rgba(9,9,11,0.38)',
    color: '#f4f4f5',
    borderRadius: 2,
  },
  '& .MuiInputLabel-root, & .MuiInputAdornment-root, & .MuiSvgIcon-root': {
    color: 'rgba(244,244,245,0.66)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255,255,255,0.12)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#8b5cf6',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#8b5cf6',
  },
};

const dataGridDarkSx = {
  minWidth: 0,
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 2,
  bgcolor: 'rgba(9,9,11,0.42)',
  color: '#f4f4f5',
  '--DataGrid-containerBackground': 'rgba(24,24,27,0.96)',
  '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': {
    bgcolor: 'rgba(24,24,27,0.96)',
    color: '#f4f4f5',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    color: '#f4f4f5',
    fontWeight: 700,
  },
  '& .MuiDataGrid-row': {
    bgcolor: 'rgba(9,9,11,0.18)',
  },
  '& .MuiDataGrid-row:hover': {
    bgcolor: 'rgba(139,92,246,0.1)',
  },
  '& .MuiDataGrid-row.Mui-selected': {
    bgcolor: 'rgba(139,92,246,0.22)',
    color: '#ffffff',
  },
  '& .MuiDataGrid-row.Mui-selected:hover': {
    bgcolor: 'rgba(139,92,246,0.3)',
  },
  '& .MuiDataGrid-cell': {
    color: 'rgba(244,244,245,0.88)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
    outline: '1px solid rgba(196,181,253,0.55)',
    outlineOffset: -1,
  },
  '& .MuiDataGrid-columnSeparator': {
    color: 'rgba(255,255,255,0.1)',
  },
  '& .MuiDataGrid-footerContainer': {
    bgcolor: 'rgba(24,24,27,0.96)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  '& .MuiCheckbox-root, & .MuiTablePagination-root, & .MuiSvgIcon-root': {
    color: 'rgba(244,244,245,0.78)',
  },
};

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const resetForm = () => setForm({ ...blankForm });

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
  };

  const query = search.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    const rowText = [user.firstName, user.lastName, user.email, user.username].join(' ').toLowerCase();
    const matchesSearch = !query || rowText.includes(query);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesGender = genderFilter === 'all' || user.gender === genderFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const summaryStats = [
    { label: 'Total Users', value: users.length, icon: PeopleIcon, color: '#8b5cf6' },
    { label: 'Active Users', value: users.filter((user) => user.isActive).length, icon: CheckCircleIcon, color: '#10b981' },
    { label: 'Admins', value: users.filter((user) => user.role === 'admin').length, icon: FilterListIcon, color: '#38bdf8' },
  ];

  const labels = {
    firstName: 'First name',
    lastName: 'Last name',
    age: 'Age',
    gender: 'Gender',
    contactNumber: 'Contact number',
    email: 'Email',
    role: 'Role',
    username: 'Username',
    password: 'Password',
    address: 'Address',
  };

  const validate = () => {
    const nextErrors = {};
    const email = normalize(form.email).toLowerCase();
    const username = normalize(form.username).toLowerCase();
    const age = normalize(form.age);
    const contactNumber = normalize(form.contactNumber);

    Object.keys(labels).forEach((key) => {
      if (!normalize(form[key])) nextErrors[key] = `${labels[key]} is required.`;
    });
    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!nextErrors.password && String(form.password).trim().length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }
    if (!nextErrors.contactNumber && !/^\d{11}$/.test(contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }
    if (!nextErrors.age && !/^\d+$/.test(age)) {
      nextErrors.age = 'Age must contain numbers only.';
    }
    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }
    if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
      nextErrors.email = 'Email address already exists.';
    }
    if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) {
      nextErrors.username = 'Username already exists.';
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: normalize(form.firstName),
      lastName: normalize(form.lastName),
      age: normalize(form.age),
      gender: normalize(form.gender).toLowerCase(),
      contactNumber: normalize(form.contactNumber),
      email: normalize(form.email).toLowerCase(),
      role: normalize(form.role).toLowerCase(),
      username: normalize(form.username).toLowerCase(),
      password: String(form.password),
      address: normalize(form.address),
      isActive: form.isActive,
    };

    setUsers((current) =>
      modal.id
        ? current.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
        : [
            ...current,
            {
              id: current.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
              ...nextUser,
            },
          ]
    );
    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user)));
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    sx: textFieldSx,
    ...extra,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.role),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.row.isActive ? 'Active' : 'Inactive'}
          sx={{
            minWidth: 76,
            fontWeight: 700,
            color: params.row.isActive ? '#dcfce7' : '#e5e7eb',
            bgcolor: params.row.isActive ? 'rgba(34,197,94,0.65)' : 'rgba(113,113,122,0.22)',
            border: `1px solid ${params.row.isActive ? 'rgba(134,239,172,0.35)' : 'rgba(212,212,216,0.32)'}`,
            '& .MuiChip-label': { px: 1.25 },
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(params.row)}
            sx={{
              borderColor: 'rgba(56,189,248,0.42)',
              color: '#7dd3fc',
              borderRadius: 1.5,
              '&:hover': {
                borderColor: '#38bdf8',
                bgcolor: 'rgba(56,189,248,0.1)',
              },
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => toggleStatus(params.row.id)}
            sx={{
              borderRadius: 1.5,
              color: '#ffffff',
              bgcolor: params.row.isActive ? '#f97316' : '#16a34a',
              '&:hover': {
                bgcolor: params.row.isActive ? '#ea580c' : '#15803d',
              },
            }}
          >
            {params.row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={3} sx={{ width: '100%', minWidth: 0 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          color: 'common.white',
          background:
            'linear-gradient(135deg, rgba(24,24,27,0.96) 0%, rgba(49,46,129,0.88) 58%, rgba(14,165,233,0.76) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ md: 'center' }} justifyContent="space-between">
          <Box>
            <Chip label="User Directory" sx={{ mb: 2, bgcolor: 'rgba(196,181,253,0.16)', color: '#ddd6fe' }} />
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Manage access and profiles
            </Typography>
            <Typography sx={{ mt: 1.5, maxWidth: 680, color: 'rgba(255,255,255,0.78)' }}>
              Search, filter, update, and activate user accounts from one focused admin workspace.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => openModal()}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              bgcolor: '#ffffff',
              color: '#111827',
              borderRadius: 2,
              '&:hover': { bgcolor: '#e5e7eb' },
            }}
          >
            Add User
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Paper key={stat.label} elevation={0} sx={{ ...surfaceSx, p: 2.5, position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', top: -28, right: -24, width: 86, height: 86, borderRadius: '50%', bgcolor: `${stat.color}24` }} />
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ position: 'relative' }}>
                <Icon sx={{ color: stat.color }} />
                <Typography variant="overline" sx={{ color: 'rgba(244,244,245,0.66)', fontWeight: 700 }}>
                  {stat.label}
                </Typography>
              </Stack>
              <Typography variant="h3" sx={{ mt: 1, fontWeight: 700, position: 'relative' }}>
                {stat.value}
              </Typography>
            </Paper>
          );
        })}
      </Box>

      <Paper sx={{ ...surfaceSx, p: { xs: 1.5, sm: 2 }, minWidth: 0 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <FilterListIcon sx={{ color: '#c4b5fd' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Search users by first name, last name, email, or username"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={textFieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField select label="Role" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} sx={{ ...textFieldSx, minWidth: { xs: '100%', sm: 180 } }}>
            <MenuItem value="all">All Roles</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {labelize(role)}
              </MenuItem>
            ))}
          </TextField>
          <TextField select label="Gender" value={genderFilter} onChange={(event) => setGenderFilter(event.target.value)} sx={{ ...textFieldSx, minWidth: { xs: '100%', sm: 180 } }}>
            <MenuItem value="all">All Genders</MenuItem>
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {labelize(gender)}
              </MenuItem>
            ))}
          </TextField>
          <TextField select label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} sx={{ ...textFieldSx, minWidth: { xs: '100%', sm: 180 } }}>
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}

      <Paper sx={{ ...surfaceSx, p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ sm: 'center' }} sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              User Records
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(244,244,245,0.66)' }}>
              Showing {filteredUsers.length} of {users.length} accounts
            </Typography>
          </Box>
        </Stack>
        {filteredUsers.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
              sx={dataGridDarkSx}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users match the current search or filter. Try changing the search text,
            role, or status filter.
          </Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: '#18181b',
            color: '#f4f4f5',
            borderRadius: { xs: 0, sm: 3 },
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, borderColor: 'rgba(255,255,255,0.08)' }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />
              <FormControlLabel
                control={<Switch name="isActive" checked={form.isActive} onChange={handleChange} />}
                label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
                sx={{ color: 'rgba(244,244,245,0.78)' }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Button onClick={closeModal} sx={{ color: '#ddd6fe' }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ borderRadius: 2, bgcolor: '#8b5cf6', '&:hover': { bgcolor: '#7c3aed' } }}>
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Stack>
  );
};

export default UsersPage;
