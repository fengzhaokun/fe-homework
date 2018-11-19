import './components/common/css/fonts.css';
import './components/common/css/style.css';
import history from './components/common/js/history.js';
import tab from './components/common/js/tab.js';

class App {
    constructor() {
        this.init();
    }
    init() {
        //初始化页面数据
        let historyUL = document.querySelector('.history ul'),
            tabContent = document.querySelector('.tabContentDiv');

        historyUL.appendChild(history());
        tabContent.innerHTML = tab();

        //绑定添加资源的click事件
        let elements = document.querySelectorAll('.icon-plus');
        for (let element of elements) {
            if (element.addEventListener) {
                element.addEventListener('click', this.addResource);
            } else {
                element.attachEvent('onclick', this.addResource);
            }

        }
        //绑定删除资源的click事件
        let delIcons = document.querySelectorAll('.icon-trash');
        for (let delIcon of delIcons) {
            if (delIcon.addEventListener) {
                delIcon.addEventListener('click', this.deleteResource);
            } else {
                delIcon.attachEvent('onclick', this.deleteResource);
            }

        }
        //绑定退出click事件
        let setting = document.querySelector('.icon-angle-down');
        if (setting.addEventListener) {
            setting.addEventListener('click', this.showSetting);
        } else {
            setting.attachEvent('onclick', this.showSetting);
        }
        //绑定侧边栏显示click事件
        let navicon = document.querySelector('.icon-navicon');
        if (navicon.addEventListener) {
            navicon.addEventListener('click', this.showSidebar);
        } else {
            navicon.attachEvent('onclick', this.showSidebar);
        }
        //设置侧边栏与内容显示区高度保持一致
        document.getElementById('sidebar').style.height = document.getElementById('content').offsetHeight + 'px';
    }
    addResource(e) {
        //创建遮罩层
        let mask = document.createElement('div'),
            sHeight = document.documentElement.scrollHeight,
            sWidth = document.documentElement.scrollWidth;

        mask.style.height = sHeight + 'px';
        mask.style.width = sWidth + 'px';
        mask.style.display = 'block';
        mask.id = 'mask';
        document.body.appendChild(mask);
        //创建弹窗
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
        addWin.style.position = 'absolute';
        addWin.style.zIndex = '10001';
        let element = e.target || e.srcElement;
        element.offsetParent.appendChild(addWin);
        //设置弹窗显示位置
        if (window.screen.height - element.offsetParent.offsetParent.offsetTop - element.offsetParent.offsetParent.offsetParent.offsetTop < 160) {
            document.getElementById('addWin').style.left = -5 + 'px';
            document.getElementById('addWin').style.top = -170 + 'px';
            document.querySelector('.icon-win .icon-angle-down').style.display = 'block';
        } else {
            document.getElementById('addWin').style.left = -5 + 'px';
            document.getElementById('addWin').style.top = 53 + 'px';
            document.querySelector('.icon-win .icon-angle-up').style.display = 'block';
        }
        //屏幕可视区域小于570px时针对弹窗进行处理
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
            if (window.screen.height - element.offsetParent.offsetParent.offsetTop - element.offsetParent.offsetParent.offsetParent.offsetTop < 160) {
                document.getElementById('addWin').style.left = -15 + 'px';
                document.getElementById('addWin').style.top = -170 + 'px';
            }
        }
        //当添加资源时动态调整父容器的高度
        if (element.offsetParent.offsetParent.offsetHeight > element.offsetParent.offsetParent.offsetParent.offsetHeight) {
            var itemId = element.offsetParent.offsetParent.offsetParent.id;
            document.getElementById(itemId).style.height = (element.offsetParent.offsetParent.offsetHeight + 20) + 'px';
            document.getElementById(itemId).querySelector('.line2').style.height = element.offsetParent.offsetParent.scrollHeight + 'px';

        }
        //给窗口绑定关闭的click事件
        let close = document.querySelector('.icon-close');
        if (close.addEventListener) {
            close.addEventListener('click', function (e) {
                e.stopPropagation();
                let win = document.getElementById('addWin'),
                    mask = document.getElementById('mask');
                win.parentNode.removeChild(win);
                document.body.removeChild(mask);
            });
        } else {
            close.attachEvent('onclick', function (e) {
                e.stopPropagation();
                let win = document.getElementById('addWin'),
                    mask = document.getElementById('mask');
                win.parentNode.removeChild(win);
                document.body.removeChild(mask);
            });

        }

        //给按钮绑定click事件
        let btn1 = document.getElementById('btn1'),
            btn2 = document.getElementById('btn2');
        if (btn1.addEventListener || btn2.addEventListener) {
            btn1.addEventListener('click', function (e) {
                e.stopPropagation();
                let win = document.getElementById('addWin'),
                    mask = document.getElementById('mask'),
                    newNode = document.createElement('div');
                newNode.innerHTML = '<span class="resourceText">' + document.getElementById('input1').value + '</span><span class="icon-trash"></span>';
                newNode.classList.add('resource');
                win.parentNode.appendChild(newNode);
                //给新增的资源绑定删除资源的click事件
                let resources = win.parentNode.querySelectorAll('.icon-trash');
                for (let resource of resources) {

                    if (resource.addEventListener) {
                        resource.addEventListener('click', function (e) {
                            e.stopPropagation();
                            let ele =  e.target || e.srcElement;
                            let parentNode = ele.parentNode.parentNode;
                            parentNode.removeChild(ele.parentNode);
                        });
                    } else {
                        resource.attachEvent('onclick', function (e) {
                            e.stopPropagation();
                            let ele =  e.target || e.srcElement;
                            let parentNode = ele.parentNode.parentNode;
                            parentNode.removeChild(ele.parentNode);
                        });
                    }

                }
                win.parentNode.removeChild(win);
                document.body.removeChild(mask);


            });
            btn2.addEventListener('click', function (e) {
                e.stopPropagation();
                let win = document.getElementById('addWin'),
                    mask = document.getElementById('mask');
                win.parentNode.removeChild(win);
                document.body.removeChild(mask);

            });
        } else {
            btn1.attachEvent('onclick', function (e) {
                e.stopPropagation();
                let win = document.getElementById('addWin'),
                    mask = document.getElementById('mask'),
                    newNode = document.createElement('div');
                newNode.innerHTML = '<span class="resourceText">' + document.getElementById('input1').value + '</span><span class="icon-trash"></span>';
                newNode.classList.add('resource');
                win.parentNode.appendChild(newNode);
                win.parentNode.removeChild(win);
                document.body.removeChild(mask);

            });
            btn2.attachEvent('onclick', function (e) {
                e.stopPropagation();
                let win = document.getElementById('addWin'),
                    mask = document.getElementById('mask');
                win.parentNode.removeChild(win);
                document.body.removeChild(mask);

            });

        }


    }
    deleteResource(e) {
        e.stopPropagation();
        let parentNode = e.target.parentNode.parentNode;
        parentNode.removeChild(e.target.parentNode);
    }
    showSetting(e) {
        e.stopPropagation();
        let setting = document.querySelector('.setting');
        if (setting.style.display == 'none') {
            setting.style.display = 'block';
        } else {
            setting.style.display = 'none';
        }
    }
    showSidebar(e) {
        e.stopPropagation();
        //侧边栏与内容区高度保持一致
        document.getElementById('sidebar').style.height = document.getElementById('content').offsetHeight + 'px';

        let sidebar = document.getElementById('sidebar');
        if (sidebar.style.display == "none") {
            sidebar.style.display = 'block';
        } else {
            sidebar.style.display = 'none';
        }
    }
}
new App();