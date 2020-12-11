import * as vscode from 'vscode';
import { performJSONStringifyProcess } from './utils';

export function activate(context: vscode.ExtensionContext) {
  //   minify JSON
  context.subscriptions.push(
    vscode.commands.registerCommand('json-helper.minify-JSON', () => {
      performJSONStringifyProcess(0);
    })
  );

  //   Pretty JSON
  context.subscriptions.push(
    vscode.commands.registerCommand('json-helper.pretty-JSON', () => {
      performJSONStringifyProcess(2);
    })
  );
}

export function deactivate() {}
