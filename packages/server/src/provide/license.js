// #!/usr/bin/env node
/*
const os = require('os')
const qs = require('qs')
const { createHash } = require('crypto')

const NetLicensing = require('netlicensing-client/dist/netlicensing-client.node')

const apiKey = '59b5079f-7a84-4f35-af7f-cdedf187a6a3'
const license = 'IYV3P7V66'
const product = 'M6JGUDVU9'

const context = new NetLicensing.Context().setUsername('apiKey').setPassword(apiKey)
const params = new NetLicensing.ValidationParameters().setProductNumber(product)

const validation = async () => {

  const postData = qs.stringify({
    machineId: createHash('sha256').update(os.homedir(), 'utf8').digest('hex'),
    licenceKey: 'hello'
  })

  console.log(postData)

  const licenses = await NetLicensing.ProductService.list(context)
  const validate = await NetLicensing.LicenseeService.validate(context, license, params)

  for (let i = 0; i < licenses.length; i++) {
    console.log(licenses[i].getProperties())
  }

  console.log(validate.getValidators().M6JGUDVU9)

}































    const index = document.ast.findIndex(({ offset, type }) => (
      inRange(start, offset[0], offset[offset.length - 1]) // ||
      // inRange(start, offset[2], offset[3]) || (
      //   type === TokenType.embedded && inRange(
      //     start
      //     , offset[1]
      //     , offset[2]
      //   )
      // )
    ))

    // console.log(document.ast)

    if (rangeLength === 0 && index >= 0) {

      const { offset } = document.ast[index]
      // const token = isOffsetInToken(document.ast[index], start)

      const parsed = scan({
        ...document
        , ast: []
        , diagnostics: []
        , content: Document.getText({
          start: offset[0],
          end: offset[offset.length] + text.length
        })
      }, offset[0])

      if (parsed.ast.length > 0) {

        // const [ node ] = parsed.ast

        /* if (node?.tag === TokenTag.start) {
          node.tag = TokenTag.pair
          node.token.push(token.token[0])
          node.offset.push(...token.offset.map(increment))
        } */

        document.ast.splice(
          index
          , document.ast.length - index - 1
          , ...parsed.ast
        )

        //  const d = diagnostic(document, node, getTokenSpec(node.token[0], node.name))

        return document
      }

    }

    if (rangeLength === 0 && index >= 0) {

      const { type, offset } = document.ast[index]

      if (type === TokenType.embedded && inRange(start, offset[2], offset[3])) {

        Document.embeddedUpdate(document.ast[index], increment)

        diagnostic(
          document,
          document.ast[index], getTokenSpec(
            document.ast[index].token[0]
            , document.ast[index].name
          )
        )

        console.log(document.ast[index])

      } else {

        const token = isOffsetInToken(document.ast[index], start)

        if (token) {

          let $1 = 0
            , $2 = 1

          if (token.tag === TokenTag.start) $1 = 2; $2 = 3

          const parsed = scan({
            ...document
            , ast: []
            , diagnostics: []
            , content: Document.getText({
              start: offset[$1],
              end: offset[$2] + text.length
            })
          }, offset[$1])

          if (parsed.ast.length > 0) {

            const [ node ] = parsed.ast

            if (node?.tag === TokenTag.start) {
              node.tag = TokenTag.pair
              node.token.push(token.token[0])
              node.offset.push(...token.offset.map(increment))
            }

            document.ast.splice(index, 1, node)
            // diagnostic(document, node, getTokenSpec(node.token[0], node.name))

          }

          if (type === TokenType.control || type === TokenType.iteration) {

          }
        }
      }
    } else if (text.length > 0 && !/\s+/.test(text)) {

      document.ast = []
      document.diagnostics = []

      return scan(document)

    }

    document.ast.forEach((node, i) => {

      const {
        offset
        , token
        , type
        , lineOffset
        , objects
        , children
      } = node

      if (rangeLength > 0) {
        return ((
          start <= offset[0] && end >= offset[1]
        ) ? (
            document.ast.splice(i, 1)
          ) : (
            offset.length <= 2
          ) && (
            (
              start <= offset[0] && end > offset[0] && end < offset[1]
            ) || (
              start >= offset[0] && start < offset[1] && end >= offset[1]
            )
          ) ? (
              document.ast.splice(i, 1)
            ) : (
              start <= offset[2] && end >= offset[3]
            ) || (
              start > offset[2] && start < offset[3] && end >= offset[3]
            ) || (
              start <= offset[2] && end > offset[2] && end < offset[3]
            )) && document.ast.splice(
          i
          , 1
          , {
            ...document.ast[i],
            tag: TokenTag.start,
            token: [ token[0] ],
            offset: offset.slice(0, 2)
          }
        )
      }

      if (i === index) return

      if (offset[0] > start) {
        document.ast[i].offset = offset.map(inc => increment(inc))

        if (objects) {

          for (const prop in objects) {
            delete Object.assign(document.ast[i].objects, {
              [increment(prop)]: objects[prop]
            })[prop]
          }

          // console.log(objects, document.ast[i], rangeLength, text, text.length)

        }

        if (type === TokenType.control || type === TokenType.iteration) {
          if (children && children.length > 0 && children.some(child => child?.objects)) {
            children.forEach((c, k) => {
              if (c?.objects) document.ast[i].children[k].objects = tagObjects(c.objects)
            })
          }
        }

      } else if (offset.length > 2 && offset[2] > start) {
        document.ast[i].offset.splice(2, 2, ...offset.slice(2).map(inc => increment(inc)))
      }

      if (lineOffset) {
        document.ast[i].lineOffset = Document.positionAt(document.ast[i].offset[0]).line
      }

    })

  })


  function tagObjects (objects) {

    const keys = Object.keys(objects)

    return keys.length > 0 ? keys.reduce((object, prop) => {

      object[increment(prop)] = objects[prop]

      return object

    }, {}) : objects

  }

  function removal (offset, token, i) {

    return ((
      start <= offset[0] && end >= offset[1]
    ) ? (
        document.ast.splice(i, 1)
      ) : (
        offset.length <= 2
      ) && (
        (
          start <= offset[0] && end > offset[0] && end < offset[1]
        ) || (
          start >= offset[0] && start < offset[1] && end >= offset[1]
        )
      ) ? (
          document.ast.splice(i, 1)
        ) : (
          start <= offset[2] && end >= offset[3]
        ) || (
          start > offset[2] && start < offset[3] && end >= offset[3]
        ) || (
          start <= offset[2] && end > offset[2] && end < offset[3]
        )
    ) && document.ast.splice(
      i
      , 1
      , {
        ...document.ast[i],
        tag: TokenTag.start,
        token: [ token[0] ],
        offset: offset.slice(0, 2)
      }
    )

  }

  //  console.log(ast)
  return document



