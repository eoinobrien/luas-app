# LUAS App

A super simple React Luas App.

This app started as a lockdown project, I wanted to make a Luas app that was simple, quick and reliable, and I wanted to learn more about React.

This app should be mostly feature complete, but if you find an issue please file one above and if I find time I will attempt to fix it. Or if you'd like to fix it yourself feel free to make a pull request.

## Features
This app is made up of two parts.
* This React app 
  * 
* [A dotnet Core API](https://github.com/eoinobrien/luas-api-dotnet).
  * The API is based on a library I created previously to wrap the Luas XML API into something more manageable and to expand the API with a lot more data.
  * The API is hosted on a Azure function, so if you are unlucky enough to be the first point to use the app in a while you may have a 15 second wait while it starts up.

## Future Work
* Tests, this app needs some tests.