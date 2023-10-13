import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { Order } from './modules/Order/Order';
import { Footer } from './modules/Footer/Footer';
import { ProductList } from './modules/Product/ProductList';
import {ApiService} from "./modules/services/ApiService.js";

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
  const api = new ApiService();
  new Header().mount();
  new Main().mount();
  new Footer().mount();
   
  productSlider();
  const router = new Navigo("/", {linksSelector: "a[href^='/']"});

  router
  .on("/", async () => {
    const product = await api.getProducts();
    new ProductList().mount(new Main().element, product);
    },
      {
      before(done){
        console.log('before');
        
        done();
      },
      after(){
        console.log('after');
      },
      leave(done){
        
        done();
      },
      already(){
        console.log('already');
      }
    }
  )
  .on("/category", () => {
    new ProductList().mount(new Main().element, [1,2,3,4,5,6], 'Категория');
  },
  {
   leave(done){
      done();
    },
  },
  )
  .on("/favorite", () => {
    new ProductList().mount(new Main().element, [1,2], 'Избранное');
  },
  {
   leave(done){
      done();
    },
  },  
  )
  .on("/product/:id", (obj) => {console.log('obj: ', obj)})
  .on("/search", () => {console.log('search')})
  .on("/cart", () => {console.log('cart')})
  .on("/order", () => {
    new Order().mount(new Main().element);
    console.log('sectionOrder');
  })
  .notFound(() => {
    new Main().element.innerHTML = `<div class="container"><h2>Страница не существует</h2>
    <p>Через 5 секунд вы будете перенапрвлены <a href="/">на главную страницу</a></p></div>`;
    setTimeout(() => {
    new Main().element.innerHTML = '';  
    router.navigate('/');
    
    }, 5000);
    
  });
  router.resolve();
}
init();
