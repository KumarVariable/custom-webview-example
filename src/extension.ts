// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import {
  CustomViewDataProvider,
  CustomTreeItems,
} from "./customViewDataProvider";
import { CustomWebViewPanel } from "./customWebViewPanel";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "custom-webview-example" is now active!'
  );

  const customViewDataProvider = new CustomViewDataProvider();

  vscode.window.registerTreeDataProvider(
    "activitybar.customview",
    customViewDataProvider
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("custom-webview-example.testOne", () => {
      // Display a message box to the user
      const message = "Sample VS code WebView View";
      vscode.window.showInformationMessage(message);

      // Type of the webview panel.
      const viewType = "openWebView";

      //Title of the panel displayed to user.
      const title = "My Custom Panel Title";

      // Create and show a new webview panel
      const webViewPanel = vscode.window.createWebviewPanel(
        viewType,
        title,
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
          // enable scripts in the webview
          enableScripts: true,
        } // Webview options
      );

      // Set our custom HTML content
      webViewPanel.webview.html = getHTMLWebviewContent();
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getHTMLWebviewContent(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title>Open Url Example</title>

<style>
.dropbtn {
  background-color: #3498DB;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: #2980B9;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}
</style>



</head>
<body>

<div class="dropdown">
  <button onclick="myFunction()" class="dropbtn">Open URL</button>
  <div id="myDropdown" class="dropdown-content">
    <a href="http://staging.bito.co/auth/login">Bito</a>
    <a href="https://code.visualstudio.com/">Visual Studio</a>
    <a href="https://www.google.com/">Google</a>
  </div>
</div>

<script>
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  console.log('hello world!!!!!');
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
</script>

</body>

</html>`;
}
