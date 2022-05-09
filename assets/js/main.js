("use strict mode");

//Global declarations
const container = $(".container");
const hrArr = [];

const hrCntrRender = () => {
  //this generates array with each element 9am-6pm. default moment.js jr at 12am. added 9 to start from 9am

  $.each(new Array(10).fill(), (i, _) => {
    hrArr.push(moment({ hour: `${i + 9}` }).format("h A"));
  });

  const initLS = (hr) => {
    const getHrData = JSON.parse(localStorage.getItem(hr));
    if (!getHrData) {
      localStorage.setItem(hr, JSON.stringify([]));
    }
    $("textarea[data-hr='" + hr + "']").val(getHrData);
  };

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
      "<div class='col-10 bg-light input-group'><textarea data-hr='" +
        hr +
        "' class='form-control' aria-label='with textarea'></textarea></div>"
    );

    const saveClrCol = $(
      "<div class='col-1 bg-light d-flex align-items-center justify-content-around pl-0'><i class='fa-solid fa-floppy-disk fa-lg '></i><i id='reset-btn' class='fa-solid fa-trash-can fa-lg'></i></div>"
    );

    row.append(hourCol, txtAreaCol, saveClrCol);
    $(".container").append(row);
    //will load all data from local storage upon load
    initLS(hr);
  });
};

const clrCntrRender = () => {
  const clrRender = () => {
    const currentHr = moment().format("h A");
    $.each(hrArr, (i, hr) => {
      // console.log(hr);
      if (moment(hr).format("h A").isSame(currentHr)) {
        $("textarea[data-hr='" + hr + "']").addClass("present");
      } else if (moment(hr).isBefore(currentHr)) {
        $("textarea[data-hr='" + hr + "']").addClass("past");
      } else {
        $("textarea[data-hr='" + hr + "']").addClass("future");
      }
    });
  };

  setInterval(clrRender, 1000);
};

const storeInLS = (key, value) => {
  let arrFromLS = JSON.parse(localStorage.getItem(key));
  //clear array content from LS first before saving textarea text, otherwise will retain previous text on load.
  arrFromLS = [];
  arrFromLS.push(value);
  localStorage.setItem(key, JSON.stringify(arrFromLS));
};

const saveBtnClick = (e) => {
  if ($(e.target).is(".fa-floppy-disk")) {
    const hour = $(e.target).closest("div.row").data("hr");
    const textData = $("textarea[data-hr='" + hour + "']").val();
    storeInLS(hour, textData);
  }
};

const resetBtnClick = (e) => {
  if ($(e.target).is(".fa-trash-can")) {
    const hour = $(e.target).closest("div.row").data("hr");
    let textData = $("textarea[data-hr='" + hour + "']").val("");
    localStorage.removeItem(hour);
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
  //render timer on jumbotron header.
  headerTimerRender();

  //render hour row containers from 9am-6pm
  hrCntrRender();

  clrCntrRender();
};

$(document).ready(initPageLoad);
container.on("click", saveBtnClick);
container.on("click", resetBtnClick);
