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
01/02/2017 8:50PM 11PM
01/03/2017 6:30AM 7:15AM

## Notes
Console errors related to `jsx-a11y/href-no-hash` are due to a known bug with npm 5+.

To solve the gutter issue with flexbox, I used transparent borders because this doesn't add padding or margins while achieving the desired result.

Regex for IP Addresses taken from [Regular Expressions Cookbook, 2nd Edition](http://shop.oreilly.com/product/0636920023630.do)