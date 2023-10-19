import "normalize.css";
import "./style.scss";
import Navigo from "navigo";
import { Header } from "./modules/Header/Header";
import { Main } from "./modules/Main/Main";
import { Order } from "./modules/Order/Order";
import { Footer } from "./modules/Footer/Footer";
import { ProductList } from "./modules/Product/ProductList";
import {ApiService} from "./modules/services/ApiService.js";
import {Catalog} from "./modules/Catalog/Catalog.js";
import {FavoriteService} from "./modules/services/StorageService.js";
import { Pagination } from './modules/features/Pagination/Pagination';
import {BreadCrumbs} from "./modules/Catalog/BreadCrumbs.js";

const productSlider = function() {
  Promise.all([
    import("swiper/modules"),
    import("swiper"),
    import("swiper/css")
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
export const router = new Navigo("/", {linksSelector: "a[href^='/']"});
const init = () => {
  const api = new ApiService();

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  /*api.getProductCategories().then(data => {
    new Catalog().mount(new Main().element,data);
    router.updatePageLinks();
  });*/

  productSlider();

  router
  .on("/", async () => {
    new Catalog().mount(new Main().element);
    const products = await api.getProducts();
    new ProductList().mount(new Main().element, products);
    router.updatePageLinks();
  },
  {
    leave(done){
        new ProductList().unmount();
        new Catalog().unmount();
        done();
      },
    already(match){
      match.route.handler(match);
    },
   },
  )
  .on("/category", async ({params: {slug, page = 1}}) => {
    new Catalog().mount(new Main().element);
    const {data: products, pagination} = await  api.getProducts({category: slug, page: page});

    new BreadCrumbs().mount(new Main().element, [{text: slug}]);
    new ProductList().mount(new Main().element, products, slug);
    new Pagination().mount(new ProductList().containerElement).update(pagination);
        router.updatePageLinks();
  },
  {
   leave(done){
     new BreadCrumbs().unmount();
     new ProductList().unmount();
     new Catalog().unmount();
      done();
    },
  },
  )
  .on("/favorite", async () => {
    new BreadCrumbs().mount(new Main().element, [{text: 'Избранное'}]);
    new Catalog().mount(new Main().element);
    const favorite = new FavoriteService().get();
    const {data: product, pagination} = await  api.getProducts({list: favorite.join(','), page:params?.page || 1});
    new ProductList().mount(new Main().element, product, 'Избранное', 'Вы ни чего не добавили в избранное');
    new Pagination().mount(new ProductList().ContainerElement).update(pagination);
    router.updatePageLinks();
  },
  {
   leave(done){
     new BreadCrumbs().unmount();
     new ProductList().unmount();
     new Catalog().unmount();
      done();
    },
    already(match){
     match.route.handler(match);
    }
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