export default (
  document
  , {
    text
    , rangeLength
    , range: {
      start,
      end
    }
  }
) => {

  const { ast } = document

  if (!ast.length) return scan(document)

  const validate = diagnostic(document)

  const increment = parse.setTokenOffset(rangeLength, text.length)
  const astIndex = ast.findIndex(({ offset }) => (
    parse.inRange(start, offset[0], offset[1]) ||
    parse.inRange(start, offset[2], offset[3])
  ))

  // We are inside a token
  if (astIndex >= 0) {

    const token = parse.isOffsetInToken(ast[astIndex], start)
    const { offset } = ast[astIndex]

    if (token) {

      let $1 = 0
        , $2 = 1

      // Changed node is a start tag, eg: `{% tag %}`
      // Adjust the offsets to use end position offsets
      if (token.tag === TokenTag.start) {
        $1 = 2
        $2 = 3
      }

      // Extract the changed text
      const node = scan(document, {
        ast: []
        , index: offset[$1]
        , isIncrement: true
        , content: document.getText(Document.range(offset[$1], offset[$2] + text.length))
      })[0]

      if (node) {

        if (node?.tag === TokenTag.start) {
          node.tag = TokenTag.pair
          node.token.push(token.token[0])
          node.offset.push(...token.offset.map(increment))
        }

        ast.splice(astIndex, 1, node)
        validate(node, parse.getTokenSpec(node.token[0], node.name))

      }
    }

  } else if (rangeLength > 0 && astIndex < 0) {

    const change = ast.findIndex(({ offset: [ offset ] }) => offset > start)

    if (change >= 0) {

      const length = ast.length

      for (let i = 0; i < length; i++) {
        if (i >= change) {
          ast[i].offset.splice(
            0
            , ast[i].offset.length
            , ...ast[i].offset.map(offset => offset - rangeLength)
          )
        } else if (ast[i].offset.length > 2 && ast[i].offset[2] > start) {
          ast[i].offset.splice(
            2
            , 2
            , ast[i].offset[2] - rangeLength
            , ast[i].offset[3] - rangeLength
          )
        }
      }

      validate(ast[change], parse.getTokenSpec(ast[change].token[0], ast[change].name))

      return document
    }

  } else if (text.length > 2 && /[{%}]/g.test(text)) {

   console.log('RE PARSE')
   return scan(document)

   }

  for (let i = 0; i < ast.length; i++) {
    if (i === astIndex) continue
    if (ast[i].offset[0] >= start) {
      ast[i].offset = ast[i].offset.map(increment)
    } else if (ast[i].offset.length > 2 && ast[i].offset[2] >= start) {
      ast[i].offset.splice(
        2
        , 2
        , ast[i].offset[2] + text.length
        , ast[i].offset[3] + text.length
      )
    }
  }

  console.log(ast)
  return document

}






    ast.forEach(({ offset, token }, i) => ((
      start <= offset[0] && end >= offset[1]
    ) ? (
        ast.splice(i, 1)
      ) : (
        offset.length <= 2
      ) && (
        (
          start <= offset[0] && end > offset[0] && end < offset[1]
        ) || (
          start >= offset[0] && start < offset[1] && end >= offset[1]
        )
      ) ? (
          ast.splice(i, 1)
        ) : (
          start <= offset[2] && end >= offset[3]
        ) || (
          start > offset[2] && start < offset[3] && end >= offset[3]
        ) || (
          start <= offset[2] && end > offset[2] && end < offset[3]
        )
    ) && ast.splice(
      i
      , 1
      , {
        ...ast[i],
        tag: TokenTag.start,
        token: [ token[0] ],
        offset: offset.slice(0, 2)
      }
    ))






