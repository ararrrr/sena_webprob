import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { getArticles, saveArticles } from '../../services/ArticleService';

const blankArticle = {
  name: '',
  title: '',
  image: '',
  content: '',
  isActive: true,
};

const surfaceSx = {
  borderRadius: 3,
  bgcolor: 'rgba(24,24,27,0.88)',
  color: '#f4f4f5',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 18px 40px rgba(0,0,0,0.26)',
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
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#8b5cf6',
  },
};

const dataGridDarkSx = {
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 2,
  bgcolor: 'rgba(9,9,11,0.42)',
  color: '#f4f4f5',
  '--DataGrid-containerBackground': 'rgba(24,24,27,0.96)',
  '& .MuiDataGrid-main, & .MuiDataGrid-virtualScroller, & .MuiDataGrid-overlayWrapper, & .MuiDataGrid-overlayWrapperInner': {
    bgcolor: 'rgba(9,9,11,0.42)',
  },
  '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': {
    bgcolor: 'rgba(24,24,27,0.96)',
    color: '#f4f4f5',
  },
  '& .MuiDataGrid-row': {
    bgcolor: 'rgba(9,9,11,0.18)',
  },
  '& .MuiDataGrid-row:hover': {
    bgcolor: 'rgba(139,92,246,0.1)',
  },
  '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover': {
    bgcolor: 'rgba(139,92,246,0.22)',
  },
  '& .MuiDataGrid-cell': {
    color: 'rgba(244,244,245,0.88)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
    outline: '1px solid rgba(196,181,253,0.55)',
    outlineOffset: -1,
  },
  '& .MuiDataGrid-footerContainer': {
    bgcolor: 'rgba(24,24,27,0.96)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  '& .MuiCheckbox-root, & .MuiTablePagination-root, & .MuiSvgIcon-root': {
    color: 'rgba(244,244,245,0.78)',
  },
};

const toSlug = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const formFromArticle = (article) => ({
  ...article,
  content: article.content.join('\n\n'),
});

const articleFromForm = (form) => ({
  ...form,
  name: toSlug(form.name || form.title),
  content: form.content
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean),
});

const DashArticleListPage = () => {
  const [articles, setArticles] = useState(() => getArticles());
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankArticle);

  const commitArticles = (nextArticles) => {
    setArticles(nextArticles);
    saveArticles(nextArticles);
  };

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesSearch =
        !search ||
        [article.name, article.title, article.content.join(' ')].join(' ').toLowerCase().includes(search);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && article.isActive) ||
        (statusFilter === 'inactive' && !article.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [articles, query, statusFilter]);

  const openModal = (article) => {
    setModal({ open: true, id: article?.id ?? null });
    setForm(article ? formFromArticle(article) : blankArticle);
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankArticle);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const nextArticle = articleFromForm(form);

    if (modal.id) {
      commitArticles(
        articles.map((article) =>
          article.id === modal.id ? { ...article, ...nextArticle, id: modal.id } : article
        )
      );
    } else {
      commitArticles([
        ...articles,
        {
          ...nextArticle,
          id: nextArticle.name || `article-${Date.now()}`,
        },
      ]);
    }

    closeModal();
  };

  const handleToggleActive = (id) => {
    commitArticles(
      articles.map((article) =>
        article.id === id ? { ...article, isActive: !article.isActive } : article
      )
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 170 },
    { field: 'name', headerName: 'Slug', flex: 1, minWidth: 170 },
    { field: 'title', headerName: 'Title', flex: 1.2, minWidth: 220 },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 120,
      valueGetter: (_, row) => row.content.length,
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1.4,
      minWidth: 260,
      valueGetter: (_, row) => row.content[0] || '',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.row.isActive ? 'Active' : 'Inactive'}
          color={params.row.isActive ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => openModal(params.row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={params.row.isActive ? 'warning' : 'success'}
            onClick={() => handleToggleActive(params.row.id)}
          >
            {params.row.isActive ? 'Disable' : 'Enable'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={3}>
      <Paper sx={{ ...surfaceSx, p: { xs: 3, md: 4 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ md: 'center' }}>
          <Box>
            <Chip icon={<ArticleIcon />} label="Articles" sx={{ mb: 2, color: '#ddd6fe', bgcolor: 'rgba(139,92,246,0.16)' }} />
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Manage article list
            </Typography>
            <Typography sx={{ mt: 1, color: 'rgba(244,244,245,0.68)' }}>
              Articles saved here are shown on the public Article List page when active.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => openModal()}>
            Add Article
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ ...surfaceSx, p: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Search Articles"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
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
          <TextField
            select
            label="Status Filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            sx={{ ...textFieldSx, minWidth: 180 }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Paper sx={{ ...surfaceSx, p: 2 }}>
        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            sx={dataGridDarkSx}
          />
        </Box>
      </Paper>

      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="md">
        <Box component="form" onSubmit={handleSave}>
          <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                label="Slug"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                helperText="Leave blank to generate it from the title."
                fullWidth
              />
              <TextField
                label="Title"
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                required
                fullWidth
              />
              <TextField
                label="Image URL"
                value={form.image}
                onChange={(event) => setForm({ ...form, image: event.target.value })}
                required
                fullWidth
              />
              <TextField
                label="Content"
                value={form.content}
                onChange={(event) => setForm({ ...form, content: event.target.value })}
                required
                multiline
                minRows={6}
                fullWidth
              />
              <Stack direction="row" spacing={1} alignItems="center">
                <Switch
                  checked={form.isActive}
                  onChange={(event) => setForm({ ...form, isActive: event.target.checked })}
                />
                <Typography>{form.isActive ? 'Active' : 'Inactive'}</Typography>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Save Changes' : 'Add Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Stack>
  );
};

export default DashArticleListPage;
