'use strict';
import * as vscode from "vscode";
import { ReminderView } from './view';
import Util from './util';

export default class Scheduler {
    public constructor(private context: vscode.ExtensionContext) {
    }

    public start() {
        setInterval(() => {
            ReminderView.show(this.context);
        }, 1000 * 60 * Util.getConfiguration().get<number>('reminderViewIntervalInMinutes', 60));
    }
}