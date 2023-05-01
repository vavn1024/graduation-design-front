import { reactive } from "vue";
//获取当前日期
export function getCurrentDate() {
  const now = new Date(new Date().getTime());
  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const currentDate = reactive({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    date: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    week: weeks[now.getDay()],
    monthCounts: 0, //当月总天数
    yearCounts: 0, //当年总天数
    dayPersent: 0,
    monthPersent: 0,
    yearPersent: 0,
  });
  currentDate.monthCounts = getMonthCounts(currentDate);
  currentDate.yearCounts = getYearCounts(currentDate);
  currentDate.dayPersent = Number(getDayPersent(currentDate).toFixed(3));
  currentDate.monthPersent = Number(getMonthPersent(currentDate).toFixed(3));
  currentDate.yearPersent = Number(getYearPersent(currentDate).toFixed(3));
  return currentDate;
}
export function getYearCounts(state: any) {
  if (
    (state.year % 4 === 0 && state.year % 100 === 0) ||
    state.year % 400 === 0
  ) {
    return 366;
  } else {
    return 365;
  }
}

//获取当月总天数
export function getMonthCounts(state: any) {
  const counts = new Date(state.year, state.month , 0).getDate();

  //获取当前第一天是星期几
  const firstWeekDay = new Date(state.year, state.month, 1).getDay();

  let res = 0;
  for (let i = 1; i <= counts + firstWeekDay; i++) {
    const val = i - firstWeekDay;
    res = val;
  }
  return res;
}

//获取当天百分比
export function getDayPersent(state: any) {
  return (state.hour * 60 + state.minute) / 1440;
}

//获取当月百分比
export function getMonthPersent(state: any) {
  return (state.date - 1 + state.dayPersent) / state.monthCounts;
}

//获取当年百分比
export function getYearPersent(state: any) {
  return (state.month - 1 + state.monthPersent) / 12;
}
//时间戳转时间
export function getTime(time:any){
  const date = new Date(time * 1000);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  const D = date.getDate() + ' ';

  let h ;
  if(date.getHours()<10){
    h="0"+date.getHours()+":";
  }else {
    h = date.getHours()+":";
  }

  let m ;
  if(date.getMinutes()<10){
    m="0"+date.getMinutes()+":";
  }else {
    m = date.getMinutes()+":";
  }

  let s;
  if(date.getSeconds()<10){
    s="0"+date.getSeconds();
  }else {
    s = date.getSeconds();
  }
  return Y+M+D+h+m+s;
}
export function getDuration(time: any) {
  time=time*1000
  //dateTimeStamp是一个时间毫秒
  let diff = "";
  const time_diff = new Date().getTime() - time; //时间差的毫秒数
  //计算出相差天数
  const days = Math.floor(time_diff / (24 * 3600 * 1000));
  if (days > 0) {
    diff += days + "天前";
  }
  //计算出小时数
  const leave1 = time_diff % (24 * 3600 * 1000);
  const hours = Math.floor(leave1 / (3600 * 1000));
  if (hours > 0 &&days==0) {
    diff += hours + "小时前";
  } else {
    // if (diff !== "") {
    //   diff += hours + "小时 ";
    // }
  }
  //计算相差分钟数
  const leave2 = leave1 % (3600 * 1000);
  const minutes = Math.floor(leave2 / (60 * 1000));
  if (minutes > 0 && hours==0 && days==0) {
    diff += minutes + "分前";
  } else {
    // if (diff !== "") {
    //   diff += minutes + "分 ";
    // }
  }
  //计算相差秒数
  const leave3 = leave2 % (60 * 1000);
  const seconds = Math.round(leave3 / 1000) - 1;
  if (seconds > 0&& minutes==0 && hours==0 && days==0) {
    diff += seconds + "秒前";
  } else {
    // if (diff !== "") {
    //   diff += seconds + "秒 ";
    // }
  }

  return diff;
}
