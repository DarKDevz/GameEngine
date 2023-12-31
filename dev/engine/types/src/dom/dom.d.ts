// This file was auto-generated. Please do not edit it.

import * as p5 from '../../index';

declare module '../../index' {
    class MediaElement {
        /**
         *   Extends p5.Element to handle audio and video. In
         *   addition to the methods of p5.Element, it also
         *   contains methods for controlling media. It is not
         *   called directly, but p5.MediaElements are created
         *   by calling createVideo, createAudio, and
         *   createCapture.
         *
         *   @param elt DOM node that is wrapped
         */
        constructor(elt: string);

        /**
         *   Play an HTML5 media element.
         *   @chainable
         */
        play(): MediaElement;

        /**
         *   Stops an HTML5 media element (sets current time to
         *   zero).
         *   @chainable
         */
        stop(): MediaElement;

        /**
         *   Pauses an HTML5 media element.
         *   @chainable
         */
        pause(): MediaElement;

        /**
         *   Set 'loop' to true for an HTML5 media element, and
         *   starts playing.
         *   @chainable
         */
        loop(): MediaElement;

        /**
         *   Set 'loop' to false for an HTML5 media element.
         *   Element will stop when it reaches the end.
         *   @chainable
         */
        noLoop(): MediaElement;

        /**
         *   Set HTML5 media element to autoplay or not. If no
         *   argument is specified, by default it will
         *   autoplay.
         *   @param shouldAutoplay whether the element should
         *   autoplay
         *   @chainable
         */
        autoplay(shouldAutoplay: boolean): MediaElement;

        /**
         *   Sets volume for this HTML5 media element. If no
         *   argument is given, returns the current volume.
         *   @return current volume
         */
        volume(): number;

        /**
         *   Sets volume for this HTML5 media element. If no
         *   argument is given, returns the current volume.
         *   @param val volume between 0.0 and 1.0
         *   @chainable
         */
        volume(val: number): MediaElement;

        /**
         *   If no arguments are given, returns the current
         *   playback speed of the element. The speed parameter
         *   sets the speed where 2.0 will play the element
         *   twice as fast, 0.5 will play at half the speed,
         *   and -1 will play the element in normal speed in
         *   reverse.(Note that not all browsers support
         *   backward playback and even if they do, playback
         *   might not be smooth.)
         *   @return current playback speed of the element
         */
        speed(): number;

        /**
         *   If no arguments are given, returns the current
         *   playback speed of the element. The speed parameter
         *   sets the speed where 2.0 will play the element
         *   twice as fast, 0.5 will play at half the speed,
         *   and -1 will play the element in normal speed in
         *   reverse.(Note that not all browsers support
         *   backward playback and even if they do, playback
         *   might not be smooth.)
         *   @param speed speed multiplier for element playback
         *   @chainable
         */
        speed(speed: number): MediaElement;

        /**
         *   If no arguments are given, returns the current
         *   time of the element. If an argument is given the
         *   current time of the element is set to it.
         *   @return current time (in seconds)
         */
        time(): number;

        /**
         *   If no arguments are given, returns the current
         *   time of the element. If an argument is given the
         *   current time of the element is set to it.
         *   @param time time to jump to (in seconds)
         *   @chainable
         */
        time(time: number): MediaElement;

        /**
         *   Returns the duration of the HTML5 media element.
         *   @return duration
         */
        duration(): number;

        /**
         *   Schedule an event to be called when the audio or
         *   video element reaches the end. If the element is
         *   looping, this will not be called. The element is
         *   passed in as the argument to the onended callback.
         *   @param callback function to call when the
         *   soundfile has ended. The media element will be
         *   passed in as the argument to the callback.
         *   @chainable
         */
        onended(callback: (...args: any[]) => any): MediaElement;

        /**
         *   Send the audio output of this element to a
         *   specified audioNode or p5.sound object. If no
         *   element is provided, connects to p5's main output.
         *   That connection is established when this method is
         *   first called. All connections are removed by the
         *   .disconnect() method. This method is meant to be
         *   used with the p5.sound.js addon library.
         *   @param audioNode AudioNode from the Web Audio API,
         *   or an object from the p5.sound library
         */
        connect(audioNode: AudioNode | object): void;

