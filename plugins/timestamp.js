import Vue from 'vue';

const timeStampFilter = (timeStamp) => {
  const ts = new Date(timeStamp);
  const yyyy = ts.getFullYear();
  const mm = ts.getMonth();
  const dd = ts.getDate();

  if (typeof timeStamp === 'string') {
    return timeStamp;
  }
  return `${yyyy}-${mm + 1}-${dd}`;
};

Vue.filter('timestampToDate', timeStampFilter);
