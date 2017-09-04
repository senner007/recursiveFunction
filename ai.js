$(document).ready(function() {

  var divs = $('.wrapper').find('div'),
    obj = {};

    divs.each(function(i, el) {
      var $el = $(el);
      var tempArr = []
      var str = $el.attr('id');
      var res = str.split(",");

      tempArr.push(res[0]);
      tempArr.push(res[1]);

      obj[tempArr] = {}
      obj[tempArr].name = el.classList[1];
      obj[tempArr].isSet = false;
      obj[tempArr].marked = false;
      obj[tempArr].isPath = false;
    })


  $('.wrapper').on('click', 'div', function() {

    this.classList.toggle('set')

    if (obj[this.id].isSet == false) {
      obj[this.id].isSet = true;
    } else {
      obj[this.id].isSet = false;
    }

  });


  function _shuffle(a) { // shuffle array
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  function findSolution(start, target, obj) {

    var stackCount = 0;
    var stepsTaken = 0;
    var isFound = false;

    function find(current, num) {
      stackCount++;
      if (stackCount > 10000 || isFound == true) { return null;  }; // opt out if function is called too many times or isFound

      if (obj[current] == target) { // if destination has been reached - return array
        isFound = true;
        let string = obj[start].name + num;
        let stringSplit = string.split(',');
        return {
          stepsTaken: stepsTaken,
          stackCount : stackCount,
          newArr: stringSplit,
          obj: obj
        }
      }

      // else if (obj[current].isSet == false || obj[current].isMarked == true) {
      //   return null;
      // } // if 'set' not in property or 'marked' in poperty

      else {
        obj[current].isMarked = true
        if (num == undefined) {  num = '' }
        let left = [current[0] - 1, current[1]]
        let right = [current[0] + 1, current[1]]
        let up = [current[0], current[1] + 1]
        let down = [current[0], current[1] - 1]

        let toAdd = num + ',';
        let orderArray = [down, left, right, up];
        _shuffle(orderArray);

        if (obj[orderArray[0]] != undefined) {
          var objVal_0 = obj[orderArray[0]].isMarked == true || obj[orderArray[0]].isSet == false ? false : true
        }
        if (obj[orderArray[1]] != undefined) {
          var objVal_1 = obj[orderArray[1]].isMarked == true || obj[orderArray[1]].isSet == false ? false : true
        }
        if (obj[orderArray[2]] != undefined) {
          var objVal_2 = obj[orderArray[2]].isMarked == true || obj[orderArray[2]].isSet == false ? false : true
        }
        if (obj[orderArray[3]] != undefined) {
          var objVal_3 = obj[orderArray[3]].isMarked == true || obj[orderArray[3]].isSet == false ? false : true
        }

        stepsTaken++;

        return (objVal_0 ? find(orderArray[0], toAdd + obj[orderArray[0]].name) : null)
               || (objVal_1 ? find(orderArray[1], toAdd + obj[orderArray[1]].name) : null)
               || (objVal_2 ? find(orderArray[2], toAdd + obj[orderArray[2]].name) : null)
               || (objVal_3 ? find(orderArray[3], toAdd + obj[orderArray[3]].name): null);

        // return find(down, toAdd + obj[down]) || find(left,   toAdd + obj[left])||
        // find(right, toAdd + obj[right]) || find(up, toAdd + obj[up]);
      }
    }
    return find(start);
  }

  //console.clear();
  $('#calc').on('click', function() {

    var directions = []
    var functionCalls = 50;
    var solution;
    var start = [1, 3];
    var target = obj[[1, 1]];
    var startTime = performance.now();

    for (let i = 0; i < functionCalls; i++) {

      let tempSolution = findSolution(start, target, obj);

      for (let x in obj) {
        obj[x].isMarked = false;
      }

      if (tempSolution != null) {
        if (solution == undefined) {  solution = tempSolution }
        if (tempSolution.newArr.length < solution.newArr.length) {
          solution = tempSolution
        }
      }

    }
    if (solution == undefined) { alert('Path not found!')}
    var endTime = performance.now();;
    var time = endTime - startTime;


    document.getElementById('stepsTaken').textContent = 'Steps taken: ' + solution.stepsTaken;
    document.getElementById('pathLength').textContent = 'Path length: ' + solution.newArr.length;
    document.getElementById('additionalSteps').textContent = 'Additional steps taken : ' + (solution.stepsTaken - solution.newArr.length);
    document.getElementById('time').textContent = 'time to do ' + functionCalls + ' function calls: ' + Math.floor(time * 100)/100 + ' ms';


    _animateSolution(solution, 50);

  });

  function _animateSolution(solution, speed) {
    var wrapper = $('.wrapper');
    var time = 0;

    for (let x in solution.obj) {
      let el = document.getElementById(x).style.border = 'none';
    }
    for (let x of solution.newArr) {
      let el = document.getElementsByClassName(x)[0]
      el.style.border = '2px solid red';

      setTimeout(function() {
        $(el).stop(true, true).fadeOut().fadeIn();
      }, time)

      time = time + speed;
    }
  }

})