        /**
         *   Disconnect all Web Audio routing, including to
         *   main output. This is useful if you want to
         *   re-route the output through audio effects, for
         *   example.
         */
        disconnect(): void;

        /**
         *   Show the default MediaElement controls, as
         *   determined by the web browser.
         */
        showControls(): void;

        /**
         *   Hide the default mediaElement controls.
         */
        hideControls(): void;

        /**
         *   Schedule events to trigger every time a
         *   MediaElement (audio/video) reaches a playback cue
         *   point. Accepts a callback function, a time (in
         *   seconds) at which to trigger the callback, and an
         *   optional parameter for the callback.
         *
         *   Time will be passed as the first parameter to the
         *   callback function, and param will be the second
         *   parameter.
         *   @param time Time in seconds, relative to this
         *   media element's playback. For example, to trigger
         *   an event every time playback reaches two seconds,
         *   pass in the number 2. This will be passed as the
         *   first parameter to the callback function.
         *   @param callback Name of a function that will be
         *   called at the given time. The callback will
         *   receive time and (optionally) param as its two
         *   parameters.
         *   @param [value] An object to be passed as the
         *   second parameter to the callback function.
         *   @return id ID of this cue, useful for
         *   removeCue(id)
         */
        addCue(time: number, callback: (...args: any[]) => any, value?: object): number;

        /**
         *   Remove a callback based on its ID. The ID is
         *   returned by the addCue method.
         *   @param id ID of the cue, as returned by addCue
         */
        removeCue(id: number): void;

        /**
         *   Remove all of the callbacks that had originally
         *   been scheduled via the addCue method.
         *   @param id ID of the cue, as returned by addCue
         */
        clearCues(id: number): void;

        /**
         *   Path to the media element source.
         */
        src: any;
    }
    class File {
        /**
         *   Base class for a file. Used for Element.drop and
         *   createFileInput.
         *
         *   @param file File that is wrapped
         */
        constructor(file: File);

        /**
         *   Underlying File object. All normal File methods
         *   can be called on this.
         */
        file: any;

        /**
         *   File type (image, text, etc.)
         */
        type: any;

        /**
         *   File subtype (usually the file extension jpg, png,
         *   xml, etc.)
         */
        subtype: any;

        /**
         *   File name
         */
        name: any;

        /**
         *   File size
         */
        size: any;

        /**
         *   URL string containing either image data, the text
         *   contents of the file or a parsed object if file is
         *   JSON and p5.XML if XML
         */
        data: any;
    }
    interface p5InstanceExtensions {
        /**
         *   Searches the page for the first element that
         *   matches the given CSS selector string (can be an
         *   ID, class, tag name or a combination) and returns
         *   it as a p5.Element. The DOM node itself can be
         *   accessed with .elt. Returns null if none found.
         *   You can also specify a container to search within.
         *   @param selectors CSS selector string of element to
         *   search for
         *   @param [container] CSS selector string,
         *   p5.Element, or HTML element to search within
         *   @return p5.Element containing node found
         */
        select(selectors: string, container?: string | Element | HTMLElement): Element | null;

        /**
         *   Searches the page for elements that match the
         *   given CSS selector string (can be an ID a class,
         *   tag name or a combination) and returns them as
         *   p5.Elements in an array. The DOM node itself can
         *   be accessed with .elt. Returns an empty array if
         *   none found. You can also specify a container to
         *   search within.
         *   @param selectors CSS selector string of elements
         *   to search for
         *   @param [container] CSS selector string, p5.Element
         *   , or HTML element to search within
         *   @return Array of p5.Elements containing nodes
         *   found
         */
        selectAll(selectors: string, container?: string | Element | HTMLElement): Element[];

        /**
         *   Removes all elements created by p5, except any
         *   canvas / graphics elements created by createCanvas
         *   or createGraphics. Event handlers are removed, and
         *   element is removed from the DOM.
         */
        removeElements(): void;

        /**
         *   The .changed() function is called when the value
         *   of an element changes. This can be used to attach
         *   an element specific event listener.
         *   @param fxn function to be fired when the value of
         *   an element changes. if false is passed instead,
         *   the previously firing function will no longer
         *   fire.
         *   @chainable
         */
        changed(fxn: ((...args: any[]) => any) | boolean): p5;

