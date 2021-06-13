import { LanguageClient } from 'vscode-languageclient/node';
import { ExtensionContext } from 'vscode';
import { LiquidClient } from './provide/client';

let client: LanguageClient;

export function activate (context: ExtensionContext) {

  client = LiquidClient(context);
  client.start();

}

export function deactivate (): Thenable<void> | undefined {

  return !client ? undefined : client.stop();

}
