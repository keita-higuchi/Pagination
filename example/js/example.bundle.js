/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/example.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Pagination.js":
/*!******************************!*\
  !*** ./src/js/Pagination.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pagination = function () {
    function Pagination() {
        var _this = this;

        _classCallCheck(this, Pagination);

        this.opts = {
            'messageArea': '#no-data-message',
            'pagerContainer': '.pager-container',
            'countArea': '.count',
            'paginationClass': '.pagination',

            'cardListArea': '#card-list',

            'page_per_count': 10,

            'pager': {
                'bullet_count': 7,
                'current_page': 1,
                'max_page': 1,
                'index': {
                    'min': 0,
                    'max': 0
                }
            },

            'datas': [],

            'createCard': null,
            'clickCard': null
        };

        this.paginationContainer = document.querySelectorAll(this.opts.paginationClass);
        for (var i = 0; i < this.paginationContainer.length; i++) {
            this.paginationContainer[i].addEventListener('click', function (e) {

                if (e.target.parentNode.classList.contains('disabled')) {
                    return false;
                }

                //if ($(e.target).hasClass('page-span')) {
                //    return this;
                //}

                var targetPage = e.target.innerHTML - 0;

                if (e.target.classList.contains('prev')) {
                    targetPage = _this.opts.pager.current_page - 1;
                } else if (e.target.classList.contains('next')) {
                    targetPage = _this.opts.pager.current_page + 1;
                }

                // 同じページの場合は何もしない
                if (targetPage == _this.opts.pager.current_page) {
                    return _this;
                }

                if (Number.isInteger(targetPage)) {

                    // ページ移動
                    _this.opts.pager.current_page = targetPage;
                    _this.movePage();
                }
            });
        }
    }

    /**
     * ページ移動.
     */


    _createClass(Pagination, [{
        key: 'movePage',
        value: function movePage() {
            this.showPager();
            this.showItems(this.opts.pager.current_page);
        }
    }, {
        key: 'showPager',
        value: function showPager() {
            var opts = this.opts;

            var messageArea = document.querySelectorAll(opts.messageArea)[0];
            messageArea.classList.remove('show');

            // 現在のページャをいったん削除
            var pagination = document.querySelectorAll(opts.paginationClass)[0];
            pagination.innerHTML = "";

            var countArea = document.querySelectorAll(opts.pagerContainer + ' ' + opts.countArea)[0];
            countArea.innerHTML = "";

            // データがない場合は表示しない
            if (opts.pager.data_exists === true) {
                var paginationBox = this.setPaginationDisplays();

                // 前ページボタン
                //var tmp = $('<li>').append($('<a href=#>').addClass('prev').html('&laquo;')).attr('data-page', page);
                var tmp = document.createElement('li');
                var tmpA = document.createElement('a');
                tmpA.href = "#";
                tmpA.classList.add('prev');
                tmpA.innerHTML = "&laquo;";
                tmp.setAttribute('data-page', page);
                tmp.appendChild(tmpA);

                if (opts.pager.current_page == 1) {
                    tmp.classList.add('disabled');
                }
                pagination.appendChild(tmp);

                // ページャ表示
                for (var idx in paginationBox) {
                    var page = paginationBox[idx];

                    if (page !== false) {

                        var _tmp = document.createElement('li');
                        var _tmpA = document.createElement('a');
                        _tmpA.href = "#";
                        _tmpA.innerHTML = page;
                        _tmp.setAttribute('data-page', page);
                        _tmp.appendChild(_tmpA);
                        pagination.appendChild(_tmp);
                    } else {
                        //$('<li>').append(
                        //  $('<a href=#>').text('...').addClass('page-span')
                        //).appendTo('.pagination');

                        var _tmp2 = document.createElement('li');
                        var _tmpA2 = document.createElement('a');
                        _tmpA2.href = "#";
                        _tmpA2.innerHTML = '...';
                        _tmpA2.classList.add('page-span');
                        _tmp2.setAttribute('data-page', page);
                        _tmp2.appendChild(_tmpA2);
                        pagination.appendChild(_tmp2);
                    }
                }

                // 次ページボタン
                //tmp = $('<li>').append($('<a href=#>').addClass('next').html('&raquo;')).attr('data-page', page);
                tmp = document.createElement('li');
                tmpA = document.createElement('a');
                tmpA.href = "#";
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
                if (endCount > opts.datas.length) {
                    endCount = opts.datas.length;
                }

                countArea.innerHTML = startCount + ' \uFF5E ' + endCount + ' \u4EF6 / ' + opts.datas.length + ' \u4EF6\u4E2D';

                // activeページ設定
                //$(`.pagination li[data-page=${opts.pager.current_page}]`).addClass('active');
                var active = document.querySelectorAll("[data-page='" + opts.pager.current_page + "']")[0];
                active.classList.add('active');
            } else {

                // データがない場合
                $('#no-data-message').addClass('show');
            }

            return;
        }

        /**
         * バレット表示判別設定処理.
         */

    }, {
        key: 'setPaginationDisplays',
        value: function setPaginationDisplays() {

            var opts = this.opts;
            var paginationBox = [];

            //for (let i = 1; i < 10;  i++) {
            for (var i = 1; i <= opts.pager.bullet_count; i++) {

                // バレット数 >= ページ数ならそのまま
                if (opts.pager.bullet_count >= opts.pager.max_page) {
                    if (i <= opts.pager.max_page) {
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
                    if (opts.pager.current_page > opts.pager.max_page - 5) {
                        paginationBox.push(opts.pager.max_page - 1);
                    } else {
                        paginationBox.push(false);
                    }
                    continue;
                }

                // 3~のバレット
                if (i > 2 && i < opts.pager.bullet_count - 1) {
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

    }, {
        key: 'setDatas',
        value: function setDatas(datas, currentPage) {

            this.opts.datas = datas;

            this.opts.pager.data_exists = true;

            if (datas.length === 0) {
                this.opts.pager.data_exists = false;
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
    }, {
        key: 'clearResults',
        value: function clearResults() {
            $(this.opts.cardListArea).html('');
            $(this.opts.paginationClass).html('');
            $(this.opts.pagerContainer + ' ' + this.opts.countArea).html('');
        }
    }, {
        key: 'showItems',
        value: function showItems(page) {

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
            var cardListArea = document.querySelector(this.opts.cardListArea);
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

            return;
        }
    }, {
        key: 'setCreateCard',
        value: function setCreateCard(func) {
            this.opts.createCard = func;
            return this;
        }

        /**
         * 最小index、最大indexを設定.
         */

    }, {
        key: 'setIndexInfo',
        value: function setIndexInfo(page) {
            this.opts.pager.index.max = this.opts.page_per_count * page;
            return this.opts.pager.index.min = this.opts.pager.index.max - this.opts.page_per_count;
        }
    }, {
        key: 'getDataById',
        value: function getDataById(id) {

            for (var idx in this.opts.datas) {
                var data = this.opts.datas[idx];
                if (data.result_id == id) {
                    return this.opts.datas[idx];
                }
            }
            return null;
        }
    }]);

    return Pagination;
}();

exports.default = Pagination;

/***/ }),

/***/ "./src/js/example.js":
/*!***************************!*\
  !*** ./src/js/example.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Pagination = __webpack_require__(/*! ./Pagination */ "./src/js/Pagination.js");

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pagination = new _Pagination2.default();

var datas = [];

for (var i = 0; i < 200; i++) {
    datas.push({ id: i, name: "name" + i, score: i / 2 });
}

pagination.setCreateCard(function (data, idx) {
    var card = document.createElement('li');

    var name = document.createElement('span');
    name.innerHTML = data.name;

    var score = document.createElement('span');
    score.innerHTML = data.score;

    card.appendChild(name);
    card.appendChild(score);

    return card;
});

pagination.setDatas(datas).showItems();

/***/ })

/******/ });
//# sourceMappingURL=example.bundle.js.map