        /**
         *   The .input() function is called when any user
         *   input is detected with an element. The input event
         *   is often used to detect keystrokes in a input
         *   element, or changes on a slider element. This can
         *   be used to attach an element specific event
         *   listener.
         *   @param fxn function to be fired when any user
         *   input is detected within the element. if false is
         *   passed instead, the previously firing function
         *   will no longer fire.
         *   @chainable
         */
        input(fxn: ((...args: any[]) => any) | boolean): p5;

        /**
         *   Creates a <div></div> element in the DOM with
         *   given inner HTML.
         *   @param [html] inner HTML for element created
         *   @return pointer to p5.Element holding created node
         */
        createDiv(html?: string): Element;

        /**
         *   Creates a <p></p> element in the DOM with given
         *   inner HTML. Used for paragraph length text.
         *   @param [html] inner HTML for element created
         *   @return pointer to p5.Element holding created node
         */
        createP(html?: string): Element;

        /**
         *   Creates a <span></span> element in the DOM with
         *   given inner HTML.
         *   @param [html] inner HTML for element created
         *   @return pointer to p5.Element holding created node
         */
        createSpan(html?: string): Element;

        /**
         *   Creates an <img> element in the DOM with given src
         *   and alternate text.
         *   @param src src path or url for image
         *   @param alt alternate text to be used if image does
         *   not load. You can use also an empty string ("") if
         *   that an image is not intended to be viewed.
         *   @return pointer to p5.Element holding created node
         */
        createImg(src: string, alt: string): Element;

        /**
         *   Creates an <img> element in the DOM with given src
         *   and alternate text.
         *   @param src src path or url for image
         *   @param alt alternate text to be used if image does
         *   not load. You can use also an empty string ("") if
         *   that an image is not intended to be viewed.
         *   @param crossOrigin crossOrigin property of the img
         *   element; use either 'anonymous' or
         *   'use-credentials' to retrieve the image with
         *   cross-origin access (for later use with canvas. if
         *   an empty string("") is passed, CORS is not used
         *   @param [successCallback] callback to be called
         *   once image data is loaded with the p5.Element as
         *   argument
         *   @return pointer to p5.Element holding created node
         */
        createImg(src: string, alt: string, crossOrigin: string, successCallback?: (...args: any[]) => any): Element;

        /**
         *   Creates an <a></a> element in the DOM for
         *   including a hyperlink.
         *   @param href url of page to link to
         *   @param html inner html of link element to display
         *   @param [target] target where new link should open,
         *   could be _blank, _self, _parent, _top.
         *   @return pointer to p5.Element holding created node
         */
        createA(href: string, html: string, target?: string): Element;

        /**
         *   Creates a slider <input></input> element in the
         *   DOM. Use .size() to set the display length of the
         *   slider.
         *   @param min minimum value of the slider
         *   @param max maximum value of the slider
         *   @param [value] default value of the slider
         *   @param [step] step size for each tick of the
         *   slider (if step is set to 0, the slider will move
         *   continuously from the minimum to the maximum
         *   value)
         *   @return pointer to p5.Element holding the created
         *   node
         */
        createSlider(min: number, max: number, value?: number, step?: number): Element;

        /**
         *   Creates a <button></button> element in the DOM.
         *   Use .size() to set the display size of the button.
         *   Use .mousePressed() to specify behavior on press.
         *   @param label label displayed on the button
         *   @param [value] value of the button
         *   @return pointer to p5.Element holding created node
         */
        createButton(label: string, value?: string): Element;

        /**
         *   Creates a checkbox <input></input> element in the
         *   DOM. Calling .checked() on a checkbox returns a
         *   boolean indicating whether it is checked or not.
         *   @param [label] label displayed after checkbox
         *   @param [value] value of the checkbox; checked is
         *   true, unchecked is false
         *   @return pointer to p5.Element holding created node
         */
        createCheckbox(label?: string, value?: boolean): Element;

