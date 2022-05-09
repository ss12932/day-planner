("use strict mode");

//Global declarations
const container = $(".container");

const hrCntrRender = () => {
  //this generates array with each element 9am-6pm. default moment.js jr at 12am. added 9 to start from 9am
  const hrArr = [];
  new Array(10).fill().forEach((_, i) => {
    hrArr.push(moment({ hour: `${i + 9}` }).format("h A"));
  });

  //loop over the above array, and generate the container, whilst
  const containerRender = $.each(hrArr, (_, hr) => {
    const row = $(
      "<div class='row bg-light d-flex' data-hr='" + hr + "'></div>"
    );
    const hourCol = $(
      "<div class='col-1 bg-light d-flex justify-content-start align-items-center'>" +
        hr +
        "</div>"
    );
    const txtAreaCol = $(
      "<div class='col-10 bg-light input-group'><textarea class='form-control' aria-label='with textarea'></textarea></div>"
    );

    const saveClrCol = $(
      "<div class='col-1 bg-light d-flex align-items-center justify-content-around pl-0'><i class='fa-solid fa-floppy-disk fa-lg '></i><i id='reset-btn' class='fa-solid fa-trash-can fa-lg'></i></div>"
    );
    row.append(hourCol, txtAreaCol, saveClrCol);
    $(".container").append(row);
  });
};

const saveBtnClick = (e) => {
  if ($(e.target).is(".fa-floppy-disk")) {
    const hour = $(e.target).closest("div.row").attr("data-hr");
    const textData = $(e.target).parent().sibling();
    console.log(hour);
    $();
  }
};

const headerTimerRender = () => {
  const momentTimer = () => {
    let currDate = moment().format("dddd Do MMMM YYYY, hh:mm:ss");
    $("#currentDay").text(currDate);
  };
  setInterval(momentTimer, 1000);
};

const initPageLoad = () => {
  //initialise day planner data
  // initLoadLS();

  //render timer on jumbotron header.
  headerTimerRender();

  //render hour row containers from 9am-6pm
  hrCntrRender();
};

$(document).ready(initPageLoad);
container.on("click", saveBtnClick);
