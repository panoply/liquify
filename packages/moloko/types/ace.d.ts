

declare module 'ace' {

    // @ts-expect-error
    import type { Editor, TextMode, IEditSession, Document, Config } from './editor'

    /**
     * Provides access to require in packed noconflict mode
     * @param moduleName
    **/
    export function require(moduleName: string): any;

    /**
     * Embeds the Ace editor into the DOM, at the element provided by `el`.
     * @param el Either the id of an element, or the element itself
    **/
    export function edit(el: string): Editor;

    /**
     * Embeds the Ace editor into the DOM, at the element provided by `el`.
     * @param el Either the id of an element, or the element itself
    **/
   export function edit(el: HTMLElement): Editor;

    /**
     * Creates a new [[EditSession]], and returns the associated [[Document]].
     * @param text {:textParam}
     * @param mode {:modeParam}
    **/
    export function createEditSession(text: Document, mode: TextMode | string): IEditSession;

    /**
     * Creates a new [[EditSession]], and returns the associated [[Document]].
     * @param text {:textParam}
     * @param mode {:modeParam}
    **/
    export function createEditSession(text: string, mode: TextMode | string): IEditSession;

     /**
     * Apply global configuration
    **/
    export const config: Config

}
