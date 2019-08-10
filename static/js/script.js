document.body.addEventListener('click', async (e) => {
    const id = e.target.dataset.id
    if (e.target.classList.contains('add-field')) {
        const form = document.getElementById('list')
        form.appendChild(addField(e.target.dataset.type))
    }
    if (e.target.classList.contains('field-delete')) {
        e.target.parentNode.parentNode.remove()
    }
    if (e.target.classList.contains('create-list-btn')) {
        createList()
        document.body.appendChild(addSpinner())
        setTimeout(() => {
            window.location.href = "/"
        }, 500)
    }

    if (e.target.classList.contains('note-create-btn')) {
        createNote()
        document.body.appendChild(addSpinner())
        setTimeout(() => {
            window.location.href = "/"
        }, 500)
    }

    if (e.target.classList.contains('view-list-btn')) {
        window.location.href = `/lists/${id}`
    }
    if (e.target.classList.contains('delete-list-btn')) {
        deleteList(id)
        window.location.href = "/"

    }
    if (e.target.classList.contains('edit-list-btn')) {
        changeFields(id)
    }
    if (e.target.classList.contains('save-list-btn')) {
        editList(id)
        document.body.appendChild(addSpinner())
        setTimeout(() => {
            window.location.href = `/lists/${id}`
        }, 500)
    }
    if (e.target.classList.contains('status-check')) {
        if (e.target.checked) {
            e.target.parentNode.parentNode.setAttribute("data-status", "finished")
        } else {
            e.target.parentNode.parentNode.setAttribute("data-status", "inprogress")
            e.target.checked = false
        }
    }
    if (e.target.classList.contains('note-view-btn')) {
        window.location.href = `/notes/${id}`
    }
    if (e.target.classList.contains('note-delete-btn')) {
        deleteNote(id)
        window.location.href = '/'
    }
    if (e.target.classList.contains('edit-note-btn')) {
        replaceFieldsNote(id)
    }
    if (e.target.classList.contains('save-note-btn')) {
        editNote(id)
        document.body.appendChild(addSpinner())
        setTimeout(() => {
            window.location.href = `/notes/${id}`
        }, 500)
    }
})

function addField(btnType) {
    const div = document.createElement('div')
    div.classList = 'input-group mb-3'
    div.setAttribute('data-status', "inprogress")
    if (btnType === "add-field-create") {
        div.innerHTML = `
            <input type="text" class="form-control" placeholder="text" aria-label="Recipient's username" name="todo-text">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary field-delete" type="button"></button>
          </div>`
    } else {
        div.innerHTML = `
        <div class="input-group-prepend">
        <div class="input-group-text">
        <input type="checkbox" class="status-check" aria-label="Checkbox for following text input">
        </div>
    </div>
    <input type="text" class="form-control" placeholder="text" aria-label="Text input with checkbox" name="todo-text">
    <div class="input-group-append">
        <button class="btn btn-outline-secondary field-delete" type="button"></button>
        </div>`
    }
    return div
}

