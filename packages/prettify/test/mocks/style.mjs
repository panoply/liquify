
/**
 * Unformatted Style Mock data
 *
 * Mock represents unformatted JSON
 */
export const style_unformatted = `

img { padding-top: 40px; padding-right: 25px; padding-bottom: 40px; padding-left: 25px; }

body {background-image: url("barn.jpg");
  background-repeat: no-repeat;
  background-position: right top;
  background-attachment: fixed;
}

`;

/**
 * Invalid style Mock data
 *
 * Error is is a missing comma character located within the
 * `tags[]`array at `officia`
 */
export const style_invalid = `
  background-repeat: no-repeat;
  background-position: right top;
  background-attachment: fixed;
}
`;

export const style_with_liquid = `
.class1 {
width: auto;
}

.class {
width: auto;

font-size: {{ some | append: '' }};
color: aliceblue;
background: {{ something.prop }};
font-size: {{ product }};
background-color: aliceblue;
}

{% if condition and bar %}
.some > .class {
  width: 100px;
  background: {{ something.prop }};
  font-size: 120px;
}
{% endif %}



body {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
-webkit-overflow-scrolling: touch;
color: red;
}

main {
height: 100vh;
}

h1 {
font-weight: {{ something.prop | filter: 'foo' }};
font-size: {{ something.prop | filter: 'foo' }};
line-height: 4.2rem;
}

p {
font-weight: 400;
color: rgb(211, 211, 211);
font-size: 1.1rem;
font-family: {{ something.prop | filter: 'foo' }};
}


`;
