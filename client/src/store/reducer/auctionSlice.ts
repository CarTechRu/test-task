import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import handleRequestError from '../../utils/handleRequestError';
import { IConfig } from '../../../builder/env/dev';

const { CONFIG } = process.env;
const config = CONFIG as IConfig || {};

const API_BASEPATH = config.API_BASEPATH || '';

export interface AuctionData {
  mileage: number,
  title: string,
  id: number,
  imgUrl: string,
  finishTime: number,
  bid: number
}

interface AuctionApiResponse {
  auction: AuctionData;
}

interface AuctionState {
  data: { auction: AuctionData } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuctionState = {
  data: null,
  loading: false,
  error: null,
};

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    getAuctionStart(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    getAuctionSuccess(state, action: PayloadAction<AuctionApiResponse>) {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    },
    getAuctionFailure(state, action: PayloadAction<string>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { getAuctionStart, getAuctionSuccess, getAuctionFailure } = auctionSlice.actions;

export const fetchAuction = (auctionId: string) => async (dispatch) => {
  dispatch(getAuctionStart());

  try {
    const apiUrl: string = API_BASEPATH || '';

    if (!apiUrl) {
      throw new Error('API_BASEPATH is not defined in environment variables');
    }

    const response = await axios.get(`${apiUrl}/auction/${auctionId}`);
    dispatch(getAuctionSuccess(response.data));
  } catch (error) {
    handleRequestError(error, dispatch, getAuctionFailure);
  }
};

export default auctionSlice.reducer;
