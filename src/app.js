import './components/common/css/fonts.css';
import './components/common/css/style.css';
import history from './components/common/js/history.js';
import tab from './components/common/js/tab.js';
function addResource(e) {
    let mask = document.createElement('div'),
        sHeight = document.documentElement.scrollHeight,
        sWidth = document.documentElement.scrollWidth;

    mask.style.height = sHeight + 'px';
    mask.style.width = sWidth + 'px';
    mask.style.display = 'block';
    mask.id = 'mask';
    document.body.appendChild(mask);
    let addWin = document.createElement('div');
    addWin.style.display = 'block';
    addWin.id = 'addWin';
    addWin.innerHTML = '<div class="icon-win">\
            <div class="icon-angle-up"></div>\
            <div class="icon-close"> </div>\
            <div>\
                <p>Separate multiple resource name with commas</p>\
                <input id="input1" type="text" placeholder="e.g. Chrome,Firefox" value="" required=true />\
            </div>\
            <div>\
                <input id="btn1" type="button" value="Add Resouces" />\
                <input id="btn2" type="button" value="Cancel">\
            </div>\
            <div class="icon-angle-down"></div>\
        </div>';
    console.log(e.target.offsetParent.offsetHeight);
    console.log(document.body.clientHeight);
    console.log(window.screen.height);
    addWin.style.position = 'absolute';
    addWin.style.zIndex = '10001';
    e.srcElement.offsetParent.appendChild(addWin);
    if (window.screen.height - e.target.offsetParent.offsetParent.offsetTop - e.target.offsetParent.offsetParent.offsetParent.offsetTop < 160) {
        document.getElementById('addWin').style.left = -5 + 'px';
        document.getElementById('addWin').style.top = -170 + 'px';
        document.querySelector('.icon-win .icon-angle-down').style.display = 'block';
    } else {
        document.getElementById('addWin').style.left = -5 + 'px';
        document.getElementById('addWin').style.top = 53 + 'px';
        document.querySelector('.icon-win .icon-angle-up').style.display = 'block';
    }

    if (window.screen.width < 570) {
        document.getElementById('addWin').style.width = (window.screen.width - 20) + 'px';
        document.querySelector('.icon-win').style.width = (window.screen.width - 30) + 'px';
        document.getElementById('input1').style.width = (window.screen.width - 50) + 'px';
        document.getElementById('input1').style.marginLeft = '10px';
        document.getElementById('input1').style.marginRight = '10px';
        document.getElementById('btn2').style.display = 'none';
        document.getElementById('btn1').style.width = (window.screen.width - 45) + 'px';
        document.getElementById('btn1').style.marginLeft = '10px';
        document.getElementById('btn1').style.marginRight = '10px';
        document.querySelector('.icon-win .icon-angle-up').style.display = 'none';
        document.querySelector('.icon-win .icon-angle-down').style.display = 'none';
        document.getElementById('addWin').style.left = -15 + 'px';
        document.getElementById('addWin').style.top = 53 + 'px';
        if (window.screen.height - e.target.offsetParent.offsetParent.offsetTop - e.target.offsetParent.offsetParent.offsetParent.offsetTop < 160) {
            document.getElementById('addWin').style.left = -15 + 'px';
            document.getElementById('addWin').style.top = -170 + 'px';
        }
    }
    if (e.target.offsetParent.offsetParent.offsetHeight > e.target.offsetParent.offsetParent.offsetParent.offsetHeight) {
        var itemId = e.target.offsetParent.offsetParent.offsetParent.id;
        document.getElementById(itemId).style.height = (e.target.offsetParent.offsetParent.offsetHeight + 20) + 'px';
        document.getElementById(itemId).querySelector('.line2').style.height = e.target.offsetParent.offsetParent.scrollHeight + 'px';

    }

    document.querySelector('.icon-close').addEventListener('click', function (e) {
        e.stopPropagation();
        var win = document.getElementById('addWin');
        var mask = document.getElementById('mask');
        win.parentNode.removeChild(win);
        document.body.removeChild(mask);
    });
    document.getElementById('btn1').addEventListener('click', function (e) {
        e.stopPropagation();
        var win = document.getElementById('addWin');
        var mask = document.getElementById('mask');
        var newNode = document.createElement('div');
        newNode.innerHTML = '<span class="resourceText">' + document.getElementById('input1').value + '</span><span class="icon-trash"></span>';
        newNode.classList.add('resource');
        win.parentNode.appendChild(newNode);
        win.parentNode.removeChild(win);
        document.body.removeChild(mask);

    });
    document.getElementById('btn2').addEventListener('click', function (e) {
        e.stopPropagation();
        var win = document.getElementById('addWin');
        var mask = document.getElementById('mask');
        win.parentNode.removeChild(win);
        document.body.removeChild(mask);

    });


}
function deleteResource(e) {
    e.stopPropagation();
    var parentNode = e.target.parentNode.parentNode;
    parentNode.removeChild(e.target.parentNode);
}
const App = function () {

    let historyUL = document.querySelector('.history ul'),
        tabContent = document.querySelector('.tabContentDiv');

    historyUL.appendChild(history());
    tabContent.innerHTML = tab();
    let elements = document.querySelectorAll('.icon-plus');
    for (let element of elements) {
        element.addEventListener('click', addResource);
    }
    let delIcons = document.querySelectorAll('.icon-trash');
    for (let delIcon of delIcons) {
        delIcon.addEventListener('click', deleteResource);
    }
    document.querySelector('.icon-angle-down').addEventListener('click', function (e) {
        e.stopPropagation();
        var flag = document.querySelector('.setting').style.display;
        if (flag == 'none') {
            document.querySelector('.setting').style.display = 'block';
        } else {
            document.querySelector('.setting').style.display = 'none'
        }
        ;
    });
    document.querySelector('.icon-navicon').addEventListener('click', function (e) {
        e.stopPropagation();
        document.getElementById('sidebar').style.height = document.getElementById('content').offsetHeight + 'px';
        var flag = document.getElementById('sidebar').style.display;
        if (flag == "none") {
            document.getElementById('sidebar').style.display = 'block';
        } else {
            document.getElementById('sidebar').style.display = 'none';
        }
    });
    document.getElementById('sidebar').style.height = document.getElementById('content').offsetHeight + 'px';



};
new App();