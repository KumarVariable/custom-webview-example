import * as vscode from 'vscode';

export class CustomWebViewPanel {

    /**
	 * Track the current panel. Only allow a single panel to exist at a time.
	 */
    public static currentPanel: CustomWebViewPanel | undefined;

    public static readonly viewType = 'customWebview';

    private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri){

        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

    // Check do we have a panel, if yes then show that panel
    if(CustomWebViewPanel.currentPanel){
        CustomWebViewPanel.currentPanel._panel.reveal(column);
    }

    // If no panel available, then create a new one
    const panel = vscode.window.createWebviewPanel(
        CustomWebViewPanel.viewType,
        'Custom WebView',
        column || vscode.ViewColumn.One,
        getWebviewOptions(extensionUri),
    );

        CustomWebViewPanel.currentPanel = new CustomWebViewPanel(panel, extensionUri);

    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
		this._extensionUri = extensionUri;

        // Custom webview's initial HTML content
		this.initialHtmlContent();

        // Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);


    }
    private initialHtmlContent() {
        const webview = this._panel.webview;
        this._panel.title = "Custom Screen";

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
           
            <title>Login Screen</title>
        </head>
        <body>
        <center> <h1> Login </h1> </center>

        <form>  
        <div class="">   
            <label>Username : </label>   
            <input type="text" placeholder="Enter Username" name="username" required>  
            <label>Password : </label>   
            <input type="password" placeholder="Enter Password" name="password" required>

            <button type="submit">Login</button>

            <input type="checkbox" checked="checked"> Remember me

            <button type="button" class="cancelbtn"> Cancel</button>

            Forgot <a href="#"> password? </a>   
        </div>   
    </form>

    </body>
    </html>`;

    }
    public dispose() {
        CustomWebViewPanel.currentPanel = undefined;
    
        // Clean up our resources
        this._panel.dispose();
    
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

}

function getWebviewOptions(extensionUri: vscode.Uri): (vscode.WebviewPanelOptions & vscode.WebviewOptions) | undefined {
    return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
	};
}
