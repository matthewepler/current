# IP Address Distance Calculator

## Technical Goals
1. Responsive UI feedback during data fetching
2.	Easy to read code with clear comments
3. Compatibility with 2 previous browser versions (Chrome, Edge, Firefox, IE Safari)

## Approach
- Choose a stack that demonstrates fluency in common tools
- Only use what is necessary - no superfluous libraries

## Stack
* React
* create-react-app
* [gridly](https://github.com/IonicaBizau/gridly) - (100 bytes, minimal flexbox CSS rules)

## Utilities
* Linting: ESLint (AirBnB)

## Dev Time Log
|date|start|end|total|
|---|---|---|---|
|01/02/2018|8:50PM|11PM|(2:10)|
|01/03/2018|6:30AM|7:15AM|(0:45)|
|01/03/2018|8:30PM|11:15PM|(2:45)|
|01/04/2017|7:30AM|2:30PM|(7:00)|
**Total: 12:40**

## Notes
Console errors related to `jsx-a11y/href-no-hash` are due to a known bug with npm 5+.

To solve the gutter issue with flexbox, I used transparent borders because this doesn't add padding or margins while achieving the desired result.

Regex for IP Addresses taken from [Regular Expressions Cookbook, 2nd Edition](http://shop.oreilly.com/product/0636920023630.do)

There was no time to write tests :(


##IP Addresses
This app will accept both ipv4 and ipv6 addresses.

Use these pairs for testing, if you'd like:
_good pair_
66.71.248.230
184.152.73.85

_bad pair_
66.71.248.230
66.71.**180**.230

