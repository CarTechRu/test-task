import {
  Box, CircularProgress, Divider, Grid, TextField,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import debounce from 'lodash/debounce';
import AuctionCard from '../../components/AuctionCard';
import { useDispatch, useSelector } from '../../store';
import { fetchAuctions } from '../../store/reducer/auctionsSlice';
import { DefaultLayout } from '../../layouts';
import { IConfig } from '../../../builder/env/dev';

const { CONFIG } = process.env;
const config = CONFIG as IConfig || {};

const POLLING_INTERVAL = Number(config.POLLING_INTERVAL || 0) * 1000;
const DEBOUNCE_DELAY = 500;

function AuctionsPage() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auctions);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const searchValueRef = useRef(searchValue);

  const debouncedFetchData = debounce((value) => {
    dispatch(fetchAuctions(value))
      .then(() => setInitialLoading(false))
      .catch((error) => console.error('Error fetching auctions:', error));
  }, DEBOUNCE_DELAY);

  const fetchPeriodicData = () => {
    dispatch(fetchAuctions(searchValueRef.current))
      .then(() => setInitialLoading(false))
      .catch((error) => console.error('Error fetching auctions:', error));
  };

  useEffect(() => {
    debouncedFetchData(searchValue);

    return () => {
      debouncedFetchData.cancel();
    };
  }, [searchValue]);

  useEffect(() => {
    searchValueRef.current = searchValue;
  }, [searchValue]);

  useEffect(() => {
    const intervalId = setInterval(fetchPeriodicData, POLLING_INTERVAL);
    fetchPeriodicData();
    return () => clearInterval(intervalId);
  }, []);

  const handleSearchInputChange = ({ target }) => {
    setSearchValue(target.value);
  };

  return (
    <DefaultLayout title="Аукционы">
      <Box mb={3}>
        <TextField
          variant="outlined"
          label="Поиск по названию"
          size="small"
          value={searchValue}
          onChange={handleSearchInputChange}
        />
      </Box>

      <Divider />

      <Grid container spacing={2} mt={2}>
        {initialLoading ? (
          <CircularProgress sx={{ marginLeft: '20px', marginTop: '20px' }} />
        ) : (
          data.auctions.map((auction) => (
            <Grid key={auction.id} item xs={12} sm={6} md={4} lg={3}>
              <AuctionCard auction={auction} />
            </Grid>
          ))
        )}
      </Grid>
    </DefaultLayout>
  );
}

export default AuctionsPage;
