"use strict";
(function(){
	function BubbleSort(arr){
		this.arr = arr;
		this.step = 0;
		this.passCount = 0;
		this.swappedElement;		
	}

	BubbleSort.prototype.bubbleSortStep =function(){
		this.swappedElement = [];
		var isSwaped = false;

		if(this.passCount < this.arr.length-1){		
			if(this.arr[this.step]>this.arr[this.step+1]){
				var tmp = this.arr[this.step];
				this.arr[this.step] = this.arr[this.step+1];
				this.arr[this.step+1] = tmp;
				this.swappedElement = [this.step, this.step+1];
				isSwaped = true;
			}
			if(this.step<this.arr.length-(2+this.passCount)){
				this.step++;
			}
			else{
				this.step = 0;
				this.passCount++;
			}
		}
		return this.arr;	
	}

	BubbleSort.prototype.getSwappedElement = function(){
		return this.swappedElement;
	}

	BubbleSort.prototype.isSorted = function(){
		for (var i = 0; i < this.arr.length-1; i++) {
			if(this.arr[i] > this.arr[i+1]){
				return false;
			}
		};
		return true;
	}

	window.BubbleSort = BubbleSort;
})();