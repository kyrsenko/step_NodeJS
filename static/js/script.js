console.log('conected')

document.body.addEventListener('click', (e)=> {
    const id = e.target.dataset.id
    console.log(e.target);
    if(e.target.classList.contains('add-field')){
        const ol = document.getElementById('list')
        ol.appendChild(addField())
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
        document.body.appendChild(addSpinner())
        setTimeout(()=>{
            window.location.href = "/"
        }, 500)
    }
    if(e.target.classList.contains('edit-list-btn')){
        changeFields(id)
    }
    if(e.target.classList.contains('save-list-btn')){
        editList(id)
        window.location.href = `/lists/${id}`
    }
})

function addField() {
    const li = document.createElement('li')
    li.classList = 'form-group  position-relative'
    li.innerHTML = `
        <input type="text" class="form-control pr-4" placeholder="enter some text" name="todo-text">
        <button type="button" class="close field-delete-btn" aria-label="Close">
                <span aria-hidden="true" class="field-delete p-2 d-block"></span>
        </button>`

        return li
}

async function createList(){

    let text = document.querySelectorAll('[name=todo-text]')

    text = [...text].reduce((acc, item) => {
        acc.push(item.value)
        return acc
    }, [])

    const data ={
        text: text
    }

    console.log(data);

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
        text = [...text].reduce((acc, item) => {
            acc.push(item.value)
            return acc
        }, [])
    
        const data ={
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
    const labels = document.querySelectorAll('.list-changing-label')
    const listWraper = document.querySelector('#list-view-wraper')
    const form = document.createElement('form')
    form.classList = 'col-md-10 mx-auto mt-4'
    const ol = document.querySelector('#list')
    ol.classList = ""
    labels.forEach(item =>{
        item.previousSibling.previousSibling.remove();
        const li = item.parentNode
        li.classList = 'form-group  position-relative'
        li.innerHTML = `
        <input type="text" class="form-control pr-4" placeholder="enter some text" name="todo-text" value=${item.innerText}>
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
    saveBtn.classList = 'save-list-btn btn btn-dark fixed-bottom w-100'
    saveBtn.innerText = 'save'
    editBtn.parentNode.replaceChild(saveBtn, editBtn)

    const addBtn = document.createElement('button')
    addBtn.setAttribute('type', 'button')
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