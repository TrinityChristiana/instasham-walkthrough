import moment from 'moment';

const getCurrentDate = () => moment.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

export {
  getCurrentDate, // eslint-disable-line
};
