import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import handleRequestError from '../../utils/handleRequestError';
import { AuctionData } from './auctionSlice';
import { IConfig } from '../../../builder/env/dev';

const { CONFIG } = process.env;
const config = CONFIG as IConfig || {};

const API_BASEPATH = config.API_BASEPATH || '';

interface AuctionsApiResponse {
  auctions: AuctionData[];
}

interface AuctionsState {
  data: AuctionsApiResponse;
  loading: boolean;
  error: string | null;
}

const initialState: AuctionsState = {
  data: { auctions: [] },
  loading: false,
  error: null,
};

const auctionsSlice = createSlice({
  name: 'auctions',
  initialState,
  reducers: {
    getAuctionsStart(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    getAuctionsSuccess(state, action: PayloadAction<AuctionsApiResponse>) {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    },
    getAuctionsFailure(state, action: PayloadAction<string>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { getAuctionsStart, getAuctionsSuccess, getAuctionsFailure } = auctionsSlice.actions;

export const fetchAuctions = (searchValue: string) => async (dispatch) => {
  dispatch(getAuctionsStart());

  try {
    const apiUrl: string = API_BASEPATH || '';

    if (!apiUrl) {
      throw new Error('API_BASEPATH is not defined in environment variables');
    }

    const response = await axios.get(`${apiUrl}/filterAuctions?search=${searchValue}`);
    dispatch(getAuctionsSuccess(response.data || []));
  } catch (error) {
    handleRequestError(error, dispatch, getAuctionsFailure);
  }
};

export default auctionsSlice.reducer;
