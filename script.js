const form = document.getElementById('plant-form');
const plantList = document.getElementById('plant-list');

let plants = JSON.parse(localStorage.getItem('plants')) || [];

function updatePlantList() {
  plantList.innerHTML = '';
  plants.forEach((plant, index) => {
    const nextWatering = new Date(plant.lastWatered);
    nextWatering.setDate(nextWatering.getDate() + parseInt(plant.interval));

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>🌿 ${plant.name}</strong><br/>
      Next watering: <em>${nextWatering.toDateString()}</em><br/>
      <button onclick="waterPlant(${index})">💧 Water Today</button>
      <button onclick="deletePlant(${index})">🗑 Remove</button>
    `;
    plantList.appendChild(li);
  });
}

function waterPlant(index) {
  plants[index].lastWatered = new Date().toISOString();
  saveAndUpdate();
}

function deletePlant(index) {
  plants.splice(index, 1);
  saveAndUpdate();
}

function saveAndUpdate() {
  localStorage.setItem('plants', JSON.stringify(plants));
  updatePlantList();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('plant-name').value;
  const interval = document.getElementById('watering-interval').value;
  const newPlant = {
    name,
    interval,
    lastWatered: new Date().toISOString()
  };
  plants.push(newPlant);
  saveAndUpdate();
  form.reset();
});

updatePlantList();

function download() {
  const confirmDownload = confirm("Do you want to download the PlantCare App?");
  if (confirmDownload) {
    // Create a temporary anchor tag to trigger download
    const link = document.createElement("a");
    link.href = "plantwatering"; // Ensure the file is in the same folder
    link.download = "Plantwatering";
    document.body.appendChild("https://apps.apple.com/us/app/planta-plant-garden-care/id1410126781");
    link.click();
    document.body.removeChild("//C:/Users/HP/OneDrive/Desktop/FSWD/plant%20watering/index.html");
    alert("Download started!");
  } else {
    alert("Download cancelled.");
  }
}
function login(event) {
  event.preventDefault(); // Prevent form from submitting
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Dummy check: You can replace this with actual validation or localStorage
  if (username === "admin" && password === "plant123") {
    document.getElementById("loginMessage").style.color = "green";
    document.getElementById("loginMessage").innerText = "Login successful!";
    // Redirect to home or download page after a delay
    setTimeout(() => {
      window.location.href = "download.html"; // or home.html
    }, 1000);
  } else {
    document.getElementById("loginMessage").style.color = "red";
    document.getElementById("loginMessage").innerText = "Invalid credentials!";
    function loginuser() {
      alert("Login successful! Welcome back.");
    }
    function invalidLogin() {
      alert("Invalid username or password. Please try again.");
    }
    function checkFields() {
      alert("Please fill in all required fields before logging in.");
    }

  }

}