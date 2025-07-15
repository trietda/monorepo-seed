# Code convention

You MUST follow the code convention below when creating new component or
editting old ones.

## For React

- Do not use `React.FC` for typing React function component. Use function
  declaration.

  Wrong:

  ```typescript
  const Button: React.FC<any> = () => {
    // Implementations here
  };
  ```

  Right:

  ```typescript
  function Button() {
    // Implementations here
  }
  ```

- Do not use anonymous type for component propperties. Always create
  interface/type for all the components, prefer interface rather than type, in
  case inteface is not available due to Typescript limitation, use type.

  Wrong:

  ```typescript
  function Button(props: { label: string }) {
    // Implementations here
  }
  ```

  Right:

  ```typescript
  interface ButtonProps {
    label: string;
  }

  function Button(props: ButtonProps) {
    // Implementations here
  }
  ```

- Do not deconstruct component function property in the function declaration.
  Deconstruct it in the function body.

  Wrong:

  ```ts
  function Button({ onClick }: ButtonProps) {
    /*... */
  }
  ```

  Right:

  ```ts
  function Button(props: ButtonProps) {
    const { onClick = () => {} } = props;
    // Rest of the implementation
  }
  ```

- Prefer using compositional pattern with nested components rather than using
  object property.

  Prefer:

  ```jsx
  <Menu>
    <Menu.Item label="Item 1" href="/item1" >
    <Menu.Item label="Item 2" href="/item2" >
    <Menu.Item label="Item 3" href="/item3" >
  </Menu>
  ```

  Rather than:

  ```jsx
  <Menu
    items={[
      { label: "Item 1", href: "/item1" },
      { label: "Item 2", href: "/item2" },
      { label: "Item 3", href: "/item3" },
    ]}
  >
  ```

- Prevent adding uncecessary `div`
  - For components, always expose container `className` so that it can be
    overrided later

## For style

- Prefer using tailwindcss over traditional CSS for component styling
- If traditional CSS styling is required, prefer using CSS module
- When using CSS module, group CSS property in this order, separated by an
  empty line:
  - Position
  - Display
  - Width, height
  - Outline
  - Box model related, from outside to inside: outline, border, margin, padding
  - Background and color
  - Text
  - Transformation
  - Animation
  - Others

  E.g.

  ```css
  .selector {
    display: flex;
    flex-direction: column;

    width: 100px;
    height: 20px;

    border: solid 0.125rem;
    margin: 0.5rem;
    padding: 0.5rem;

    color: #000000;
    background: #ffffff;

    font-size: 1rem;
    font-family: sans-serif;
  }
  ```