import {likeSvg} from "../likeSVG/LikeSvg.js";

export class LikeButton{
    constructor(className) {
        this.className = className;
    }
    create(id){
        const button = document.createElement('button');
        button.classList.add(this.className);
        button.dataset.id = id;

        button.addEventListener('click', () => {
            console.log('Добавить товар в избранное');
        });
        likeSvg().then((svg) => {
            button.append(svg)
        });
        ;
        return button;
    }
}