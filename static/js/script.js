
console.log('conected');

document.body.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    if(e.target.classList.contains('note-create-btn')) {
        createNote()
        document.body.appendChild(addSpinner())
        setTimeout(()=>{
            window.location.href = "/"
        },500)
    }
    if(e.target.classList.contains('note-view-btn')){
        console.log(id)
        window.location.href= `/notes/${id}`
    }
    if(e.target.classList.contains('note-delete-btn')) {
        deleteNote(id)
        window.location.href = '/'
    }
    if(e.target.classList.contains('edit-note-btn')) {
        replaceFieldsNote(id)
    }
    if (e.target.classList.contains('save-note-btn')) {
        editNote(id)
        document.body.appendChild(addSpinner())
        setTimeout(()=>{
            window.location.href = `/notes/${id}`
        },500)
    }
})

async function createNote() {
    try {
        const title = document.querySelector('[name=note-title]')
        const text = document.querySelector('[name=note-text]')
        const data = {
            title: title.value,
            text: text.value
        }
        console.log(data)
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
        console.log(data)
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
        console.log(id)
        const title = document.querySelector('[name=note-title]')
        const text = document.querySelector('[name=note-text]')
        // console.log(title.innerText)
        const data = {
            title: title.value,
            text: text.value,
            _id: id
        }
        // console.log(data)
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

 function replaceFieldsNote(id) {
    const cardWrapper = document.querySelector('.card-wrapper')
    const title = document.querySelector('[name="note-title"]')
    const text = document.querySelector('[name="note-text"]')
    const editNoteForm = document.createElement('form')
    editNoteForm.classList = 'col-11 mx-auto position-reletive'
    editNoteForm.innerHTML = `<div class="form-group">
    <button style="top:5px; right:5px;" type="button" class="close note-delete-btn field-delete d-block p-2 position-absolute" aria-label="Close" data-id=${id}></button>
            <label for="InputTitle">Title</label>
            <input name="note-title" type="text" class="form-control" id="InputTitle" placeholder="Enter title" value=${title.innerText}>
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