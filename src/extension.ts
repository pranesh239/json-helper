// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const supportedLanguages: string[] = ['plaintext', 'json'];

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  //   minify JSON
  context.subscriptions.push(
    vscode.commands.registerCommand('json-helper.minify-JSON', () => {
      // The code you place here will be executed every time your command is executed
      const editor = vscode.window.activeTextEditor;

      //   to get all languages supported by VSCode
      //   vscode.languages.getLanguages().then((data) => console.log(data));

      if (!editor) {
        vscode.window.showInformationMessage('Please open any file');
      } else {
        const editorText: string = editor.document.getText();

        // get the language of current document
        // editor.document.languageId;

        var firstLine = editor.document.lineAt(0);
        var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        var textRange = new vscode.Range(
          firstLine.range.start,
          lastLine.range.end
        );
        vscode.languages.setTextDocumentLanguage(editor.document, 'json');

        const result = JSON.stringify(JSON.parse(editorText));

        editor
          .edit(function (editBuilder) {
            editBuilder.replace(textRange, result);
          })
          .then((isFullfilled) => {
            // console.log('isFullfilled ', isFullfilled);
          });

        // to get the selected text
        // console.log(editor?.document.getText(editor?.selection));

        // sets language of the given document
      }
    })
  );

  //   Pretty JSON
  context.subscriptions.push(
    vscode.commands.registerCommand('json-helper.pretty-JSON', () => {
      // The code you place here will be executed every time your command is executed
      const editor = vscode.window.activeTextEditor;

      //   to get all languages supported by VSCode
      //   vscode.languages.getLanguages().then((data) => console.log(data));

      if (!editor) {
        vscode.window.showInformationMessage('Please open any JSON file');
      } else if (!supportedLanguages.includes(editor.document.languageId)) {
        vscode.window.showInformationMessage('Please open valid JSON file');
        return;
      } else {
        const editorText: string = editor.document.getText();

        // get the language of current document
        // editor.document.languageId;

        var firstLine = editor.document.lineAt(0);
        var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        var textRange = new vscode.Range(
          firstLine.range.start,
          lastLine.range.end
        );

        vscode.languages.setTextDocumentLanguage(editor.document, 'json');

        const result = JSON.stringify(JSON.parse(editorText), null, 2);

        editor
          .edit(function (editBuilder) {
            editBuilder.replace(textRange, result);
          })
          .then((isFullfilled) => {
            // console.log('isFullfilled ', isFullfilled);
          });

        // to get the selected text
        // console.log(editor?.document.getText(editor?.selection));

        // sets language of the given document
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
