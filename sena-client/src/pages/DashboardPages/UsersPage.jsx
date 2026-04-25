import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const userRows = [
  {
    id: 1,
    name: 'Jon Snow',
    email: 'jon.snow@email.com',
    role: 'Administrator',
    department: 'Operations',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Cersei Lannister',
    email: 'cersei.l@email.com',
    role: 'Manager',
    department: 'Finance',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Arya Stark',
    email: 'arya.stark@email.com',
    role: 'Staff',
    department: 'Support',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Jaime Lannister',
    email: 'jaime.l@email.com',
    role: 'Analyst',
    department: 'Reports',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Daenerys Targaryen',
    email: 'dany@email.com',
    role: 'Supervisor',
    department: 'Administration',
    status: 'Pending',
  },
  {
    id: 6,
    name: 'Harvey Roxie',
    email: 'harvey@email.com',
    role: 'Staff',
    department: 'Users',
    status: 'Active',
  },
];

const userColumns = [
  {
    field: 'name',
    headerName: 'User',
    minWidth: 220,
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ py: 1 }}>
        <Avatar>{params.value.charAt(0)}</Avatar>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.value}
        </Typography>
      </Stack>
    ),
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 220,
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    minWidth: 140,
    flex: 0.8,
  },
  {
    field: 'department',
    headerName: 'Department',
    minWidth: 150,
    flex: 0.9,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 140,
    flex: 0.7,
    renderCell: (params) => {
      const colorMap = {
        Active: 'success',
        Inactive: 'default',
        Pending: 'warning',
      };

      return (
        <Chip
          label={params.value}
          color={colorMap[params.value] || 'default'}
          size="small"
          variant={params.value === 'Inactive' ? 'outlined' : 'filled'}
        />
      );
    },
  },
];

const userStats = [
  { label: 'Total Users', value: userRows.length, note: 'Current records' },
  { label: 'Active Users', value: 4, note: 'Most are currently online' },
  { label: 'Pending Approval', value: 1, note: 'Needs admin action' },
];

const quickNotes = [
  'New users should be reviewed before role assignment.',
  'Inactive accounts can be archived after final validation.',
  'Department filters can be added later for easier user monitoring.',
];

const UsersPage = () => {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          color: 'common.white',
          background:
            'linear-gradient(135deg, rgba(94,53,177,1) 0%, rgba(30,136,229,1) 55%, rgba(0,137,123,1) 100%)',
        }}
      >
        <Stack spacing={2}>
          <Chip
            label="Users Directory"
            sx={{ alignSelf: 'flex-start', bgcolor: 'rgba(255,255,255,0.16)', color: 'white' }}
          />
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            User list and account details
          </Typography>
          <Typography sx={{ maxWidth: 720, opacity: 0.92 }}>
            This page provides a clean user directory with roles, departments, and
            account status so administrators can review user details quickly.
          </Typography>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {userStats.map((stat) => (
          <Card key={stat.label} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.note}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '1.35fr 0.65fr' },
        }}
      >
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Users Table
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Review user information, roles, departments, and account status in one table.
            </Typography>
            <Box sx={{ height: 420, width: '100%' }}>
              <DataGrid
                rows={userRows}
                columns={userColumns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Notes
            </Typography>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {quickNotes.map((note) => (
                <Paper
                  key={note}
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}
                >
                  <Typography variant="body2">{note}</Typography>
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

export default UsersPage;
