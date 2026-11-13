
let addBtn = document.getElementById("addExpenseBtn");
addBtn.addEventListener("click", (event) => {

    event.preventDefault();

    let titleInput = document.getElementById('title').value;
    let amountInput = document.getElementById('amount').value;
    let categoryInput = document.getElementById('category').value;
    let dateInput = document.getElementById('date').value;

    // NEW - Validation
    if (titleInput.trim() === "") {
        alert("Please enter a title");
        return;
    }

    if (Number(amountInput) <= 0 || !Number.isInteger(Number(amountInput))) {
        alert("Please enter a valid amount");
        return;
    }

    if (categoryInput === "") {
        alert("Please select a category");
        return;
    }

    if (dateInput === "") {
        alert("Please select a date");
        return;
    }

    console.log('titleInput - '+titleInput);
    console.log('amountInput - '+amountInput);
    console.log('categoryInput - '+categoryInput);
    console.log('dateInput - '+dateInput);

    let expenseObj = {
        title: titleInput,
        amount: amountInput,
        category: categoryInput,
        date: dateInput
    };

    // NEW - Get saved expenses
    let savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

    if (!Array.isArray(savedExpenses)) {
        savedExpenses = [];
    }

    expenseObj.amount +=2;

    // NEW - Correct amount
    expenseObj.amount = Number(amountInput);

    // console.log(expenseObj);
    console.log('Objekti: '+ JSON.stringify(expenseObj));

    localStorage.setItem('expenses', JSON.stringify(expenseObj));

    let expenseLocal = localStorage.getItem('expenses');
    console.log('Data: '+ expenseLocal);
    console.log(JSON.parse(expenseLocal));

    let allExpenses = [];

    // NEW - Save all expenses
    savedExpenses.push(expenseObj);

    localStorage.setItem('expenses', JSON.stringify(savedExpenses));

    // NEW - Update allExpenses
    allExpenses = savedExpenses;

    for(let i=0; i<allExpenses.length; i++){
        let expense = allExpenses[i];
        console.log(expense.amount);
    }

    // NEW - Show recently added expense
    document.getElementById('recent').classList.remove('d-none');

    let li = document.createElement('li');

    li.className = 'list-group-item';

    li.textContent = titleInput + " - " + amountInput + " Lek";

    document.getElementById('recent-list').appendChild(li);

    // NEW - Reset form
    document.getElementById('expense-form').reset();

    // NEW - Success message
   Swal.fire({
    title: "Success!",
    text: "Expense added successfully!",
    icon: "success"
});

})
