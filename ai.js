
$(document).ready(function () {

  function findSolution(target) {
    function find(current, num) {
//    console.log(num)
      if (current == target)
        return num;
      else if (current > target) {
      //  console.log('too high! - go back');
        return null;
        }
      else {
     		if (num == undefined) { num = ''}
        return find(current + 7, '7' + ' ' + num) || find(current + 8, '8' + ' ' + num);
       }
    }
    return find(0);
  }


  console.time('f')
  console.log('solution: ' + findSolution(55)); // solution: 8 8 8 8 8 8 7
  console.timeEnd('f')
  console.log(8+8+8+8+8+8+7); //55



})
