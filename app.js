function get_data(){
    let l = [{'name':'amazon','probab':0.9},{'name':'google','probab':0.7}];
    let new_div = document.createElement('div')
    l.forEach(function(ele){
        let new_span = document.createElement('span')
        new_span.innerHTML = ele['name']
        new_span.style.backgroundColor = 'red';
        new_span.style.color = 'white';
        new_span.style.margin = '5px';
        new_span.style.padding = '5px';
        new_span.style.borderRadius = '5px';
        new_span.style.fontSize = '20px';
        new_div.appendChild(new_span)
    })
    document.getElementsByClassName('problem-statement')[0].appendChild(new_div)
}
document.getElementById('get_tags').addEventListener('click',function(){
    chrome.tabs.executeScript(null, { code: '(' + get_data + ')();' }, (results) => {
       
    });
})