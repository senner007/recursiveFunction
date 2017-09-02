
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

    })
var stackCounter = 0;
var stepsTaken = 0;
  function findSolution(target) {
    function find(current, num) {
      stackCounter++;   if (stackCounter > 1000) { return null;};

      // console.log(current)
      // console.log(target)

      if (obj[current] == target) {
        console.log('found');
        var string = obj[[1,5]] + num;
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
          console.log(obj[current] )
          stepsTaken++;
          console.log('steps: ' + stepsTaken)
     		if (num == undefined) { num = '' }
        let left = [ current[0] - 1, current[1] ]
        let right = [current[0] + 1, current[1] ]
        let up = [current[0], current[1]  + 1 ]
        let down = [current[0], current[1] -1 ]

        let toAdd = num + ',';
        console.log(toAdd)

        let findLeft = find(left,   toAdd + obj[left]);
        let findRight = find(right, toAdd + obj[right]);
        let findUp = find(up, toAdd + obj[up]);
        let findDown = find(down, toAdd + obj[down]);


        return findDown || findRight || findUp || findLeft;

        // return find(left, obj[left] + ' ' + num) || find(right, obj[right] + ' ' + num) ||
        // find(up, obj[up] + ' ' + num) || find(down, obj[down] + ' ' + num);
       }
    }
    return find([1,5]);
  }

   //console.clear();
   $('#calc').on('click', function () {
    // console.log( obj[[4,1]] )
      var solution = findSolution( obj[[4,1]] );
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
