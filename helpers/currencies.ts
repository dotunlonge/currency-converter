 export const currencies = [
  { label : "USD", name: "US Dollar", symbol: "$"  } ,
  { label : "GBP", name: "British Pound Sterling", symbol: "£" },
  { label : "NGN", name: "Nigerian Naira", symbol: "₦" },
  { label : "GH", name: "Ghanian Cedes", symbol: "₵" },
  { label : "CNY", name: "Chinese Yuan", symbol: "Ұ" },
  { label : "RUP", name: "Indian Rupees", symbol: "₹" },
  { label : "EUR", name: "European Euros", symbol: "€" },
  { label : "JPY", name: "Japanese Yen", symbol: "¥" },
];

 export const maths = {
   add: (a, b) => Number(a) + Number(b),
   sub: (a, b) => Number(a) - Number(b),
   times: (a, b) => Number(a) * Number(b),
   divide: (a, b) => Number(a) / Number(b),
   stringify: num => String(num).toLocaleString(),
   addToNumber: (old, value) => old + value.toString(),
   removeLastNumber: (old) => old.toString().slice(0, -1),
 }

 export const convert = async (value, from, to) => {
   try {
     
     const apiKey = "f9fe7fa4cbba59290f5509b8";
     const apiCall = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
     const response = await fetch(apiCall);
     const data = await response.json();

     if (data && data.conversion_rates && data.conversion_rates[to]) {
       const conversionRate = data.conversion_rates[to];
       const convertedValue = value * conversionRate;
       return convertedValue;
     } else {
       throw new Error("Currency conversion error: Invalid response data");
     }

   } catch (error) {
     console.log("Currency conversion error:", error);
     return 0;
   }
 };
