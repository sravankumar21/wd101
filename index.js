let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    }
     else {
        entries = [];
    }
    return entries;
}
let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();

const tableEntries = entries.map((entry) => {
    const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
    const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
    const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
    const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
    const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTermsAndConditions}</td>`;

    const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
    return row;
}).join("\n");
const table = `<table class="table-auto w-full"><tr>
<th class="px-6 py-3">Name</th>
<th class="px-6 py-3">Email</th>
<th class="px-6 py-3">Password</th>
<th class="px-6 py-3">Dob</th>
<th class="px-6 py-3">Accepted terms</th>
</tr>${tableEntries}</table>`;

let details = document.getElementById ("user-entries");
details.innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTermsAndConditions = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTermsAndConditions
    };

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();

}
userForm.addEventListener("submit",saveUserForm);
displayEntries();


const PresentDate = new Date();
const minimum = new Date(PresentDate.getFullYear() - 55, PresentDate.getMonth(), PresentDate.getDate());
const maximum = new Date(PresentDate.getFullYear() - 18, PresentDate.getMonth(), PresentDate.getDate());
dob.setAttribute("min", minimum.toISOString().slice(0, 10));
dob.setAttribute("max", maximum.toISOString().slice(0, 10));
dob.addEventListener("change", () => {
    const a = Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10);
    if (a < 18 || a > 55) {
        dob.setCustomValidity("You are only allowed to enter age_in_years between 18 & 55");
    } else {
        dob.setCustomValidity("");
    }
});
