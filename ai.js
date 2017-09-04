$(document).ready(function() {

  var divs = $('.wrapper').find('div'),
    obj = {};

  $('.wrapper').on('click', 'div', function() {

    this.classList.toggle('set')


    divs.each(function(i, el) {
      var $el = $(el);
      var tempArr = []
      var str = $el.attr('id');
      var res = str.split(",");

      tempArr.push(res[0]);
      tempArr.push(res[1]);

      obj[tempArr] = el.classList[1];
      if ($el.hasClass('set')) {
        obj[tempArr] = el.classList[1] + ' set';
      }
    })


  });


  function shuffle(a) { // shuffle array
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  function findSolution(start, target, obj) {
    var obj = Object.assign({}, obj);
    var stackCount = 0;
    var stepsTaken = 0;
    var isFound = false;

    function find(current, num) {
      stackCount++;
      if (stackCount > 10000 || isFound == true) {
        return null;
      }; // opt out if function is called too many times or isFound
      //  console.log(num)
      if (obj[current] == target) { // if destination has been reached - return array
        isFound = true
        //  console.log('steps taken: ' + stepsTaken);
        var string = obj[start] + num;
        var stringSplit = string.split(',')

        var newArr = [];
        for (let x of stringSplit) {
          let myArr = x.split(' ');
          newArr.push(myArr[0])
        }

        return {
          stepsTaken: stepsTaken,
          stackCount : stackCount,
          newArr: newArr,
          obj: obj
        }
      } else if (!obj[current]) {
        return null;
      } // if key does not exist in object - return null
      else if (obj[current].search("set") == -1 || obj[current].search("marked") != -1) {
        return null;
      } // if 'set' not in property or 'marked' in poperty
      else {
        obj[current] = obj[current] + ' marked'
        if (num == undefined) {
          num = ''
        }
        let left = [current[0] - 1, current[1]]
        let right = [current[0] + 1, current[1]]
        let up = [current[0], current[1] + 1]
        let down = [current[0], current[1] - 1]


        let toAdd = num + ',';
        var orderArray;
        orderArray = [down, left, right, up];
        shuffle(orderArray)

        stepsTaken++;

        let o = {
          '0': find(orderArray[0], toAdd + obj[orderArray[0]]),
          '1': find(orderArray[1], toAdd + obj[orderArray[1]]),
          '2': find(orderArray[2], toAdd + obj[orderArray[2]]),
          '3': find(orderArray[3], toAdd + obj[orderArray[3]])
        }

        return o['0'] || o['1'] || o['2'] || o['3'];

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
    console.time('f')
    for (let i = 0; i < functionCalls; i++) {

      let tempSolution = findSolution(start, target, obj);

      if (tempSolution != null) {
        if (solution == undefined) {  solution = tempSolution }
        if (tempSolution.newArr.length < solution.newArr.length) {
          solution = tempSolution
        }
      }

    }
    document.getElementById('stepsTaken').textContent = 'Steps taken: ' + solution.stepsTaken;
    document.getElementById('stackCount').textContent = 'Stack count: '  + solution.stackCount;
    document.getElementById('pathLength').textContent = 'Path length: ' + solution.newArr.length;
 +

    console.timeEnd('f')

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
