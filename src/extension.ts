import * as vscode from "vscode"

function moveCamelCaseRight() {
  const editor = vscode.window.activeTextEditor
  if (!editor) return

  const document = editor.document
  const position = editor.selection.active
  const lineText = document.lineAt(position.line).text
  const textAfterCursor = lineText.slice(position.character)

  // Find the next camelCase boundary (Uppercase or the start of the next word)
  const match = textAfterCursor.match(/([A-Z][a-z]*)|([a-z]+(?=[A-Z]))/)

  if (match && match.index !== undefined) {
    const newPosition = position.translate(0, match.index + match[0].length)
    editor.selection = new vscode.Selection(newPosition, newPosition)
  } else {
    const endOfLine = document.lineAt(position.line).range.end
    editor.selection = new vscode.Selection(endOfLine, endOfLine)
  }
}

function moveCamelCaseLeft() {
  const editor = vscode.window.activeTextEditor
  if (!editor) return

  const document = editor.document
  const position = editor.selection.active
  const lineText = document.lineAt(position.line).text
  const textBeforeCursor = lineText.slice(0, position.character)

  // Find the previous camelCase boundary (Uppercase or the end of the previous word)
  const match = [...textBeforeCursor.matchAll(/([A-Z][a-z]*)|([a-z]+(?=[A-Z]))/g)].pop()

  if (match && match.index !== undefined) {
    const newPosition = position.with(position.line, match.index)
    editor.selection = new vscode.Selection(newPosition, newPosition)
  } else {
    vscode.commands.executeCommand("cursorWordLeft")
  }
}

function selectCamelCaseRight() {
  const editor = vscode.window.activeTextEditor
  if (!editor) return

  const document = editor.document
  const selection = editor.selection
  const position = selection.active
  const lineText = document.lineAt(position.line).text
  const textAfterCursor = lineText.slice(position.character)

  const match = textAfterCursor.match(/([A-Z][a-z]*)|([a-z]+(?=[A-Z]))/)

  if (match && match.index !== undefined) {
    const newPosition = position.translate(0, match.index + match[0].length)
    editor.selection = new vscode.Selection(selection.anchor, newPosition)
  } else {
    const endOfLine = document.lineAt(position.line).range.end
    editor.selection = new vscode.Selection(selection.anchor, endOfLine)
  }
}

function selectCamelCaseLeft() {
  const editor = vscode.window.activeTextEditor
  if (!editor) return

  const document = editor.document
  const selection = editor.selection
  const position = selection.active
  const lineText = document.lineAt(position.line).text
  const textBeforeCursor = lineText.slice(0, position.character)

  const match = [...textBeforeCursor.matchAll(/([A-Z][a-z]*)|([a-z]+(?=[A-Z]))/g)].pop()

  if (match && match.index !== undefined) {
    const newPosition = position.with(position.line, match.index)
    editor.selection = new vscode.Selection(selection.anchor, newPosition)
  } else {
    vscode.commands.executeCommand("cursorWordLeftSelect")
  }
}
function deleteCamelCaseLeft() {
  const editor = vscode.window.activeTextEditor
  if (!editor) return

  const document = editor.document
  const position = editor.selection.active
  const lineText = document.lineAt(position.line).text
  const textBeforeCursor = lineText.slice(0, position.character)

  const match = [...textBeforeCursor.matchAll(/([A-Z][a-z]*)|([a-z]+(?=[A-Z]))/g)].pop()

  if (match && match.index !== undefined) {
    const newPosition = position.with(position.line, match.index)
    editor.edit((editBuilder) => {
      editBuilder.delete(new vscode.Range(newPosition, position))
    })
  } else {
    vscode.commands.executeCommand("deleteWordLeft")
  }
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.moveCamelCaseLeft", moveCamelCaseLeft)
  )
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.moveCamelCaseRight", moveCamelCaseRight)
  )
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.selectCamelCaseLeft", selectCamelCaseLeft)
  )
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.selectCamelCaseRight", selectCamelCaseRight)
  )
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.deleteCamelCaseLeft", deleteCamelCaseLeft)
  )
}

export function deactivate() {}
