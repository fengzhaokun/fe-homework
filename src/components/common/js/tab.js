import tab from "../config/tab.json";

const template1 = data => `<div id="${data.id}"class="item">
    <div class="icon-${data.os}"></div>
    <div class="item-right">
        <div class="line1">
            <div class="agent-site"><span class="icon-desktop"></span> <a>${data.site}</a></div>
            <div class="agent-status agent-status-${data.status}">${data.status}</div>
            <div class="agent-ip"><span class="icon-info"></span><a>${data.ip}</a></div>
            <div class="agent-folder"><span class="icon-folder"></span><a>${data.folder}</a></div>
        </div>
        <div class="line2">
        <div class="icon-plus"></div>
        ${data.resources.map(resource => `<div class="resource"><span class="resourceText">${resource}</span><span class="icon-trash" ></span></div>`).join('')}
    </div>
</div>
</div>`;
const template2 = data => `<div id="${data.id}" class="item">
    <div class="icon-${data.os}"></div>
    <div class="item-right">
        <div class="line1">
            <div class="agent-site"><span class="icon-desktop"></span> <a>${data.site}</a></div>
            <div class="agent-status agent-status-${data.status}">${data.status}</div>
            <div class="agent-ip"><span class="icon-info"></span><a>${data.ip}</a></div>
            <div class="agent-folder"><span class="icon-folder"></span><a>${data.folder}</a></div>
        </div>
        <div class="line2">
        <div class="icon-plus"></div>
        ${data.resources.map(resource => `<div class="resource"><span class="resourceText">${resource}</span><span class="icon-trash"></span></div>`).join('')}
        <div class="denyBtn"><span class="icon-deny"></span>Deny</div>
    </div>
</div>
</div>`;

export default function(){
    let fragment = [];
    for( let data of tab.datas){
        if(data.status == "idle"){
            fragment.push(template1(data));
        }else{
            fragment.push(template2(data));
        }
         
    }
    return fragment.join('');
}
