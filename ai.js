
$(document).ready(function () {

  var divs = $('.wrapper').find('div'),
      obj = {};

    $('.wrapper').on('click', 'div',function () {

        this.classList.toggle('set')


        divs.each(function (i,el) {
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

  function findSolution(target, direction) {

    var stackCounter = 0;
    var stepsTaken = 0;
    var found;
    function find(current, num) {
      stackCounter++;   if (stackCounter > 10000 || found == true) { return null;}; // opt out if function is called too many times or found
    //  console.log(num)
      if (obj[current] == target) {  // if destination has been reached - return array
        found = true
      //  console.log('steps taken: ' + stepsTaken);
        var string = obj[[10,0]] + num;
        var stringSplit = string.split(',')

        var newArr = [];
        for (let x of stringSplit) {
          let myArr  = x.split(' ');
          newArr.push(myArr[0])
        }

        return newArr;
      }
      else if (!obj[current]) { return null;  }  // if key does not exist in object - return null

      else if ( obj[current].search("set") == -1 || obj[current].search("marked") != -1) { return null;} // if 'set' not in property or 'marked' in poperty
      else {
        obj[current] = obj[current] + ' marked'
     		if (num == undefined) { num = '' }
        let left = [ current[0] - 1, current[1] ]
        let right = [current[0] + 1, current[1] ]
        let up = [current[0], current[1]  + 1 ]
        let down = [current[0], current[1] -1 ]


        let toAdd = num + ',';
        var orderArray;
        orderArray = [down,left,right,up];
        shuffle(orderArray)

        stepsTaken++;

      let o = {
        '0' : find(orderArray[0], toAdd + obj[orderArray[0]]),
        '1' : find(orderArray[1], toAdd + obj[orderArray[1]]),
        '2' : find(orderArray[2], toAdd + obj[orderArray[2]]),
        '3' : find(orderArray[3], toAdd + obj[orderArray[3]])
      }

      return o['0'] || o['1'] || o['2'] || o['3'];

        // return find(down, toAdd + obj[down]) || find(left,   toAdd + obj[left])||
        // find(right, toAdd + obj[right]) || find(up, toAdd + obj[up]);
       }
    }
    return find([10,10]);
  }

   //console.clear();
   $('#calc').on('click', function () {
     stepsTaken = 0;
     found = false;
    var directions = []
    directions.length = 50;
     var solution;
      console.time('f')
     for (let i = 0; i < directions.length; i++) {

       var tempSolution = findSolution( obj[[1,1]]);


       if (tempSolution != null) {
         if (solution == undefined ) { solution = tempSolution}

         if (tempSolution.length < solution.length) { solution = tempSolution}
        }

       clear();

     }
    console.log(solution.length)
      console.timeEnd('f')

     animateSolution(solution);
     function animateSolution(solution) {
       var wrapper = $('.wrapper');
       var time = 0

       for(let x of solution) {

          let findDiv = wrapper.find('.' + x);
          setTimeout(function () {

            findDiv.stop(true,true).fadeOut().fadeIn();
          }, time)

          time = time + 40;
       }
     }
     function clear() {
       if (solution == null) {return}

        for (let val in obj) {
            var ret = obj[val].replace('marked', '')
            obj[val] = $.trim(ret);
        }

        divs.each(function (i,el) {
            el.style.border = 'none';
            for (let x of solution) {
            //  console.log(x)
                if (el.classList[1] == x) {  el.style.border = '2px solid red' }
            }
        })
      }

   });

})
