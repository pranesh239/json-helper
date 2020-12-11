import * as vscode from 'vscode';

const supportedLanguages: string[] = ['plaintext', 'json'];

export const performJSONStringifyProcess: (space: number) => void = (space) => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showInformationMessage('Please open any JSON file');
  } else if (!supportedLanguages.includes(editor.document.languageId)) {
    vscode.window.showInformationMessage('Please open valid JSON file');
    return;
  } else {
    const { document } = editor;
    const editorText: string = document.getText();

    var firstLine = document.lineAt(0);
    var lastLine = document.lineAt(document.lineCount - 1);
    var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
    vscode.languages.setTextDocumentLanguage(document, 'json');

    const result = JSON.stringify(JSON.parse(editorText), null, space);

    editor
      .edit(function (editBuilder) {
        editBuilder.replace(textRange, result);
      })
      .then((isFullfilled: boolean) => {
        // add post replace operation
      });
  }
};
