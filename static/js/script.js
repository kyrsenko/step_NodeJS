
console.log('conected');

document.body.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    if(e.target.classList.contains('note-create-btn')) {
        createNote()
        window.location.href = '/'
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
        window.location.href = `/notes/${id}`
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
    // const titleInput = document.createElement('input')
    // const textTextarea = document.createElement('textarea')
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
    // titleInput.setAttribute('name', 'note-title')
    // textTextarea.setAttribute('name', 'note-text')
    // titleInput.classList = 'col-md-12 mx-auto mt-4 rounded'
    // textTextarea.classList = 'col-md-12 mx-auto mt-4 rounded'
    // textTextarea.setAttribute('rows', '12')

    // titleInput.value = title.innerText
    // textTextarea.value = text.innerText
    // title.parentNode.replaceChild(titleInput, title)
    // text.parentNode.replaceChild(textTextarea, text)
    // const editNoteBtn = document.querySelector('.edit-note-btn')
    // const saveNoteBtn = document.createElement('button')
    // saveNoteBtn.setAttribute('data-id', id)
    // saveNoteBtn.classList = 'btn btn-dark save-note-btn fixed-bottom w-100 py-3'
    // saveNoteBtn.innerText = 'Save'
    // editNoteBtn.parentNode.replaceChild(saveNoteBtn, editNoteBtn)
}