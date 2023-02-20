let url = "./data.json";

const productsContainer = $(".swipers");
const swipercontainer = $(".swiper-container");
const tabs = $(".menu .tabs");
const finalMeta = [];

const loader = `<div class="amk-loader"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`;

// Get all storeis tags and return them as one unique array
const uniqueCategoris = (data) => {
  const arabicCode = /[\u0600-\u06FF]/;
  let productMeta = [];
  // Get all tags and filter them in one array
  data.map((item) => productMeta.push(item.category, item.label));

  //  Remove Duplicated tags
  const filterdMeta = Array.from(new Set(productMeta));

  // Get Categories
  const labels = filterdMeta.filter((p) => arabicCode.test(p));
  // Get Labels
  const categories = filterdMeta.filter((p) => !arabicCode.test(p));

  finalMeta.push(labels, categories);

  // Append Tags in filter options tabs
  tabs.append(
    categories.map((c, i) => {
      return `<div class="btn-epic ${i === 0 ? "alt active" : ""}" id="${c}">
              <div><span>${labels[i]}</span><span>${labels[i]}</span></div>
              </div>`;
    })
  );
};

// Create Product HTML MarkUp
const productMakrUp = (data) => {
  // Loop over stories and create HTML Markup
  const products = data.map((product) => {
    const { id, image, price, title, type, ca, category } = product;

    const productMarkUp = `<div class="swiper-slide">
              <div class="product position-relative">
                  <div class="badge">
                      ${ca}
                      <br>
                      ca
                  </div>
                  <img src="${image}" alt="${title}">
                  <h3 class="mt-4">${title}</h3>
                  ${type === "can"
                    ? `<h6>سعر الصندوق ${price} ريال</h6>`
                    : `<h6>سعر الحبة ${price} ريال</h6>`}
                  <a href="https://api.whatsapp.com/send/?phone=966563488666" class="btn mt-3">إطلب الآن</a>
              </div>
            </div>`;

    $(`#swiper-${category} .swiper-wrapper`).append(productMarkUp);
  });

  return products;
};

// Fetch Data from API
const fetchData = async () => {
  // Add Loader
  productsContainer.append(loader);

  try {
    const data = await fetch(url);
    const resp = await data.json();

    // Show Category in UI
    uniqueCategoris(resp);

    // Create HTML
    productMakrUp(resp);

    new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 1000,
      loop: true,
      // autoplay: true,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 40
        }
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });

    $(".menu .btn-epic").on("click", function() {
      const id = $(this).attr("id");

      // Change active class
      $(this).addClass("alt active").siblings().removeClass("alt active");
      // Select swiper container
      const swiperContainer = $(`.swiper-container[data-tab="${id}"]`);
      swiperContainer.addClass("show").siblings().removeClass("show");
      let thisSwiper = document.getElementById("swiper-" + id);
      if (id === "donuts") return;

      thisSwiper.swiper.update();
    });

    // Remove Loader
    $(".amk-loader").remove();
  } catch (error) {
    // Remove Loader
    $(".lds-roller").remove();
    // Append Error
    $(".amk-loader").append(
      "<div class='text-center'><h2>حدث خطأ أثناء تحميل المنتجات...</h2><h3>قم بتحديث الصفحة أو العودة لاحقاً</h3></div>"
    );
    throw new Error(error);
  }
};

fetchData();
