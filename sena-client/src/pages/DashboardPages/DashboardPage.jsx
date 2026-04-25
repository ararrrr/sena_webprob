import React from 'react';
import { BarChart, Gauge, PieChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (_, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const mapCenter = [14.604253, 120.994314];
const completionRate = 78;
const responseRate = 64;

const summaryCards = [
  {
    label: 'Total Users',
    value: rows.length,
    caption: '+12% from last month',
  },
  {
    label: 'Average Age',
    value: (
      rows.reduce((sum, row) => sum + (row.age || 0), 0) /
      rows.filter((row) => row.age !== null).length
    ).toFixed(1),
    caption: 'Across active records',
  },
  {
    label: 'Open Reports',
    value: 18,
    caption: '5 need urgent review',
  },
  {
    label: 'Resolved Today',
    value: 27,
    caption: 'Operations are on track',
  },
];

const recentActivities = [
  '5 new user profiles were approved this morning.',
  'Reports module reached 78% completion this week.',
  'Support response time improved by 11% today.',
];

function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          color: 'common.white',
          background:
            'linear-gradient(135deg, rgba(25,118,210,1) 0%, rgba(13,71,161,1) 60%, rgba(0,150,136,1) 100%)',
        }}
      >
        <Stack spacing={2}>
          <Chip
            label="Overview Summary"
            sx={{ alignSelf: 'flex-start', bgcolor: 'rgba(255,255,255,0.16)', color: 'white' }}
          />
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Team performance at a glance
          </Typography>
          <Typography sx={{ maxWidth: 720, opacity: 0.92 }}>
            This dashboard gives a quick overview of user records, report progress,
            response health, and location-based activity so you can monitor the system
            in one place.
          </Typography>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' },
        }}
      >
        {summaryCards.map((card) => (
          <Card key={card.label} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                {card.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.caption}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '1.25fr 0.75fr' },
          alignItems: 'stretch',
        }}
      >
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quarterly Summary
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Compare task output across the last four quarters.
            </Typography>
            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Completed' },
                { data: [21, 16, 29, 30], label: 'Pending' },
              ]}
              height={300}
              xAxis={[
                {
                  data: ['Q1', 'Q2', 'Q3', 'Q4'],
                  scaleType: 'band',
                  label: 'Quarter',
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Progress Snapshot
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="center" sx={{ py: 2 }}>
              <Box textAlign="center">
                <Gauge width={120} height={120} value={completionRate} />
                <Typography variant="body2" color="text.secondary">
                  Completion Rate
                </Typography>
              </Box>
              <Box textAlign="center">
                <Gauge width={120} height={120} value={responseRate} valueMin={0} valueMax={100} />
                <Typography variant="body2" color="text.secondary">
                  Response Rate
                </Typography>
              </Box>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 38, label: 'Users' },
                    { id: 1, value: 24, label: 'Reports' },
                    { id: 2, value: 18, label: 'Support' },
                  ],
                },
              ]}
              width={320}
              height={220}
            />
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' },
        }}
      >
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Users Overview
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Editable sample table for quick monitoring of user records.
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {recentActivities.map((activity) => (
                <Paper
                  key={activity}
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}
                >
                  <Typography variant="body2">{activity}</Typography>
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Location Overview
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sample map showing a key campus location for dashboard tracking.
          </Typography>
          <Box sx={{ height: 420, width: '100%', borderRadius: 3, overflow: 'hidden' }}>
            <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={mapCenter}>
                <Popup>
                  National University-Manila
                  <br />
                  J. Fajardo St, Sampaloc, Manila, 1008 Metro Manila
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default DashboardPage;