async function createList() {
    try {
        let text = document.querySelectorAll('[name=todo-text]')
        let title = document.querySelector('[name=todo-title]')

        text = [...text].reduce((acc, item) => {
            acc.push({
                text: item.value,
                status: item.dataset.status
            })
            return acc
        }, [])

        const data = {
            title: title.value,
            text: text
        }

        await fetch("/api/lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
    }

}

async function editList(id) {
    try {

        let text = document.querySelectorAll('[name=todo-text]')
        let title = document.querySelector('[name=todo-title]')

        text = [...text].reduce((acc, item) => {
            acc.push({
                text: item.value,
                status: item.parentNode.dataset.status
            })
            return acc
        }, [])

        const data = {
            title: title.value,
            text: text
        }

        await fetch(`/api/lists/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

    } catch (error) {
        console.log(error);
    }
}

async function deleteList(id) {
    try {
        const data = {
            id: id
        }

        await fetch(`/api/lists/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

    } catch (error) {
        console.log(error)
    }
}

async function createNote() {
    try {
        const title = document.querySelector('[name=note-title]')
        const text = document.querySelector('[name=note-text]')
        const data = {
            title: title.value,
            text: text.value
        }
        await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    } catch (error) {
        console.log(error)
    }
}

async function deleteNote(id) {
    try {
        let data = {
            id: id
        }
        await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
    }
}

async function editNote(id) {
    try {
        const title = document.querySelector('[name=note-title]')
        const text = document.querySelector('[name=note-text]')
        const data = {
            title: title.value,
            text: text.value,
            _id: id
        }
        await fetch(`/api/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    } catch (error) {
        console.log(error)
    }
}


function changeFields(id) {
    const spans = document.querySelectorAll('.list-changing-span')
    const listWraper = document.querySelector('#list-view-wraper')
    const addBtn = document.createElement('button')
    addBtn.setAttribute('type', 'button')
    addBtn.setAttribute('data-type', 'add-field-edit')
    addBtn.classList = 'btn  add-field align-self-start position-absolute p-3 ml-2'

    const form = document.createElement('form')
    form.id = "list"
    form.classList = 'col-12 mx-auto my-5'

    const title = document.querySelector('.card-title')
    const inputTitle = document.createElement('input')
    inputTitle.setAttribute("name", "todo-title")
    inputTitle.setAttribute("type", "text")
    inputTitle.classList = "form-control mb-3"
    inputTitle.placeholder = "title"
    if (title) {
        inputTitle.value = title.innerText
        title.remove()
    }
    form.appendChild(inputTitle)

    spans.forEach(item => {
        const li = item.parentNode
        const div = document.createElement('div')

        let status
        if (li.dataset.status === "finished") {
            div.setAttribute('data-status', "finished")
            status = "checked"
        } else {
            div.setAttribute('data-status', "inprogress")
            status = ""
        }

        div.classList = 'input-group-prepend mb-3'
        div.innerHTML =
            `<div class="input-group-text">
        <input type="checkbox" class="status-check" aria-label="Checkbox for following text input" ${status}>
        </div>
    </div>
    <input type="text" class="form-control" placeholder="text" aria-label="Text input with checkbox" name="todo-text" value="${item.innerText}">
    <div class="input-group-append">
        <button class="btn btn-outline-secondary field-delete" type="button"></button>
        `

        form.appendChild(div)
        item.remove()
    })
    const editBtn = document.getElementById('edit-list-btn')
    const saveBtn = document.createElement('button')
    saveBtn.setAttribute('data-id', id)
    saveBtn.setAttribute('type', "button")
    saveBtn.classList = 'save-list-btn btn btn-dark fixed-bottom w-100 py-3'
    saveBtn.innerText = 'Save'
    form.appendChild(saveBtn)
    editBtn.remove()

    listWraper.parentNode.appendChild(form)
    listWraper.remove()

    form.parentNode.insertBefore(addBtn, form)
}

function replaceFieldsNote(id) {
    const cardWrapper = document.querySelector('.card-wrapper')
    const title = document.querySelector('[name="note-title"]')
    const text = document.querySelector('[name="note-text"]')
    const editNoteForm = document.createElement('form')
    editNoteForm.classList = 'col-11 mx-auto position-reletive'
    editNoteForm.innerHTML = `<div class="form-group">
    <button style="top:5px; right:5px;" type="button" class="close note-delete-btn field-delete d-block p-2 position-absolute" aria-label="Close" data-id=${id}></button>
            <label for="InputTitle">Title</label>
            <input name="note-title" type="text" class="form-control" id="InputTitle" placeholder="Enter title" value="${title.innerText}">
        </div>
        <div class="form-group">
            <label for="FormControlTextarea">text</label>
            <textarea name="note-text" class="form-control" id="FormControlTextarea" rows="12">${text.innerText}</textarea>
        </div>
        <button type="button" data-id=${id} class="btn btn-dark save-note-btn fixed-bottom w-100 py-3">Save</button>
        `
    cardWrapper.parentNode.appendChild(editNoteForm)
    cardWrapper.remove()
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