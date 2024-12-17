const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');
const searchInput = document.getElementById('search');
let records = [];


async function fetchRecords(searchTerm = '') {
  const response = await fetch('/api/records');
  records = await response.json();
  displayRecords(searchTerm);
}

function displayRecords(searchTerm = '') {
  recordList.innerHTML = '';
  const filteredRecords = records.filter(record => 
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.age.toString().includes(searchTerm.toLowerCase()) ||
    record.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredRecords.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5" style="text-align:center;color:red;">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    filteredRecords.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${record.name}</td>
        <td>${record.age}</td>
        <td>${record.email}</td>
        <td><button onclick="editRecord(${index})">Edit</button></td>
        <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
      `;
      recordList.appendChild(row);
    });
  }
}

recordForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const age = ageInput.value;
  const email = emailInput.value;
  const editIndex = parseInt(editIndexInput.value);

  if (name && age && email) {
    const record = { name, age, email };

    if (editIndex === -1) {
      await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      });
    } else {
      await fetch(`/api/records/${editIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      });
      editIndexInput.value = -1;
    }

    nameInput.value = '';
    ageInput.value = '';
    emailInput.value = '';
    fetchRecords();
  }
});

"Adham Display and Listener" 
"backend code" 
