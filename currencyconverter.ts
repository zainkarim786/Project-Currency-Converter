const readline = require('readline');

interface ExchangeRates {
    [currency: string]: number;
}

class CurrencyConverter {
    private rates: ExchangeRates;

    constructor(rates: ExchangeRates) {
        this.rates = rates;
    }

    convert(amount: number, fromCurrency: string, toCurrency: string): number | null {
        if (!this.rates[fromCurrency] || !this.rates[toCurrency]) {
            console.log(`Error: Unsupported currency.`);
            return null;
        }
        const convertedAmount = amount * (this.rates[toCurrency] / this.rates[fromCurrency]);
        return convertedAmount;
    }
}

const exchangeRates: ExchangeRates = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.75,
    'JPY': 110,
    'INR': 74,
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const currencyConverter = new CurrencyConverter(exchangeRates);

const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => rl.question(question, resolve));
};

const main = async () => {
    const amountStr = await askQuestion('Enter the amount: ');
    const fromCurrency = await askQuestion('Enter the from currency (e.g., USD): ').toUpperCase();
    const toCurrency = await askQuestion('Enter the to currency (e.g., EUR): ').toUpperCase();

    const amount = parseFloat(amountStr);

    if (isNaN(amount)) {
        console.log('Error: Please enter a valid amount.');
        rl.close();
        return;
    }

    const convertedAmount = currencyConverter.convert(amount, fromCurrency, toCurrency);

    if (convertedAmount !== null) {
        console.log(`Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency}`);
    }

    rl.close();
};

main();
