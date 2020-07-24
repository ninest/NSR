import Vue from 'vue';

const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

const formatDate = (unformattedDate) => {
  const date = new Date(unformattedDate)
  const month = monthNames[date.getMonth()];
  const day = date.getDate() + 1
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

// inject for components
Vue.prototype.formatDate = formatDate;