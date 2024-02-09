import { combineReducers } from 'redux';
import auctions from './auctionsSlice';
import auction from './auctionSlice';

export default combineReducers({
  auctions,
  auction,
});
