import {
  Box, Container, Divider, IconButton, Typography,
} from '@mui/material';
import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface DefaultLayoutProps {
  title: string;
  children: React.ReactNode;
  needBack?: boolean;
}

function DefaultLayout({
  title,
  children,
  needBack,
}: DefaultLayoutProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Box sx={{
        mt: 3,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      >
        {needBack && (
          <IconButton onClick={handleGoBack} aria-label="назад">
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h1" fontSize="h3.fontSize">
          {title}
        </Typography>
      </Box>

      <Box mb={3}><Divider /></Box>

      {children}

      <Box mb={2} />
    </Container>
  );
}

DefaultLayout.defaultProps = {
  needBack: false,
};

export default DefaultLayout;
