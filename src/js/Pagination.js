'use strict';

class Pagination {
    constructor() {
        this.opts = {
            'messageArea'       : '#no-data-message',
            'pagerContainer'    : '.pager-container',
            'countArea'         : '.count',
            'paginationClass'   : '.pagination',

            'cardListArea'      : '#card-list',

            'page_per_count'    : 10,

            'pager' : {
              'bullet_count'    : 7,
              'current_page'    : 1,
              'max_page'        : 1,
              'index'           : {
                'min' : 0,
                'max' : 0
              },
            },

            'datas' : [],

            'createCard': null,
            'clickCard' : null
        }

        this.paginationContainer = document.querySelectorAll(this.opts.paginationClass);
        for (let i = 0; i < this.paginationContainer.length; i++) {
            this.paginationContainer[i].addEventListener('click', (e) => {

                if (e.target.parentNode.classList.contains('disabled')) {
                    return false;
                }

                //if ($(e.target).hasClass('page-span')) {
                //    return this;
                //}

                var targetPage = e.target.innerHTML - 0;

                if (e.target.classList.contains('prev')) {
                    targetPage = this.opts.pager.current_page - 1;
                } else if (e.target.classList.contains('next')) {
                    targetPage = this.opts.pager.current_page + 1;
                }

                // 同じページの場合は何もしない
                if (targetPage == this.opts.pager.current_page) {
                    return this;
                }


                if (Number.isInteger(targetPage)) {

                    // ページ移動
                    this.opts.pager.current_page = targetPage
                    this.movePage();
                }



            });
        }



    }

    /**
     * ページ移動.
     */
    movePage() {
        this.showPager();
        this.showItems(this.opts.pager.current_page);
    }

    showPager() {
        var opts = this.opts

        var messageArea = document.querySelectorAll(opts.messageArea)[0];
        messageArea.classList.remove('show');


        // 現在のページャをいったん削除
        var pagination = document.querySelectorAll(opts.paginationClass)[0];
        pagination.innerHTML = "";

        var countArea = document.querySelectorAll(`${opts.pagerContainer} ${opts.countArea}`)[0];
        countArea.innerHTML = "";

        // データがない場合は表示しない
        if (opts.pager.data_exists === true) {
            var paginationBox = this.setPaginationDisplays();

            // 前ページボタン
            //var tmp = $('<li>').append($('<a href=#>').addClass('prev').html('&laquo;')).attr('data-page', page);
            let tmp = document.createElement('li');
            let tmpA = document.createElement('a');
            tmpA.href="#";
            tmpA.classList.add('prev')
            tmpA.innerHTML = "&laquo;";
            tmp.setAttribute('data-page', page);
            tmp.appendChild(tmpA);


            if (opts.pager.current_page == 1) {
                tmp.classList.add('disabled');
            }
            pagination.appendChild(tmp);



            // ページャ表示
            for (let idx in paginationBox) {
                var page = paginationBox[idx];

                if (page !== false) {

                    let tmp = document.createElement('li');
                    let tmpA = document.createElement('a');
                    tmpA.href = "#";
                    tmpA.innerHTML = page;
                    tmp.setAttribute('data-page', page);
                    tmp.appendChild(tmpA);
                    pagination.appendChild(tmp);

                } else {
                    //$('<li>').append(
                    //  $('<a href=#>').text('...').addClass('page-span')
                    //).appendTo('.pagination');

                    let tmp = document.createElement('li');
                    let tmpA = document.createElement('a');
                    tmpA.href = "#";
                    tmpA.innerHTML = '...';
                    tmpA.classList.add('page-span');
                    tmp.setAttribute('data-page', page);
                    tmp.appendChild(tmpA);
                    pagination.appendChild(tmp);
                }
            }

            // 次ページボタン
            //tmp = $('<li>').append($('<a href=#>').addClass('next').html('&raquo;')).attr('data-page', page);
            tmp = document.createElement('li');
            tmpA = document.createElement('a');
            tmpA.href="#";
            tmpA.classList.add('next');
            tmpA.innerHTML = "&raquo;";
            tmp.setAttribute('data-page', page);
            tmp.appendChild(tmpA);

            if (opts.pager.current_page == opts.pager.max_page) {
                tmp.removeAttribute('data-page');
                tmp.classList.add('disabled');
            }
            //tmp.appendTo('.pagination');
            pagination.appendChild(tmp);


            // 件数表示
            var endCount = opts.page_per_count * opts.pager.current_page;
            var startCount = endCount - opts.page_per_count + 1;
            if (endCount  > opts.datas.length) {
                endCount = opts.datas.length;
            }

            countArea.innerHTML = `${startCount} ～ ${endCount} 件 / ${opts.datas.length} 件中`;

            // activeページ設定
            //$(`.pagination li[data-page=${opts.pager.current_page}]`).addClass('active');
            let active = document.querySelectorAll("[data-page='" + opts.pager.current_page + "']")[0];
            active.classList.add('active');


        } else {

          // データがない場合
          $('#no-data-message').addClass('show');

        }

        return

    }

