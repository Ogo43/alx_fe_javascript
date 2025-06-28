// Array to hold quotes

let quotes = JSON.parse(localStorage.getItem("storedQuotes")) || [
  {
    text: "All our dreams can come true, if we have the courage to pursue them.",
    category: "Motivation",
  },
  {
    text: "Nothing is impossible, the word itself says 'I'm possible'!",
    category: "Inspiration",
  },
  {
    text: "Life is a dream for the wise, a game for the fool, a comedy for the rich, a tragedy for the poor.",
    category: "Life",
  },
];

// Create Function to show random quote and save to sessionStorage
function showRandomQuote() {
  // if (quotes.length === 0) {
  // quoteDisplay.textContent = "No quote and text available";  This is changed to filteredQuotes.length because we are working with filtered category and no loger the entire quotes
  //   return;
  // }

  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML =
      "<em>No quotes in this category.</em>";
    return;
  }

  let randomQuoteIndex = Math.floor(Math.random() * filteredQuotes.length);
  let quote = filteredQuotes[randomQuoteIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<strong>"${quote.text}"</strong> <br/> <em>${quote.category}</em>`;

  //   Session Storage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Create function to save quotes array to localStorage
function saveQuotes() {
  localStorage.setItem("storedQuotes", JSON.stringify(quotes));
}

function createAddQuoteForm() {
  // Create Form to add quote
  const formDiv = document.createElement("div");
  formDiv.innerHTML = ""; //To prevent duplicates

  // Create input for quote text
  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  // Create input for quote category
  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  // Create button to add quote
  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  // Append child to form
  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  // Append the container to the body or a specific element
  document.body.appendChild(formDiv);
}

//Add new quotes
function addQuote() {
  let newTextInput = document.getElementById("newQuoteText");
  let newCategoryInput = document.getElementById("newQuoteCategory");

  let newText = newTextInput.value.trim();
  let newCategory = newCategoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Kindly enter both text and category");
    return;
  }

  // Add to the quotes array
  quotes.push({ text: newText, category: newCategory });

  // call localStorage
  saveQuotes();

  populateCategories(); // Refresh dropdown with any new categories

  
fetchQuotesFromServer(quotes); // Send to server

  alert("New quote added!");

  // Clear input fields after quotes and category have been added
  newTextInput.value = "";
  newCategoryInput.value = "";
}

// Export quotes to a JSON file
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully");
  };
  fileReader.readAsText(event.target.files[0]);
}

// OR THIS

// Import quotes from a JSON file
// function importFromJsonFile(event) {
//   let fileReader = new FileReader();

//   fileReader.onload = function (event) {
//     try {
//       let importedQuotes = JSON.parse(event.target.result);

//       if (Array.isArray(importedQuotes)) {
//         quotes.push(...importedQuotes);
//         saveQuotes();
//         alert("Quotes imported successfully!");
//       } else {
//         alert("Invalid file format!!! Expecting an array of quotes.");
//       }
//     } catch (err) {
//       alert("Failed to parse the JSON file.");
//     }
//   };
//   fileReader.readAsText(event.target.files[0]);
// }

// Populate dropdown with unique categories
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const selected = localStorage.getItem("lastSelectedCategory") || "all";

  // Get unique categories
  const categories = Array.from(new Set(quotes.map((q) => q.category)));
  dropdown.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  });
  dropdown.value = selected;
}

// Filter and display quotes when category changes
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastSelectedCategory", selectedCategory);
  showRandomQuote();
}

// Load last viewed quote from sessionStorage
function loadLastViewedQuote() {
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML = `
      <strong>"${quote.text}"</strong><br><em>(${quote.category})</em>
    `;
  }
}

// Async function to fetch and sync quotes
async function fetchQuotesFromServer() {
  try {
    // 1. GET quotes from a fake API
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    // 2. Use the first 5 quotes only for simplicity
    const fetchedQuotes = data.slice(0, 5).map(item => ({
      text: item.title,
      category: 'Imported'
    }));

    // 3. Merge into local quotes and save
    quotes.push(...fetchedQuotes);
    saveQuotes();

    // 4. POST one quote to simulate sending to server
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchedQuotes[0]) // send just one
    });

    console.log('Quotes fetched and posted successfully.');
  } catch (error) {
    console.error('Error syncing with server:', error);
  }
}

function resolveConflicts(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");

  // If server quote text doesn’t exist in local, add it
  const updatedQuotes = [...localQuotes];

  let newQuotesAdded = false;

  serverQuotes.forEach((serverQuote) => {
    const exists = localQuotes.some((local) => local.text === serverQuote.text);
    if (!exists) {
      updatedQuotes.push(serverQuote);
      newQuotesAdded = true;
    }
  });

  // Save back to local storage
  localStorage.setItem("quotes", JSON.stringify(updatedQuotes));

  if (newQuotesAdded) {
    alert("Quotes synced from server. New quotes were added.");
    populateCategories(); // Re-populate dropdown
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  populateCategories();
  filterQuotes();
  loadLastViewedQuote();

  document.getElementById("quoteDisplay").innerHTML = "";
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
  document.getElementById("exportBtn").addEventListener("click", exportQuotes);
  document
    .getElementById("importFile")
    .addEventListener("change", importFromJsonFile);
});
