import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from '../../store';
import { fetchAuction } from '../../store/reducer/auctionSlice';
import { DefaultLayout } from '../../layouts';
import { IConfig } from '../../../builder/env/dev';

const { CONFIG } = process.env;
const config = CONFIG as IConfig || {};

const IMAGES_BASEPATH = config.IMAGES_BASEPATH || '';

function AuctionPage() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const {
    data,
    loading,
  } = useSelector((state) => state.auction);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchAuction(id));
  }, [dispatch, id]);

  return (
    <DefaultLayout title="Аукцион" needBack>
      <Box>
        {!loading && data ? (
          <>
            <Typography fontSize="h5.fontSize" sx={{ mb: 2 }}>
              Подробная информация об автомобиле:
              {' '}
              {data.auction.title}
            </Typography>
            <img alt="Картинка" src={IMAGES_BASEPATH + data.auction.imgUrl} width={480} />
            <Typography sx={{ mt: 2 }}>
              Пробег:
              {' '}
              {data.auction.mileage}
              км
            </Typography>
          </>
        )
          : (
            <CircularProgress />
          )}
      </Box>
    </DefaultLayout>
  );
}

export default AuctionPage;
