const places = [
  {
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    info: "The City of Lights, known for its art, fashion, and Eiffel Tower."
  },
  {
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1586460704904-8910b4caa8b7",
    info: "A bustling city blending tradition with futuristic tech."
  },
  {
    name: "New York City, USA",
    image: "https://images.unsplash.com/photo-1549921296-3ccee6a64be4",
    info: "The Big Apple, filled with iconic landmarks and culture."
  },
  {
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1505731136874-acc2b0a3a2f5",
    info: "Famous for its blue domes, sunsets, and Mediterranean views."
  },
  {
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1602600221183-3f9b3de2e6c9",
    info: "A luxury desert destination with skyscrapers and adventure."
  }
];

let selected = [];

function startJourney() {
  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!name || !email.includes("@")) {
    alert("Please enter valid name and email.");
    return;
  }
  document.getElementById("email-section").style.display = "none";
  document.getElementById("search-section").style.display = "block";
  populateSearchOptions();
}

function populateSearchOptions() {
  const dropdown = document.getElementById("placeDropdown");
  dropdown.innerHTML = "<option value=''>-- Select a Place --</option>";
  places.forEach((place, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = place.name;
    dropdown.appendChild(option);
  });
}

function showSelectedPlace() {
  const selectedIndex = document.getElementById("placeDropdown").value;
  if (selectedIndex === "") return;

  const place = places[selectedIndex];
  selected = [place];

  document.getElementById("search-section").style.display = "none";
  document.getElementById("gallery-section").style.display = "block";
  showImages([place]);
}

function showImages(list) {
  const grid = document.getElementById("image-grid");
  grid.innerHTML = "";
  list.forEach((place, index) => {
    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.name;
    img.className = "styled-image";
    img.onerror = function () {
      this.src = "https://via.placeholder.com/600x400?text=Image+Not+Found";
    };
    img.onclick = () => {
      toggleSelection(index);
      showModal(index);
    };
    grid.appendChild(img);
  });
}

function toggleSelection(index) {
  const place = places[index];
  const found = selected.find(p => p.name === place.name);
  if (found) {
    selected = selected.filter(p => p.name !== place.name);
  } else {
    selected.push(place);
  }
}

function showModal(index) {
  document.getElementById("modal-title").textContent = places[index].name;
  document.getElementById("modal-info").textContent = places[index].info;
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function confirmSelection() {
  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();

  document.getElementById("gallery-section").style.display = "none";
  document.getElementById("confirmation-section").style.display = "block";
  document.getElementById("confirm-name").textContent = name;
  document.getElementById("confirm-email").textContent = email;

  const list = document.getElementById("selected-places");
  list.innerHTML = "";
  selected.forEach(place => {
    const li = document.createElement("li");
    li.textContent = place.name;
    list.appendChild(li);
  });
}





