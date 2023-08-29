document.addEventListener("DOMContentLoaded", function () {
    const inputNote = document.getElementById("input-note");
    const btnAdd = document.getElementById("btn-add");
    const noteList = document.getElementById("note-list");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Display existing notes
    notes.forEach((note, index) => {
        createNoteElement(note.text, index);
    });
    

    btnAdd.addEventListener("click", function () {
        const noteText = inputNote.value.trim();
        if (noteText !== "") {
            const editIndex = btnAdd.dataset.editIndex;
            if (editIndex !== undefined) {
                // Editing existing note
                notes[editIndex].text = noteText;
                localStorage.setItem("notes", JSON.stringify(notes));
                const noteDiv = document.getElementById(`note-${editIndex}`);
                const label = noteDiv.querySelector('.form-check-label');
                label.textContent = noteText;
                btnAdd.textContent = "Add";
                delete btnAdd.dataset.editIndex;
            } else {
                // Adding new note
                notes.push({ text: noteText, checked: false });
                localStorage.setItem("notes", JSON.stringify(notes));
                createNoteElement(noteText, notes.length - 1);
            }
            inputNote.value = "";
        }
    });

    function createNoteElement(noteText, index) {
        const noteDiv = document.createElement("div");
        noteDiv.className = "col";
        noteDiv.id = `note-${index}`;
        const isChecked = notes[index].checked || false;
        noteDiv.innerHTML = `
            <div class="alert alert-primary alert-dismissible d-flex align-items-center" role="alert">
                <input class="form-check-input" type="checkbox" value="" id="check-${index}" ${isChecked ? "checked" : ""}>
                <label class="form-check-label ms-2" for="check-${index}">
                    ${noteText}
                </label>
                <button type="button" class="btn btn-secondary btn-edit " data-index="${index}">Edit</button>
                <button type="button" class="btn-close" aria-label="Close" data-index="${index}"></button>
            </div>
        `;

        noteList.appendChild(noteDiv);

        const checkbox = noteDiv.querySelector(`#check-${index}`);
        checkbox.addEventListener("change", function () {
            notes[index].checked = checkbox.checked;
            localStorage.setItem("notes", JSON.stringify(notes));
        });

        const deleteButton = noteDiv.querySelector(`.btn-close`);
        deleteButton.addEventListener("click", function () {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            noteDiv.remove();
        });

        const editButton = noteDiv.querySelector(`.btn-edit`);
        editButton.addEventListener("click", function () {
            // Populate the note text into the input field
            inputNote.value = noteText;
            // Change the "Add" button to "Update"
            btnAdd.textContent = "Update";
            btnAdd.dataset.editIndex = index;
        });
    }
});
