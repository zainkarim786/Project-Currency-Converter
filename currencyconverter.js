"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CurrencyConverter = /** @class */ (function () {
    function CurrencyConverter(rates) {
        this.rates = rates;
    }
    CurrencyConverter.prototype.convert = function (amount, fromCurrency, toCurrency) {
        if (!this.rates[fromCurrency] || !this.rates)
            ;
    };
    return CurrencyConverter;
}());
