## Getting Started

To install all of the necessary code, please ensure git is installed on your machine and clone the
repository: git clone https://github.com/jakejrichards/senior-project.git. Once the installation is
complete, you’ll want to start up the interactive questions generator web UI. Within the newly
created, “senior-project” directory, you’ll find a directory called “web-ui”.

## Interactive Questions Generator Web UI

### Installation

Ensure that you have a version of Node.js (12.x) and ensure you are in the “web-ui” directory
and then run the following commands:
npm install // ensure all dependencies are properly installed
npm run build // run the build script to generate the web UI static file output
Then, you can open the “index.html” file within the generated “dist” directory.

### Usage

The purpose of the web user interface is to create and generate the appropriate Markdown for
a given question’s configuration. Once you have completed question configuration, simply copy
and paste the generated Markdown output and paste it into a Markdown file that you intend to
use as the textbook.

## Build Script (makequestions)

### Installation

Ensure you have Pandoc installed, for more information on how to install Pandoc please visit
the official documentation: https://pandoc.org/installing.html.
Usage
In order to run the build script, simply supply the source Markdown file and the desired output
HTML file and run the following code: sh makequestions example.md index.html. The HTML,
CSS, and JavaScript output can be found in the “index.html” file and this file can be deployed
wherever you may choose and can be opened locally in the browser.
