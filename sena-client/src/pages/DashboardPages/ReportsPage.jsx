import { useRef } from "react";
import { BarChart, Gauge, PieChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PrintIcon from "@mui/icons-material/Print";
import TableChartIcon from "@mui/icons-material/TableChart";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TimelineIcon from "@mui/icons-material/Timeline";
import PieChartIcon from "@mui/icons-material/PieChart";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (_, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const reportStats = [
  {
    label: "Total Records",
    value: rows.length,
    note: "Live report dataset",
    icon: AnalyticsIcon,
    color: "#8b5cf6",
  },
  {
    label: "Average Age",
    value: "47.8",
    note: "Based on available ages",
    icon: TimelineIcon,
    color: "#38bdf8",
  },
  {
    label: "Review Completion",
    value: "86%",
    note: "Current approval rate",
    icon: AssessmentIcon,
    color: "#10b981",
  },
];

const categorySeries = [
  { label: "Sales", value: 35, color: "#8b5cf6" },
  { label: "Operations", value: 25, color: "#38bdf8" },
  { label: "Finance", value: 22, color: "#10b981" },
  { label: "Support", value: 18, color: "#f59e0b" },
];

const surfaceCardSx = {
  borderRadius: 3,
  bgcolor: "rgba(24,24,27,0.88)",
  color: "#f4f4f5",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
  backdropFilter: "blur(8px)",
};

const mutedTextSx = { color: "rgba(244,244,245,0.66)" };

const chartTextSx = {
  "& text": { fill: "rgba(244,244,245,0.78) !important" },
  "& .MuiChartsAxis-line": { stroke: "rgba(255,255,255,0.2)" },
  "& .MuiChartsAxis-tick": { stroke: "rgba(255,255,255,0.2)" },
  "& .MuiChartsAxis-tickLabel": { fill: "rgba(244,244,245,0.72) !important" },
  "& .MuiChartsAxis-label": { fill: "rgba(244,244,245,0.76) !important" },
  "& .MuiChartsLegend-label": { fill: "rgba(244,244,245,0.82) !important" },
};

const dataGridDarkSx = {
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 2,
  bgcolor: "rgba(9,9,11,0.42)",
  color: "#f4f4f5",
  "--DataGrid-containerBackground": "rgba(24,24,27,0.96)",
  "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader": {
    bgcolor: "rgba(24,24,27,0.96)",
    color: "#f4f4f5",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: "#f4f4f5",
    fontWeight: 700,
  },
  "& .MuiDataGrid-row": {
    bgcolor: "rgba(9,9,11,0.18)",
  },
  "& .MuiDataGrid-row:hover": {
    bgcolor: "rgba(139,92,246,0.1)",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    bgcolor: "rgba(139,92,246,0.22)",
    color: "#ffffff",
  },
  "& .MuiDataGrid-row.Mui-selected:hover": {
    bgcolor: "rgba(139,92,246,0.3)",
  },
  "& .MuiDataGrid-cell": {
    color: "rgba(244,244,245,0.88)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
    {
      outline: "1px solid rgba(196,181,253,0.55)",
      outlineOffset: -1,
    },
  "& .MuiDataGrid-columnSeparator": {
    color: "rgba(255,255,255,0.1)",
  },
  "& .MuiDataGrid-footerContainer": {
    bgcolor: "rgba(24,24,27,0.96)",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  "& .MuiCheckbox-root, & .MuiTablePagination-root, & .MuiSvgIcon-root": {
    color: "rgba(244,244,245,0.78)",
  },
};

const colorMap = {
  "#8b5cf6": "139,92,246",
  "#38bdf8": "56,189,248",
  "#10b981": "16,185,129",
};

const ReportsPage = () => {
  const tableRef = useRef(null);
  const printRef = useRef(null);

  const handleJumpToTable = () =>
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handlePrintReport = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1200,height=900");
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((node) => node.outerHTML)
      .join("");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    printWindow.document.write(
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Print Report - Reports Summary</title>${headMarkup}<style>*{box-sizing:border-box;}@page{size:A4 landscape;margin:10mm;}body{margin:0;padding:0;font-family:Inter,Arial,Helvetica,sans-serif;background:#ffffff;color:#18181b;-webkit-print-color-adjust:exact;print-color-adjust:exact;}.report-shell{padding:0;}.print-root{max-width:1080px;margin:0 auto;}.print-meta{display:flex;justify-content:space-between;align-items:center;gap:16px;color:#64748b;font-size:10px;margin-bottom:8px;}.print-meta strong{color:#312e81;letter-spacing:0.12em;text-transform:uppercase;}.print-report-root{display:block !important;}.print-card{background:#ffffff;border:1px solid #dfe3ee;border-radius:10px;padding:16px;margin-bottom:12px;box-shadow:none;break-inside:avoid;page-break-inside:avoid;}.report-hero{background:linear-gradient(135deg,#18181b 0%,#312e81 58%,#7c3aed 100%);color:#ffffff;border-color:#4338ca;padding:18px 20px;}.report-eyebrow{color:#ddd6fe;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:6px;}.report-title{font-size:30px;line-height:1.1;font-weight:800;margin:0 0 8px;}.report-copy{color:rgba(255,255,255,0.86);font-size:13px;margin:0 0 6px;}.report-date{color:rgba(221,214,254,0.95);font-size:11px;margin:0;}.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px;}.metric-box{background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:12px;}.metric-label{color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;}.metric-value{font-size:24px;font-weight:800;margin:4px 0 2px;color:#312e81;}.metric-note{color:#475569;font-size:11px;}.insights-grid{display:grid;grid-template-columns:1.25fr 0.75fr;gap:12px;align-items:stretch;}.section-title{font-size:15px;font-weight:800;margin:0 0 6px;}.section-subtitle{color:#64748b;font-size:10.5px;margin:0 0 10px;}.bar-row{display:flex;gap:14px;align-items:flex-end;height:145px;padding:8px 8px 0;border-left:1px solid #d1d5db;border-bottom:1px solid #d1d5db;}.bar-group{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:10px;}.bars{display:flex;align-items:flex-end;gap:8px;height:112px;}.bar{width:20px;border-radius:5px 5px 0 0;}.bar-a{background:#8b5cf6;}.bar-b{background:#38bdf8;}.month-label{font-size:10px;color:#64748b;}.legend{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-bottom:8px;}.legend-item{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;color:#4b5563;}.swatch{width:10px;height:10px;border-radius:3px;}.pie-wrap{display:flex;align-items:center;gap:18px;}.pie{width:130px;height:130px;border-radius:50%;background:conic-gradient(#8b5cf6 0 35%,#38bdf8 35% 53%,#10b981 53% 78%,#f59e0b 78% 100%);border:8px solid #f8fafc;box-shadow:inset 0 0 0 1px #e5e7eb;flex:0 0 auto;}.category-list{display:grid;gap:8px;min-width:170px;}.category-row{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:11px;color:#334155;}.table{width:100%;border-collapse:collapse;font-size:10.5px;}.table th,.table td{border:1px solid #e5e7eb;padding:7px 8px;text-align:left;}.table th{background:#f8fafc;color:#312e81;font-weight:800;}@media print{.print-root{max-width:none;}}</style></head><body><main class="report-shell"><div class="print-root"><div class="print-meta"><strong>Reports Export</strong><span>Prepared on ${exportedAt}</span></div>${printContent.outerHTML}</div></main></body></html>`,
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Stack spacing={3} ref={printRef}>
      <Card
        sx={{
          ...surfaceCardSx,
          p: { xs: 3, md: 4 },
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        }}
      >
        <Stack spacing={2}>
          <Chip
            label="Reports Analytics"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(255,255,255,0.1)",
              color: "white",
            }}
          />
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Reports and data visualization
          </Typography>
          <Typography sx={{ maxWidth: 720, opacity: 0.92 }}>
            This page combines charts, gauges, and a data table so your reports
            page can present both visual summaries and detailed records in one
            place.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ alignSelf: "flex-start" }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleJumpToTable}
              startIcon={<TableChartIcon />}
              sx={{ borderColor: "rgba(255,255,255,0.24)", borderRadius: 2 }}
            >
              View Report Table
            </Button>
            <Button
              variant="contained"
              onClick={handlePrintReport}
              startIcon={<PrintIcon />}
              sx={{
                bgcolor: "#ffffff",
                color: "#111827",
                borderRadius: 2,
                "&:hover": { bgcolor: "#e5e7eb" },
              }}
            >
              Print PDF
            </Button>
          </Stack>
        </Stack>
      </Card>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        }}
      >
        {reportStats.map((stat) => {
          const IconComponent = stat.icon;
          const bg = colorMap[stat.color] || "139,92,246";
          return (
            <Card
              key={stat.label}
              sx={{
                ...surfaceCardSx,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  background: `rgba(${bg},0.12)`,
                  borderRadius: "50%",
                  transform: "translate(30px, -30px)",
                },
              }}
            >
              <CardContent sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <IconComponent
                    sx={{ mr: 1, fontSize: 24, color: stat.color }}
                  />
                  <Typography
                    variant="overline"
                    sx={{ color: "rgba(255,255,255,0.62)" }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, mb: 0.5, fontSize: "2.2rem" }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.62)" }}
                >
                  {stat.note}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", xl: "1.25fr 0.75fr" },
        }}
      >
        <Card sx={surfaceCardSx}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AnalyticsIcon sx={{ mr: 1, color: "#8b5cf6" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Quarterly Report Output
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, ...mutedTextSx }}>
              Compare completed and pending report activity across the quarter.
            </Typography>
            <BarChart
              series={[
                {
                  data: [35, 44, 24, 34],
                  label: "Generated",
                  color: "#8b5cf6",
                },
                { data: [51, 6, 49, 30], label: "Completed", color: "#10b981" },
              ]}
              height={320}
              xAxis={[
                {
                  data: ["Q1", "Q2", "Q3", "Q4"],
                  scaleType: "band",
                  label: "Quarters",
                },
              ]}
              sx={{
                ...chartTextSx,
                "& .MuiChartsLegend-series text": {
                  fill: "rgba(244,244,245,0.78) !important",
                },
              }}
            />
          </CardContent>
        </Card>

        <Card sx={surfaceCardSx}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AssessmentIcon sx={{ mr: 1, color: "#38bdf8" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Performance Metrics
              </Typography>
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row", xl: "column" }}
              spacing={3}
              alignItems="center"
              sx={{ py: 2 }}
            >
              <Box textAlign="center">
                <Box
                  sx={{ position: "relative", display: "inline-block", mb: 2 }}
                >
                  <Gauge
                    width={140}
                    height={140}
                    value={86}
                    sx={{
                      "& .MuiGauge-valueArc": { fill: "#10b981" },
                      "& .MuiGauge-referenceArc": {
                        fill: "rgba(255,255,255,0.1)",
                      },
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontWeight: 700,
                      color: "#10b981",
                    }}
                  >
                    86%
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}
                >
                  Completion Rate
                </Typography>
              </Box>
              <Box textAlign="center">
                <Box
                  sx={{ position: "relative", display: "inline-block", mb: 2 }}
                >
                  <Gauge
                    width={140}
                    height={140}
                    value={92}
                    sx={{
                      "& .MuiGauge-valueArc": { fill: "#38bdf8" },
                      "& .MuiGauge-referenceArc": {
                        fill: "rgba(255,255,255,0.1)",
                      },
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontWeight: 700,
                      color: "#bae6fd",
                    }}
                  >
                    92%
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}
                >
                  Accuracy Rate
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", lg: "0.9fr 1.1fr" },
        }}
      >
        <Card sx={surfaceCardSx}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PieChartIcon sx={{ mr: 1, color: "#10b981" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Category Distribution
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ mb: 3, color: "rgba(255,255,255,0.62)" }}
            >
              Simple pie view for high-level report category comparison.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row", lg: "column", xl: "row" }}
              spacing={3}
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: 300 }}
            >
              <Box sx={{ width: 300, height: 280, flex: "0 0 auto" }}>
                <PieChart
                  width={300}
                  height={280}
                  hideLegend
                  margin={{ top: 28, right: 28, bottom: 28, left: 28 }}
                  series={[
                    {
                      data: [
                        { id: 0, value: 35, label: "Sales", color: "#8b5cf6" },
                        {
                          id: 1,
                          value: 25,
                          label: "Operations",
                          color: "#38bdf8",
                        },
                        {
                          id: 2,
                          value: 22,
                          label: "Finance",
                          color: "#10b981",
                        },
                        {
                          id: 3,
                          value: 18,
                          label: "Support",
                          color: "#f59e0b",
                        },
                      ],
                      innerRadius: 52,
                      outerRadius: 92,
                      paddingAngle: 2,
                      cornerRadius: 4,
                    },
                  ]}
                  sx={{
                    ...chartTextSx,
                    "& .MuiChartsLegend-root": { display: "none" },
                  }}
                />
              </Box>
              <Stack spacing={1.5} sx={{ width: "100%", maxWidth: 240 }}>
                {categorySeries.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "3px",
                          bgcolor: item.color,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#f4f4f5", fontWeight: 600 }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(244,244,245,0.7)" }}
                    >
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={surfaceCardSx} ref={tableRef}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TableChartIcon sx={{ mr: 1, color: "#f59e0b" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Reports Table
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ mb: 3, color: "rgba(255,255,255,0.62)" }}
            >
              Editable data grid based on the records shown in your screenshot.
            </Typography>
            <Box sx={{ height: 420, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                sx={dataGridDarkSx}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

export default ReportsPage;
