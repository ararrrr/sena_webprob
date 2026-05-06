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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
    icon: PeopleIcon,
    color: '#8b5cf6',
  },
  {
    label: 'Average Age',
    value: (
      rows.reduce((sum, row) => sum + (row.age || 0), 0) /
      rows.filter((row) => row.age !== null).length
    ).toFixed(1),
    caption: 'Across active records',
    icon: TrendingUpIcon,
    color: '#38bdf8',
  },
  {
    label: 'Open Reports',
    value: 18,
    caption: '5 need urgent review',
    icon: AssignmentIcon,
    color: '#f59e0b',
  },
  {
    label: 'Resolved Today',
    value: 27,
    caption: 'Operations are on track',
    icon: CheckCircleIcon,
    color: '#10b981',
  },
];

const recentActivities = [
  '5 new user profiles were approved this morning.',
  'Reports module reached 78% completion this week.',
  'Support response time improved by 11% today.',
];

const pageCardSx = {
  borderRadius: 3,
  bgcolor: 'rgba(24,24,27,0.88)',
  color: '#f4f4f5',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 18px 40px rgba(0,0,0,0.26)',
  backdropFilter: 'blur(8px)',
};

const mutedTextSx = { color: 'rgba(244,244,245,0.66)' };

const chartTextSx = {
  '& text': { fill: 'rgba(244,244,245,0.78) !important' },
  '& .MuiChartsAxis-line': { stroke: 'rgba(255,255,255,0.2)' },
  '& .MuiChartsAxis-tick': { stroke: 'rgba(255,255,255,0.2)' },
  '& .MuiChartsAxis-tickLabel': { fill: 'rgba(244,244,245,0.72) !important' },
  '& .MuiChartsAxis-label': { fill: 'rgba(244,244,245,0.76) !important' },
  '& .MuiChartsLegend-label': { fill: 'rgba(244,244,245,0.82) !important' },
};

