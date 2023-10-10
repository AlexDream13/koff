import {addContainer} from "../addContainer";
export class Header{
  static instance = null;
  constructor(){
    if(!Header.instance){
      Header.instance = this;
      this.element = document.createElement('header');
      this.element.classList.add('header');
      this.containerElement = addContainer(this.element, "header__container");
      this.isMounted = false;
    }
    
    return Header.instance;
  }
  mount(){
    if(this.isMounted){
      return;
    }
    //this.containerElement.append();
    document.body.append(this.element);
    this.isMounted = true;
  }
}
/*https://my.methed.ru/pl/teach/control/lesson/view?id=307647361&editMode=0  16:43*/

/* <header class="header">
      <div class="container header__container">
        <a href="/"><img class="header__logo" src="img/logo.svg" alt="Логотип магазина кофф"></a>
        <form class="header__search" action="/api/product">
          <input type="search" name="search" placeholder="Введите запрос" class="header__input">
          <button type="submit" class="header__btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.66671 13.9999C11.1645 13.9999 14 11.1644 14 7.66659C14 4.16878 11.1645 1.33325 7.66671 1.33325C4.1689 1.33325 1.33337 4.16878 1.33337 7.66659C1.33337 11.1644 4.1689 13.9999 7.66671 13.9999Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.6667 14.6666L13.3334 13.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        </form>
        <div class="header__control">
          <a class="header__link" href="/favorite">
            <span class="header__link-text">Избранное</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8.41337 13.8733C8.18671 13.9533 7.81337 13.9533 7.58671 13.8733C5.65337 13.2133 1.33337 10.46 1.33337 5.79332C1.33337 3.73332 2.99337 2.06665 5.04004 2.06665C6.25337 2.06665 7.32671 2.65332 8.00004 3.55998C8.67337 2.65332 9.75337 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41337 13.8733Z" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a class="header__link" href="/card">
           <span class="header__link-text">Корзина</span>
           <span class="header__count">(5)</span>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5.87329 1.33325L3.45996 3.75325" stroke="#1C1C1C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.1267 1.33325L12.54 3.75325" stroke="#1C1C1C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.33337 5.23324C1.33337 3.9999 1.99337 3.8999 2.81337 3.8999H13.1867C14.0067 3.8999 14.6667 3.9999 14.6667 5.23324C14.6667 6.66657 14.0067 6.56657 13.1867 6.56657H2.81337C1.99337 6.56657 1.33337 6.66657 1.33337 5.23324Z" stroke="#1C1C1C"/>
            <path d="M6.50671 9.33325V11.6999" stroke="#1C1C1C" stroke-linecap="round"/>
            <path d="M9.57336 9.33325V11.6999" stroke="#1C1C1C" stroke-linecap="round"/>
            <path d="M2.33337 6.66675L3.27337 12.4267C3.48671 13.7201 4.00004 14.6667 5.90671 14.6667H9.92671C12 14.6667 12.3067 13.7601 12.5467 12.5067L13.6667 6.66675" stroke="#1C1C1C" stroke-linecap="round"/>
          </svg> 
          </a>
        </div>
      </div>
</header> */