

let addBtn = document.getElementById("addExpenseBtn");
addBtn.addEventListener("click", (event) => {

    event.preventDefault();

    let titleInput = document.getElementById('title').value;
    let amountInput = Number(document.getElementById('amount').value);
    let categoryInput = document.getElementById('category').value;
    let dateInput = document.getElementById('date').value;

    console.log('titleInput - '+titleInput);
    console.log('amnountInput - '+amountInput);
    console.log('categoryInput - '+categoryInput);
    console.log('dateInput - '+dateInput);

    // Check that all fields are valid
    if (!titleInput.trim() || amountInput <= 0 ||
        !Number.isInteger(amountInput) || !categoryInput || !dateInput) {
        alert("Please fill in all fields correctly.");
        return;
    }

    let expenseObj = {
        title: titleInput,
        amount: amountInput,
        category: categoryInput,
        date: dateInput
    };

    // console.log(expenseObj);
    console.log('Objekti: '+ JSON.stringify(expenseObj));

    let allExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

    if (!Array.isArray(allExpenses)) {
        allExpenses = [];
    }

    allExpenses.push(expenseObj);

    localStorage.setItem('expenses', JSON.stringify(allExpenses));

    let expesnseLocal = localStorage.getItem('expenses');
    console.log('Data: '+ expesnseLocal);
    console.log(JSON.parse(expesnseLocal));

    for(let i=0; i<allExpenses.length; i++){
        let expense = allExpenses[i];
        console.log(expense.amount);
    }

    // SweetAlert2 JavaScript Library
    Swal.fire({
        icon: 'success',
        title: 'Expense added successfully!',
        text: 'Your expense has been saved.',
        confirmButtonText: 'OK'
    });

});
