# wm-sspa-cli
A CLI to convert [**WaveMaker**](https://www.wavemakeronline.com/) apps to [**Single-spa**](https://single-spa.js.org/) compatible app

## Installation
### **npx**
Run the command directly without installation. 
`npx` will ensure it executes the latest version available.
```
npx wm-sspa-cli
```

### **npm**
* Install the CLI globally & invoke from any location 
```
npm install wm-sspa-cli --global

wm-sspa-cli
```
*  Install the CLI for a given project & invoke from your package.json
```
npm install wm-sspa-cli
```
```
...
"scripts":{
    ...
    "run_wm":"wm-sspa-cli"
    ...
}
...
```


## Usage

The CLI requires & prompts the user for WaveMaker project path(Exported from WaveMaker) & Deployed URL of the application.

The CLI can optionally take them as paramaters,
* `-p | --project-path`
* `-d | --deploy-url`



### **npx**
```
npx wm-sspa-cli -p /Users/Tony/wm-sample-app -d https://stark-ind.wavemakeronline.com/wm-sample-app
```
### **npm**
```
wm-sspa-cli --project-path /Users/Tony/wm-sample-app --deploy-url https://stark-ind.wavemakeronline.com/wm-sample-app
```





