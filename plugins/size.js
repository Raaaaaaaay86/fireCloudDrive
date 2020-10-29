import Vue from 'vue';

const sizeFilter = (byte) => {
  if (byte > 1024000) {
    const value = (byte / 1024000).toFixed(2);
    return `${value}MB`;
  }

  if (byte > 1024000000) {
    const value = (byte / 1024000000).toFixed(2);
    return `${value}GB`;
  }

  const value = (byte / 1024).toFixed(2);
  return `${value} KB`;
};

Vue.filter('fileSize', sizeFilter);
