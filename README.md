# wm-sspa-cli
A CLI to convert [**WaveMaker**](https://www.wavemakeronline.com/) apps to [**Single-spa**](https://single-spa.js.org/) compatible app

## Installation
### **npx**
Run the command directly without installation 

>`npx wm-sspa-cli`

### **npm**

Install the CLI globally 

>`npm install wm-sspa-cli `

and call the CLI 

>`wm-sspa-cli`

## Usage
![Screenshot](https://imgur.com/HmBtEXG)

The CLI requires & prompts the user for WaveMaker project path(Exported from WaveMaker) & Deployed URL of the application.

The CLI can optionally take them as paramaters,
* `-p | --project-path`
* `-d | --deploy-url`



### **npx**
```
$ npx wm-sspa-cli -p /Users/Tony/wm-sample-app -d https://stark-ind.wavemakeronline.com/wm-sample-app
```
### **npm**
```
$ wm-sspa-cli -p /Users/Tony/wm-sample-app -d https://stark-ind.wavemakeronline.com/wm-sample-app
```





