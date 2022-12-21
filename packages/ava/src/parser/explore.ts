/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
import type { ExecutionContext } from 'ava';
import type { IAST, INode } from '@liquify/liquid-parser';
import chalk from 'chalk';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

type StackProps = Array<'scope' | 'objects' | 'arguments' | 'filters'>

export const explore = {
  ast: undefined,
  stack (...args: [ props?: StackProps, callback?: ((ast: INode) => void) | undefined ]) {

    let props: StackProps = [];
    let calls: (ast: INode) => void;

    if (args.length === 1) {
      if (Array.isArray(args[0])) {
        props = args[0];
      } else if (typeof args[0] === 'function') {
        calls = args[0];
      }
    } else if (args.length === 2) {
      if (Array.isArray(args[0])) {
        props = args[0];
      } else if (typeof args[1] === 'function') {
        calls = args[1];
      }
    }

    const arr: any = [];

    for (let i = 0; i < this.ast.nodes.length; i++) {

      const node = this.ast.nodes[i];
      const stack = [ node ];

      for (const child of stack) {

        if (props.length > 0) {

          if (props.includes('scope')) {
            console.log(chalk.cyan.dim(node.tag) + chalk.gray(' (scope)'));
            console.log(child.scope, '\n');
          }

          if (props.includes('objects')) {
            console.log(chalk.cyan.dim(node.tag) + chalk.gray(' (objects)'));
            console.log(child.objects, '\n');
          }

          if (props.includes('filters')) {
             console.log(chalk.cyan.dim(node.tag) + chalk.gray(' (filters)'));
            console.log(child.filters, '\n');
          }

          if (props.includes('arguments')) {
            console.log(chalk.cyan.dim(node.tag) + chalk.gray(' (arguments)'));
            console.log(child.arguments, '\n');
          }

          if (typeof calls === 'function') calls(child);

          continue;
        }

        arr.push({
          tag: child.tag,
          root: child.root,
          index: child.index,
          start: child.start,
          type: child.type,
          end: child.end,
          scope: child.scope,
          offsets: child.offsets,
          errors: child.errors,
          languageId: child.languageId,
          literal: child.regionLiteral,
          var: child.var,
          line: child.line,
          children: child.children.map(({ tag }) => tag),
          filters: child.filters || null,
          arguments: child.arguments || null,
          objects: child.objects || null,
          parent: child.parent.tag === 'ROOT' ? 'ROOT' : {
            tag: child.parent.tag,
            start: child.parent.start,
            end: child.parent.end,
            index: child.parent.index,
            root: child.parent.root,
            languageId: child.parent.languageId,
            children: child.parent.children.length
          }

        });

        if (child.parent) stack.push(...child.children);
        if (typeof calls === 'function') calls(child);

      }

    }

    return arr;

  },

  /**
   * Parse Errors
   *
   * Returns readable diagnostic errors for inspecting
   * the parse operations.
   */
  errors: (t: ExecutionContext<unknown>) => (ast: IAST) => {

    const errs = ast.diagnostics();

    if (errs !== null) {
      for (const diagnostic of errs.diagnostics) {
        t.log(chalk.gray.dim('---------------------------------------------'));
        t.log(chalk.gray('message: ') + chalk.red(diagnostic.message));
        t.log(chalk.gray('capture: ') + chalk.yellowBright(JSON.stringify(ast.getText(diagnostic.range))));
        t.log(chalk.blue.dim('diagnostic:'), {
          doFormat: diagnostic.data.doFormat,
          range: diagnostic.range
        }, '\n');
      }
    }
  }

};
