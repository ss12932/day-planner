"use strict mode";
$(document).ready(() => {
  let currDate = moment().format("dddd Do MMMM YYYY, hh:mm:ss");
  $("#currentDay").text(currDate);
});
const hrArr = [];
new Array(10).fill().forEach((_, i) => {
  hrArr.push(moment({ hour: `${i + 9}` }).format("h A"));
});

const saveBtnClick = (e) => {
  if ($(e.target).is(".fa-floppy-disk")) {
    console.log("you clicked on the save button");
    alert("save button pressed");
  }
};

$.each(hrArr, (_, hr) => {
  const row = $("<div class='row bg-light d-flex'></div>");
  const hourCol = $(
    "<div class='col-1 bg-light d-flex justify-content-start align-items-center'>" +
      hr +
      "</div>"
  );
  //input grp copy pasta from bootstrap website components > input-grp > textarea
  const txtAreaCol = $(
    "<div class='col-10 bg-light input-group'><textarea class='form-control' aria-label='with textarea'></textarea></div>"
  );
  const saveClrCol = $(
    "<div class='col-1 bg-light d-flex align-items-center justify-content-around pl-0'><i data-hour=`{hr}` class='fa-solid fa-floppy-disk fa-lg'></i><i data-hour=`{hr}` id='reset-btn' class='fa-solid fa-trash-can fa-lg'></i></div>"
  );
  // retrieveLS(i);
  row.append(hourCol, txtAreaCol, saveClrCol);
  $(".container").append(row);
  row.on("click", saveBtnClick);
});
