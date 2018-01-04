# IP Address Distance Calculator

## Technical Goals
Responsive
UI feedback during data fetching
Easy to read code with clear comments
Tests that clearly describe the application's features
Compatibility with 2 previous browser versions (Chrome, Edge, Firefox, IE Safari)

## Approach
Choose a stack that demonstrates fluency in common tools
Only use what is necessary - no superfluous libraries

## Stack
* React
* create-react-app
* [gridly](https://github.com/IonicaBizau/gridly) - (100 bytes, minimal flexbox CSS rules)

## Utilities
* Linting: ESLint, AirBnB
* Testing: Jest/Enzyme
* Code cleanup: Prettier

## Dev Time Log
// make this a table
01/02/2018 8:50PM 11PM (2:10)
01/03/2018 6:30AM 7:15AM (0:45)
01/03/2018 8:30PM 11:15PM (2:45)
Total: 5:40

## Notes
Console errors related to `jsx-a11y/href-no-hash` are due to a known bug with npm 5+.

To solve the gutter issue with flexbox, I used transparent borders because this doesn't add padding or margins while achieving the desired result.

Regex for IP Addresses taken from [Regular Expressions Cookbook, 2nd Edition](http://shop.oreilly.com/product/0636920023630.do)

**IP Address**
This app will accept both ipv4 and ipv6 addresses.

Use these pairs for testing, if you'd like:
_good pair_
66.71.248.230
184.152.73.85

_bad pair_
66.71.248.230
66.71.*180*.230
