import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
  ClientContext,
} from "aws-lambda";

export interface NetlifyFunctionEvent extends APIGatewayProxyEvent {
  path: string;
  httpMethod: string;
  headers: { [header: string]: string };
  queryStringParameters: { [param: string]: string };
  body: string;
  isBase64Encoded: boolean;
}

export interface NetlifyClientContext extends ClientContext {
  identity?: {
    url: string;
    token: string;
  };
  user?: {
    source?: string;
    [key: string]: any;
  };
}

export interface NetlifyFunctionContext extends Context {
  clientContext?: NetlifyClientContext;
  _stopped?: boolean;
}

export interface NetlifyFunctionResult extends APIGatewayProxyResult {
  app_metadata?: any;
  user_metadata?: any;
}

export declare type Lambda = (
  event: NetlifyFunctionEvent,
  context: NetlifyFunctionContext,
  callback: Callback<NetlifyFunctionResult>
) => void | Promise<NetlifyFunctionResult>;

export type NetlifyCallbackFunction = Callback;

/**
 * Namespace the Centra API
 */
export as namespace Netlify;
