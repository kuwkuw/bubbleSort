describe("Testin BubbleSort", function() {
var unsortedArray = [3,8,6,1,12,15,0];
var results = [
  [3, 8, 6, 1, 12, 15, 0],
  [3, 6, 8, 1, 12, 15, 0],
  [3, 6, 1, 8, 12, 15, 0],
  [3, 6, 1, 8, 12, 15, 0],
  [3, 6, 1, 8, 12, 15, 0],
  [3, 6, 1, 8, 12, 0, 15],
  //second loop
  [3, 6, 1, 8, 12, 0, 15],
  [3, 1, 6, 8, 12, 0, 15],
  [3, 1, 6, 8, 12, 0, 15],
  [3, 1, 6, 8, 12, 0, 15],
  [3, 1, 6, 8, 0, 12, 15],
  // 3 loop
  [1, 3, 6, 8, 0, 12, 15],
  [1, 3, 6, 8, 0, 12, 15],
  [1, 3, 6, 8, 0, 12, 15],
  [1, 3, 6, 0, 8, 12, 15],
  // 4 loop
  [1, 3, 6, 0, 8, 12, 15],
  [1, 3, 6, 0, 8, 12, 15],
  [1, 3, 0, 6, 8, 12, 15],
  // 5 loop
  [1, 3, 0, 6, 8, 12, 15],
  [1, 0, 3, 6, 8, 12, 15],
  // 6 loop
  [0, 1, 3, 6, 8, 12, 15]
];

  describe("Testing  bubbleSortStep() like object method with [3, 8, 6, 1, 12, 15, 0]", function(){

    var bubbleSort = new window.BubbleSort(unsortedArray);

    for (var i = 0; i < results.length; i++) {
     bubbleSortStepTestHelper(i);
    };

    function bubbleSortStepTestHelper(index) {
      describe(index+" step of bubble sorting", function(){
        it("Raturn "+results[index], function(){       
          expect(bubbleSort.bubbleSortStep()).to.eql(results[index]);       
        });
      });
    }    
  }); 

  describe("Testing getSwappedElement()", function(){
    var bubbleSort = new window.BubbleSort([3,8,6,1,12,15,0]);

    for (var i = 0; i < 3; i++) {
     bubbleSort.bubbleSortStep();
    };
    it("On third step getSwappedElement() return 2", function(){
      expect(bubbleSort.getSwappedElement()).to.eql([2, 3]); 
    })  
  });

  describe("Testing isSorted()", function(){
    it("array is sorted", function(){
      var bubbleSort = new window.BubbleSort([0,1,2,3,4]);
      expect(bubbleSort.isSorted()).to.eql(true); 
    }) 

    it("array is not sorted", function(){
      var bubbleSort = new window.BubbleSort([5,0,1,2,3]);
      expect(bubbleSort.isSorted()).to.eql(false); 
    }) 
  });
});

describe("Testing SortingWidget", function(){
  
  
  describe("Generating widget DOM elements", function(){
    var sortWidget = new window.SortingWidget($("<div id='algoritm-widget'></div>"));
    it("Generate  DOM element '#unsort-array'", function(){
      expect(sortWidget.arrayElement.outerHTML).to.deep.eql('<ul id="unsort-array" class="hiden array-container"></ul>');
    });

    it("Generate DOM element '#num-input'", function(){
      expect(sortWidget.numInput.outerHTML).to.deep.eql('<input id="num-input" class="num-input" type="number">');
    });

    it("Generate DOM element '#add-num-in-array-btn'", function(){
      expect(sortWidget.addBtn.outerHTML).to.deep.eql('<input id="add-num-in-array-btn" class="btn btn-primary" type="button" value="Add">');
    });

    it("Generate DOM element '#reset'", function(){
      expect(sortWidget.resetBtn.outerHTML).to.deep.eql('<input id="reset" class="btn btn-primary" type="button" value="Reset">');
    });

    it("Generate DOM element '#step-forward'", function(){
      expect(sortWidget.stepForwardBtn.outerHTML).to.deep.eql('<input id="step-forward" disabled="" class="btn btn-primary" type="button" value="Step forward">');
    });

    it("Generate DOM element '#sorting-steps-wrp'", function(){
      expect(sortWidget.sortingStepsWrp.outerHTML).to.deep.eql('<div id="sorting-steps-wrp"></div>');
    });
  });
  
  describe("Testing 'Add' and 'Step forward' event hendlers", function(){
    var sortWidget = new window.SortingWidget($("<div id='algoritm-widget'></div>"));   
    
    it("On click 'Add' button generate DOM element for array element in '#unsort-array'", function(){
      sortWidget.numInput.value=1;
      $(sortWidget.addBtn).trigger( "click" );
      expect(sortWidget.arrayElement.outerHTML).to.deep.eql('<ul id="unsort-array" class="array-container"><li class="array-element">1</li></ul>');
    });

    it("On click 'Step forward' generate DOM element for sorted array in '#sorting-steps-wrp'", function(){
      sortWidget.unsortedArray = [3, 0, 1, 2];
      $(sortWidget.stepForwardBtn).trigger( "click" );
      expect(sortWidget.sortingStepsWrp.getElementsByTagName("UL")[0].outerHTML).to.eql('<ul class="array-container"><li class="array-element mark-red">0</li><li class="array-element mark-red">3</li><li class="array-element undefined">1</li><li class="array-element undefined">2</li></ul>');
    });

    
  });
  describe("Testing when array is sorted", function(){
    var sortWidget = new window.SortingWidget($("<div id='algoritm-widget'></div>"));
    sortWidget.unsortedArray = [0, 1, 2, 3];
    sortWidget.stepForwardBtn.removeAttribute("disabled");
    it("On click 'Step forward' when array is sorted '#sorting-steps-wrp' have '#is-sortad-lable' element", function(){
      $(sortWidget.stepForwardBtn).trigger( "click" );
      expect(sortWidget.sortingStepsWrp.getElementsByTagName("SPAN").length).to.eql(1);
      expect(sortWidget.sortingStepsWrp.getElementsByTagName("SPAN")[0].innerText).to.eql("Array is sorted");
    });
    it("On click more then one tims'Step forward' when array is sorted '#sorting-steps-wrp' have '#is-sortad-lable' element", function(){
      $(sortWidget.stepForwardBtn).trigger( "click" );
      $(sortWidget.stepForwardBtn).trigger( "click" );
      expect(sortWidget.sortingStepsWrp.getElementsByTagName("SPAN").length).to.eql(1);
    });
  });

   describe("Testing 'Reset' event hendlers", function(){
    var sortWidget = new window.SortingWidget($("<div id='algoritm-widget'></div>")); 
    sortWidget.numInput.value=1;  
    sortWidget.unsortedArray = [3, 0, 1, 2];
    $(sortWidget.addBtn).trigger( "click" );
    $(sortWidget.stepForwardBtn).trigger( "click" );
    $(sortWidget.resetBtn).trigger( "click" );

    it("On click 'Reset' button cliar DOM element", function(){  
      expect(sortWidget.arrayElement.outerHTML).to.deep.eql('<ul id="unsort-array" class="array-container hiden"></ul>');
      expect(sortWidget.sortingStepsWrp.getElementsByTagName("UL").length).to.eql(0);
      expect(sortWidget.stepForwardBtn.hasAttribute("disabled")).to.eql(true);
      expect(sortWidget.step).to.eql(1);
    });    
  });

});

