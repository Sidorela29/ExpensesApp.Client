
let allExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

if (!Array.isArray(allExpenses)) {
    allExpenses = [];
}

let expenseList = document.getElementById('expense-list');

for (let i = 0; i < allExpenses.length; i++) {

    let expense = allExpenses[i];

    let row = document.createElement('tr');

    let dateCell = document.createElement('td');
    dateCell.textContent = expense.date;

    let titleCell = document.createElement('td');
    titleCell.textContent = expense.title;

    let categoryCell = document.createElement('td');
    categoryCell.textContent = expense.category;

    let amountCell = document.createElement('td');
    amountCell.textContent = expense.amount + ' Lek';
    amountCell.className = 'text-end';

    let actionsCell = document.createElement('td');
    actionsCell.className = 'text-end';

    row.appendChild(dateCell);
    row.appendChild(titleCell);
    row.appendChild(categoryCell);
    row.appendChild(amountCell);
    row.appendChild(actionsCell);

    expenseList.appendChild(row);
}

document.getElementById('count').textContent = allExpenses.length;

if (allExpenses.length > 0) {
    document.getElementById('empty-message').classList.add('d-none');
}

// Statistics
let total = 0;

for (let i = 0; i < allExpenses.length; i++) {
    total += Number(allExpenses[i].amount);
}

document.getElementById('stat-total').textContent = total + ' Lek';

document.getElementById('stat-count').textContent = allExpenses.length;

let average = allExpenses.length > 0
    ? total / allExpenses.length
    : 0;

document.getElementById('stat-average').textContent =
    average.toFixed(2) + ' Lek';

if (allExpenses.length > 0) {

    let biggest = allExpenses[0];

    for (let i = 1; i < allExpenses.length; i++) {
        if (Number(allExpenses[i].amount) > Number(biggest.amount)) {
            biggest = allExpenses[i];
        }
    }

    document.getElementById('stat-biggest').textContent =
        biggest.title + ' - ' + biggest.amount + ' Lek';
}
