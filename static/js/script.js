console.log('conected')

document.body.addEventListener('click',async (e)=> {
    const id = e.target.dataset.id
    console.log(e.target);
    if(e.target.classList.contains('add-field')){
        const ol = document.getElementById('list')
        ol.appendChild(addField(e.target.dataset.type))
    }
    if(e.target.classList.contains('field-delete')){
        console.log(e.target.parentNode);
        e.target.parentNode.parentNode.remove()
    }
    if(e.target.classList.contains('create-list-btn')){
        createList()
        document.body.appendChild(addSpinner())
        setTimeout(()=>{
            window.location.href = "/"
        },500)
    }
    if(e.target.classList.contains('view-list-btn')){
        window.location.href = `/lists/${id}`
    }
    if(e.target.classList.contains('delete-list-btn')){
        deleteList(id)
        window.location.href = "/"

    }
    if(e.target.classList.contains('edit-list-btn')){
        changeFields(id)
    }
    if(e.target.classList.contains('save-list-btn')){
        editList(id)
        document.body.appendChild(addSpinner())
        setTimeout(()=>{
            window.location.href = `/lists/${id}`
        }, 500)
    }
    if(e.target.classList.contains('status-check')){
        console.log(e.target);
        if(e.target.checked){
            e.target.parentNode.setAttribute("data-status", "finished")
        }
        else{
            e.target.parentNode.setAttribute("data-status", "inprogress")
            e.target.checked = false
        }
    } 
})

function addField(btnType) {
    const li = document.createElement('li')
    li.classList = 'form-group  position-relative'
    li.setAttribute('data-status', "inprogress")
    if(btnType === "add-field-create"){
        li.innerHTML = `
        <input type="text" class="form-control pr-4 " placeholder="enter some text" name="todo-text">
        <button type="button" class="close field-delete-btn" aria-label="Close">
                <span aria-hidden="true" class="field-delete p-2 d-block"></span>
        </button>`
    } else{
    li.innerHTML = `
        <input type="checkbox" class="form-check-input status-check">
        <input type="text" class="form-control pr-4" placeholder="enter some text" name="todo-text">
        <button type="button" class="close field-delete-btn" aria-label="Close">
                <span aria-hidden="true" class="field-delete p-2 d-block"></span>
        </button>`
    }
        return li
}

async function createList(){

    let text = document.querySelectorAll('[name=todo-text]')
    let title = document.querySelector('[name=todo-title]')

    text = [...text].reduce((acc, item) => {
        acc.push({text:item.value,
            status:item.dataset.status
        })
        return acc
    }, [])

    const data ={
        title: title.value,
        text: text
    }

   await fetch("/api/lists", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
}

async function editList(id){
    try {
        
        let text = document.querySelectorAll('[name=todo-text]')
        let title = document.querySelector('[name=todo-title]')

        text = [...text].reduce((acc, item) => {
            acc.push({text:item.value,
                status:item.parentNode.dataset.status
            })
            return acc
        }, [])

        const data ={
            title: title.value,
            text: text
        }

        await fetch(`/api/lists/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
    
    } catch (error) {
        console.log(error);
    }
}

async function deleteList(id){
    try {
        const data = {
            id: id
        }
    
        await fetch(`/api/lists/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error);
    }
}

function changeFields(id){

    const spans = document.querySelectorAll('.list-changing-span')
    const listWraper = document.querySelector('#list-view-wraper')
    const form = document.createElement('form')
    form.classList = 'col-md-10 mx-auto mt-4'
    const ol = document.querySelector('#list')
    ol.classList = ""

    const title = document.querySelector('.card-title')
    const inputTitle = document.createElement('input')
    inputTitle.setAttribute("name", "todo-title")
    inputTitle.classList = "form-control pr-4 my-4"
    inputTitle.placeholder = "title"
    if(title){
    inputTitle.value = title.innerText
    title.remove()
    }
    form.appendChild( inputTitle)

    spans.forEach(item =>{
        const li = item.parentNode
        
        let status
        if(li.dataset.status === "finished"){
            status = "checked"
        } else{
            status = ""
        }

        li.classList = 'form-group  position-relative'
        li.innerHTML = `
        <input type="checkbox" class="form-check-input status-check position-absolute" ${status}>
        <input type="text" class="form-control pr-5" placeholder="enter some text" name="todo-text" value=${item.innerText}>
        <button type="button" class="close field-delete-btn" aria-label="Close">
                <span aria-hidden="true" class="field-delete p-2 d-block"></span>
        </button>`

        item.remove() 
    })
    const editBtn = document.getElementById('edit-list-btn')
    console.log(editBtn);
    const saveBtn = document.createElement('button')
    saveBtn.setAttribute('data-id', id)
    saveBtn.setAttribute('type', "button")
    saveBtn.classList = 'save-list-btn btn btn-dark fixed-bottom w-100 py-3'
    saveBtn.innerText = 'save'
    editBtn.parentNode.replaceChild(saveBtn, editBtn)

    const addBtn = document.createElement('button')
    addBtn.setAttribute('type', 'button')
    addBtn.setAttribute('data-type', 'add-field-edit')
    addBtn.classList = 'btn  add-field align-self-start position-absolute p-3'

    form.appendChild(ol)

    listWraper.insertBefore(form, saveBtn)
    listWraper.insertBefore(addBtn, form)
}



function addSpinner() {
    const spinnerWrapper = document.createElement('div')
    const spinner = `
    <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
    </div>`
    spinnerWrapper.classList = `fixed-top fixed-bottom d-flex justify-content-center align-items-center`
    spinnerWrapper.style.backgroundColor = 'rgba(0,0,0,0.2)'
    spinnerWrapper.innerHTML = spinner
    return spinnerWrapper
}

