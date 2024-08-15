import * as vscode from "vscode"

function moveCamelCaseLeft() {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    const document = editor.document
    const position = editor.selection.active

    const textBeforeCursor = document.getText(
      new vscode.Range(position.with(undefined, 0), position)
    )
    const match = textBeforeCursor.match(/([A-Z][a-z]*)$/)

    if (match) {
      const newPosition = position.with(undefined, position.character - match[0].length)
      editor.selection = new vscode.Selection(newPosition, newPosition)
    } else {
      vscode.commands.executeCommand("cursorWordLeft")
    }
  }
}

function moveCamelCaseRight() {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    const document = editor.document
    const position = editor.selection.active

    const textAfterCursor = document.getText(
      new vscode.Range(
        position,
        position.with(undefined, document.lineAt(position.line).text.length)
      )
    )
    const match = textAfterCursor.match(/^[a-z]*[A-Z]/)

    if (match) {
      const newPosition = position.translate(0, match[0].length)
      editor.selection = new vscode.Selection(newPosition, newPosition)
    } else {
      vscode.commands.executeCommand("cursorWordRight")
    }
  }
}

function selectCamelCaseLeft() {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    const document = editor.document
    const selection = editor.selection
    const position = selection.active

    const textBeforeCursor = document.getText(
      new vscode.Range(position.with(undefined, 0), position)
    )
    const match = textBeforeCursor.match(/([A-Z][a-z]*)$/)

    if (match) {
      const newPosition = position.with(undefined, position.character - match[0].length)
      editor.selection = new vscode.Selection(selection.anchor, newPosition)
    } else {
      vscode.commands.executeCommand("cursorWordLeftSelect")
    }
  }
}

function selectCamelCaseRight() {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    const document = editor.document
    const selection = editor.selection
    const position = selection.active

    const textAfterCursor = document.getText(
      new vscode.Range(
        position,
        position.with(undefined, document.lineAt(position.line).text.length)
      )
    )
    const match = textAfterCursor.match(/^[a-z]*[A-Z]/)

    if (match) {
      const newPosition = position.translate(0, match[0].length)
      editor.selection = new vscode.Selection(selection.anchor, newPosition)
    } else {
      vscode.commands.executeCommand("cursorWordRightSelect")
    }
  }
}

function deleteCamelCaseLeft() {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    const document = editor.document
    const position = editor.selection.active

    const textBeforeCursor = document.getText(
      new vscode.Range(position.with(undefined, 0), position)
    )
    const match = textBeforeCursor.match(/([A-Z][a-z]*)$/)

    if (match) {
      const newPosition = position.with(undefined, position.character - match[0].length)
      editor.edit((editBuilder) => {
        editBuilder.delete(new vscode.Range(newPosition, position))
      })
    } else {
      vscode.commands.executeCommand("deleteWordLeft")
    }
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
