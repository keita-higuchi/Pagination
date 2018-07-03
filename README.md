# Pagination.js

It is a simple pagination.

# Qurick Start

//```
//$ npm i pagination
//```

```
import Pagination from 'Pagination'

// create instance
var pagination = new Pagination;

// --- sample data ----
var datas = [];
for (let i = 0; i < 200; i++) {
    datas.push({id: i, name: "name" + i, score: i / 2 });
}

// create 1 data card method
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

// show data and pagination
pagination.setDatas(datas).showItems();
```

![](../imgs/sample1.jpg)



