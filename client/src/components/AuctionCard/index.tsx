import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';
import { AuctionData } from '../../store/reducer/auctionSlice';
import { IConfig } from '../../../builder/env/dev';

const { CONFIG } = process.env;
const config = CONFIG as IConfig || {};

const IMAGES_BASEPATH = config.IMAGES_BASEPATH || '';
interface AuctionCardProps {
  auction: AuctionData
}

function AuctionCard({ auction }: AuctionCardProps) {
  const [remainingTime, setRemainingTime] = useState<number>(
    Math.max(auction.finishTime - Date.now(), 0),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTime = auction.finishTime - Date.now();
      if (newRemainingTime <= 0) {
        clearInterval(intervalId);
        setRemainingTime(0);
      } else {
        setRemainingTime(newRemainingTime);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [auction.finishTime]);

  const formatTime = (time: number): string => {
    const duration = intervalToDuration({ start: 0, end: time });
    const minutes = duration.minutes || 0;
    const seconds = duration.seconds || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Link to={`auction/${auction.id}`}>
      <Card
        sx={{
          maxWidth: 345,
          position: 'relative',
        }}
      >
        <CardHeader
          style={{ backgroundColor: '#999' }}
          title={(
            <>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              >
                <span>{auction.title}</span>
                <span>
                  {formatTime(remainingTime)}
                </span>

              </Box>
              <Box>
                <Typography fontSize="10px">
                  Окончание таймера в:
                  {' '}
                  {new Date(auction.finishTime).toString()}
                </Typography>
              </Box>
            </>
          )}
          titleTypographyProps={{ fontSize: '18px' }}
        />

        <CardMedia
          sx={{ height: 200 }}
          image={IMAGES_BASEPATH + auction.imgUrl}
          title={`The picture shows a ${auction.title} car`}
        />

        {auction.bid > 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            padding: '8px',
            background: '#888',
            color: '#fff',
            borderTopLeftRadius: '4px',
          }}
        >
          Ставка:
          {' '}
          {auction.bid}
          р
        </Typography>
        )}
      </Card>
    </Link>
  );
}

export default AuctionCard;
