/*
//  Setup:
//  1. Register a free account at metals-api.com
//  2. You instantly get an API key. Copy that in this code where you see [YOUR METALS-API.COM ACCESS KEY]. Lose the brackets []
//  3. In Google Sheets go to the Tools menu and select Script Editor
//  4. Create a new Script, name it as you like and copy this code there
//  5. ctrl+s to save the script.
//  6. if google ask for permission, give it. Its your profile, your sheet so it is in house anyway.
//
//  Usage in Google Sheets:
//  =GETPRICE("USD";"XAU")
//  It will return the price of $1 worth of XAU in this case.
*/

function GETPRICE(base,symbol) {

    // Using cache, so you do not abuse the API. It gives you 50 requests per month for free
    var cache = CacheService.getScriptCache();
    var cached = cache.get(base + symbol);
    if (cached != null) {
      return cached;
    }

    // Here you fetch the API response json. You will get something like this: 
    // {"success":true,"timestamp":1631086080,"date":"2021-09-08","base":"HUF","rates":{"XAU":529394.2334060125},"unit":"per ounce"}

    var response = UrlFetchApp.fetch("https://metals-api.com/api/latest?access_key=[YOUR METALS-API.COM ACCESS KEY]&base="+ base + "&symbols=" + symbol);
    var json = JSON.parse(response.getContentText());

    // here you cache the value you got from the json response for a day
    cache.put(base + symbol, json.rates[symbol], 60*60*24);

    return parseFloat(json.rates[symbol]);

}
