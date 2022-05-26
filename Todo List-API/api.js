var apiLink = 'https://tony-json-server.herokuapp.com/api/todos';


//get data
function getData(){
    displayLoading()
    fetch(apiLink)
        .then(res => res.json())
        .then(function(data){
            const values = data.data
            hideLoading()
            renderData(values)
        })
}
getData()


//post data

var createBtn = document.getElementById('create')
    createBtn.addEventListener('click',function(event){
        event.preventDefault()
        const description = document.getElementById('description').value
        const author = document.getElementById('author').value
        const severity = document.getElementById('severity-option').value
    
            const formData = {
                description: description,
                author: author,
                id: Date.now(),
                severity: severity,
                status: 'open'
            }
                createData(formData)
        })  


//create data
function createData(formData){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }
    fetch(apiLink, options) 
        .then(() => getData())
}


//render
function renderData(values){
    const issueList = document.getElementById('issueList')
    const htmls = values.map(function(value){
        return `<div class="card ">
        <div class="card-header">
            <span id="id-number">${value.id}</span>
            <span class="status status-${value.id}">${value.status}</span>
        </div>
        <div class="card-body">
            <h5 class="card-title description-${value.id}">${value.description}</h5>
            <h5 class="card-title card-author author-${value.id}">${value.author}</h5>
            <p class="card-text">
                <span class="recommend severity-${value.id}">${value.severity}</span>
            </p>
            <div class="controlBtn">
                <button id = "btnClose" class="add-button" type = "button" onclick = closeToDo("${value.id}")>Close</button>
                <button id = "btnDelete" class="add-button" type = "button" onclick = deleteTodo("${value.id}")>Delete</button> 
                <button id = "btnEdit" class="add-button" type = "button" onclick = editTodo("${value.id}")>Edit</button>
            </div>
    
        </div>
    
    </div>`
    })
    issueList.innerHTML = htmls.join('')
}   


//delete data
function deleteTodo(id){
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(apiLink + '/' + id, options)
        .then(() => getData(renderData))
}

//edit

function editTodo(id){
    const addModel = document.querySelector('.model')
    addModel.classList.remove("model-show")


    const descriptionText = document.querySelector('.description-'+id).textContent
    const authorText = document.querySelector('.author-'+id).textContent
    const severityText = document.querySelector('.severity-'+id).textContent
    
    const description = document.querySelector('#description-model')
    const author = document.querySelector('#author-model')
    const severity = document.querySelector('#severity-option-model')

    description.value = descriptionText;
    author.value = authorText;
    severity.value = severityText;
    if(!id) return ;
        btnUpdate = document.getElementById('btnUpdate-model')
        btnUpdate.onclick = function(e){
//click on update to remove model            
            e.preventDefault()
            const removeModel = document.querySelector('.model')
            removeModel.classList.add("model-show")
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'   
                },
                body: JSON.stringify({
                    description: description.value,
                    author: author.value,
                    status: 'open',
                    severity: severity.value
                })
            }
            fetch(apiLink + '/' + id, options)
                .then(() => getData(renderData))
        }

}




//remove model-form
function deleteModel(){
    const removeModel = document.querySelector('.model')
    removeModel.classList.add("model-show")
}

//search 
search.addEventListener('submit',function(event){
    event.preventDefault()
    const keyword = document.getElementById('search-form').value.toLowerCase()
        fetch(apiLink)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                const values = data.data
                let newList = [...values]
                let searchedList = newList.filter(item => item.description.toLowerCase().includes(keyword))
                renderData(searchedList)
            })
    
})


//filter
document.querySelectorAll('.button').forEach(button=>{
    button.addEventListener('click',() =>{
            fetch(apiLink)
                .then(function(response){
                    return response.json()
                })
                .then(function(data){
                    const values = data.data
                    let newList = [...values]
                    let value = button.value
                    if(value == 'all'){
                        renderData(values)
                    } else {
                    let filterList = newList.filter(item =>item.status == value)
                    renderData(filterList)
                    }

                })
    })
})

//close
function closeToDo(id){
    const newStatus = document.querySelector('.status-'+id).textContent

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'   
        },
        body: JSON.stringify({
            status: newStatus = (newStatus == 'open'? 'close' :'open')          
        })
    }
    fetch(apiLink + '/' + id, options)
        .then(() => getData(renderData))
}

//sort

const sort = document.getElementById('order-by')
sort.addEventListener('change',function(event){
    event.preventDefault()
        fetch(apiLink)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                const values = data.data
                const sortValue = Number(sort.value)
                const sortDescription = [...values]
                sortDescription.sort(function( a, b){
                    if(a.description > b.description) return sortValue
                    if(a.description < b.description) return -sortValue
                    return 0
                })
                renderData(sortDescription)
            })
})

//display loading
function displayLoading(){
    const loadingIcon = document.querySelector('.loadingIcon')
    loadingIcon.classList.remove('display')
}
//show loading
function hideLoading(){
    const loadingIcon = document.querySelector('.loadingIcon')
    loadingIcon.classList.add('display')
}