const dataGridDarkSx = {
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 2,
  bgcolor: 'rgba(9,9,11,0.42)',
  color: '#f4f4f5',
  '--DataGrid-containerBackground': 'rgba(24,24,27,0.96)',
  '& .MuiDataGrid-main': {
    bgcolor: 'rgba(9,9,11,0.42)',
  },
  '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': {
    bgcolor: 'rgba(24,24,27,0.96)',
    color: '#f4f4f5',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    color: '#f4f4f5',
    fontWeight: 700,
  },
  '& .MuiDataGrid-virtualScroller, & .MuiDataGrid-overlayWrapper, & .MuiDataGrid-overlayWrapperInner': {
    bgcolor: 'rgba(9,9,11,0.42)',
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

function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          color: 'common.white',
          background:
            'linear-gradient(135deg, rgba(24,24,27,0.96) 0%, rgba(49,46,129,0.9) 58%, rgba(124,58,237,0.82) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
        }}
      >
        <Stack spacing={2}>
          <Chip
            label="Overview Summary"
            sx={{ alignSelf: 'flex-start', bgcolor: 'rgba(196,181,253,0.16)', color: '#ddd6fe' }}
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
          gap: 3,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' },
        }}
      >
        {summaryCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={card.label}
              sx={{
                borderRadius: 3,
                background:
                  'linear-gradient(145deg, rgba(24,24,27,0.94), rgba(39,39,42,0.86))',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.08)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 18px 34px ${card.color}26`,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '96px',
                  height: '96px',
                  background: `${card.color}24`,
                  borderRadius: '50%',
                  transform: 'translate(30px, -30px)',
                },
              }}
            >
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconComponent sx={{ mr: 1, fontSize: 24, color: card.color }} />
                  <Typography variant="overline" sx={{ color: 'rgba(244,244,245,0.66)', fontWeight: 600 }}>
                    {card.label}
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5, fontSize: '2.5rem' }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {card.caption}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '1.25fr 0.75fr' },
          alignItems: 'stretch',
        }}
      >
        <Card sx={pageCardSx}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quarterly Summary
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, ...mutedTextSx }}>
              Compare task output across the last four quarters.
            </Typography>
            <BarChart
              series={[
                {
                  data: [35, 44, 24, 34],
                  label: 'Completed',
                  color: '#8b5cf6'
                },
                {
                  data: [21, 16, 29, 30],
                  label: 'Pending',
                  color: '#38bdf8'
                },
              ]}
              height={320}
              xAxis={[
                {
                  data: ['Q1', 'Q2', 'Q3', 'Q4'],
                  scaleType: 'band',
                  label: 'Quarter',
                },
              ]}
              sx={{
                ...chartTextSx,
              }}
            />
          </CardContent>
        </Card>

        <Card sx={pageCardSx}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Progress Snapshot
            </Typography>
            <Stack direction="row" spacing={4} justifyContent="center" sx={{ py: 3 }}>
              <Box textAlign="center">
                <Box sx={{
                  position: 'relative',
                  display: 'inline-block',
                  mb: 2
                }}>
                  <Gauge
                    width={140}
                    height={140}
                    value={completionRate}
                    sx={{
                      '& .MuiGauge-valueArc': { fill: '#8b5cf6' },
                      '& .MuiGauge-referenceArc': { fill: 'rgba(255,255,255,0.1)' },
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontWeight: 700,
                      color: '#ddd6fe'
                    }}
                  >
                    {completionRate}%
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 500, ...mutedTextSx }}>
                  Completion Rate
                </Typography>
              </Box>
              <Box textAlign="center">
                <Box sx={{
                  position: 'relative',
                  display: 'inline-block',
                  mb: 2
                }}>
                  <Gauge
                    width={140}
                    height={140}
                    value={responseRate}
                    valueMin={0}
                    valueMax={100}
                    sx={{
                      '& .MuiGauge-valueArc': { fill: '#38bdf8' },
                      '& .MuiGauge-referenceArc': { fill: 'rgba(255,255,255,0.1)' },
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontWeight: 700,
                      color: '#bae6fd'
                    }}
                  >
                    {responseRate}%
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 500, ...mutedTextSx }}>
                  Response Rate
                </Typography>
              </Box>
            </Stack>
            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.08)' }} />
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 38, label: 'Users', color: '#8b5cf6' },
                    { id: 1, value: 24, label: 'Reports', color: '#38bdf8' },
                    { id: 2, value: 18, label: 'Support', color: '#10b981' },
                  ],
                  innerRadius: 40,
                  outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 4,
                },
              ]}
              width={340}
              height={240}
              sx={{
                ...chartTextSx,
                '& .MuiChartsLegend-root': {
                  '& .MuiChartsLegend-series': {
                    '& text': { fontSize: '14px !important', fill: 'rgba(244,244,245,0.78) !important' }
                  }
                }
              }}
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
        <Card sx={pageCardSx}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Users Overview
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, ...mutedTextSx }}>
              Editable sample table for quick monitoring of user records.
            </Typography>
            <Box sx={{ height: 420, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                sx={dataGridDarkSx}
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

        <Card sx={pageCardSx}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Recent Activity
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {recentActivities.map((activity, index) => (
                <Paper
                  key={activity}
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(9,9,11,0.42)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transform: 'translateY(-1px)',
                    },
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 16,
                      top: 20,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: ['#8b5cf6', '#38bdf8', '#10b981'][index % 3],
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ pl: 3, color: '#f4f4f5' }}>
                    {activity}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Card sx={pageCardSx}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOnIcon sx={{ mr: 1, color: '#c4b5fd' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Location Overview
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 3, ...mutedTextSx }}>
            Sample map showing a key campus location for dashboard tracking.
          </Typography>
          <Box sx={{
            height: 450,
            width: '100%',
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.12)'
          }}>
            <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={mapCenter}>
                <Popup>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    National University-Manila
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    J. Fajardo St, Sampaloc, Manila, 1008 Metro Manila
                  </Typography>
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
