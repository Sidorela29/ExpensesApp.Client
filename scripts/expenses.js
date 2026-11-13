
let allExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

if (!Array.isArray(allExpenses)) {
    allExpenses = [];
}

let expenseList = document.getElementById('expense-list');
let search = document.getElementById('search');
let filterCategory = document.getElementById('filter-category');

function renderExpenses() {

    expenseList.innerHTML = '';

    let total = 0;
    let biggest = null;

    for (let i = 0; i < allExpenses.length; i++) {

        let expense = allExpenses[i];

        total += Number(expense.amount);

        if (biggest === null || Number(expense.amount) > Number(biggest.amount)) {
            biggest = expense;
        }
    }

    document.getElementById('stat-total').textContent =
        total + ' Lek';

    document.getElementById('stat-count').textContent =
        allExpenses.length;

    document.getElementById('stat-average').textContent =
        allExpenses.length > 0
        ? (total / allExpenses.length).toFixed(2) + ' Lek'
        : '0 Lek';

    document.getElementById('stat-biggest').textContent =
        biggest ? biggest.title + ' - ' + biggest.amount + ' Lek' : 'none';

    let count = 0;

    for (let i = 0; i < allExpenses.length; i++) {

        let expense = allExpenses[i];

        if (!expense.title.toLowerCase().includes(search.value.toLowerCase())) {
            continue;
        }

        if (filterCategory.value !== '' &&
            expense.category !== filterCategory.value) {
            continue;
        }

        count++;

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

        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'btn btn-sm btn-outline-primary me-2';

        editBtn.addEventListener('click', function () {
            editExpense(i);
        });

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-sm btn-outline-danger';

        deleteBtn.addEventListener('click', function () {

            if (confirm('Delete this expense?')) {
                allExpenses.splice(i, 1);
                saveExpenses();
                renderExpenses();
            }

        });

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(dateCell);
        row.appendChild(titleCell);
        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(actionsCell);

        expenseList.appendChild(row);
    }

    document.getElementById('count').textContent = count;

    document.getElementById('empty-message')
        .classList.toggle('d-none', allExpenses.length > 0);
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(allExpenses));
}

search.addEventListener('input', renderExpenses);

filterCategory.addEventListener('change', renderExpenses);


// Delete all expenses

document.getElementById('clear-all')
    .addEventListener('click', function () {

        if (confirm('Delete all expenses?')) {

            allExpenses = [];
            saveExpenses();
            renderExpenses();

        }

    });


// Edit expense

let editModal = new bootstrap.Modal(
    document.getElementById('edit-modal')
);

function editExpense(index) {

    let expense = allExpenses[index];

    document.getElementById('edit-id').value = index;

    document.getElementById('edit-title').value = expense.title;

    document.getElementById('edit-amount').value = expense.amount;

    document.getElementById('edit-category').value = expense.category;

    document.getElementById('edit-date').value = expense.date;

    editModal.show();
}

document.getElementById('edit-form')
    .addEventListener('submit', function (event) {

        event.preventDefault();

        let index = Number(document.getElementById('edit-id').value);

        let title = document.getElementById('edit-title').value;

        let amount = Number(document.getElementById('edit-amount').value);

        let category = document.getElementById('edit-category').value;

        let date = document.getElementById('edit-date').value;

        if (title.trim() === '' ||
            amount <= 0 ||
            !Number.isInteger(amount) ||
            category === '' ||
            date === '') {

            alert('Please enter valid information');
            return;
        }

        allExpenses[index] = {
            title: title,
            amount: amount,
            category: category,
            date: date
        };

        saveExpenses();
        renderExpenses();

        editModal.hide();

    });


// Load sample data

document.getElementById('load-sample')
    .addEventListener('click', function () {

        allExpenses.push(
            {
                title: 'Coffee',
                amount: 150,
                category: 'Food',
                date: '2026-11-13'
            },
            {
                title: 'Bus ticket',
                amount: 40,
                category: 'Transport',
                date: '2026-11-13'
            },
            {
                title: 'Book',
                amount: 1200,
                category: 'Books',
                date: '2026-11-13'
            }
        );

        saveExpenses();
        renderExpenses();

    });

renderExpenses();
