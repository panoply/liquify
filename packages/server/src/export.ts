import { LiquidServer } from './provide/server';
import { LiquidService } from './provide/service';

/**
 * Language Server
 */
export const Server = new LiquidServer();

/**
 * Language Services
 */
export const Service = new LiquidService();
