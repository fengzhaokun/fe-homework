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
        </div>';
    addWin.style.position = 'absolute';
    addWin.style.left = -5 + 'px';
    addWin.style.top = 53 + 'px';
    addWin.style.zIndex = '10001';
    console.log(e.target.offsetParent);
    console.log(e.srcElement.offsetParent);
    e.srcElement.offsetParent.appendChild(addWin);
    document.querySelector('.icon-close').addEventListener('click',function(e){
        e.stopPropagation();
        var win = document.getElementById('addWin');
        var mask = document.getElementById('mask');
        win.parentNode.removeChild(win);
        document.body.removeChild(mask);
    });
    document.getElementById('btn1').addEventListener('click',function(e){
        e.stopPropagation();
        var win = document.getElementById('addWin');
        var mask = document.getElementById('mask');
        var newNode = document.createElement('div');
        newNode.innerHTML ='<span class="resourceText">' + document.getElementById('input1').value + '</span><span class="icon-trash"></span>';
        newNode.classList.add('resource');
        win.parentNode.appendChild(newNode);
        win.parentNode.removeChild(win);
        document.body.removeChild(mask);

    });
    document.getElementById('btn2').addEventListener('click',function(e){
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
        var flag = document.getElementById('sidebar').style.display;
        if (flag == "none") {
            document.getElementById('sidebar').style.display = 'block';
        } else {
            document.getElementById('sidebar').style.display = 'none';
        }
    });



};
new App();