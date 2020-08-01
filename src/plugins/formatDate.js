import Vue from 'vue';

const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const shortWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const formatDate = (unformattedDate) => {
  const date = new Date(unformattedDate)
  const month = monthNames[date.getMonth()];
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

const getDay = (date) => {
  return weekdays[date.getDay()];
}

// inject for components
Vue.prototype.formatDate = formatDate;
Vue.prototype.getDay = getDay;