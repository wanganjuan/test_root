import * as vscode from "vscode";

// 定义
export default class Utility {
    public static getConfiguration(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration("tuling");
    }
}