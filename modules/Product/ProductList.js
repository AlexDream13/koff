import {addContainer} from '../addContainer';
import {Card} from "../features/Card/Card.js";
export class ProductList{
  static instance = null;
  constructor(){
    if(!ProductList.instance){
      ProductList.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('goods');
      this.containerElement = addContainer(this.element, 'goods__container');
      this.isMounted = false;

      this.addEvents();
    }
    return ProductList.instance;
  }

  mount(parent, data, title,emptyText){
    this.containerElement.textContent = '';
    const titleElem = document.createElement('h2');
    titleElem.textContent = title ? title : 'Список товаров';
    titleElem.className = title ? 'goods__title' : 'goods__title visualy-hidden';
    this.containerElement.append(titleElem);

    if(data && data.length){
      this.updateListElem(data);
    } else {
      this.containerElement.insertAdjacentHTML('beforeend',
         `<p class="goods__empty">${emptyText || "В избранном ни чего нет"}</p>`
      );
    }

    if(this.isMounted){
      return;
    }
    parent.append(this.element);
    this.isMounted = true;

  }
unmount(){
    this.element.remove();
    this.isMounted = false;
  }
  addEvents(){

  };
  updateListElem(data = []){
    const listElem = document.createElement('div');
    listElem.classList.add('goods__list');

    const listItems = data.map(({id, images: [image], name: title, price}) => {
      const listItemElem = document.createElement('div');
      listItemElem.classList.add('goods__item');
      listItemElem.append(new Card ({id,image,title,price}).create());
      return listItemElem;
    });
    listElem.append(...listItems);
    this.containerElement.append(listElem);
  };


}
/*
<section class="goods" >
        <div class="container goods__container">
          <h2 class="goods__title">Избранное</h2>
          <div class="goods__list">
            <div class="goods__item">
              <article class="goods__card card">
                <a class="card__link card__link_img" href="/product">
                  <img class="card__image" src="./img/photo.jpg" alt="Кресло с подлокотниками">
                </a>
                <div class="card__info">
                  <h3 class="card__title"><a class="card__link" href="/product">Кресло с подлокотниками</a></h3>
                  <p class="card__price">5&nbsp;000&nbsp;р</p>
                </div>

                <button class="card__btn">В корзину</button>
                <button class="card__favorite">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.41325 13.8733C8.18658 13.9533 7.81325 13.9533 7.58659 13.8733C5.65325 13.2133 1.33325 10.46 1.33325 5.79332C1.33325 3.73332 2.99325 2.06665 5.03992 2.06665C6.25325 2.06665 7.32658 2.65332 7.99992 3.55998C8.67325 2.65332 9.75325 2.06665 10.9599 2.06665C13.0066 2.06665 14.6666 3.73332 14.6666 5.79332C14.6666 10.46 10.3466 13.2133 8.41325 13.8733Z" fill="white" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </article>
            </div>
            <div class="goods__item">
              <article class="goods__card card">
                <a class="card__link card__link_img" href="/product">
                  <img class="card__image" src="./img/photo.jpg" alt="Кресло с подлокотниками">
                </a>
                <div class="card__info">
                  <h3 class="card__title"><a class="card__link" href="/product">Кресло с подлокотниками</a></h3>
                  <p class="card__price">5&nbsp;000&nbsp;р</p>
                </div>
                <button class="card__btn">В корзину</button>
                <button class="card__favorite">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.41325 13.8733C8.18658 13.9533 7.81325 13.9533 7.58659 13.8733C5.65325 13.2133 1.33325 10.46 1.33325 5.79332C1.33325 3.73332 2.99325 2.06665 5.03992 2.06665C6.25325 2.06665 7.32658 2.65332 7.99992 3.55998C8.67325 2.65332 9.75325 2.06665 10.9599 2.06665C13.0066 2.06665 14.6666 3.73332 14.6666 5.79332C14.6666 10.46 10.3466 13.2133 8.41325 13.8733Z" fill="white" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </article>
            </div>
            <div class="goods__item">
              <article class="goods__card card">
                <a class="card__link card__link_img" href="/product">
                  <img class="card__image" src="./img/client-1.png" alt="Кресло с подлокотниками">
                </a>
                <div class="card__info">
                  <h3 class="card__title"><a class="card__link" href="/product">Кресло с подлокотниками</a></h3>
                  <p class="card__price">5&nbsp;000&nbsp;р</p>
                </div>
                <button class="card__btn">В корзину</button>
                <button class="card__favorite">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.41325 13.8733C8.18658 13.9533 7.81325 13.9533 7.58659 13.8733C5.65325 13.2133 1.33325 10.46 1.33325 5.79332C1.33325 3.73332 2.99325 2.06665 5.03992 2.06665C6.25325 2.06665 7.32658 2.65332 7.99992 3.55998C8.67325 2.65332 9.75325 2.06665 10.9599 2.06665C13.0066 2.06665 14.6666 3.73332 14.6666 5.79332C14.6666 10.46 10.3466 13.2133 8.41325 13.8733Z" fill="white" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </article>
            </div>
            <div class="goods__item">
              <article class="goods__card card">
                <a class="card__link card__link_img" href="/product">
                  <img class="card__image" src="./img/photo.jpg" alt="Кресло с подлокотниками">
                </a>
                <div class="card__info">
                  <h3 class="card__title"><a class="card__link" href="/product">Кресло с подлокотниками</a></h3>
                  <p class="card__price">5&nbsp;000&nbsp;р</p>
                </div>
                <button class="card__btn">В корзину</button>
                <button class="card__favorite">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.41325 13.8733C8.18658 13.9533 7.81325 13.9533 7.58659 13.8733C5.65325 13.2133 1.33325 10.46 1.33325 5.79332C1.33325 3.73332 2.99325 2.06665 5.03992 2.06665C6.25325 2.06665 7.32658 2.65332 7.99992 3.55998C8.67325 2.65332 9.75325 2.06665 10.9599 2.06665C13.0066 2.06665 14.6666 3.73332 14.6666 5.79332C14.6666 10.46 10.3466 13.2133 8.41325 13.8733Z" fill="white" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </article>
            </div>
          </div>
          <div class="pagination">
            <div class="pagination__bar" style="--width: calc(12 / 31 * 100%)"></div>
            <div class="pagination__arrays">
              <button class="pagination__left">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path d="M1.86395 7.0001L7.52528 1.1821C7.5719 1.13522 7.60874 1.07955 7.6337 1.01833C7.65866 0.957109 7.67122 0.891546 7.67068 0.825436C7.67013 0.759326 7.65647 0.693981 7.6305 0.633183C7.60453 0.572385 7.56676 0.517341 7.51938 0.471236C7.472 0.425131 7.41594 0.388881 7.35445 0.364583C7.29297 0.340285 7.22727 0.328422 7.16117 0.32968C7.09507 0.330939 7.02988 0.345294 6.96936 0.371914C6.90885 0.398535 6.85421 0.436893 6.80862 0.484768L0.808619 6.65143C0.717804 6.74478 0.666992 6.86987 0.666992 7.0001C0.666992 7.13033 0.717804 7.25542 0.808619 7.34877L6.80862 13.5154C6.85421 13.5633 6.90885 13.6017 6.96936 13.6283C7.02988 13.6549 7.09507 13.6693 7.16117 13.6705C7.22727 13.6718 7.29297 13.6599 7.35445 13.6356C7.41594 13.6113 7.472 13.5751 7.51938 13.529C7.56676 13.4829 7.60453 13.4278 7.6305 13.367C7.65647 13.3062 7.67013 13.2409 7.67068 13.1748C7.67122 13.1087 7.65866 13.0431 7.6337 12.9819C7.60874 12.9207 7.5719 12.865 7.52528 12.8181L1.86395 7.0001Z" fill="#1C1C1C"/>
                </svg>
              </button>
              <p><span class="pagination__current">12</span> и <span class="pagination__total">31</span></p>
              <button class="pagination__right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.136 8.0001L7.47472 2.1821C7.4281 2.13522 7.39126 2.07955 7.3663 2.01833C7.34134 1.95711 7.32878 1.89155 7.32932 1.82544C7.32987 1.75933 7.34353 1.69398 7.3695 1.63318C7.39547 1.57239 7.43324 1.51734 7.48062 1.47124C7.528 1.42513 7.58406 1.38888 7.64555 1.36458C7.70703 1.34028 7.77273 1.32842 7.83883 1.32968C7.90493 1.33094 7.97012 1.34529 8.03064 1.37191C8.09115 1.39854 8.14579 1.43689 8.19138 1.48477L14.1914 7.65143C14.2822 7.74478 14.333 7.86987 14.333 8.0001C14.333 8.13033 14.2822 8.25542 14.1914 8.34877L8.19138 14.5154C8.14579 14.5633 8.09115 14.6017 8.03064 14.6283C7.97012 14.6549 7.90493 14.6693 7.83883 14.6705C7.77273 14.6718 7.70703 14.6599 7.64555 14.6356C7.58406 14.6113 7.528 14.5751 7.48062 14.529C7.43324 14.4829 7.39547 14.4278 7.3695 14.367C7.34353 14.3062 7.32987 14.2409 7.32932 14.1748C7.32878 14.1087 7.34134 14.0431 7.3663 13.9819C7.39126 13.9207 7.4281 13.865 7.47472 13.8181L13.136 8.0001Z" fill="#1C1C1C"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="product" >
        <div class="container product__container">
          <h2 class="product__title">Кресло с подлокотниками</h2>
          <div class="product__picture">
            <div class="swiper product__slider-main">
              <div class="swiper-wrapper product__main-list">
                <div class="swiper-slide product__slide">
                  <img class="product__slide-img" src="./img/photo-big.jpg">
                </div>
                <div class="swiper-slide product__slide">
                  <img class="product__slide-img" src="https://swiperjs.com/demos/images/nature-2.jpg">
                </div>
                <div class="swiper-slide product__slide">
                  <img class="product__slide-img" src="https://swiperjs.com/demos/images/nature-3.jpg">
                </div>
                <div class="swiper-slide product__slide">
                  <img class="product__slide-img" src="https://swiperjs.com/demos/images/nature-4.jpg">
                </div>
                <div class="swiper-slide product__slide">
                  <img class="product__slide-img" src="https://swiperjs.com/demos/images/nature-5.jpg">
                </div>
                <div class="swiper-slide product__slide">
                  <img class="product__slide-img" src="https://swiperjs.com/demos/images/nature-6.jpg">
                </div>
                <div class="swiper-slide product__slide">
                  <img class="product__slide-img" src="https://swiperjs.com/demos/images/nature-7.jpg">
                </div>
                <div class="swiper-slide product__slide">
                  <img class="product__slide-img" src="https://swiperjs.com/demos/images/nature-8.jpg">
                </div>
                <div class="swiper-slide product__slide">
                  <img class="product__slide-img" src="https://swiperjs.com/demos/images/nature-10.jpg">
                </div>
              </div>
              <button class="product__arrow product__arrow_prev">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="16" fill="white" fill-opacity="0.4"/>
                  <path d="M11.864 16.0001L17.5253 10.1821C17.5719 10.1352 17.6087 10.0796 17.6337 10.0183C17.6587 9.95711 17.6712 9.89155 17.6707 9.82544C17.6701 9.75933 17.6565 9.69398 17.6305 9.63318C17.6045 9.57239 17.5668 9.51734 17.5194 9.47124C17.472 9.42513 17.4159 9.38888 17.3545 9.36458C17.293 9.34028 17.2273 9.32842 17.1612 9.32968C17.0951 9.33094 17.0299 9.34529 16.9694 9.37191C16.9088 9.39854 16.8542 9.43689 16.8086 9.48477L10.8086 15.6514C10.7178 15.7448 10.667 15.8699 10.667 16.0001C10.667 16.1303 10.7178 16.2554 10.8086 16.3488L16.8086 22.5154C16.8542 22.5633 16.9088 22.6017 16.9694 22.6283C17.0299 22.6549 17.0951 22.6693 17.1612 22.6705C17.2273 22.6718 17.293 22.6599 17.3545 22.6356C17.4159 22.6113 17.472 22.5751 17.5194 22.529C17.5668 22.4829 17.6045 22.4278 17.6305 22.367C17.6565 22.3062 17.6701 22.2409 17.6707 22.1748C17.6712 22.1087 17.6587 22.0431 17.6337 21.9819C17.6087 21.9207 17.5719 21.865 17.5253 21.8181L11.864 16.0001Z" fill="#1C1C1C"/>
                  </svg>
              </button>
              <button class="product__arrow product__arrow_next">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="16" transform="matrix(-1 0 0 1 32 0)" fill="white" fill-opacity="0.4"/>
                  <path d="M20.136 16.0001L14.4747 10.1821C14.4281 10.1352 14.3913 10.0796 14.3663 10.0183C14.3413 9.95711 14.3288 9.89155 14.3293 9.82544C14.3299 9.75933 14.3435 9.69398 14.3695 9.63318C14.3955 9.57239 14.4332 9.51734 14.4806 9.47124C14.528 9.42513 14.5841 9.38888 14.6455 9.36458C14.707 9.34028 14.7727 9.32842 14.8388 9.32968C14.9049 9.33094 14.9701 9.34529 15.0306 9.37191C15.0912 9.39854 15.1458 9.43689 15.1914 9.48477L21.1914 15.6514C21.2822 15.7448 21.333 15.8699 21.333 16.0001C21.333 16.1303 21.2822 16.2554 21.1914 16.3488L15.1914 22.5154C15.1458 22.5633 15.0912 22.6017 15.0306 22.6283C14.9701 22.6549 14.9049 22.6693 14.8388 22.6705C14.7727 22.6718 14.707 22.6599 14.6455 22.6356C14.5841 22.6113 14.528 22.5751 14.4806 22.529C14.4332 22.4829 14.3955 22.4278 14.3695 22.367C14.3435 22.3062 14.3299 22.2409 14.3293 22.1748C14.3288 22.1087 14.3413 22.0431 14.3663 21.9819C14.3913 21.9207 14.4281 21.865 14.4747 21.8181L20.136 16.0001Z" fill="#1C1C1C"/>
                  </svg>
              </button>
            </div>
            <div class="swiper product__slider-thumbnails">
              <div class="swiper-wrapper product__thumbnails-list">
                <div class="swiper-slide product__thumbnails-slide">
                  <img class="product__thumbnails-img" src="./img/photo.jpg">
                </div>
                <div class="swiper-slide product__thumbnails-slide">
                  <img class="product__thumbnails-img" src="https://swiperjs.com/demos/images/nature-2.jpg">
                </div>
                <div class="swiper-slide product__thumbnails-slide">
                  <img class="product__thumbnails-img" src="https://swiperjs.com/demos/images/nature-3.jpg">
                </div>
                <div class="swiper-slide product__thumbnails-slide">
                  <img class="product__thumbnails-img" src="https://swiperjs.com/demos/images/nature-4.jpg">
                </div>
                <div class="swiper-slide product__thumbnails-slide">
                  <img class="product__thumbnails-img" src="https://swiperjs.com/demos/images/nature-5.jpg">
                </div>
                <div class="swiper-slide product__thumbnails-slide">
                  <img class="product__thumbnails-img" src="https://swiperjs.com/demos/images/nature-6.jpg">
                </div>
                <div class="swiper-slide product__thumbnails-slide">
                  <img class="product__thumbnails-img" src="https://swiperjs.com/demos/images/nature-7.jpg">
                </div>
                <div class="swiper-slide product__thumbnails-slide">
                  <img class="product__thumbnails-img" src="https://swiperjs.com/demos/images/nature-8.jpg">
                </div>
                <div class="swiper-slide product__thumbnails-slide">
                  <img class="product__thumbnails-img" src="https://swiperjs.com/demos/images/nature-10.jpg">
                </div>
              </div>
            </div>  
          </div>
          <div class="product__info">
            <p class="product__price">5&nbsp;000&nbsp;₽</p>
            <p class="product__article">арт. 84348945757</p>
            <div class="product__characteristics">
              <h3 class="product__characteristics-title">Общие характеристики</h3>
              <table class="table product__characteristics-table">
                <tr class="table__row">
                  <td class="table__field">Коллекция</td>
                  <td class="table__value">Мирсаж</td>
                </tr>
                <tr class="table__row">
                  <td class="table__field">Производитель</td>
                  <td class="table__value">Россия</td>
                </tr>
                <tr class="table__row">
                  <td class="table__field">Гарантия</td>
                  <td class="table__value">18 мес.</td>
                </tr>
                <tr class="table__row">
                  <td class="table__field">Срок службы</td>
                  <td class="table__value">5 лет</td>
                </tr>
                <tr class="table__row">
                  <td class="table__field">Цвет</td>
                  <td class="table__value">Желтый</td>
                </tr>
                <tr class="table__row">
                  <td class="table__field">Макс. нагрузка</td>
                  <td class="table__value">130 кг</td>
                </tr>
              </table>
              <div class="product__btns">
                <button class="product__btn" type="button">В корзину</button>
                <button class="product__like" type="button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.41301 13.8733C8.18634 13.9533 7.81301 13.9533 7.58634 13.8733C5.65301 13.2133 1.33301 10.46 1.33301 5.79332C1.33301 3.73332 2.99301 2.06665 5.03967 2.06665C6.25301 2.06665 7.32634 2.65332 7.99967 3.55998C8.67301 2.65332 9.75301 2.06665 10.9597 2.06665C13.0063 2.06665 14.6663 3.73332 14.6663 5.79332C14.6663 10.46 10.3463 13.2133 8.41301 13.8733Z" fill="white" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
*/