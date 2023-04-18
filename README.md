<p align="center">
  <img src="public/pluto_logo.png" width="120"></img>
</p>

<h1 align="center">Pluto Biosciences Frontend Interview</h1>



### `Setup`


Have `npm` installed on your local machine. Clone this repo, install dependencies with `npm install` and start the app with `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `Instructions`

#### Part 1: Experiment Summary page

Complete the Experiment Summary page that fetches from the `public/api/summary.json` file, referring to the designs [here](https://www.figma.com/file/GZmJoOSRYBO23bHSegTGao/Pluto-Frontend-Interview?node-id=2%3A6).

When the user clicks on an experiment tile, they should see the Experiment Detail page for that experiment.


#### Part 2: Experiment Detail page

A) Implement the Experiment Detail page that fetches from the `public/api/detail.json` file, referring to the designs [here](https://www.figma.com/file/GZmJoOSRYBO23bHSegTGao/Pluto-Frontend-Interview?node-id=3%3A51).

B) Extend the Experiment Detail page to also fetch and render a table using the `public/api/data.json` file.

C) Add an error page when an experiment detail request does not exist.

Bonus) Extend the Experiment Detail page to also draw a D3 graph using the `public/api/plot.json` file.


#### Part 3: Polish 
A) Using the data from the endpoints, mock up a DB diagram of what the application is using [this online tool](https://dbdiagram.io/home).

B) Persist the data on the page on refresh, if not already done in part 2.

C) Add unit tests for the Experiments Summary and Experiments Detail pages.

D) Add a scss or sass stylesheet and some basic styles to the application.

### `Guidelines`

For development, you may reference official API documentation or official library examples, but you you may not copy answers from forums or threads, such as StackOverflow.
