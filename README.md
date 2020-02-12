# wm-sspa-cli
A CLI to convert [**WaveMaker**](https://www.wavemakeronline.com/) apps to [**Single-spa**](https://single-spa.js.org/) compatible app

## Usage
## **npx** 
Run directly with npx. The CLI will prompt the user to enter WaveMaker exported Project Path & deployed URL
> `npx wm-sspa-cli`

Or
> `npx wm-sspa-cli --project-path <WM_PROJECT_PATH> --deploy-url <WM_DEPLOYED_URL>`

Or
> `npx wm-sspa-cli -p <WM_PROJECT_PATH> -d <WM_DEPLOYED_URL>`

<!-- **Note:** Pptionally you can enable more details using `--verbose` option -->

## **npm** 
Install the CLI with the following command
>  `npm i wm-sspa-cli`

and use as listed below

> `wm-sspa-cli` 

Or
> `wm-sspa-cli --project-path <WM_PROJECT_PATH> --deploy-url <WM_DEPLOYED_URL>`

Or 
> `wm-sspa-cli -p <WM_PROJECT_PATH> -d <WM_DEPLOYED_URL>`


## Sample Code
```
$ npx wm-sspa-cli --project-path /Users/Tony/wm-sample-app --depoyed-url https://stark-ind.wavemakeronline.com/wm-sample-app
```