        /**
         *   Creates a dropdown menu <select></select> element
         *   in the DOM. It also assigns select-related methods
         *   to p5.Element when selecting an existing select
         *   box. Options in the menu are unique by name (the
         *   display text). - .option(name, [value]) can be
         *   used to add an option with name (the display text)
         *   and value to the select element. If an option with
         *   name already exists within the select element,
         *   this method will change its value to value.
         *   - .value() will return the currently selected
         *   option.
         *   - .selected() will return the current dropdown
         *   element which is an instance of p5.Element.
         *   - .selected(value) can be used to make given
         *   option selected by default when the page first
         *   loads.
         *   - .disable() marks the whole dropdown element as
         *   disabled.
         *   - .disable(value) marks a given option as
         *   disabled.
         *   @param [multiple] true if dropdown should support
         *   multiple selections
         *   @return pointer to p5.Element holding created node
         */
        createSelect(multiple?: boolean): Element;

        /**
         *   Creates a dropdown menu <select></select> element
         *   in the DOM. It also assigns select-related methods
         *   to p5.Element when selecting an existing select
         *   box. Options in the menu are unique by name (the
         *   display text). - .option(name, [value]) can be
         *   used to add an option with name (the display text)
         *   and value to the select element. If an option with
         *   name already exists within the select element,
         *   this method will change its value to value.
         *   - .value() will return the currently selected
         *   option.
         *   - .selected() will return the current dropdown
         *   element which is an instance of p5.Element.
         *   - .selected(value) can be used to make given
         *   option selected by default when the page first
         *   loads.
         *   - .disable() marks the whole dropdown element as
         *   disabled.
         *   - .disable(value) marks a given option as
         *   disabled.
         *   @param existing DOM select element
         */
        createSelect(existing: object): Element;

        /**
         *   Creates a radio button element in the DOM. It also
         *   helps existing radio buttons assign methods of
         *   p5.Element. - .option(value, [label]) can be used
         *   to create a new option for the element. If an
         *   option with a value already exists, it will be
         *   returned. It is recommended to use string values
         *   as input for value. Optionally, a label can be
         *   provided as second argument for the option.
         *   - .remove(value) can be used to remove an option
         *   for the element. String values recommended as
         *   input for value.
         *   - .value() method will return the currently
         *   selected value.
         *   - .selected() method will return the currently
         *   selected input element.
         *   - .selected(value) method will select the option
         *   and return it. String values recommended as input
         *   for value.
         *   - .disable(Boolean) method will enable/disable the
         *   whole radio button element.
         *   @param containerElement A container HTML Element,
         *   either a div or span, inside which all existing
         *   radio inputs will be considered as options.
         *   @param [name] A name parameter for each Input
         *   Element.
         *   @return pointer to p5.Element holding created node
         */
        createRadio(containerElement: object, name?: string): Element;

        /**
         *   Creates a radio button element in the DOM. It also
         *   helps existing radio buttons assign methods of
         *   p5.Element. - .option(value, [label]) can be used
         *   to create a new option for the element. If an
         *   option with a value already exists, it will be
         *   returned. It is recommended to use string values
         *   as input for value. Optionally, a label can be
         *   provided as second argument for the option.
         *   - .remove(value) can be used to remove an option
         *   for the element. String values recommended as
         *   input for value.
         *   - .value() method will return the currently
         *   selected value.
         *   - .selected() method will return the currently
         *   selected input element.
         *   - .selected(value) method will select the option
         *   and return it. String values recommended as input
         *   for value.
         *   - .disable(Boolean) method will enable/disable the
         *   whole radio button element.
         *   @param name A name parameter for each Input
         *   Element.
         *   @return pointer to p5.Element holding created node
         */
        createRadio(name: string): Element;

        /**
         *   Creates a radio button element in the DOM. It also
         *   helps existing radio buttons assign methods of
         *   p5.Element. - .option(value, [label]) can be used
         *   to create a new option for the element. If an
         *   option with a value already exists, it will be
         *   returned. It is recommended to use string values
         *   as input for value. Optionally, a label can be
         *   provided as second argument for the option.
         *   - .remove(value) can be used to remove an option
         *   for the element. String values recommended as
         *   input for value.
         *   - .value() method will return the currently
         *   selected value.
         *   - .selected() method will return the currently
         *   selected input element.
         *   - .selected(value) method will select the option
         *   and return it. String values recommended as input
         *   for value.
         *   - .disable(Boolean) method will enable/disable the
         *   whole radio button element.
         *   @return pointer to p5.Element holding created node
         */
        createRadio(): Element;

