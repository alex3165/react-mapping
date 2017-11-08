# React-mapping
Video projection mapping library in React.

Contain the following component:
- Layer: Allow you to transform the children element as you wish (3d tranform and translate)
- Grid: Add a background grid to help with accuracy while you are mapping in edit mode

This is a work in progress library.

# Documentation

## Layer

Allow you to transform the children element as you wish (3d tranform and translate)

### How to use
```jsx
  <Layer isEditMode={true}>
    <video src="A_VIDEO_SOURCE" style={{ width: 640, height: 390 }}/>
  </Layer>
```

### Properties
- **style** : `React.CSSProperties` Style applied to the container of the children element
- **anchorStyle** : `React.CSSProperties` Style applied to the anchor component
- **className** : `string` Classes applied to the container of the children element
- **anchorClassName** : `string` Classes applied to the anchor component
- **isEditMode** : `boolean` if true, switch to edit mode and make anchors visible, if false, switch to view mode and anchor are not visible.
- **x** : `number` Initial x position of the child element
- **y** : `number` Initial y position of the child element

------
## Grid

### How to use
```jsx
  <Grid/>
```

### Properties
- **rows** : `number` number of rows to display
- **columns** : `number` number of columns to display


## TODO

### Layer
- Add layer grid
- Add magnet

- Add reset functionality
- Add more key controls
- Add save to localstorage
- Add layer container style when selecting a layer

## Thanks

This library has been inspired from the following blog posts / library:
- http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
- https://bl.ocks.org/mbostock/10571478
- https://github.com/glowbox/maptasticjs
