// Array to hold quotes

let quotes = [
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


// Function to show random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quote and text available";
    return;
  }

  let randomQuoteIndex = Math.floor(Math.random() * quotes.length);
  let quote = quotes[randomQuoteIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<strong>"${quote.text}"</strong> <br/> <em>${quote.category}</em>`;
}

function createAddQuoteForm() {

    // Create Form to add quote
    const formDiv = document.createElement("div");

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
    addButton.textContent = "Add Quote"
    addButton.onclick = addQuote;

    // Append child to form
    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);

    // Append the container to the body or a specific element
    document.body.appendChild(formDiv);
};

function addQuote() {
    let newTextInput = document.getElementById("newQuoteText");
    let newCategoryInput = document.getElementById("newQuoteCategory");

    let newText = newTextInput.value.trim();
    let newCategory = newCategoryInput.value.trim();

    if (newText === "" || newCategory === ""){
        alert("Kindly enter both text and category");
        return;
    };

    // Add to the quotes array
    quotes.push({text: newText, category: newCategory})

    alert("New quote added!");

    // Clear input fields after quotes and category have been added
    newTextInput.value = "";
    newCategoryInput.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    createAddQuoteForm();
})
