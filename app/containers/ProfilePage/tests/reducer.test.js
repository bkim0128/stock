import { fromJS } from 'immutable';
import profilePageReducer from '../reducer';
import {
  changeTimeFrame,
  changeTransferAmount,
  loadBalance,
  loadChart,
  loadPositions,
  requestTransfer,
} from '../actions';

describe('profilePageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      balance: false,
      positions: false,
      totalInvested: false,
      chart: false,
      timeFrame: 0,
      transferAmount: 0,
    });
  });
  it('returns the initial state', () => {
    expect(profilePageReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles the change time frame action', () => {
    expect(profilePageReducer(state, changeTimeFrame(1))).toMatchSnapshot();
  });

  it('handles the change time transfer amount action', () => {
    expect(
      profilePageReducer(state, changeTransferAmount(100)),
    ).toMatchSnapshot();
  });

  it('handles the load balance action', () => {
    expect(profilePageReducer(state, loadBalance())).toMatchSnapshot();
  });

  it('handles the load positions action', () => {
    expect(profilePageReducer(state, loadPositions())).toMatchSnapshot();
  });

  it('handles the load chart action', () => {
    expect(profilePageReducer(state, loadChart())).toMatchSnapshot();
  });

  it('handles the request transfer action', () => {
    expect(profilePageReducer(state, requestTransfer())).toMatchSnapshot();
  });
});
