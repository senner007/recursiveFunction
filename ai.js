
$(document).ready(function () {

  var divs = $('.wrapper').find('div'),
      obj = {};

    $('.wrapper').on('click', 'div',function () {


        this.classList.toggle('set')

        divs.each(function (i,el) {
          var $el = $(el);
          var tempArr = []
          var str = $el.attr('id');
          var res = str.split("");
          tempArr.push(res[0]);
          tempArr.push(res[2]);
        //  console.log(tempArr)
          obj[tempArr] = el.classList[1];
          if ($el.hasClass('set')) {
            obj[tempArr] = el.classList[1] + ' set';
          }
        })
        //console.log(obj)

    });


var stackCounter = 0;
var stepsTaken = 0;
var found;
  function findSolution(target) {
    function find(current, num) {
      stackCounter++;   if (stackCounter > 1000 || found == true) { return null;};

     //console.log(obj[current])
      // console.log(target)

      if (obj[current] == target) {
        //console.log('found');
        found = true
        console.log('steps taken: ' + stepsTaken)
        var string = obj[[1,6]] + num;
        var stringSplit = string.split(',')
        var newArr = [];
        for (let x of stringSplit) {
          newArr.push(x.charAt(0))
        }
          return newArr;

      }
      else if (!obj[current]) {

        return null;
        }
      else if ( obj[current].search("set") == -1 || obj[current].search("marked") != -1) {
        return null;
      }
      else {
          obj[current] = obj[current] + ' marked'

          stepsTaken++;
        //
     		if (num == undefined) { num = '' }
        let left = [ current[0] - 1, current[1] ]
        let right = [current[0] + 1, current[1] ]
        let up = [current[0], current[1]  + 1 ]
        let down = [current[0], current[1] -1 ]

        let toAdd = num + ',';
      //  console.log(toAdd)
        // let findDown = find(down, toAdd + obj[down]);
        // let findLeft = find(left,   toAdd + obj[left]);
        // let findRight = find(right, toAdd + obj[right]);
        // let findUp = find(up, toAdd + obj[up]);
        //
        //
        //
        // return findLeft || findRight || findUp || findDown;

        return find(down, toAdd + obj[down]) || find(left,   toAdd + obj[left])||
        find(right, toAdd + obj[right]) || find(up, toAdd + obj[up]);
       }
    }
    return find([1,6]);
  }

   //console.clear();
   $('#calc').on('click', function () {
     stepsTaken = 0;
     found = false;
    // console.log( obj[[4,1]] )
    console.time('f')
      var solution = findSolution( obj[[1,1]] );
    console.timeEnd('f')
      console.log(solution)
        $('.wrapper').find('div').each(function (i,el) {
            el.style.border = 'none';
        })
      $('.wrapper').find('div').each(function (i,el) {
        for (let x of solution) {
            if (el.classList[1] == x) {  el.style.border = '3px solid red' }
        }
      })
   });

})
