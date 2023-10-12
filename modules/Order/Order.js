import {addContainer} from "../addContainer";
import { Main } from '../Main/Main';
export class Order{
  static instance = null;
  constructor(){
    if(!Order.instance){
      Order.instance = this;
      this.sectionOrder = document.createElement('section');
      this.sectionOrder.classList.add('order');
      this.containerElement = addContainer(this.sectionOrder, "order__container");
      this.isMounted = false;
    }
    
    return Order.instance;
  }
  
  mount(main){
    if(this.isMounted){
      return;
    }
    
    const orderHeader = this.getOrderHeader();
    const table = this.getTable();
    const orderButton = this.getOrderButton();

    this.containerElement.append(orderHeader,table,orderButton);
    main.append(this.sectionOrder);
    this.isMounted = true;
  }
  unmount(){
    this.element.remove();
    this.isMounted = false;
  }

  getOrderHeader(){
    const orderHeader = document.createElement('div');
    orderHeader.classList.add('order__header');

    const orderTitle = document.createElement('h3');
    orderTitle.classList.add('order__title');
    orderTitle.innerHTML = 'Заказ успешно размещен';

    const orderPrice = document.createElement('p');
    orderPrice.classList.add('order__price');
    orderPrice.innerHTML = '20 000 ₽';

    const orderNumber = document.createElement('p');
    orderNumber.classList.add('order__number');
    orderNumber.innerHTML = '№43435';

    orderHeader.append(orderTitle,orderPrice,orderNumber);
    return orderHeader;
     
  };
  getTable(){
    const table = document.createElement('table');
    table.classList.add('table', 'order__characteristics-table');
    table.insertAdjacentHTML("beforeend",`<tr><th class="table__title" colspan="2">Данные доставки</th></tr>
    <tr class="table__row">
      <td class="table__field">Получатель</td>
      <td class="table__value">Иванов Петр Александрович</td>
    </tr>
    <tr class="table__row">
      <td class="table__field">Телефон</td>
      <td class="table__value">+7 (737) 346 23 00</td>
    </tr>
    <tr class="table__row">
      <td class="table__field">E-mail</td>
      <td class="table__value">Ivanov84@gmail.com</td>
    </tr>
    <tr class="table__row">
      <td class="table__field">Адрес доставки</td>
      <td class="table__value">Москва, ул. Ленина, 21, кв. 33</td>
    </tr>
    <tr class="table__row">
      <td class="table__field">Способ оплаты</td>
      <td class="table__value">Картой при получении</td>
    </tr>
    <tr class="table__row">
      <td class="table__field">Способ получения</td>
      <td class="table__value">Доставка</td>
    </tr>`);
    
    /* const tableTitle =document.createElement('th');
    tableTitle.classList.add('table__title');
    tableTitle.colspan = '2';
    tableTitle.innerHTML = 'Данные доставки';

    const tableRow = document.createElement('tr');
    tableRow.classList.add('table__row');

    const tableRecipient = document.createElement('tr');
    tableRecipient.classList.add('table__field');
    tableRecipient.innerHTML = 'Получатель';

    const tableRecipientName = document.createElement('tr');
    tableRecipientName.classList.add('table__value');
    tableRecipientName.innerHTML = 'Иванов Петр Александрович';

    tableRow.append(tableRecipient,tableRecipientName);

    table.append(tableTitle,tableRow); */
    return table; 
  }
  getOrderButton(){
    const orderButton = document.createElement('div');
    orderButton.classList.add('order__button');
    const orderButtonLink = document.createElement('a');
    orderButtonLink.classList.add('order__button-btn');
    orderButtonLink.href = '/';
    orderButtonLink.innerHTML = 'На главную';

    orderButton.append(orderButtonLink);
    return orderButton;
  }

}
  {/* <section class="order">
        <div class="container order__container">
          <div class="order__header">
            <h3 class="order__title">Заказ успешно размещен</h3>
            <p class="order__price">20 000 ₽</p>
            <p class="order__number">№43435</p>
          </div>
          <table class="table order__characteristics-table">
            <th class="table__title" colspan="2">Данные доставки</th>
            <tr class="table__row">
              <td class="table__field">Получатель</td>
              <td class="table__value">Иванов Петр Александрович</td>
            </tr>
            <tr class="table__row">
              <td class="table__field">Телефон</td>
              <td class="table__value">+7 (737) 346 23 00</td>
            </tr>
            <tr class="table__row">
              <td class="table__field">E-mail</td>
              <td class="table__value">Ivanov84@gmail.com</td>
            </tr>
            <tr class="table__row">
              <td class="table__field">Адрес доставки</td>
              <td class="table__value">Москва, ул. Ленина, 21, кв. 33</td>
            </tr>
            <tr class="table__row">
              <td class="table__field">Способ оплаты</td>
              <td class="table__value">Картой при получении</td>
            </tr>
            <tr class="table__row">
              <td class="table__field">Способ получения</td>
              <td class="table__value">Доставка</td>
            </tr>
          </table>
          <div class="order__button">
            <a href="/" class="order__button-btn">На главную</a>
          </div>
        </div>
      </section> */}