((
      newToken => {

        if (newToken) {

          let $1 = 0
            , $2 = 1

          // Changed node is a start tag, eg: `{% tag %}`
          // Adjust the offsets to use end position offsets
          if (newToken.tag === TokenTag.start) {
            $1 = 2
            $2 = 3
          }

          // Extract the changed text
          const node = scan(document, {
            ast: []
            , index: offset[$1]
            , isIncrement: true
            , content: document.getText(
              Document.range(
                offset[$1]
                , offset[$2] + text.length
              )
            )
          })[0]

          if (node) {

            if (node?.tag === TokenTag.start) {
              node.tag = TokenTag.pair
              node.token.push(newToken.token[0])
              node.offset.push(...newToken.offset.map(increment))
            }

            ast.splice(i, 1, node)

            console.log(token)

            return

          }

        }

        console.log(token)

        ast.splice(
          i
          , 1
          , {
            ...ast[i]
            , offset: offset.length > 2 && offset[2] > start ? offset.splice(
              2
              , 2
              , rangeLength > 0 ? offset[2] + rangeLength : offset[2] - rangeLength
              , rangeLength > 0 ? offset[3] + rangeLength : offset[3] - rangeLength
            ) : offset.map(off => rangeLength > 0
              ? off - rangeLength
              : off + rangeLength)
          }
        )

      }
    )((
      start > offset[0] && end < offset[1]
    ) ? ({
        ...ast[i]
        , tag: tag === TokenTag.pair
          ? TokenTag.close
          : tag
        , token: token.length === 1
          ? token
          : token.slice(1)
        , offset: offset.length === 2
          ? offset
          : offset.slice(2)
      }) : (
        start > offset[2] && end < offset[3]
      ) ? ({
          ...ast[i]
          , tag: TokenTag.start
          , token: token.slice(0, 1)
          , offset: offset.slice(0, 2)
        }) : false)
    ))



    else if (start <= offset[0] && end > offset[0] && end < offset[1]) ast.splice(i, 1)
    else if (start >= offset[0] && start < offset[1] && end >= offset[1]) ast.splice(i, 1)
    else if (offset.length > 2) {
      if (start <= offset[2] && end >= offset[3]) ast.splice(i, 1)
      else if (start < offset[2] && end > offset[2] && end < offset[3]) ast.splice(i, 1)
      else if (start > offset[2] && start < offset[3] && end >= offset[3]) ast.splice(i, 1)
    }

validation()





















import scan from './scanner'
import _ from 'lodash'
import { Characters, TokenTag, TokenType } from './lexical'
import { inRange, setTokenOffset, isOffsetInToken, getTokenSpec } from './utils'
import { Document, Server } from '../export'
import diagnostic from './../service/diagnostics/'

