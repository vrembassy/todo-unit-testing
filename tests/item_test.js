// item_test.js
//      Test suite for Item object

//assert library
var expect = chai.expect;

describe("Item", function() {
    "use strict";

////////// Test Setup
        
    var item;
    var todo = {id: "1", name: "buy milk", status: false}; //data
    var $ul; 

    beforeEach(function(){
        item = new Item(todo);
        $ul = document.createElement("ul");
    });

////////////

    describe("constructor", function(){
        it("should be constructor", function() {

          // expected value and the actual value are same 
          expect(item).to.be.an.instanceOf(Item); 
          expect(item.todo).to.be.deep.equal(todo);
        });
    });

    describe("display", function(){
        it("should return the html content", function() {
            
            //item.display().$el === item.display();item.$el; 
            expect(item.display().$el).to.be.an.instanceOf(Element);
        });
    });
    
    describe("set completion status", function(){

        it("mark complete", function(){
            //check the class is present
            item.display().setCompletionStatus(true);
            expect(item.$el.classList.contains('mark_complete')).to.be.true;
        });

        it("mark incomplete", function(){
            //check the class is absent
            item.display().setCompletionStatus(false);
            expect(item.$el.classList.contains('mark_complete')).to.be.false;
        })
    });

    describe("remove", function(){
        it("should delete the element", function() {
            $ul.append(item.display().$el);
            expect(item.remove().$el).to.be.null;
        });
    });

    describe("event handlers", function(){
        it("completion click event called", function(){

            $ul.append(item.display().$el);

            //simulate click 
            $ul.querySelector( "#" + item.elId + " .controls.status").click();

            //whether the event handler is called
            expect(item.$el.classList.contains('mark_complete')).to.be.true;
            
        });
        it("remove click event called", function(){

            $ul.append(item.display().$el);

            //simulate click 
            $ul.querySelector( "#" + item.elId + " .controls.remove").click();

            //whether the event handler is called
            expect(item.$el).to.be.null;
            
        });

    });

});


