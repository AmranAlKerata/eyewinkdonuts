$(function() {
  const headerHeight = $("header").innerHeight();
  const navLinks = $(".nav-link");

  //   // WOW JS
  //   if ($(".wow").length > 0) {
  //     new WOW().init();
  //   }

  // Change Header Background
  $(window).on("scroll", () => {
    if (window.scrollY > headerHeight + 10) {
      $("header").addClass("active");
    } else {
      $("header").removeClass("active");
    }
  });

  // Toggle Active Link on nav links
  navLinks.on("click", function() {
    $(this).addClass("active").siblings().removeClass("active");
  });
});

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-link");
window.onscroll = () => {
  var current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.getAttribute("href") == "#" + current) {
      li.classList.add("active");
    }
  });
};