        /**
         *   Creates a colorPicker element in the DOM for color
         *   input. The .value() method will return a hex
         *   string (#rrggbb) of the color. The .color() method
         *   will return a p5.Color object with the current
         *   chosen color.
         *   @param [value] default color of element
         *   @return pointer to p5.Element holding created node
         */
        createColorPicker(value?: string | Color): Element;

        /**
         *   Creates an <input></input> element in the DOM for
         *   text input. Use .size() to set the display length
         *   of the box.
         *   @param value default value of the input box
         *   @param [type] type of text, ie text, password etc.
         *   Defaults to text. Needs a value to be specified
         *   first.
         *   @return pointer to p5.Element holding created node
         */
        createInput(value: string, type?: string): Element;

        /**
         *   Creates an <input></input> element in the DOM for
         *   text input. Use .size() to set the display length
         *   of the box.
         *   @param [value] default value of the input box
         */
        createInput(value?: string): Element;

        /**
         *   Creates an <input></input> element in the DOM of
         *   type 'file'. This allows users to select local
         *   files for use in a sketch.
         *   @param callback callback function for when a file
         *   is loaded
         *   @param [multiple] optional, to allow multiple
         *   files to be selected
         *   @return pointer to p5.Element holding created DOM
         *   element
         */
        createFileInput(callback: (...args: any[]) => any, multiple?: boolean): Element;

        /**
         *   Creates an HTML5 <video> element in the DOM for
         *   simple playback of audio/video. Shown by default,
         *   can be hidden with .hide() and drawn into canvas
         *   using image(). The first parameter can be either a
         *   single string path to a video file, or an array of
         *   string paths to different formats of the same
         *   video. This is useful for ensuring that your video
         *   can play across different browsers, as each
         *   supports different formats. See this page for
         *   further information about supported formats.
         *   @param src path to a video file, or array of paths
         *   for supporting different browsers
         *   @param [callback] callback function to be called
         *   upon 'canplaythrough' event fire, that is, when
         *   the browser can play the media, and estimates that
         *   enough data has been loaded to play the media up
         *   to its end without having to stop for further
         *   buffering of content
         *   @return pointer to video p5.MediaElement
         */
        createVideo(src: string | string[], callback?: (...args: any[]) => any): MediaElement;

        /**
         *   Creates a hidden HTML5 <audio> element in the DOM
         *   for simple audio playback. The first parameter can
         *   be either a single string path to a audio file, or
         *   an array of string paths to different formats of
         *   the same audio. This is useful for ensuring that
         *   your audio can play across different browsers, as
         *   each supports different formats. See this page for
         *   further information about supported formats.
         *   @param [src] path to an audio file, or array of
         *   paths for supporting different browsers
         *   @param [callback] callback function to be called
         *   upon 'canplaythrough' event fire, that is, when
         *   the browser can play the media, and estimates that
         *   enough data has been loaded to play the media up
         *   to its end without having to stop for further
         *   buffering of content
         *   @return pointer to audio p5.MediaElement
         */
        createAudio(src?: string | string[], callback?: (...args: any[]) => any): MediaElement;

        /**
         *   Creates a new HTML5 <video> element that contains
         *   the audio/video feed from a webcam. The element is
         *   separate from the canvas and is displayed by
         *   default. The element can be hidden using .hide().
         *   The feed can be drawn onto the canvas using
         *   image(). The loadedmetadata property can be used
         *   to detect when the element has fully loaded (see
         *   second example). More specific properties of the
         *   feed can be passing in a Constraints object. See
         *   the  W3C spec for possible properties. Note that
         *   not all of these are supported by all browsers.
         *
         *   Security note: A new browser security
         *   specification requires that getUserMedia, which is
         *   behind createCapture(), only works when you're
         *   running the code locally, or on HTTPS. Learn more
         *   here and here.
         *   @param type type of capture, either VIDEO or AUDIO
         *   if none specified, default both, or a Constraints
         *   object
         *   @param [callback] function to be called once
         *   stream has loaded
         *   @return capture video p5.Element
         */
        createCapture(type: string | TYPE | object, callback?: (...args: any[]) => any): Element;

