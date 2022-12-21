import test from 'ava';

const chars = {
  ATT: 64, // @
  HSH: 35, // #
  LPR: 40, // (
  RPR: 41, // )
  LCB: 123, // {
  RCB: 125, // }
  LSB: 91, // []
  RSB: 93, // ]
  LAN: 60, // <
  RAN: 62, // >
  BNG: 33, // !
  DSH: 45, // -
  PER: 37, // %
  EQS: 61, // =
  DQO: 34, // "
  SQO: 39, // '
  TQO: 96, // `
  WSP: 32, //
  NWL: 10, // \n
  FWS: 47, // /
  QWS: 63, // ?
  ARS: 42, // *
  COL: 58, // :
  SEM: 59, // ;
  COM: 44, // ,
  PLS: 43 // +
};

test('Unit: Characted Codes (Enum) Maps', t => {

  t.is('@'.charCodeAt(0), chars.ATT);
  t.is('#'.charCodeAt(0), chars.HSH);
  t.is('('.charCodeAt(0), chars.LPR);
  t.is(')'.charCodeAt(0), chars.RPR);
  t.is('{'.charCodeAt(0), chars.LCB);
  t.is('}'.charCodeAt(0), chars.RCB);
  t.is('['.charCodeAt(0), chars.LSB);
  t.is(']'.charCodeAt(0), chars.RSB);
  t.is('<'.charCodeAt(0), chars.LAN);
  t.is('>'.charCodeAt(0), chars.RAN);
  t.is('!'.charCodeAt(0), chars.BNG);
  t.is('-'.charCodeAt(0), chars.DSH);
  t.is('%'.charCodeAt(0), chars.PER);
  t.is('='.charCodeAt(0), chars.EQS);
  t.is('"'.charCodeAt(0), chars.DQO);
  t.is("'".charCodeAt(0), chars.SQO);
  t.is('`'.charCodeAt(0), chars.TQO);
  t.is(' '.charCodeAt(0), chars.WSP);
  t.is('\n'.charCodeAt(0), chars.NWL);
  t.is('/'.charCodeAt(0), chars.FWS);
  t.is('?'.charCodeAt(0), chars.QWS);
  t.is('*'.charCodeAt(0), chars.ARS);
  t.is(':'.charCodeAt(0), chars.COL);
  t.is(';'.charCodeAt(0), chars.SEM);
  t.is(','.charCodeAt(0), chars.COM);
  t.is('+'.charCodeAt(0), chars.PLS);
});
