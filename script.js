var selectedRow = null

// Show Alert
function showAlert(message, classname) {
    const div = document.createElement("div")
    div.className = `alert alert-${classname}`

    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".container")
    const main = document.querySelector(".main")
    container.insertBefore(div, main)

    setTimeout(() => document.querySelector(".alert").remove(), 3000)
}

// Clear All Data
function clearFields() {
    document.querySelector("#firstName").value = ""
    document.querySelector("#lastName").value = ""
    document.querySelector("#idNo").value = ""
}

// Add data
document.querySelector("#member-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const firstName = document.querySelector("#firstName").value
    const lastName = document.querySelector("#lastName").value
    const idNo = document.querySelector("#idNo").value

    if (firstName == "" || lastName == "" || idNo == "") {
        showAlert("Please fill all the fields", "danger")
    }
    else {
        if (selectedRow == null) {
            const list = document.querySelector("#member-list")
            const row = document.createElement("tr")

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${idNo}</td>
                <td>
                    <a href="#" class="btn btn-info edit">Edit</a>
                    <a href="#" class="btn btn-danger delete">Delete</a>
                </td>
            `
            list.appendChild(row)
            selectedRow = null
            showAlert("Member Added", "success")
        }
        else {
            selectedRow.children[0].textContent = firstName
            selectedRow.children[1].textContent = lastName
            selectedRow.children[2].textContent = idNo
            selectedRow = null
            showAlert("Member Info Edited", "info")
        }

        clearFields()
    }
})

// Edit Data
document.querySelector("#member-list").addEventListener("click", (e) => {
    const target = e.target
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement
        document.querySelector("#firstName").value = selectedRow.children[0].textContent
        document.querySelector("#lastName").value = selectedRow.children[1].textContent
        document.querySelector("#idNo").value = selectedRow.children[2].textContent
    }
})

// Delete Data
document.querySelector("#member-list").addEventListener("click", (e) => {
    const target = e.target
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Member Data Removed", "danger")
    }
})
