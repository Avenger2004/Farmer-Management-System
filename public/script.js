const API_URL = "http://localhost:5000/farmers";

// Add Farmer
document.getElementById("farmerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const farmer = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    location: document.getElementById("location").value,
    phone: document.getElementById("phone").value
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(farmer)
  });

  if (res.ok) {
    alert("✅ Farmer added successfully!");
    loadFarmers();
    e.target.reset();
  } else {
    alert("❌ Error adding farmer");
  }
});

// Load Farmers
async function loadFarmers() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const table = document.getElementById("farmerTable");
  table.innerHTML = "";

  data.forEach(f => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${f.name}</td>
      <td>${f.age || '-'}</td>
      <td>${f.location || '-'}</td>
      <td>${f.phone || '-'}</td>
      <td>
        <button class="update-btn">Update</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    // Attach event listeners
    row.querySelector('.delete-btn').onclick = () => deleteFarmer(f.id);
    row.querySelector('.update-btn').onclick = () => makeRowEditable(row, f);
    table.appendChild(row);
  });
}

loadFarmers();

// Delete Farmer
async function deleteFarmer(id) {
  if (!confirm("Are you sure you want to delete this farmer?")) return;
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (res.ok) {
    alert("✅ Farmer deleted!");
    loadFarmers();
  } else {
    alert("❌ Error deleting farmer");
  }
}

// Inline Edit Farmer Row
function makeRowEditable(row, farmer) {
  // Save original values
  const original = { ...farmer };
  row.innerHTML = `
    <td><input type="text" value="${farmer.name}" /></td>
    <td><input type="number" value="${farmer.age || ''}" /></td>
    <td><input type="text" value="${farmer.location || ''}" /></td>
    <td><input type="text" value="${farmer.phone || ''}" /></td>
    <td>
      <button class="save-btn">Save</button>
      <button class="cancel-btn">Cancel</button>
    </td>
  `;
  // Save and Cancel event listeners
  row.querySelector('.save-btn').onclick = async () => {
    const inputs = row.querySelectorAll('input');
    const updated = {
      name: inputs[0].value,
      age: inputs[1].value,
      location: inputs[2].value,
      phone: inputs[3].value
    };
    // If no changes, reload table and do nothing
    if (
      updated.name === original.name &&
      String(updated.age) === String(original.age || '') &&
      updated.location === (original.location || '') &&
      updated.phone === (original.phone || '')
    ) {
      loadFarmers();
      return;
    }
    // Otherwise, update
    const res = await fetch(`${API_URL}/${farmer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    if (res.ok) {
      alert("✅ Farmer updated!");
      loadFarmers();
    } else {
      alert("❌ Error updating farmer");
    }
  };
  row.querySelector('.cancel-btn').onclick = () => {
    loadFarmers();
  };
}
