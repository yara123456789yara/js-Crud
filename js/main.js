let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create'
let tmp;

// console.log(title,price,taxes,ads,discount,total,count,category,submit);

//get total

    function getTotal(){
        if(price.value != ''){
            let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
            total.innerHTML = result;
            total.style.background = '#040'
        }else{
            total.innerHTML = '';
            total.style.background = '#a00'
        }
    }

//create product
    let proData;
    if(localStorage.product != null){
        proData = JSON.parse(localStorage.product)
    }else{
        proData=[];
    }
    submit.onclick = function() {
        let newPro = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value
        };
    
        if(title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100) {
            if (mood === 'create') {
                // تحقق مما إذا كانت الكمية أكبر من 1
                if (newPro.count > 1) {
                    for (let i = 0; i < newPro.count; i++) {
                        proData.push(newPro);
                    }
                } else {
                    proData.push(newPro);
                }
            } else {
                proData[tmp] = newPro;
                mood = 'create';
                submit.innerHTML = 'create';
                count.style.display = 'block';
            }
            
        clearData();
        }
        

        localStorage.setItem('product', JSON.stringify(proData));
        
        console.log(proData);
    
    
        readData();
    }
    

//save in localStorage
//clear inputs
     function clearData(){
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
       category.value = '';
     }
//read
        function readData(){
            getTotal();
            let table = '';
            for(let i = 0; i < proData.length; i++){
                table += ` 
                    <tr>
                        <td>${i+1}</td>
                        <td>${proData[i].title}</td>
                        <td>${proData[i].price}</td>
                        <td>${proData[i].taxes}</td>
                        <td>${proData[i].ads}</td>
                        <td>${proData[i].discount}</td>
                        <td>${proData[i].total}</td>
                        <td>${proData[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`
            }
            document.getElementById('tbody').innerHTML = table;
            let deleteAll = document.getElementById('deleteAll');
            if(proData.length > 0){
                deleteAll.innerHTML = `
                <button onclick="deleteAll()">Delete All (${proData.length})</button>
                `
            }else{
                deleteAll.innerHTML = '';
            }

                    
        }
        readData();
//count
//delete

function deleteData(i){
    proData.splice(i,1);
    localStorage.product = JSON.stringify(proData);
    readData();
}
function deleteAll(){
    localStorage.clear();
    proData.splice(0);
    readData();

}
//update

function updateData(i){
    title.value = proData[i].title;
    price.value = proData[i].price;
    taxes.value = proData[i].taxes;
    ads.value   = proData[i].ads;
    discount.value   = proData[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value   = proData[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })

}
//search
let searchMode = 'title';
function getSearchMood(id)
{
    let table ='';
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMode = 'title';
    }else{
        searchMode = 'category';
    }
    search.placeholder = 'search by ' + searchMode;
    search.focus();
    search.value = '';
    readData();
}

function searchData(value)
{
    let table = '';
    for (let i = 0; i < proData.length; i++){
if(searchMode == 'title'){
        if (proData[i].title.includes(value.toLowerCase())) {
            table += ` 
            <tr>
                <td>${i+1}</td>
                <td>${proData[i].title}</td>
                <td>${proData[i].price}</td>
                <td>${proData[i].taxes}</td>
                <td>${proData[i].ads}</td>
                <td>${proData[i].discount}</td>
                <td>${proData[i].total}</td>
                <td>${proData[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`
        }
        
    
}else{
     
        if (proData[i].category.includes(value.toLowerCase())) {
            table += ` 
            <tr>
                <td>${i+1}</td>
                <td>${proData[i].title}</td>
                <td>${proData[i].price}</td>
                <td>${proData[i].taxes}</td>
                <td>${proData[i].ads}</td>
                <td>${proData[i].discount}</td>
                <td>${proData[i].total}</td>
                <td>${proData[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`
        }
        
    }
    }
    document.getElementById('tbody').innerHTML = table;
}
//clean data