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
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quote and text available";
    return;
  }

  let randomQuoteIndex = Math.floor(Math.random() * quotes.length);
  let quote = quotes[randomQuoteIndex];

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
  // formDiv.id = "formArea";

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

document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  loadLastViewedQuote();

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("exportBtn").addEventListener("click", exportQuotes);
});
