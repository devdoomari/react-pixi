module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * Copyright (c) 2014-2015 Gary Haussmann
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	//
	// Lots of code here is based on react-art: https://github.com/facebook/react-art
	//


	"use strict";

	var _typeof2 = __webpack_require__(1);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _getIterator2 = __webpack_require__(69);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _react = __webpack_require__(74);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(75);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _pixi = __webpack_require__(76);

	var PIXI = _interopRequireWildcard(_pixi);

	var _ReactMultiChild = __webpack_require__(77);

	var _ReactMultiChild2 = _interopRequireDefault(_ReactMultiChild);

	var _ReactElement = __webpack_require__(78);

	var _ReactElement2 = _interopRequireDefault(_ReactElement);

	var _ReactUpdates = __webpack_require__(79);

	var _ReactUpdates2 = _interopRequireDefault(_ReactUpdates);

	var _objectAssign = __webpack_require__(80);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _emptyObject = __webpack_require__(81);

	var _emptyObject2 = _interopRequireDefault(_emptyObject);

	var _warning = __webpack_require__(83);

	var _warning2 = _interopRequireDefault(_warning);

	var _ReactPIXIMonkeyPatch = __webpack_require__(85);

	var _ReactPIXIMonkeyPatch2 = _interopRequireDefault(_ReactPIXIMonkeyPatch);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _ReactPIXIMonkeyPatch2.default)();

	//
	// Generates a React component by combining several mixin components
	//

	function createPIXIComponent(name) {

	  var ReactPIXIComponent = function ReactPIXIComponent(element) {
	    /* jshint unused: vars */
	    this.node = null;
	    this._mountImage = null;
	    this._renderedChildren = null;
	    this._displayObject = null;
	    this._currentElement = element;
	    this._nativeParent = null;
	    this._nativeContainerInfo = null;
	  };
	  ReactPIXIComponent.displayName = name;

	  for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    mixins[_key - 1] = arguments[_key];
	  }

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = (0, _getIterator3.default)(mixins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var m = _step.value;

	      (0, _objectAssign2.default)(ReactPIXIComponent.prototype, m);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return ReactPIXIComponent;
	}

	//
	// Parse a value as a PIXI.Point.
	//

	function parsePoint(val) {
	  var arr;
	  if (typeof val === 'string') {
	    arr = val.split(',').map(Number);
	  } else if (typeof val === 'number') {
	    arr = [val];
	  } else if (Array.isArray(val)) {
	    // shallow copy the array
	    arr = val.slice();
	  }

	  return arr;
	}

	function isPointType(v) {
	  return v instanceof PIXI.Point || v instanceof PIXI.ObservablePoint;
	}

	//
	// Set props on a DisplayObject by checking the type. If a PIXI.Point or
	// a PIXI.ObservablePoint is having its value set, then either a comma-separated
	// string with in the form of "x,y" or a size 2 array with index 0 being the x
	// coordinate and index 1 being the y coordinate.
	//

	function setPixiValue(container, key, value) {
	  // Just copy the data if a Point type is being assigned to a Point type
	  if (isPointType(container[key]) && isPointType(value)) {
	    container[key].copy(value);
	  } else if (isPointType(container[key])) {
	    var coordinateData = parsePoint(value);

	    if (typeof coordinateData === 'undefined' || coordinateData.length < 1 || coordinateData.length > 2) {
	      throw new Error('The property \'' + key + '\' is a PIXI.Point or PIXI.ObservablePoint and ' + 'must be set to a comma-separated string of either 1 or 2 ' + 'coordinates, a 1 or 2 element array containing coordinates, or a ' + 'PIXI Point/ObservablePoint. If only one coordinate is ' + 'given then X and Y will be set to the provided value.');
	    }

	    container[key].set(coordinateData.shift(), coordinateData.shift());
	  } else {
	    container[key] = value;
	  }
	}

	//
	// A DisplayObject has some standard properties and default values
	//

	var gStandardProps = {
	  alpha: 1,
	  buttonMode: false,
	  cacheAsBitmap: null,
	  defaultCursor: 'pointer',
	  filterArea: null,
	  filters: null,
	  hitArea: null,
	  interactive: false,
	  mask: null,
	  // can't set parent!
	  pivot: 0,
	  // position has special behavior
	  renderable: false,
	  rotation: 0,
	  scale: 1,
	  // can't set stage
	  visible: true
	  // can't set worldAlpha
	  // can't set worldVisible
	  // x has special behavior
	  // y has special behavior
	};

	var gPIXIHandlers = ['click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mouseupoutside', 'tap', 'touchstart', 'touchmove', 'touchend', 'touchendoutside'];

	var DisplayObjectMixin = {
	  construct: function construct(element) {
	    this._currentElement = element;
	    this._displayObject = null;
	    this._nativeParent = null;
	    this._nativeContainerInfo = null;
	  },
	  getPublicInstance: function getPublicInstance() {
	    return this._displayObject;
	  },


	  // Any props listed in propnames are applied to the display object
	  transferDisplayObjectPropsByName: function transferDisplayObjectPropsByName(oldProps, newProps, propsToCheck) {
	    var displayObject = this._displayObject;
	    for (var propname in propsToCheck) {
	      if (typeof newProps[propname] !== 'undefined') {
	        setPixiValue(displayObject, propname, newProps[propname]);
	      } else if (typeof oldProps[propname] !== 'undefined' && typeof propsToCheck[propname] !== 'undefined') {
	        // the field we use previously but not any more. reset it to
	        // some default value (unless the default is undefined)
	        setPixiValue(displayObject, propname, propsToCheck[propname]);
	      }
	    }
	  },
	  applyDisplayObjectProps: function applyDisplayObjectProps(oldProps, newProps) {
	    this.transferDisplayObjectPropsByName(oldProps, newProps, gStandardProps);

	    var displayObject = this._displayObject;

	    // Position can be specified using either 'position' or separate
	    // x/y fields. If neither of these is specified we set them to 0
	    if (typeof newProps.position !== 'undefined') {
	      displayObject.position = newProps.position;
	    } else {
	      if (typeof newProps.x !== 'undefined') {
	        displayObject.x = newProps.x;
	      } else {
	        displayObject.x = 0;
	      }
	      if (typeof newProps.y !== 'undefined') {
	        displayObject.y = newProps.y;
	      } else {
	        displayObject.y = 0;
	      }
	    }

	    // hook up event callbacks
	    gPIXIHandlers.forEach(function (pixieventtype) {
	      if (typeof newProps[pixieventtype] !== 'undefined') {
	        displayObject[pixieventtype] = newProps[pixieventtype];
	      } else {
	        delete displayObject[pixieventtype];
	      }
	    });
	  },
	  mountComponentIntoNode: function mountComponentIntoNode() {
	    throw new Error('You cannot render a pixi.js component standalone. ' + 'You need to wrap it in a PIXIStage component.');
	  },
	  getNativeNode: function getNativeNode() {
	    return this._displayObject;
	  }
	};

	//
	// The DisplayObjectContainer is the basic Node/Container element of pixi.js
	// It's basically a DisplayObject that can contain children.
	//

	var DisplayObjectContainerMixin = (0, _objectAssign2.default)({}, DisplayObjectMixin, _ReactMultiChild2.default.Mixin, {

	  moveChild: function moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex) {
	    var childDisplayObject = prevChild._mountImage;
	    var thisObject = this._mountImage || this._displayObject;

	    // addChildAt automatically removes the child from it's previous location
	    thisObject.addChildAt(childDisplayObject, nextIndex);
	  },

	  createChild: function createChild(child, afterNode, childDisplayObject) {
	    child._mountImage = childDisplayObject;
	    this.getNativeNode().addChild(childDisplayObject);
	    if (child.customDidAttach) {
	      child.customDidAttach(childDisplayObject);
	    }
	  },

	  removeChild: function removeChild(child, node) {
	    var childDisplayObject = child._mountImage;
	    if (child.customWillDetach) {
	      child.customWillDetach(childDisplayObject);
	    }

	    this.getNativeNode().removeChild(childDisplayObject);
	    child._mountImage = null;
	  },

	  /**
	   * Override to bypass batch updating because it is not necessary.
	   *
	   * @param {?object} nextChildren.
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @override {ReactMultiChild.Mixin.updateChildren}
	   */
	  updateChildren: function updateChildren(nextChildren, transaction, context) {
	    this._updateChildren(nextChildren, transaction, context);
	  },

	  // called by any container component after it gets mounted

	  mountAndAddChildren: function mountAndAddChildren(children, transaction, context) {
	    var mountedImages = this.mountChildren(children, transaction, context);
	    // Each mount image corresponds to one of the flattened children
	    var i = 0;
	    var rootObject = this.getNativeNode();
	    var prevNode = null;
	    for (var key in this._renderedChildren) {
	      if (this._renderedChildren.hasOwnProperty(key)) {
	        var child = this._renderedChildren[key];
	        child._mountImage = mountedImages[i];
	        DisplayObjectContainerMixin.createChild.call(this, child, prevNode, mountedImages[i]);
	        prevNode = child._mountImage;
	        i++;
	      }
	    }
	  }

	});

	//
	// The 'Stage' component includes both the pixi.js stage and
	// the canvas DOM element that pixi renders onto.
	//
	// Maybe split these into two components? Putting a DOM node and a pixi DisplayObject into
	// the same component seems a little messy, but splitting them means you would always
	// have to declare a stage component inside a pixi canvas. If there was a situation where
	// you would want to 'swap out' one stage for another I suppose we could make a case for it...
	// --GJH
	//

	var PIXIStage = _react2.default.createClass({
	  displayName: 'PIXIStage',
	  mixins: [DisplayObjectContainerMixin],

	  setApprovedDOMProperties: function setApprovedDOMProperties(nextProps) {
	    var prevProps = this.props;

	    var prevPropsSubset = {
	      accesskey: prevProps.accesskey,
	      className: prevProps.className,
	      draggable: prevProps.draggable,
	      role: prevProps.role,
	      style: prevProps.style,
	      tabindex: prevProps.tabindex,
	      title: prevProps.title
	    };

	    var nextPropsSubset = {
	      accesskey: nextProps.accesskey,
	      className: nextProps.className,
	      draggable: nextProps.draggable,
	      role: nextProps.role,
	      style: nextProps.style,
	      tabindex: nextProps.tabindex,
	      title: nextProps.title
	    };

	    this.props = nextPropsSubset;
	    this._updateDOMProperties(prevPropsSubset);

	    // Reset to normal state
	    this.props = prevProps;
	  },

	  generateDefaultRenderer: function generateDefaultRenderer(props) {
	    // standard canvas/webGL renderer
	    var renderelement = _reactDom2.default.findDOMNode(this);

	    var backgroundColor = typeof props.backgroundColor === "number" ? props.backgroundColor : 0x66ff99;
	    // check for old-style capitalization (or lack of for backgroundColor)
	    if (typeof props.backgroundcolor !== 'undefined') {
	      (0, _warning2.default)(false, "Using lowercase on Stage prop backgroundcolor is deprecated - use backgroundColor instead");
	      backgroundColor = props.backgroundcolor;
	    }
	    var resolution = typeof props.resolution === "number" ? props.resolution : 1;
	    var antialias = props.antialias ? props.antialias : false;
	    var transparent = props.transparent ? props.transparent : false;
	    var preserveDrawingBuffer = props.preserveDrawingBuffer ? props.preserveDrawingBuffer : false;

	    this._pixirenderer = PIXI.autoDetectRenderer(props.width, props.height, { view: renderelement,
	      backgroundColor: backgroundColor,
	      antialias: props.antialias,
	      transparent: transparent,
	      resolution: props.resolution,
	      preserveDrawingBuffer: preserveDrawingBuffer
	    });
	  },

	  componentDidMount: function componentDidMount() {
	    var props = this.props;
	    if (typeof props.renderer === 'undefined') {
	      this.generateDefaultRenderer(props);
	    } else {
	      // custom renderer
	      this._pixirenderer = props.renderer;
	    }

	    var context = this._reactInternalInstance._context;
	    this._displayObject = new PIXI.Container();
	    //this.setApprovedDOMProperties(props);
	    DisplayObjectMixin.applyDisplayObjectProps.call(this, {}, props);
	    this._debugID = this._reactInternalInstance._debugID;

	    var transaction = _ReactUpdates2.default.ReactReconcileTransaction.getPooled();
	    transaction.perform(this.mountAndAddChildren, this, props.children, transaction, context);
	    _ReactUpdates2.default.ReactReconcileTransaction.release(transaction);
	    this.renderStage();

	    var that = this;
	    that._rAFID = window.requestAnimationFrame(rapidrender);

	    function rapidrender(timestamp) {

	      that._timestamp = timestamp;
	      that._rAFID = window.requestAnimationFrame(rapidrender);

	      // render the stage
	      that.renderStage();
	    }
	  },

	  componentDidUpdate: function componentDidUpdate(oldProps) {
	    var newProps = this.props;
	    var context = this._reactInternalInstance._context;

	    // maybe update renderer
	    // have to handle 'undefined' renderer prop
	    if (newProps.renderer !== oldProps.renderer || (0, _typeof3.default)(newProps.renderer) !== (0, _typeof3.default)(oldProps.renderer)) {
	      if (typeof newProps.renderer === 'undefined') {
	        this.generateDefaultRenderer(newProps);
	      } else {
	        this._pixirenderer = newProps.renderer;
	      }
	    }

	    if (newProps.width != oldProps.width || newProps.height != oldProps.height) {
	      this._pixirenderer.resize(+newProps.width, +newProps.height);
	    }

	    if (typeof newProps.backgroundcolor === "number") {
	      this._pixirenderer.backgroundColor = newProps.backgroundcolor;
	    } else if (typeof newProps.backgroundColor === "number") {
	      this._pixirenderer.backgroundColor = newProps.backgroundColor;
	    }

	    if (typeof newProps.transparent === "boolean") {
	      this._pixirenderer.transparent = newProps.transparent;
	    }

	    //this.setApprovedDOMProperties(newProps);
	    DisplayObjectMixin.applyDisplayObjectProps.call(this, oldProps, newProps);

	    var transaction = _ReactUpdates2.default.ReactReconcileTransaction.getPooled();
	    transaction.perform(this.updateChildren, this, this.props.children, transaction, context);
	    _ReactUpdates2.default.ReactReconcileTransaction.release(transaction);

	    this.renderStage();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.unmountChildren();
	    if (typeof this._rAFID !== 'undefined') {
	      window.cancelAnimationFrame(this._rAFID);
	    }
	  },

	  renderStage: function renderStage() {
	    this._pixirenderer.render(this._displayObject);
	  },

	  render: function render() {
	    // the PIXI renderer will get applied to this canvas element unless there is a custom renderer
	    if (typeof this.props.renderer === 'undefined') {
	      if (typeof this.props.style === 'undefined') {
	        // no style props, use a default canvas
	        return _react2.default.createElement("canvas");
	      } else {
	        return _react2.default.createElement("canvas", { style: this.props.style });
	      }
	    } else {
	      return null;
	    }
	  }

	});

	//
	// If you're making something that inherits from DisplayObjectContainer,
	// mixin these methods and implement your own version of
	// createDisplayObject and applySpecificDisplayObjectProps
	//

	var CommonDisplayObjectContainerImplementation = {
	  mountComponent: function mountComponent(transaction, nativeParent, nativeContainerInfo, context) {
	    /* jshint unused: vars */
	    var props = this._currentElement.props;
	    this._nativeParent = nativeParent;
	    this._nativeContainerInfo = nativeContainerInfo;
	    this._displayObject = this.createDisplayObject(arguments);
	    this.applyDisplayObjectProps({}, props);
	    this.applySpecificDisplayObjectProps({}, props);

	    this.mountAndAddChildren(props.children, transaction, context);
	    return this._displayObject;
	  },

	  receiveComponent: function receiveComponent(nextElement, transaction, context) {
	    var newProps = nextElement.props;
	    var oldProps = this._currentElement.props;

	    this.applyDisplayObjectProps(oldProps, newProps);
	    this.applySpecificDisplayObjectProps(oldProps, newProps);

	    this.updateChildren(newProps.children, transaction, context);
	    this._currentElement = nextElement;
	  },

	  unmountComponent: function unmountComponent() {
	    this.unmountChildren();
	  },

	  mountComponentIntoNode: function mountComponentIntoNode(rootID, container) {
	    /* jshint unused: vars */
	    throw new Error('You cannot render a PIXI object standalone, ' + ' You need to wrap it in a PIXIStage.');
	  }

	};

	var DisplayObjectContainer = createPIXIComponent('DisplayObjectContainer', DisplayObjectContainerMixin, CommonDisplayObjectContainerImplementation, {

	  createDisplayObject: function createDisplayObject() {
	    return new PIXI.Container();
	  },

	  applySpecificDisplayObjectProps: function applySpecificDisplayObjectProps(oldProps, newProps) {
	    // don't know if anyone actually sets the width/height manually on a DoC,
	    // but it's here if they need it
	    this.transferDisplayObjectPropsByName(oldProps, newProps, {
	      'width': undefined,
	      'height': undefined
	    });
	  }
	});

	//
	// Graphics
	//

	var Graphics = createPIXIComponent('Graphics', DisplayObjectContainerMixin, CommonDisplayObjectContainerImplementation, {

	  createDisplayObject: function createDisplayObject() {
	    return new PIXI.Graphics();
	  },

	  applySpecificDisplayObjectProps: function applySpecificDisplayObjectProps(oldProps, newProps) {
	    this.transferDisplayObjectPropsByName(oldProps, newProps, {
	      'width': undefined,
	      'height': undefined
	    });
	  }
	});

	//
	// Sprite
	//

	var SpriteComponentMixin = {
	  createDisplayObject: function createDisplayObject() {
	    if (this._currentElement.props.image) {
	      var spriteimage = this._currentElement.props.image;
	      return new PIXI.Sprite(PIXI.Texture.fromImage(spriteimage));
	    } else if (this._currentElement.props.texture) {
	      var texture = this._currentElement.props.texture;
	      (0, _warning2.default)(texture instanceof PIXI.Texture, "the Sprite 'texture' prop must be an instance of PIXI.Texture");
	      return new PIXI.Sprite(texture);
	    }
	  },

	  applySpecificDisplayObjectProps: function applySpecificDisplayObjectProps(oldProps, newProps) {
	    this.transferDisplayObjectPropsByName(oldProps, newProps, {
	      'anchor': 0,
	      'tint': 0xFFFFFF,
	      'blendMode': PIXI.BLEND_MODES.NORMAL,
	      'shader': null,
	      'width': undefined,
	      'height': undefined,
	      'texture': null // may get overridden by 'image' prop
	    });

	    var displayObject = this._displayObject;

	    // support setting image by name instead of a raw texture ref
	    if (typeof newProps.image !== 'undefined' && newProps.image !== oldProps.image) {
	      displayObject.texture = PIXI.Texture.fromImage(newProps.image);
	    } else if (typeof newProps.texture !== 'undefined' && newProps.texture !== oldProps.texture) {
	      (0, _warning2.default)(newProps.texture instanceof PIXI.Texture, "the Sprite 'texture' prop must be an instance of PIXI.Texture");
	      displayObject.texture = newProps.texture;
	    }
	  }
	};

	var Sprite = createPIXIComponent('Sprite', DisplayObjectContainerMixin, CommonDisplayObjectContainerImplementation, SpriteComponentMixin);

	//
	// SpriteBatch
	//


	var SpriteBatch = createPIXIComponent('SpriteBatch', DisplayObjectContainerMixin, CommonDisplayObjectContainerImplementation, {

	  createDisplayObject: function createDisplayObject() {
	    return new PIXI.SpriteBatch();
	  },

	  applySpecificDisplayObjectProps: function applySpecificDisplayObjectProps(oldProps, newProps) {
	    // don't know if anyone actually sets the width/height manually on a DoC,
	    // but it's here if they need it
	    this.transferDisplayObjectPropsByName(oldProps, newProps, {
	      'width': undefined,
	      'height': undefined
	    });
	  }
	});

	//
	// TilingSprite
	//

	var TilingSpriteComponentMixin = {

	  createDisplayObject: function createDisplayObject() {
	    var props = this._currentElement.props;
	    return new PIXI.extras.TilingSprite(PIXI.Texture.fromImage(props.image), props.width, props.height);
	  },

	  applySpecificDisplayObjectProps: function applySpecificDisplayObjectProps(oldProps, newProps) {
	    this.transferDisplayObjectPropsByName(oldProps, newProps, {
	      'tileScale': 1,
	      'tilePosition': 0,
	      'tileScaleOffset': 1
	    });

	    // also modify values that apply to Sprite
	    SpriteComponentMixin.applySpecificDisplayObjectProps.apply(this, arguments);
	  }

	};

	var TilingSprite = createPIXIComponent('TilingSprite', DisplayObjectContainerMixin, CommonDisplayObjectContainerImplementation, TilingSpriteComponentMixin);

	//
	// Text
	//

	var TextComponentMixin = {

	  createDisplayObject: function createDisplayObject() {
	    var props = this._currentElement.props;

	    var text = props.text || '';
	    var style = props.style || {};
	    return new PIXI.Text(text, style);
	  },

	  applySpecificDisplayObjectProps: function applySpecificDisplayObjectProps(oldProps, newProps) {
	    // can't just copy over text props, we have to set the values via methods

	    var displayObject = this._displayObject;

	    if (typeof newProps.text !== 'undefined' && newProps.text !== oldProps.text) {
	      displayObject.text = newProps.text;
	    }
	    // should do a deep compare here
	    if (typeof newProps.style !== 'undefined' && newProps.style !== oldProps.style) {
	      displayObject.style = newProps.style;
	    }

	    SpriteComponentMixin.applySpecificDisplayObjectProps.apply(this, arguments);
	  }
	};

	// the linter (jshint) doesn't like the shadowing of 'Text' here but it's OK since
	// we're in a commonjs module

	// jshint -W079
	var Text = createPIXIComponent('Text', DisplayObjectContainerMixin, CommonDisplayObjectContainerImplementation, TextComponentMixin);
	// jshint +W079

	//
	// BitmapText
	//

	var BitmapTextComponentMixin = {
	  createDisplayObject: function createDisplayObject() {
	    var props = this._currentElement.props;

	    var text = props.text || '';
	    var style = props.style || {};
	    return new PIXI.extras.BitmapText(text, style);
	  },

	  applySpecificDisplayObjectProps: function applySpecificDisplayObjectProps(oldProps, newProps) {
	    var displayObject = this._displayObject;

	    if (typeof newProps.text !== 'undefined' && newProps.text !== oldProps.text) {
	      displayObject.text = newProps.text;
	    }
	    // should do a deep compare here
	    if (typeof newProps.style !== 'undefined' && newProps.style !== oldProps.style) {
	      displayObject.style = newProps.style;
	    }

	    this.transferDisplayObjectPropsByName(oldProps, newProps, {
	      'textWidth': undefined,
	      'textHeight': undefined
	    });

	    SpriteComponentMixin.applySpecificDisplayObjectProps.apply(this, arguments);
	  }
	};

	var BitmapText = createPIXIComponent('BitmapText', DisplayObjectContainerMixin, CommonDisplayObjectContainerImplementation, BitmapTextComponentMixin);

	//
	// The "Custom DisplayObject" allows for user-specified object
	// construction and applying properties
	//

	var CustomDisplayObjectImplementation = {
	  mountComponent: function mountComponent(rootID, transaction, context) {

	    var props = this._currentElement.props;
	    (0, _warning2.default)(this.customDisplayObject, "No customDisplayObject method found for a CustomPIXIComponent");
	    this._displayObject = this.customDisplayObject(props);

	    this.applyDisplayObjectProps({}, props);
	    if (this.customApplyProps) {
	      this.customApplyProps(this._displayObject, {}, props);
	    }

	    this.mountAndAddChildren(props.children, transaction, context);

	    return this._displayObject;
	  },

	  receiveComponent: function receiveComponent(nextElement, transaction, context) {
	    var newProps = nextElement.props;
	    var oldProps = this._currentElement.props;

	    if (this.customApplyProps) {
	      this.customApplyProps(this._displayObject, oldProps, newProps);
	    } else {
	      this.applyDisplayObjectProps(oldProps, newProps);
	    }

	    this.updateChildren(newProps.children, transaction, context);
	    this._currentElement = nextElement;
	  },

	  // customDidAttach and customWillDetach are invoked by DisplayObjectContainerMixin,
	  // which is where the attach/detach actually occurs

	  unmountComponent: function unmountComponent() {
	    this.unmountChildren();
	  }
	};

	// functions required for a custom components:
	//
	// -customDisplayObject(props) to create a new display objects
	//
	// -customDidAttach(displayObject) to do stuff after attaching (attaching happens AFTER mounting)
	//
	// -customApplyProps(displayObject, oldProps, newProps) to apply custom props to your component;
	//           note this disables the normal transfer of props to the displayObject; call
	//           this.applyDisplayObjectProps(oldProps,newProps) in your custom method if you want that
	//
	// -customWillDetach(displayObject) to cleanup anything before detaching (detach happens BEFORE unmounting)

	var CustomPIXIComponent = function CustomPIXIComponent(custommixin) {
	  return createPIXIComponent('CustomDisplayObject', DisplayObjectContainerMixin, CustomDisplayObjectImplementation, custommixin);
	};

	var PIXIComponents = {
	  Stage: PIXIStage,
	  DisplayObjectContainer: DisplayObjectContainer,
	  SpriteBatch: SpriteBatch,
	  Sprite: Sprite,
	  Text: Text,
	  BitmapText: BitmapText,
	  TilingSprite: TilingSprite,
	  Graphics: Graphics
	};

	var PIXIFactories = {};
	for (var prop in PIXIComponents) {
	  if (PIXIComponents.hasOwnProperty(prop)) {
	    var component = PIXIComponents[prop];
	    PIXIFactories[prop] = _ReactElement2.default.createFactory(component);
	  }
	}

	module.exports = (0, _objectAssign2.default)(PIXIComponents, {
	  factories: PIXIFactories,
	  CustomPIXIComponent: CustomPIXIComponent,
	  render: _reactDom2.default.render,
	  unmountComponentAtNode: _reactDom2.default.unmountComponentAtNode
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(2);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(53);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(48);
	module.exports = __webpack_require__(52).f('iterator');

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(5)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(8)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(6)
	  , defined   = __webpack_require__(7);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(9)
	  , $export        = __webpack_require__(10)
	  , redefine       = __webpack_require__(25)
	  , hide           = __webpack_require__(15)
	  , has            = __webpack_require__(26)
	  , Iterators      = __webpack_require__(27)
	  , $iterCreate    = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(44)
	  , getPrototypeOf = __webpack_require__(46)
	  , ITERATOR       = __webpack_require__(45)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , core      = __webpack_require__(12)
	  , ctx       = __webpack_require__(13)
	  , hide      = __webpack_require__(15)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 11 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(14);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(16)
	  , createDesc = __webpack_require__(24);
	module.exports = __webpack_require__(20) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(17)
	  , IE8_DOM_DEFINE = __webpack_require__(19)
	  , toPrimitive    = __webpack_require__(23)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(20) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(20) && !__webpack_require__(21)(function(){
	  return Object.defineProperty(__webpack_require__(22)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(21)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18)
	  , document = __webpack_require__(11).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(18);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);

/***/ },
/* 26 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(29)
	  , descriptor     = __webpack_require__(24)
	  , setToStringTag = __webpack_require__(44)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(15)(IteratorPrototype, __webpack_require__(45)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(17)
	  , dPs         = __webpack_require__(30)
	  , enumBugKeys = __webpack_require__(42)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(22)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(43).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(16)
	  , anObject = __webpack_require__(17)
	  , getKeys  = __webpack_require__(31);

	module.exports = __webpack_require__(20) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(32)
	  , enumBugKeys = __webpack_require__(42);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(26)
	  , toIObject    = __webpack_require__(33)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(39)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(34)
	  , defined = __webpack_require__(7);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(35);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(33)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(38);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(6)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(6)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(40)('keys')
	  , uid    = __webpack_require__(41);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).document && document.documentElement;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(16).f
	  , has = __webpack_require__(26)
	  , TAG = __webpack_require__(45)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(40)('wks')
	  , uid        = __webpack_require__(41)
	  , Symbol     = __webpack_require__(11).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(26)
	  , toObject    = __webpack_require__(47)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	var global        = __webpack_require__(11)
	  , hide          = __webpack_require__(15)
	  , Iterators     = __webpack_require__(27)
	  , TO_STRING_TAG = __webpack_require__(45)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(50)
	  , step             = __webpack_require__(51)
	  , Iterators        = __webpack_require__(27)
	  , toIObject        = __webpack_require__(33);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(8)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(45);

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(55);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	module.exports = __webpack_require__(12).Symbol;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(11)
	  , has            = __webpack_require__(26)
	  , DESCRIPTORS    = __webpack_require__(20)
	  , $export        = __webpack_require__(10)
	  , redefine       = __webpack_require__(25)
	  , META           = __webpack_require__(56).KEY
	  , $fails         = __webpack_require__(21)
	  , shared         = __webpack_require__(40)
	  , setToStringTag = __webpack_require__(44)
	  , uid            = __webpack_require__(41)
	  , wks            = __webpack_require__(45)
	  , wksExt         = __webpack_require__(52)
	  , wksDefine      = __webpack_require__(57)
	  , keyOf          = __webpack_require__(58)
	  , enumKeys       = __webpack_require__(59)
	  , isArray        = __webpack_require__(62)
	  , anObject       = __webpack_require__(17)
	  , toIObject      = __webpack_require__(33)
	  , toPrimitive    = __webpack_require__(23)
	  , createDesc     = __webpack_require__(24)
	  , _create        = __webpack_require__(29)
	  , gOPNExt        = __webpack_require__(63)
	  , $GOPD          = __webpack_require__(65)
	  , $DP            = __webpack_require__(16)
	  , $keys          = __webpack_require__(31)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(64).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(61).f  = $propertyIsEnumerable;
	  __webpack_require__(60).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(9)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(41)('meta')
	  , isObject = __webpack_require__(18)
	  , has      = __webpack_require__(26)
	  , setDesc  = __webpack_require__(16).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(21)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(11)
	  , core           = __webpack_require__(12)
	  , LIBRARY        = __webpack_require__(9)
	  , wksExt         = __webpack_require__(52)
	  , defineProperty = __webpack_require__(16).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(31)
	  , toIObject = __webpack_require__(33);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(31)
	  , gOPS    = __webpack_require__(60)
	  , pIE     = __webpack_require__(61);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 61 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(35);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(33)
	  , gOPN      = __webpack_require__(64).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(32)
	  , hiddenKeys = __webpack_require__(42).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(61)
	  , createDesc     = __webpack_require__(24)
	  , toIObject      = __webpack_require__(33)
	  , toPrimitive    = __webpack_require__(23)
	  , has            = __webpack_require__(26)
	  , IE8_DOM_DEFINE = __webpack_require__(19)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(20) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57)('asyncIterator');

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57)('observable');

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	__webpack_require__(4);
	module.exports = __webpack_require__(71);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(17)
	  , get      = __webpack_require__(72);
	module.exports = __webpack_require__(12).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(73)
	  , ITERATOR  = __webpack_require__(45)('iterator')
	  , Iterators = __webpack_require__(27);
	module.exports = __webpack_require__(12).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(35)
	  , TAG = __webpack_require__(45)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = require("pixi.js");

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = require("react-dom/lib/ReactMultiChild");

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = require("react/lib/ReactElement");

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = require("react-dom/lib/ReactUpdates");

/***/ },
/* 80 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ },
/* 82 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(84);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  warning = function (condition, format) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ },
/* 84 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	"use strict";

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014-2015 Gary Haussmann
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	//
	// time to monkey-patch React!
	//
	// a subtle bug happens when ReactCompositeComponent updates something in-place by
	// modifying HTML markup; since PIXI objects don't exist as markup the whole thing bombs.
	// we try to fix this by monkey-patching ReactCompositeComponent
	//

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(86);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _ReactCompositeComponent = __webpack_require__(90);

	var _ReactCompositeComponent2 = _interopRequireDefault(_ReactCompositeComponent);

	var _ReactReconciler = __webpack_require__(91);

	var _ReactReconciler2 = _interopRequireDefault(_ReactReconciler);

	var _shouldUpdateReactComponent = __webpack_require__(92);

	var _shouldUpdateReactComponent2 = _interopRequireDefault(_shouldUpdateReactComponent);

	var _warning = __webpack_require__(83);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	// Composite components don't have a displayObject. So we have to do some work to find
	// the proper displayObject sometimes.
	//


	function findDisplayObjectChild(componentinstance) {
	  // walk downwards via _renderedComponent to find something with a displayObject
	  var componentwalker = componentinstance;
	  while (typeof componentwalker !== 'undefined') {
	    // no displayObject? then fail
	    if (typeof componentwalker._displayObject !== 'undefined') {
	      return componentwalker._displayObject;
	    }
	    componentwalker = componentwalker._renderedComponent;
	  }

	  // we walked all the way down and found no displayObject
	  return undefined;
	}

	//
	// This modified version of updateRenderedComponent will
	// manage displayObject nodes instead of HTML markup
	//
	var old_updateRenderedComponent = _ReactCompositeComponent2.default._updateRenderedComponent;

	var ReactPIXI_updateRenderedComponent = function ReactPIXI_updateRenderedComponent(transaction, context) {
	  var prevComponentInstance = this._renderedComponent;

	  // Find the first actual rendered (non-Composite) component.
	  // If that component is a PIXI node we use the special code here.
	  // If not, we call back to the original version of updateComponent
	  // which should handle all non-PIXI nodes.

	  var prevDisplayObject = findDisplayObjectChild(prevComponentInstance);
	  if (!prevDisplayObject) {
	    // not a PIXI node, use the original DOM-style version
	    old_updateRenderedComponent.call(this, transaction, context);
	    return;
	  }

	  // This is a PIXI node, do a special PIXI version of updateComponent
	  var prevRenderedElement = prevComponentInstance._currentElement;
	  var nextRenderedElement = this._renderValidatedComponent();

	  if ((0, _shouldUpdateReactComponent2.default)(prevRenderedElement, nextRenderedElement)) {
	    _ReactReconciler2.default.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
	  } else {
	    // We can't just update the current component.
	    // So we nuke the current instantiated component and put a new component in
	    // the same place based on the new props.
	    var thisID = this._rootNodeID;

	    var displayObjectParent = prevDisplayObject.parent;

	    // unmounting doesn't disconnect the child from the parent node,
	    // but later on we'll simply overwrite the proper element in the 'children' data member
	    var displayObjectIndex = displayObjectParent.children.indexOf(prevDisplayObject);
	    _ReactReconciler2.default.unmountComponent(prevComponentInstance);
	    displayObjectParent.removeChild(prevDisplayObject);

	    // create the new object and stuff it into the place vacated by the old object
	    this._renderedComponent = this._instantiateReactComponent(nextRenderedElement, this._currentElement.type);
	    var nextDisplayObject = _ReactReconciler2.default.mountComponent(this._renderedComponent, thisID, transaction, this._processChildContext(context));
	    this._renderedComponent._displayObject = nextDisplayObject;

	    // fixup _mountImage as well
	    this._mountImage = nextDisplayObject;

	    // overwrite the reference to the old child
	    displayObjectParent.addChildAt(nextDisplayObject, displayObjectIndex);
	  }
	};

	//
	// This generates a patched version of ReactReconciler.receiveComponent to check the type of the
	// component and patch it if it's an unpatched version of ReactCompositeComponentWrapper
	//

	var buildPatchedReceiveComponent = function buildPatchedReceiveComponent(oldReceiveComponent) {
	  var newReceiveComponent = function newReceiveComponent(internalInstance, nextElement, transaction, context) {
	    // if the instance is a ReactCompositeComponentWrapper, fix it if needed
	    var ComponentPrototype = (0, _getPrototypeOf2.default)(internalInstance);

	    // if this is a composite component it wil have _updateRenderedComponent defined
	    if (typeof ComponentPrototype._updateRenderedComponent !== 'undefined') {
	      // check first to make sure we don't patch it twice
	      if (ComponentPrototype._updateRenderedComponent !== ReactPIXI_updateRenderedComponent) {
	        ComponentPrototype._updateRenderedComponent = ReactPIXI_updateRenderedComponent;
	      }
	    }

	    oldReceiveComponent.call(this, internalInstance, nextElement, transaction, context);
	  };

	  return newReceiveComponent;
	};

	var ReactPIXIMonkeyPatch = function ReactPIXIMonkeyPatch() {

	  // in older versions we patched ReactCompositeComponentMixin, but in 0.13 the
	  // prototype is wrapped in a ReactCompositeComponentWrapper so monkey-patching
	  // ReactCompositeComponentMixin won't actually have any effect.
	  //
	  // Really we want to patch ReactCompositeComponentWrapper but it's hidden inside
	  // the instantiateReactComponent module. urgh.
	  //
	  // So what we have to do is patch ReactReconciler to detect the first time an
	  // instance of ReactCompositeComponentWrapper is used, and patch it THEN
	  //
	  // urk.

	  var old_ReactReconciler_receiveComponent = _ReactReconciler2.default.receiveComponent;

	  // check to see if we already patched it, so we don't patch again
	  if (typeof old_ReactReconciler_receiveComponent._ReactPIXIPatched === 'undefined') {
	    (0, _warning2.default)(false, "patching react to work with react-pixi");

	    _ReactReconciler2.default.receiveComponent = buildPatchedReceiveComponent(old_ReactReconciler_receiveComponent);
	    _ReactReconciler2.default.receiveComponent._ReactPIXIPatched = true;
	  }
	};

	exports.default = ReactPIXIMonkeyPatch;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	module.exports = __webpack_require__(12).Object.getPrototypeOf;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(47)
	  , $getPrototypeOf = __webpack_require__(46);

	__webpack_require__(89)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(10)
	  , core    = __webpack_require__(12)
	  , fails   = __webpack_require__(21);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = require("react-dom/lib/ReactCompositeComponent");

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = require("react-dom/lib/ReactReconciler");

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = require("react-dom/lib/shouldUpdateReactComponent");

/***/ }
/******/ ]);