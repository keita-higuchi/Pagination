import Pagination from './Pagination'

var pagination = new Pagination;

var datas = [];

for (let i = 0; i < 200; i++) {
    datas.push({id: i, name: "name" + i, score: i / 2 });
}

pagination.setCreateCard((data, idx) => {
    let card = document.createElement('li');

    let name = document.createElement('span');
    name.innerHTML = data.name

    let score = document.createElement('span');
    score.innerHTML = data.score

    card.appendChild(name);
    card.appendChild(score);

    return card;

});

pagination.setDatas(datas).showItems();