        /**
         *   Creates element with given tag in the DOM with
         *   given content.
         *   @param tag tag for the new element
         *   @param [content] html content to be inserted into
         *   the element
         *   @return pointer to p5.Element holding created node
         */
        createElement(tag: string, content?: string): Element;
    }
    interface Element {
        /**
         *   Adds specified class to the element.
         *   @param class name of class to add
         *   @chainable
         */
        addClass(theClass: string): Element;

        /**
         *   Removes specified class from the element.
         *   @param class name of class to remove
         *   @chainable
         */
        removeClass(theClass: string): Element;

        /**
         *   Checks if specified class is already applied to
         *   element.
         *   @param c class name of class to check
         *   @return a boolean value if element has specified
         *   class
         */
        hasClass(c: string): boolean;

        /**
         *   Toggles element class.
         *   @param c class name to toggle
         *   @chainable
         */
        toggleClass(c: string): Element;

        /**
         *   Attaches the element as a child to the parent
         *   specified. Accepts either a string ID, DOM node,
         *   or p5.Element. If no argument is specified, an
         *   array of children DOM nodes is returned.
         *   @return an array of child nodes
         */
        child(): Node[];

        /**
         *   Attaches the element as a child to the parent
         *   specified. Accepts either a string ID, DOM node,
         *   or p5.Element. If no argument is specified, an
         *   array of children DOM nodes is returned.
         *   @param [child] the ID, DOM node, or p5.Element to
         *   add to the current element
         *   @chainable
         */
        child(child?: string | Element): Element;

        /**
         *   Centers a p5.Element either vertically,
         *   horizontally, or both, relative to its parent or
         *   according to the body if the p5.Element has no
         *   parent. If no argument is passed the p5.Element is
         *   aligned both vertically and horizontally.
         *   @param [align] passing 'vertical', 'horizontal'
         *   aligns element accordingly
         *   @chainable
         */
        center(align?: string): Element;

        /**
         *   If an argument is given, sets the inner HTML of
         *   the element, replacing any existing HTML. If true
         *   is included as a second argument, HTML is appended
         *   instead of replacing existing HTML. If no
         *   arguments are given, returns the inner HTML of the
         *   element.
         *   @return the inner HTML of the element
         */
        html(): string;

        /**
         *   If an argument is given, sets the inner HTML of
         *   the element, replacing any existing HTML. If true
         *   is included as a second argument, HTML is appended
         *   instead of replacing existing HTML. If no
         *   arguments are given, returns the inner HTML of the
         *   element.
         *   @param [html] the HTML to be placed inside the
         *   element
         *   @param [append] whether to append HTML to existing
         *   @chainable
         */
        html(html?: string, append?: boolean): Element;

        /**
         *   Sets the position of the element. If no position
         *   type argument is given, the position will be
         *   relative to (0, 0) of the window. Essentially,
         *   this sets position:absolute and left and top
         *   properties of style. If an optional third argument
         *   specifying position type is given, the x and
         *   y-coordinates will be interpreted based on the
         *   positioning scheme. If no arguments given, the
         *   function returns the x and y position of the
         *   element. found documentation on how to be more
         *   specific with object type
         *   https://stackoverflow.com/questions/14714314/how-do-i-comment-object-literals-in-yuidoc
         *   @return object of form { x: 0, y: 0 } containing
         *   the position of the element in an object
         */
        position(): object;

        /**
         *   Sets the position of the element. If no position
         *   type argument is given, the position will be
         *   relative to (0, 0) of the window. Essentially,
         *   this sets position:absolute and left and top
         *   properties of style. If an optional third argument
         *   specifying position type is given, the x and
         *   y-coordinates will be interpreted based on the
         *   positioning scheme. If no arguments given, the
         *   function returns the x and y position of the
         *   element. found documentation on how to be more
         *   specific with object type
         *   https://stackoverflow.com/questions/14714314/how-do-i-comment-object-literals-in-yuidoc
         *   @param [x] x-position relative to upper left of
         *   window (optional)
         *   @param [y] y-position relative to upper left of
         *   window (optional)
         *   @param [positionType] it can be static, fixed,
         *   relative, sticky, initial or inherit (optional)
         *   @chainable
         */
        position(x?: number, y?: number, positionType?: string): Element;

