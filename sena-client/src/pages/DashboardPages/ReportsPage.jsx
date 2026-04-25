import React from 'react';
import { BarChart, Gauge, LineChart, PieChart } from '@mui/x-charts';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const reportStats = [
  { label: 'Generated Reports', value: 124, note: '+18 this week' },
  { label: 'Pending Review', value: 19, note: '6 high priority' },
  { label: 'Approval Rate', value: '86%', note: 'Stable this month' },
];

const reportActivity = [
  'Weekly analytics report was generated at 8:30 AM.',
  'Three department summaries are waiting for approval.',
  'Monthly KPI trend improved compared with last period.',
];

const ReportsPage = () => {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          color: 'common.white',
          background:
            'linear-gradient(135deg, rgba(0,121,107,1) 0%, rgba(2,136,209,1) 55%, rgba(21,101,192,1) 100%)',
        }}
      >
        <Stack spacing={2}>
          <Chip
            label="Reports Analytics"
            sx={{ alignSelf: 'flex-start', bgcolor: 'rgba(255,255,255,0.16)', color: 'white' }}
          />
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Visual insights for reports and performance
          </Typography>
          <Typography sx={{ maxWidth: 720, opacity: 0.92 }}>
            This page highlights reporting activity through charts and visual summaries,
            making it easier to monitor trends, output, and approval progress.
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
        {reportStats.map((stat) => (
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
          gridTemplateColumns: { xs: '1fr', xl: '1.3fr 0.7fr' },
        }}
      >
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Report Output
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Compare generated and approved reports across the last six months.
            </Typography>
            <BarChart
              height={320}
              xAxis={[
                {
                  data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  scaleType: 'band',
                },
              ]}
              series={[
                { data: [18, 24, 20, 26, 31, 28], label: 'Generated' },
                { data: [14, 20, 17, 22, 27, 24], label: 'Approved' },
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Review Completion
            </Typography>
            <Stack spacing={2} alignItems="center" sx={{ py: 2 }}>
              <Gauge width={160} height={160} value={86} valueMin={0} valueMax={100} />
              <Typography variant="body2" color="text.secondary">
                86% of submitted reports were reviewed successfully.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
        }}
      >
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Weekly Trend
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Monitor reporting consistency through a weekly line visualization.
            </Typography>
            <LineChart
              height={300}
              xAxis={[
                {
                  scaleType: 'point',
                  data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                },
              ]}
              series={[
                {
                  data: [32, 41, 36, 48],
                  label: 'Submitted Reports',
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Report Categories
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Distribution of report types handled by the team.
            </Typography>
            <PieChart
              height={300}
              series={[
                {
                  data: [
                    { id: 0, value: 32, label: 'Academic' },
                    { id: 1, value: 24, label: 'Finance' },
                    { id: 2, value: 18, label: 'Operations' },
                    { id: 3, value: 12, label: 'Support' },
                  ],
                },
              ]}
            />
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Reporting Notes
          </Typography>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {reportActivity.map((item) => (
              <Paper
                key={item}
                variant="outlined"
                sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}
              >
                <Typography variant="body2">{item}</Typography>
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ReportsPage;
