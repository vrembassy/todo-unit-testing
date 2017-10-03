// item.js
//   functions: 
//      1. initialization, 
//      2. remove a todo item, 
//      3. update the completion status of a todo item
//      4. display a new todo item 
//   dependencies : 
//      store.js, helper.js

;(function(exports) { //exports === window
  "use strict";

  var STATUS_COMPLETE = 'mark_complete';

  //utility functions 
  function $createEl(tagName) {
    return document.createElement("li");
  }


  function $removeEl($el) {
    var parent = $el.parentNode;
    if (parent) parent.removeChild($el);
  }

  window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

  function $on(target, type, callback, useCapture) {
    target.addEventListener(type, callback, !!useCapture);
  }

  function $delegate(target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		var useCapture = type === 'blur' || type === 'focus';

		$on(target, type, dispatchEvent, useCapture);
  };
  
  function $off() { 
    //TBD: 
  }

  function $classNameAdd(el, className){
    el.classList.add(className);
  }

  function $classNameRemove(el, className){
    el.classList.remove(className);
  }
      

  // create the object 
  function Item(todo) { 

    //handle exception
    if (!todo) {
      //TBD:
    }

    // object initialization
    this.todo = todo; //data 

    this.$el = $createEl("li"); 
    this.$el.id = this.elId = "item_" + this.todo.id; //cached dom node

    // registering the events for status update/delete
    $delegate(this.$el, ".controls.status", "click", this._handleComplete.bind(this));
    $delegate(this.$el, ".controls.remove", "click", this._handleRemove.bind(this));

    return this; // this === Item object  

  }

  // make this object public
  exports.Item = Item;

  // object public methods 
  Item.prototype = {

    // responsible for creating dom content 
    display: function(){

      //append to this el
      this.$el.innerHTML = template(this.todo);
      return this;  
    },

    // mark the todo item as completed/incomplete
    setCompletionStatus: function(status){
      this.todo.status = status;

      //add class to this $el
      if (status === true)
        $classNameAdd(this.$el, STATUS_COMPLETE);
      else 
        $classNameRemove(this.$el, STATUS_COMPLETE);
     
      return this;
    },

    // remove the element from DOM
    remove: function(){ 
      // TBD: alert

      // TBD: remove the event handlers registered for this el

      // remove this element from DOM 
      $removeEl(this.$el);
      this.$el = null;

      return this;
    },
  
    _handleComplete: function(e, d) {
      //e.preventDefault();
      console.log("_handleComplete", e, d);
      this.setCompletionStatus(!this.todo.status);
    },

    _handleRemove: function(e, d) {
      console.log("_handleRemove", e, d);
      this.remove();
    }
  };

  // private functions
  function template(todo) {
    var html = "<p>"+ todo.name + 
        "<span class='controls status'>&#10004;</span>" + 
        "<span class='controls remove'>x</span>" + 
        "</p>";
    return html;
  }

})(this); //this === window