    /**
     * バレット表示判別設定処理.
     */
    setPaginationDisplays() {

        var opts = this.opts;
        var paginationBox = []

        //for (let i = 1; i < 10;  i++) {
        for (let i = 1; i < opts.pager.bullet_count;  i++) {

            // バレット数 >= ページ数ならそのまま
            if(opts.pager.bullet_count >= opts.pager.max_page) {
                if(i <= opts.pager.max_page) {
                    paginationBox.push(i);
                }
                continue;
            }

            // 1番目のバレット
            if (i == 1) {
                paginationBox.push(1);
                continue;
            }

            // 2番目のバレット
            if (i == 2) {
                // 現ページがバレット数-4以内なら2を表示
                if (opts.pager.current_page <= opts.pager.bullet_count - 4) {
                    paginationBox.push(i);
                } else {
                    paginationBox.push(false);
                }
                continue;
            }


            // 最後から2番目のバレット
            if (i == opts.pager.bullet_count - 1) { 
                // 現ページが最大ページ数-5以上なら表示
                if(opts.pager.current_page > opts.pager.max_page - 5) {
                    paginationBox.push(opts.pager.max_page - 1);
                } else {
                    paginationBox.push(false);
                }
                continue;
            }


            // 3~のバレット
            if(i > 2 && i < opts.pager.bullet_count - 1) {
                // 現ページが5以下の場合は表示位置そのまま
                // 現ページが全ページ数-5以上なら全ページ数 - 表示位置
                // 現ページ - 5 + 表示位置のページを表示
                if (opts.pager.current_page <= 5) {
                    paginationBox.push(i);
                } else if (opts.pager.current_page > opts.pager.max_page - 5) {
                    paginationBox.push(opts.pager.max_page - opts.pager.bullet_count + i);
                } else {
                    paginationBox.push(opts.pager.current_page - 5 + i);
                }
                continue;
        }



        // 最後のバレット
        if (i == opts.pager.bullet_count) {
            paginationBox.push(opts.pager.max_page);
            continue;
        }
        paginationBox.push(false);


        }

        return paginationBox;

    }

    /**
     * データのセット.
     */
    setDatas(datas, currentPage) {

        this.opts.datas = datas;

        this.opts.pager.data_exists = true

        if(datas.length === 0) {
            this.opts.pager.data_exists = false
        }

        if (typeof currentPage === "undefined" || currentPage === null) {
            this.opts.pager.current_page = 1;
        }

        this.opts.pager.max_page = Math.ceil(datas.length / this.opts.page_per_count);

        if (this.opts.pager.current_page > this.opts.pager.max_page) {
          this.opts.pager.current_page = 1;
        }
        this.showPager();
        return this;
    }

    clearResults() {
        $(this.opts.cardListArea).html('');
        $(this.opts.paginationClass).html('');
        $(`${this.opts.pagerContainer} ${this.opts.countArea}`).html('');
    }

    showItems (page) {

        if (page == undefined) {
            page = this.opts.pager.current_page;
        }

        var card, data, i, idx, len, ref;


        // windowサイズ固定
        //$(this.opts.cardListArea).css('min-height', function() {
        //  return $(this).height();
        //});


        // 一旦クリア
        //$(this.opts.cardListArea).html('');
        let cardListArea = document.querySelector(this.opts.cardListArea);
        cardListArea.innerHTML = "";
        this.setIndexInfo(page);
        idx = -1;

        ref = this.opts.datas;

        for (i = 0, len = ref.length; i < len; i++) {
            data = ref[i];
            idx++;
            if (idx < this.opts.pager.index.min) {
              continue;
            }
            if (idx >= this.opts.pager.index.max) {
              break;
            }

            card = this.opts.createCard(data, idx);
            cardListArea.appendChild(card);
        }


        return ;
    }

    setCreateCard (func) {
        this.opts.createCard = func;
        return this;
    }

    /**
     * 最小index、最大indexを設定.
     */
    setIndexInfo(page) {
        this.opts.pager.index.max = this.opts.page_per_count * page;
        return this.opts.pager.index.min = this.opts.pager.index.max - this.opts.page_per_count;
    }

    getDataById(id) {

        for (let idx in this.opts.datas) {
            var data = this.opts.datas[idx];
            if (data.result_id == id) {
                return this.opts.datas[idx];
            }
        }
        return null;
    }

}

export default Pagination;





