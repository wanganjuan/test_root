import * as vscode from 'vscode';
import Asset from './asset';

export class ReminderView {
    private static panel: vscode.WebviewPanel | undefined;

    public static show(context: vscode.ExtensionContext, ) {
        let asset: Asset = new Asset(context);

        const imagePath = asset.getImageUri();
        const title = asset.getTitle();

        if (this.panel) {
            this.panel.webview.html = this.generateHtml(imagePath, title);
            this.panel.reveal();
        } else {
            this.panel = vscode.window.createWebviewPanel("ycy", "图聆鼓励师", vscode.ViewColumn.Two, {
                enableScripts: true,
                retainContextWhenHidden: true,
            });
            this.panel.webview.html = this.generateHtml(imagePath, title);
            // 
            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
        }
    }

    protected static generateHtml(imagePath: vscode.Uri|string, title: string): string {
        let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>图聆鼓励师</title>
        </head>
        <style>
        /* 浅色主题 */
.body.vscode-light {
    background: white;
    color: black;
}
/* 深色主题 */
body.vscode-dark {
    background: #252526;
    color: white;
}
/* 高对比度主题 */
body.vscode-high-contrast {
    background: white;
    color: red;
}
        </style>
        <body>
            <div><h1>${title}</h1></div>
            <div><img src="${imagePath}"></div>
        </body>
        </html>`;

        return html;
    }
}