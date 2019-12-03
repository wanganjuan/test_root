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
            // 重新熏染
            this.panel.reveal();
        } else {
            // 默认情况下，在Web视图中禁用JavaScript，但可以通过传入enableScripts: true选项轻松启用
            // 默认情况下当webview被隐藏时资源会被销毁，通过retainContextWhenHidden: true会一直保存，但会占用较大内存开销，仅在需要时开启；
            this.panel = vscode.window.createWebviewPanel("ycy", "图聆鼓励师", vscode.ViewColumn.One, {
                enableScripts: true,
                retainContextWhenHidden: true,
            });
            this.panel.webview.html = this.generateHtml(imagePath, title);
            // 可以通过panel.dispose()方法主动关闭webview。
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