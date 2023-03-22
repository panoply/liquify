import { StandardProperties, StandardPropertiesHyphen } from 'csstype';

interface IStyle extends StandardProperties, StandardPropertiesHyphen {

  ':hover'?: StandardProperties
}

declare interface IBSS {

  (styles: IStyle): { class: string; style: StandardProperties }

}

declare const BSS: IBSS;
export = BSS;

// @ts-ignore
declare module 'bss'
