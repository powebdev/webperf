#Website Optimization Project

Project 4 for Udacity Front-End Web Developer Nanodegree

## Requirement
- [npm][1]
- [gulp][2]

## How to Run Project
To build the production site:</br>
1. Make sure gulp is installed to run the build tool. Refer to links above for installation instruction.</br>
2. Dwnload the project then navigate to the folder where the file gulpfile.js is located.</br>
3. Run gulp scripts style, then run gulp prod_dev_switch in sequence.

To access the production version of the site:
Under the build folder in the project, run index.html

To access the developing version of the site:
Under the src folder in the project, run index.html

## Steps taken to complete the project:
- Loaded Google Fonts using javascript.
- Included minified javascript and css in HTML in production version.
- Compressed most of the images.
- Created different sizes of pizzeria.jpg and load them according to screen size/purpose.
- Used media="print" while loading print.css.
- Added viewport tag for pizza.html.
- Replaced 2048 image with the compressed version instead of requesting it over the net.
- Reduced number of moving pizza from 200 to 35.
- Added will-change:left attribute to moving pizza.
- Replaced document.querySelectorAll with document.getElementsByClassName.

## Regarding the main.js file for pizza.html:
- In function changePizzaSizes, pulled the determineDx function out of the for loop.
- In function updatePositions, pulled document.body.scrollTop out of the for loop.</br>
These helped with eliminating forced sync issues.

## Exceeds Specifications Requirements:
- Critical Rendering Path for index.html: PageSpeed score is above 90 for both desktop and mobile.
- Build Tools: Gulp is used to automated the build process to create the productio version of the site.

[1]: https://www.npmjs.com/
[2]: http://gulpjs.com/
