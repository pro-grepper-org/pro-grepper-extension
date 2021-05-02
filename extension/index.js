async function get_data(num_companies){
    //API_URL 
    const API_URL = 'https://apiforprogrepper.herokuapp.com/api/companies'

    // if the company tags div is already present
    if(document.getElementsByClassName('company-tags').length != 0){
        alert('Company Tags have been appended already at the bottom!')
        return;
    }

    // ========== FOR CODEFORCES ================
    if(location.hostname == "codeforces.com"){

        // if the current page doesn't have a problem-statement div
        if(document.getElementsByClassName('problem-statement').length == 0){
            alert('No problem statement found!')
            return;
        }

        //problem statement
        problem_statement = document.getElementsByClassName('problem-statement')[0].children[1].textContent;
        
        //tags
        var tags = document.getElementsByClassName('tag-box');
        var problem_statement_tags = []
        if(tags != null){
            for(let i=0;i<tags.length;i++){
                problem_statement_tags.push(tags[i].textContent);
            }
        }
        
        // request options
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                'problem-statement':problem_statement,
                'tags':problem_statement_tags,
                'num-companies':num_companies
            })
        };

        //request
        await fetch(API_URL, options)
        .then(response => response.json()) 
        .then(json => {
            if(json.success != "ok"){
                alert(json.message);
                return;
            }
            //companies and their probab
            let l = json['company_data']
            
            //append the companies
            let company_div = document.createElement('div')

            //add class for future redundant query
            company_div.classList.add('company-tags');

            //create header a.k.a the title
            company_div_header = document.createElement('div');
            company_div_header.innerHTML = "Company Tags:";
            company_div_header.style.fontSize == "115%";
            company_div_header.style.fontWeight = "700";
            company_div_header.style.marginBottom = "10px";
            company_div_header.style.padding = "5px";
            company_div.appendChild(company_div_header);
            
            //create company tag elements
            l.forEach(function(ele){
                let tag_span = document.createElement('span')
                tag_span.innerHTML = ele['name']
                tag_span.style.backgroundColor = '#f5334a';
                tag_span.style.color = 'white';
                tag_span.style.margin = '10px';
                tag_span.style.padding = '5px';
                tag_span.style.borderRadius = '5px';
                tag_span.style.fontSize = '20px';
                tag_span.style.opacity = Math.max(ele['probab'],0.3);
                company_div.appendChild(tag_span)
            })

            //append to the problem statement div at the bottom
            document.getElementsByClassName('problem-statement')[0].appendChild(company_div)
        }); 

        

    }else if(location.hostname == "www.codechef.com"){

        // if the current page doesn't have a problem-statement div
        if(document.getElementsByClassName('problem-statement').length == 0){
            alert('No problem statement found!')
            return;
        }

        //problem statement
        problem_statement_div = document.getElementsByClassName('problem-statement')[0].children;

        problem_statement = '';

        //after the first h3 break
        for(let i=1;i<problem_statement_div.length;i++){
            if(problem_statement_div[i].localName == 'h3')break;
            else{
                problem_statement += ' ';
                problem_statement += problem_statement_div[i].textContent;
            }
        }

        
        //tags
        var tags = document.getElementsByClassName('problem-tag-small');
        var problem_statement_tags = []
        if(tags != null){
            for(let i=0;i<tags.length;i++){
                problem_statement_tags.push(tags[i].textContent);
            }
        }
        
        // request options
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                'problem-statement':problem_statement,
                'tags':problem_statement_tags,
                'num-companies':num_companies
            })
        };

        //request
        await fetch(API_URL, options)
        .then(response => response.json()) 
        .then(json => {
            if(json.success != "ok"){
                alert(json.message);
                return;
            }
            //companies and their probab
            let l = json['company_data']
            
            //append the companies
            let company_div = document.createElement('div')

            //add class for future redundant query
            company_div.classList.add('company-tags');

            //create header a.k.a the title
            company_div_header = document.createElement('div');
            company_div_header.innerHTML = "Company Tags:";
            company_div_header.style.fontSize == "115%";
            company_div_header.style.fontWeight = "700";
            company_div_header.style.marginBottom = "10px";
            company_div_header.style.padding = "5px";
            company_div.appendChild(company_div_header);
            
            //create company tag elements
            l.forEach(function(ele){
                let tag_span = document.createElement('span')
                tag_span.innerHTML = ele['name']
                tag_span.style.backgroundColor = '#f5334a';
                tag_span.style.color = 'white';
                tag_span.style.margin = '5px';
                tag_span.style.padding = '5px';
                tag_span.style.borderRadius = '5px';
                tag_span.style.fontSize = '20px';
                tag_span.style.opacity = Math.max(ele['probab'],0.3);
                company_div.appendChild(tag_span)
            })

            //append to the problem statement div at the bottom
            document.getElementsByClassName('problem-statement')[0].appendChild(company_div)
        }); 


    }else{

        //if not codeforces or codechef
        alert('Support unavailable for this domain!');
    }
       
}

document.getElementById('get_tags').addEventListener('click',function(){
    var num_companies = Number.parseInt(document.getElementById('num_companies').value);

    chrome.tabs.executeScript(null, { code: '(' + get_data + ')('+num_companies+');' }, (results) => {
       
    });
})