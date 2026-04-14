// ➕ ADD TRANSACTION WITH LOW BALANCE CHECK
async function addTransaction() {
    let amount = parseInt(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if (!amount || category === "") {
        alert("Enter all fields");
        return;
    }

    try {
        // Get current transactions
        const response = await fetch("http://localhost:3000/transactions");
        const data = await response.json();

        let balance = 0;

        data.forEach(t => {
            if (t.type === "income") balance += t.amount;
            else balance -= t.amount;
        });

        // 🚨 LOW BALANCE CHECK
        if (type === "expense" && amount > balance) {
            alert("❌ Cannot complete transaction: Insufficient balance!");
            return;
        }

        // Add transaction to DB
        await fetch("http://localhost:3000/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount,
                type,
                category
            })
        });

        // Refresh UI
        getTransactions();

    } catch (error) {
        console.log("Error:", error);
    }
}


// 📥 GET & DISPLAY TRANSACTIONS
async function getTransactions() {
    try {
        const response = await fetch("http://localhost:3000/transactions");
        const data = await response.json();

        let list = document.getElementById("list");
        list.innerHTML = "";

        let income = 0;
        let expense = 0;

        data.forEach(t => {
            let li = document.createElement("li");
            li.innerText = `${t.type} - ₹${t.amount} (${t.category})`;
            list.appendChild(li);

            if (t.type === "income") income += t.amount;
            else expense += t.amount;
        });

        document.getElementById("income").innerText = "₹" + income;
        document.getElementById("expense").innerText = "₹" + expense;
        document.getElementById("balance").innerText = "₹" + (income - expense);

    } catch (error) {
        console.log("Error:", error);
    }
}


// 🛡 SCAM CHECKER
async function checkScam() {
    let message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:3000/scam", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        document.getElementById("result").innerText = data.risk;

    } catch (error) {
        console.log("Error:", error);
    }
}


// 🔄 LOAD DATA WHEN PAGE OPENS
getTransactions();