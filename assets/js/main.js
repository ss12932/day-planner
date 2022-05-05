"use strict mode";
$(document).ready(() => {
  let currDate = moment().format("dddd Do MMMM YYYY, hh:mm:ss");
  $("#currentDay").text(currDate);
});
const container = $(".container");
const hrArr = [];
new Array(10).fill().forEach((_, i) => {
  hrArr.push(moment({ hour: `${i + 9}` }).format("h A"));
});
const saveBtnClick = (e) => {
  if ($(e.target).is(".fa-floppy-disk")) {
    console.log($(e.target).attr("data-hr"));
  }
};
const hrContainerRender = $.each(hrArr, (_, hr) => {
  const row = $("<div class='row bg-light d-flex'></div>");
  const hourCol = $(
    "<div class='col-1 bg-light d-flex justify-content-start align-items-center'>" +
      hr +
      "</div>"
  );
  const txtAreaCol = $(
    "<div class='col-10 bg-light input-group'><textarea class='form-control' aria-label='with textarea'></textarea></div>"
  );
  const saveClrCol = $(
    "<div class='col-1 bg-light d-flex align-items-center justify-content-around pl-0'></div>"
  );
  const saveBtnLogo = $("<i class='fa-solid fa-floppy-disk fa-lg '></i>").attr(
    "data-hr",
    hr
  );
  const resetBtnLogo = $(
    "<i id='reset-btn' class='fa-solid fa-trash-can fa-lg'></i>"
  ).attr("data-hr", hr);
  row.append(hourCol, txtAreaCol, saveClrCol);
  saveClrCol.append(saveBtnLogo, resetBtnLogo);
  $(".container").append(row);
});
container.on("click", saveBtnClick);