const closest = (index, { offset }) => offset.reduce((prev, current) => (
  Math.abs(current - index) <= Math.abs(prev - index)
    ? current
    : prev
))
fault (document) => {

  // document.ast = []
  // document.diagnostics = []
  // return scan(document)

  if (!document.ast.length) return scan(document)

  document.contentChanges.forEach(({
    rangeLength
    , text
    , range: {
      start
      , end
    }

  }) => {

    console.log(document.contentChanges)

    // const validate = diagnostic(document)
    const increment = setTokenOffset(rangeLength, text.length)
    const index = document.ast.findIndex(({ offset, type }) => (
      inRange(start, offset[0], offset[1]) ||
      inRange(start, offset[2], offset[3]) || (
        type === TokenType.embedded && inRange(
          start
          , offset[1]
          , offset[2]
        )
      )
    ))

    if (index >= 0) {

      const { type, offset } = document.ast[index]

      if (type === TokenType.embedded && inRange(start, offset[2], offset[3])) {

        Document.embeddedUpdate(document.ast[index], increment)

      } else {

        const token = isOffsetInToken(document.ast[index], start)

        if (token) {

          let $1 = 0
            , $2 = 1

          // Changed node is a start tag, eg: `{% tag %}`
          // Adjust the offsets to use end position offsets
          if (token.tag === TokenTag.start) {
            $1 = 2
            $2 = 3
          }

          const parsed = scan({
            ...document
            , ast: []
            , diagnostics: []
            , content: Document.getText({
              start: offset[$1],
              end: offset[$2] + text.length
            })
          }, offset[$1])

          if (parsed.ast.length > 0) {

            const [ node ] = parsed.ast

            if (node?.tag === TokenTag.start) {
              node.tag = TokenTag.pair
              node.token.push(token.token[0])
              node.offset.push(...token.offset.map(increment))
            }

            document.ast.splice(index, 1, node)
            // document.diagnostics = parsed.diagnostics

            diagnostic(document, node, getTokenSpec(node.token[0], node.name))

          }

          if (type === TokenType.control || type === TokenType.iteration) {

          }
        }
      }
    }

    document.ast.forEach(({
      offset
      , token
      , type
      , lineOffset
      , objects
      , children
    }, i) => {

      if (i === index) return

      if (offset[0] > start) {
        document.ast[i].offset = offset.map(inc => increment(inc))

        if (objects) {

          for (const prop in objects) {
            delete Object.assign(document.ast[i].objects, {
              [increment(prop)]: objects[prop]
            })[prop]
          }

          console.log(objects, document.ast[i], rangeLength, text, text.length)

        }

        if (type === TokenType.control || type === TokenType.iteration) {
          if (children && children.length > 0 && children.some(child => child?.objects)) {
            children.forEach((c, k) => {
              if (c?.objects) document.ast[i].children[k].objects = tagObjects(c.objects)
            })
          }
        }

      } else if (offset.length > 2 && offset[2] > start) {
        document.ast[i].offset.splice(2, 2, ...offset.slice(2).map(inc => increment(inc)))
      }

      if (lineOffset) {
        document.ast[i].lineOffset = Document.positionAt(document.ast[i].offset[0]).line
      }

    })

  })

  // console.log(document.ast)

  return document

  function tagObjects (objects) {

    const keys = Object.keys(objects)

    return keys.length > 0 ? keys.reduce((object, prop) => {

      object[increment(prop)] = objects[prop]

      return object

    }, {}) : objects

  }

  function removal (offset, token, i) {

    return ((
      start <= offset[0] && end >= offset[1]
    ) ? (
        document.ast.splice(i, 1)
      ) : (
        offset.length <= 2
      ) && (
        (
          start <= offset[0] && end > offset[0] && end < offset[1]
        ) || (
          start >= offset[0] && start < offset[1] && end >= offset[1]
        )
      ) ? (
          document.ast.splice(i, 1)
        ) : (
          start <= offset[2] && end >= offset[3]
        ) || (
          start > offset[2] && start < offset[3] && end >= offset[3]
        ) || (
          start <= offset[2] && end > offset[2] && end < offset[3]
        )
    ) && document.ast.splice(
      i
      , 1
      , {
        ...document.ast[i],
        tag: TokenTag.start,
        token: [ token[0] ],
        offset: offset.slice(0, 2)
      }
    )

  }

  //  console.log(ast)
  return document

}














*/

export class License {}


 if (start <= offset[0] && end >= offset[offset.length - 1]) {

      ast.splice(i, 1)
      console.log('removed start or singular', name)
      continue

    } else if (offset.length <= 2) {

      if (start <= offset[0] && end > offset[0] && end < offset[1]) {

        ast.splice(i, 1)
        console.log('{% or {{ left delimeter', name)
        continue

      } else if (start >= offset[0] && start < offset[1] && end >= offset[1]) {

        ast.splice(i, 1)
        console.log('%} or }}, rightdelimeter removed', name)
        continue

      }
    } else if (start <= offset[0] && end >= offset[3]) {

      ast.splice(i, 1)
      console.log('removed block tag', name)
      continue

    } else if (start < offset[2] && end > offset[2] && end < offset[3]) {

      ast.splice(i, 1)
      console.log('{%, left delimeter:', name)
      continue

    } else if (start > offset[2] && start < offset[3] && end >= offset[3]) {

      ast.splice(i, 1)
      console.log('%}, right delimeter:', name)
      continue

    } else if (start <= offset[2] && end > offset[3]) {

      ast.splice(i, 1)
      console.log('removed end block', name)
      continue

    }
