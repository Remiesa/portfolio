// image zoom

var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("fullImage");
var closeBtn = document.getElementsByClassName("close")[0];

document.querySelectorAll(".clickable-image").forEach(function (img) {
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  };
});

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// filterProjects

var itemsToShow = 6;

function filterProjects(category, btn) {
  var projects = document.querySelectorAll(".project-item");
  var count = 0;
  projects.forEach(function (project) {
    if (
      project.getAttribute("data-category") === category ||
      category === "all"
    ) {
      if (count < itemsToShow) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
      count++;
    } else {
      project.style.display = "none";
    }
  });

  var buttons = document.querySelectorAll(".custom-btn");
  buttons.forEach(function (button) {
    button.classList.remove("active");
    button.style.backgroundColor = "transparent";
    button.style.color = "#17a2b8";
  });

  btn.classList.add("active");
  btn.style.backgroundColor = "#17a2b8";
  btn.style.color = "white";

  document.getElementById("loadMoreBtn").style.display =
    count > itemsToShow ? "block" : "none";
}

function loadMoreProjects() {
  itemsToShow += 4;
  var activeBtn = document.querySelector(".custom-btn.active");
  filterProjects(activeBtn.getAttribute("onclick").split("'")[1], activeBtn);
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".custom-btn.active").click();
});

// hero typing effect

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 5px solid #fff}";
  document.body.appendChild(css);
};
