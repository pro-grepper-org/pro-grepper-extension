import axios from "axios";
const API_URL = 'https://apiforprogrepper.herokuapp.com/api/companies'

async function get_data(){
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
        problem_statement = document.getElementsByClassName('problem-statement')[0][1];
        
        //tags
        var tags = document.getElementsByClassName('tag-box');
        var problem_statement_tags = []
        if(tags != null){
            tags.forEach(function(tag){
                problem_statement_tags.append(tag.innerHTML);
            })
        }

        // fetch the companies by sending problem statement and tags
        const response = await axios.post(API_URL,{
            'problem-statement':problem_statement,
            'tags':problem_statement_tags
        })

        // show reason of failure and return
        if(response.success != "ok"){
            alert(response.message);
            return;
        }

        //companies and their probab
        let l = response['company_data']
        
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
            tag_span.style.opacity = ele['probab'];
            company_div.appendChild(tag_span)
        })

        //append to the problem statement div at the bottom
        document.getElementsByClassName('problem-statement')[0].appendChild(company_div)

    }else if(location.hostname == "codechef.com"){

    }else{

        //if not codeforces or codechef
        alert('Support unavailable for this domain!');
    }
    

    
}
document.getElementById('get_tags').addEventListener('click',function(){
    chrome.tabs.executeScript(null, { code: '(' + get_data + ')();' }, (results) => {
       
    });
})