const addNoteBtn = document.getElementById('addNoteBtn');
showNotes();
addNoteBtn.addEventListener('click', addNote);
function addNote() {
    let inptxt = document.getElementById('addTxt');
    let inptitle = document.getElementById('addTitle');
    let storagenotes = localStorage.getItem('notes');
    let storagetitle = localStorage.getItem('notes-title');
    if (storagenotes != null) {
        notes = JSON.parse(storagenotes);
        title = JSON.parse(storagetitle);
    }
    else {
        notes = [];
        title = [];
    }
    notes.push(inptxt.value);
    title.push(inptitle.value);
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('notes-title', JSON.stringify(title));
    inptxt.value = "";
    inptitle.value = "";
    showNotes();
}
function showNotes() {
    let textobj = '';
    let textobj_title = '';
    let storagenotes = localStorage.getItem('notes');
    let storagetitle = localStorage.getItem('notes-title');
    if (storagenotes != null) {
        notes = JSON.parse(storagenotes);
        title = JSON.parse(storagetitle);
    }
    else {
        notes = [];
        title = [];
    }
    notes.forEach((element, index) => {
        if (title[index] == "") {
            titletag = `Note${index + 1}`;
        }
        else {
            titletag = title[index];
        }
        textobj += `<div class="notecard mx-4 my-4" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${titletag}</h5>
                    <p class="card-text">${element}</p>
                    <button class="btn btn-primary id="${index}" onclick="deleteNote(this.id)">Delete</button>
                    </div>
                </div>`
    });
    let notescontainer = document.getElementById('notes');
    if (notes.length != 0)
        notescontainer.innerHTML = textobj;
    else
        notescontainer.innerText = "No Notes Are Available"
}

function deleteNote(index) {
    console.log(index);
    
    let storagenotes = localStorage.getItem('notes');
    let storagetitle = localStorage.getItem('notes-title');
    if (storagenotes != null) {
        notes = JSON.parse(storagenotes);
        title = JSON.parse(storagetitle);
    }
    else {
        notes = [];
        title = [];
    }
    notes.splice(index,1);
    title.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notes));
    localStorage.setItem('notes-title',JSON.stringify(title));
    showNotes()
}
var searchid=document.getElementById('searchid');
searchid.addEventListener('input',() =>
{
    let inputtext=searchid.value.toLowerCase();
    let notesclass=document.getElementsByClassName('notecard');
    Array.from(notesclass).forEach(element=>{
        let textlog=element.children[0].children[1].innerText;
        let titlelog=element.children[0].children[0].innerText;
        console.log(titlelog);
        
        if(textlog.includes(inputtext) || titlelog.includes(inputtext)){
        element.style.display="block";}
        else{
        element.style.display="none";}
        
    })
})
