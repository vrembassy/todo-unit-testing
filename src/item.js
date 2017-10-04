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
 
  // create the object 
  function Item(todo) { 

    //TBD: handle exception
    if (!todo) {

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

      //remove the event handlers
      $off(this.$el, this._handleComplete);
      $off(this.$el, this._handleRemove);

      // remove this element from DOM 
      $removeEl(this.$el);
      this.$el = null;

      return this;
    },
  
    _handleComplete: function(e) {
      //e.preventDefault();
      this.setCompletionStatus(!this.todo.status);
    },

    _handleRemove: function(e) {
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