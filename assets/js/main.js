"use strict mode";
$(document).ready(() => {
  let currDate = moment().format("dddd Do MMMM YYYY, hh:mm:ss");
  $("#currentDay").text(currDate);
});

const hrArr = [];
new Array(10).fill().forEach((_, i) => {
  hrArr.push(moment({ hour: `${i + 9}` }).format("H"));
});

$.each(hrArr, (_, hr) => {
  const row = $("<div class='row bg-light'></div>");
  const hourCol = $(
    "<div class='col-lg-2 bg-primary d-flex justify-content-start align-items-center'>" +
      hr +
      (hr > 12 ? "PM" : "AM") +
      "</div>"
  );
  const txtAreaCol = $("<div class='col-lg-8 bg-light'></div>");
  const saveClrCol = $("<div class='col-lg-2 bg-danger'></div>");
  row.append(hourCol, txtAreaCol, saveClrCol);
  $(".container").append(row);
});
