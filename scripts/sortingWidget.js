"use strict";
(function () {
	var SortingWidget = function(rootNode){
		this.unsortedArray = [];
		this.rootNode = rootNode[0];
		this.step = 1;
		this._renderWidgetDomElement(rootNode);

		this.arrayElement = this.rootNode.querySelector("#unsort-array");
		this.numInput = this.rootNode.querySelector("#num-input");
		this.addBtn = this.rootNode.querySelector("#add-num-in-array-btn");
		this.resetBtn = this.rootNode.querySelector("#reset");
		this.stepForwardBtn = this.rootNode.querySelector("#step-forward");
		this.sortingStepsWrp = this.rootNode.querySelector("#sorting-steps-wrp");
		
		this.bubbleSort;

		this._initEventHendlers();
	}

	SortingWidget.prototype._renderStepArraySortingDomElement = function(){
		var stepTitle = document.createElement("h4");
		stepTitle.textContent  = "Sorting step "+this.step;
		
		var sortingStep = document.createElement("ul");
		sortingStep.setAttribute("class","array-container")
		
		for (var i = 0; i < this.unsortedArray.length; i++) {
			var li = document.createElement("li");
			li.setAttribute("class", "array-element "+this._markSwappedElements(i, this.bubbleSort.getSwappedElement()));
			li.textContent  = this.unsortedArray[i];
			sortingStep.appendChild(li);
		};

		this.sortingStepsWrp.innerHTML = "";
		this.sortingStepsWrp.appendChild(stepTitle);
		this.sortingStepsWrp.appendChild(sortingStep);

		this.step++;

	}

	SortingWidget.prototype._initEventHendlers = function(){

		this.addBtn.addEventListener("click", this._addBtnClickHendler.bind(this), false)		

		this.resetBtn.addEventListener("click", this._resetBtnClickHendler.bind(this), false);

		this.stepForwardBtn.addEventListener("click", this._stepForwardBtnClickHendler.bind(this), false);
	}

	//Creating widget DOM Elements
	SortingWidget.prototype._renderWidgetDomElement = function(rootNode){
		
		//Root widget element
		var rootElement = rootNode[0];		
		//Inserting element to parent elements
		rootElement.appendChild(this._createControlesElements());
		rootElement.appendChild(this._createArrayWrpElement());
		rootElement.appendChild(this._createSortingResultsWrpElement());

	}

	SortingWidget.prototype._createControlesElements	= function(){
		var cntrlWrp = document.createElement("div");
		cntrlWrp.setAttribute("class", "cntrl-wrp")
		cntrlWrp.appendChild(this._createInputElement());
		cntrlWrp.appendChild(this._createAddBtnElement());
		cntrlWrp.appendChild(this._createResetBtnElement());	
		cntrlWrp.appendChild(this._createStepForvardBtnElement());

		return cntrlWrp
	}

	SortingWidget.prototype._createInputElement = function(){
		var numInput = document.createElement("input");
		numInput.setAttribute("id", "num-input");
		numInput.setAttribute("class","num-input");
		numInput.type = "number";

		return numInput;
	}

	SortingWidget.prototype._createAddBtnElement = function(){
		var addBtn = document.createElement("input");
		addBtn.setAttribute("id", "add-num-in-array-btn");
		addBtn.setAttribute("class","btn btn-primary");
		addBtn.type = "button";
		addBtn.value = "Add";

		return addBtn;
	}

	SortingWidget.prototype._createResetBtnElement = function(){
		var resetInput = document.createElement("input");
		resetInput.setAttribute("id", "reset");
		resetInput.setAttribute("class","btn btn-primary");
		resetInput.type = "button";
		resetInput.value = "Reset";
		return resetInput;
	}

	SortingWidget.prototype._createStepForvardBtnElement = function(){
		var stepForwardInput = document.createElement("input");
		stepForwardInput.setAttribute("id", "step-forward");
		stepForwardInput.setAttribute("disabled", "");
		stepForwardInput.setAttribute("class","btn btn-primary");
		stepForwardInput.type = "button";
		stepForwardInput.value = "Step forward";
		return stepForwardInput;
	}

	SortingWidget.prototype._createArrayWrpElement = function(){
		var arrayWpr = document.createElement("div");
		arrayWpr.setAttribute("id", "unsort-array-wrp");
		
		var unsortArray = document.createElement("ul");
		unsortArray.setAttribute("id", "unsort-array");
		unsortArray.setAttribute("class","hiden array-container");
		arrayWpr.appendChild(unsortArray);

		return arrayWpr;
	}

	SortingWidget.prototype._createSortingResultsWrpElement = function(){
		var sortingStepsWrp = document.createElement("div");
		sortingStepsWrp.setAttribute("id", "sorting-steps-wrp");
		return sortingStepsWrp;
	}


	//Handle click on 'Add' button
	SortingWidget.prototype._addBtnClickHendler = function(){
		if(!!this.numInput.value){//check for empty value				
			this.unsortedArray.push(parseInt(this.numInput.value));
			var li = document.createElement("li");
			li.setAttribute("class", "array-element");
			li.innerText = this.numInput.value;
			this.arrayElement.appendChild(li);
			
			//Show not empty array 
			if(this.arrayElement.classList.contains("hiden"))
				this.arrayElement.classList.remove("hiden");
				this.stepForwardBtn.removeAttribute("disabled");
		}
			
		this.numInput.value="";
		this.numInput.focus();
	}

	//Handle click on 'Reset' button
	SortingWidget.prototype._resetBtnClickHendler = function(){
		this.unsortedArray = [];
		this.arrayElement.innerHTML = "";
		this.sortingStepsWrp.innerHTML = "";
		this.arrayElement.classList.add("hiden");
		this.stepForwardBtn.setAttribute("disabled", "");
		this.bubbleSort = null;
		this.step = 1;
	}

	//Handle click on 'Step forvard' button
	SortingWidget.prototype._stepForwardBtnClickHendler = function(){
		if(!this.bubbleSort){
			//Init bubbul sorter
			this.bubbleSort = new window.BubbleSort(this.unsortedArray)
		}			
		//Do step of sorting
		if(!this.bubbleSort.isSorted()){
			this.bubbleSort.bubbleSortStep();
			this._renderStepArraySortingDomElement();
		}else{//Render 'is sorted' DOM element
			if(!this.sortingStepsWrp.querySelector("#is-sortad-lable")){
				var isSorted = document.createElement("span");
				isSorted.setAttribute("id", "is-sortad-lable");
				isSorted.innerText = "Array is sorted";
				this.sortingStepsWrp.appendChild(isSorted);
			}				
		}
	}
	
	//Mark swapped array element on current step of sorting
	SortingWidget.prototype._markSwappedElements = function(curentItemIndex, swappedIndexes){
		var mark;		
		if(swappedIndexes.indexOf(curentItemIndex)!=-1)
			mark = 'mark-red';
		return mark;
	}

	window.SortingWidget = SortingWidget;
})();