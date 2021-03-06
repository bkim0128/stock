import { fromJS } from 'immutable';
import {
  selectProfilePageDomain,
  makeSelectError,
  makeSelectLoading,
  makeSelectBalance,
  makeSelectChart,
  makeSelectTimeFrame,
  makeSelectPositions,
  makeSelectTransferAmount,
} from '../selectors';

const mockedState = fromJS({
  profilePage: {
    loading: false,
    error: 404,
    balance: false,
    positions: false,
    chart: false,
    totalInvested: false,
    timeFrame: 0,
    transferAmount: 0,
  },
});

describe('selectProfilePageDomain', () => {
  it('Expect to have unit tests specified', () => {
    expect(selectProfilePageDomain).toMatchSnapshot();
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    expect(loadingSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    expect(errorSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectBalance', () => {
  const balanceSelector = makeSelectBalance();
  it('should select the balance', () => {
    expect(balanceSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectPositions', () => {
  const positionsSelector = makeSelectPositions();
  it('should select the positions', () => {
    expect(positionsSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectChart', () => {
  const chartSelector = makeSelectChart();
  it('should select the chart', () => {
    expect(chartSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectTimeFrame', () => {
  const timeFrameSelector = makeSelectTimeFrame();
  it('should select the time frame', () => {
    expect(timeFrameSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectTransferAmount', () => {
  const transferAmountSelector = makeSelectTransferAmount();
  it('should select the transfer amount', () => {
    expect(transferAmountSelector(mockedState)).toMatchSnapshot();
  });
});
