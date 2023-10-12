import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { Order } from './modules/Order/Order';
import { Footer } from './modules/Footer/Footer';

const productSlider = () => {
  Promise.all([
    import("swiper/modules"),
    import("swiper"),
    import("swiper/css"),
  ]).then(([{Navigation,Thumbs},Swiper]) => {
    const swiperThumbnails = new Swiper.default(".product__slider-thumbnails", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    new Swiper.default(".product__slider-main", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".product__arrow_next",
        prevEl: ".product__arrow_prev",
      },
      modules:[Navigation, Thumbs],
      thumbs: {
        swiper: swiperThumbnails,
      },
    });
  })
}

const init = () => {
  new Header().mount();
  new Main().mount();
  new Footer().mount();
   
  productSlider();
  const router = new Navigo("/", {linksSelector: "a[href^='/']"});
  router
  .on("/", () => {console.log('на главной')})
  .on("/category", () => {console.log('category')})
  .on("/favorite", () => {console.log('favorite')})
  .on("/product/:id", (obj) => {console.log('obj: ', obj)})
  .on("/search", () => {console.log('serch')})
  .on("/cart", () => {console.log('cart')})
  .on("/order", () => {
    new Order().mount(new Main().sectionOrder);
    console.log('sectionOrder');
  })
  .notFound(() => {console.log(404)})
  router.resolve();
}
init();