        /**
         *   Sets the given style (CSS) property (1st arg) of
         *   the element with the given value (2nd arg). If a
         *   single argument is given, .style() returns the
         *   value of the given property; however, if a single
         *   argument is given in CSS syntax
         *   ('text-align:center'), .style() sets the CSS
         *   appropriately.
         *   @param property property to be set
         *   @return value of property
         */
        style(property: string): string;

        /**
         *   Sets the given style (CSS) property (1st arg) of
         *   the element with the given value (2nd arg). If a
         *   single argument is given, .style() returns the
         *   value of the given property; however, if a single
         *   argument is given in CSS syntax
         *   ('text-align:center'), .style() sets the CSS
         *   appropriately.
         *   @param property property to be set
         *   @param value value to assign to property
         *   @chainable
         */
        style(property: string, value: string | Color): Element;

        /**
         *   Adds a new attribute or changes the value of an
         *   existing attribute on the specified element. If no
         *   value is specified, returns the value of the given
         *   attribute, or null if the attribute is not set.
         *   @return value of attribute
         */
        attribute(): string;

        /**
         *   Adds a new attribute or changes the value of an
         *   existing attribute on the specified element. If no
         *   value is specified, returns the value of the given
         *   attribute, or null if the attribute is not set.
         *   @param attr attribute to set
         *   @param value value to assign to attribute
         *   @chainable
         */
        attribute(attr: string, value: string): Element;

        /**
         *   Removes an attribute on the specified element.
         *   @param attr attribute to remove
         *   @chainable
         */
        removeAttribute(attr: string): Element;

        /**
         *   Either returns the value of the element if no
         *   arguments given, or sets the value of the element.
         *   @return value of the element
         */
        value(): string | number;

        /**
         *   Either returns the value of the element if no
         *   arguments given, or sets the value of the element.
         *   @chainable
         */
        value(value: string | number): Element;

        /**
         *   Shows the current element. Essentially, setting
         *   display:block for the style.
         *   @chainable
         */
        show(): Element;

        /**
         *   Hides the current element. Essentially, setting
         *   display:none for the style.
         *   @chainable
         */
        hide(): Element;

        /**
         *   Sets the width and height of the element. AUTO can
         *   be used to only adjust one dimension at a time. If
         *   no arguments are given, it returns the width and
         *   height of the element in an Object. In the case of
         *   elements that need to be loaded, such as images,
         *   it is recommended to call the function after the
         *   element has finished loading.
         *   @return the width and height of the element in an
         *   object
         */
        size(): {width:number,height:number};

        /**
         *   Sets the width and height of the element. AUTO can
         *   be used to only adjust one dimension at a time. If
         *   no arguments are given, it returns the width and
         *   height of the element in an Object. In the case of
         *   elements that need to be loaded, such as images,
         *   it is recommended to call the function after the
         *   element has finished loading.
         *   @param w width of the element, either AUTO, or a
         *   number
         *   @param [h] height of the element, either AUTO, or
         *   a number
         *   @chainable
         */
        size(w: number | SIZE_W, h?: number | SIZE_H): Element;

        /**
         *   Removes the element, stops all media streams, and
         *   deregisters all listeners.
         */
        remove(): void;

        /**
         *   Registers a callback that gets called every time a
         *   file that is dropped on the element has been
         *   loaded. p5 will load every dropped file into
         *   memory and pass it as a p5.File object to the
         *   callback. Multiple files dropped at the same time
         *   will result in multiple calls to the callback. You
         *   can optionally pass a second callback which will
         *   be registered to the raw drop event. The callback
         *   will thus be provided the original DragEvent.
         *   Dropping multiple files at the same time will
         *   trigger the second callback once per drop, whereas
         *   the first callback will trigger for each loaded
         *   file.
         *   @param callback callback to receive loaded file,
         *   called for each file dropped.
         *   @param [fxn] callback triggered once when files
         *   are dropped with the drop event.
         *   @chainable
         */
        drop(callback: (...args: any[]) => any, fxn?: (...args: any[]) => any): Element;
    }
}
