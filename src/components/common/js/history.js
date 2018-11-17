import historyRecords from "../config/history.json"
export default function(){
    let fragmnet = document.createDocumentFragment();
    for(let record of historyRecords.records){
        
        let li = document.createElement('li');
        li.innerText = record;
        fragmnet.appendChild(li);
    }
    return fragmnet;
}