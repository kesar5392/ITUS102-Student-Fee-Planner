function calculateFee() {
    const baseFee = Number(document.getElementById("baseFee").value);
    const labFee = Number(document.getElementById("labFee").value);
    const semesters = Number(document.getElementById("semesters").value);
    const scholarship = document.getElementById("scholarship").value;

    // Basic input checks so invalid values are not used in the calculation.
    if (!Number.isFinite(baseFee) || !Number.isFinite(labFee) ||
        baseFee < 0 || labFee < 0 ||
        !Number.isInteger(semesters) || semesters < 1 || semesters > 4) {
        document.getElementById("result").textContent =
            "Please enter non-negative fees and a whole number of semesters from 1 to 4.";
        document.getElementById("breakdown").textContent = "Please correct the input values and calculate again.";
        return;
    }

    const subtotal = baseFee + labFee;
    const rate = getRate(scholarship);
    const discount = calculateDiscount(subtotal, rate);
    const adminCharge = subtotal * 0.05;
    const payable = calculateTotal(subtotal, discount, adminCharge);

    document.getElementById("result").textContent =
        "Subtotal: ₹" + subtotal.toFixed(2) +
        " | Discount: ₹" + discount.toFixed(2) +
        " | Administration: ₹" + adminCharge.toFixed(2) +
        " | Payable: ₹" + payable.toFixed(2);
    document.getElementById("breakdown").textContent = buildBreakdown(payable, semesters);
}

function calculateDiscount(amount, percentage) {
    // Convert the percentage into a fraction and calculate the discount.
    return amount * percentage / 100;
}

function getRate(type) {
    if (type === "Merit") {
        return 20;
    } else if (type === "Sports") {
        return 10;
    } else {
        return 0;
    }
}

function calculateTotal(subtotal, discount, adminCharge) {
    return subtotal - discount + adminCharge;
}

function buildBreakdown(payable, count) {
    let summary = "";
    for (let semester = 1; semester <= count; semester++) {
        const cumulativeFee = payable * semester;
        summary += "Semester " + semester + ": ₹" + payable.toFixed(2) +
            " | Cumulative fee: ₹" + cumulativeFee.toFixed(2) + "\n";
    }
    return summary.trim();
}
