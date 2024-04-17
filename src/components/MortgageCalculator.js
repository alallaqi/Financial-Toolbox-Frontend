import React, { useState } from 'react';

const MortgageCalculator = () => {
    const [principal, setPrincipal] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [years, setYears] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [payments, setPayments] = useState([]);

    const handleCalculate = (e) => {
        e.preventDefault();
        const principalVal = parseFloat(principal);
        const rate = parseFloat(interestRate);
        const totalYears = parseFloat(years);

        if (!principalVal || !rate || !totalYears) {
            alert("All fields are required.");
            return;
        }

        const monthlyRate = rate / 100 / 12;
        const totalPayments = totalYears * 12;
        const x = Math.pow(1 + monthlyRate, totalPayments);
        const monthly = (principalVal*x*monthlyRate)/(x-1);

        setMonthlyPayment(monthly.toFixed(2));

        // Generate the amortization schedule
        let remaining = principalVal;
        const generatedPayments = [];
        for (let i = 1; i <= totalPayments; i++) {
            const interest = remaining * monthlyRate;
            const appliedToPrincipal = monthly - interest;
            remaining -= appliedToPrincipal;
            generatedPayments.push({
                period: i,
                amountPerMonth: monthly.toFixed(2),
                interest: interest.toFixed(2),
                principal: appliedToPrincipal.toFixed(2),
                remaining: remaining.toFixed(2)
            });
        }
        setPayments(generatedPayments);
    };

    const handleReset = () => {
        setPrincipal('');
        setInterestRate('');
        setYears('');
        setMonthlyPayment(null);
        setPayments([]);
    };

    return (
        <div className="container">
            <h1>Mortgage Calculator</h1>
            <form onSubmit={handleCalculate}>
                <label htmlFor="principalInput">Principal:</label>
                <input type="number" id="principalInput" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="Enter Principal Amount" required /><br/>
                <label htmlFor="interestInput">Annual Interest Rate (%):</label>
                <input type="number" id="interestInput" value={interestRate} onChange={e => setInterestRate(e.target.value)} step="0.01" placeholder="Enter Annual Interest Rate" required /><br/>
                <label htmlFor="periodInput">Period (Total Years):</label>
                <input type="number" id="periodInput" value={years} onChange={e => setYears(e.target.value)} placeholder="Enter Period in Years" required /><br/>
                <button type="submit">Calculate</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>
            {monthlyPayment && <div><p>Your mortgage is ${monthlyPayment} per month.</p></div>}
            {payments.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Amount Per Month</th>
                            <th>Interest</th>
                            <th>Principal</th>
                            <th>Remaining Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.period}>
                                <td>{payment.period}</td>
                                <td>{payment.amountPerMonth}</td>
                                <td>{payment.interest}</td>
                                <td>{payment.principal}</td>
                                <td>{payment.remaining}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MortgageCalculator;
