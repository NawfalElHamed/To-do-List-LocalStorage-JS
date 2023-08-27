document.addEventListener("DOMContentLoaded", function () {
    //
    const inputNote = document.getElementById("input-note");
    const btnAdd = document.getElementById("btn-add");
    const noteList = document.getElementById("note-list");

    // Load notes from local storage
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Display existing notes
    notes.forEach((note, index) => {
        createNoteElement(note.text, index);
    });

    // Event listener for "Add" button
    btnAdd.addEventListener("click", function () {
        const noteText = inputNote.value.trim();
        if (noteText !== "") {
            notes.push({ text: noteText, checked: false });
            localStorage.setItem("notes", JSON.stringify(notes));
            const newIndex = notes.length - 1;
            createNoteElement(noteText, newIndex);
            inputNote.value = ""; // Clear the input field
        }
    });

    // Function to create a note element
    function createNoteElement(noteText, index) {
        const noteDiv = document.createElement("div");
        noteDiv.className = "col";
        const isChecked = notes[index].checked || false;
        noteDiv.innerHTML = `
        <div class="alert alert-primary alert-dismissible d-flex align-items-center" role="alert">
            <input class="form-check-input" type="checkbox" value="" id="check-${index}" ${isChecked ? "checked" : ""}>
            <p class="m-0 ms-3">${noteText}</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" data-index="${index}"></button>
        </div>
    `;
        noteList.appendChild(noteDiv);

        const checkbox = noteDiv.querySelector(`#check-${index}`);

        // Event listener for note checkbox
        checkbox.addEventListener("change", function () {
            notes[index].checked = checkbox.checked;
            localStorage.setItem("notes", JSON.stringify(notes));
        });

        // Event listener for note delete button
        const deleteButton = noteDiv.querySelector(`[data-index="${index}"]`);
        deleteButton.addEventListener("click", function () {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            noteDiv.remove();
        });
    }


})