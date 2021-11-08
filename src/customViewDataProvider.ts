import * as vscode from 'vscode';
import * as path from 'path';

export class CustomViewDataProvider implements vscode.TreeDataProvider<CustomTreeItems>{

	data: CustomTreeItems[];

	constructor() {
		this.data = [new CustomTreeItems('cars', [
		  new CustomTreeItems(
			  'Ford', [new CustomTreeItems('Fiesta'), new CustomTreeItems('Focus'), new CustomTreeItems('Mustang')]),
		  new CustomTreeItems(
			  'BMW', [new CustomTreeItems('320'), new CustomTreeItems('X3'), new CustomTreeItems('X5')])
		])];
	  }

	onDidChangeTreeData?: vscode.Event<void | CustomTreeItems | null | undefined> | undefined;

	// Implement this to return the UI representation (TreeItem) of the element 
	//that gets displayed in the view.
    getTreeItem(element: CustomTreeItems): vscode.TreeItem | Thenable<vscode.TreeItem>{
		
        return element;
    }

	// Implement this to return the children for the given element 
	// or root (if no element is passed).
    getChildren(element?: CustomTreeItems): vscode.ProviderResult<CustomTreeItems[]> {
        /*
		return [
            new Dependency('Get Custom Webview', '', vscode.TreeItemCollapsibleState.None, {
                command: 'custom-webview-example.testOne',
                title: 'Hello World',
                arguments: ['']
            })
        ];
		*/
		if (element === undefined) {
			return this.data;
		  }
		  return element.children;
    }

}

export class CustomTreeItems extends vscode.TreeItem {

	/*
	constructor(
		public readonly label: string,
		private readonly version: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);

		this.tooltip = `${this.label}-${this.version}`;
		this.description = this.version;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
	};
	*/
	children: CustomTreeItems[]|undefined;

	constructor(label: string, children?: CustomTreeItems[]) {
		super(
			label,
			children === undefined ? vscode.TreeItemCollapsibleState.None :
									 vscode.TreeItemCollapsibleState.Expanded);
		this.children = children;
	  }
	
	
	//contextValue = 'dependency';
}