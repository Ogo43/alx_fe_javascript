# 🌟 Dynamic Quote Generator

A fully interactive web application that dynamically displays quotes based on user-selected categories, allows users to add new quotes, saves them using **Local Storage**, and **syncs with a simulated server**. This project also includes JSON import/export functionality and filtering by categories for a better user experience.

---

## 🚀 Features

- 🎯 **Random Quote Display**
- ➕ **Add New Quotes & Categories**
- 💾 **Persistent Storage via Local Storage**
- 🔁 **Sync with Simulated Server (e.g. JSONPlaceholder)**
- ⚠️ **Conflict Resolution with Notifications**
- 📂 **Import/Export Quotes in JSON Format**
- 🧠 **Category-based Filtering**
- 🌐 **Session Storage Support for Last Viewed Quote**

---

## 🧩 Technologies Used

- HTML5
- JavaScript (Vanilla)
- Web APIs:
  - Local Storage
  - Session Storage
  - FileReader (for importing JSON)
  - Fetch API (for server simulation)

---

💡 How It Works
🔄 Quote Display
Click “Show New Quote” to display a random quote. Quotes are drawn from the quotes array stored in localStorage.

➕ Add New Quote
Use the input fields to add a new quote and category. On submission, it's added to the array and saved to localStorage.

📁 JSON Import/Export
Export: Click “Export Quotes” to download quotes as a .json file.

Import: Upload a .json file to import new quotes.

📂 Category Filter
Select a category from the dropdown to filter quotes by that category. The last selected category is remembered across sessions using localStorage.

🌐 Server Sync
Simulates server using JSONPlaceholder.

Sync runs every 30 seconds (or manually via “Sync Now” button).

Resolves conflicts by preferring server quotes.
