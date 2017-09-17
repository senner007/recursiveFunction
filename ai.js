'use strict'
$(document).ready(function() {

  $.fn.disableSelection = function() {
    return this
      .attr('unselectable', 'on')
      .css('user-select', 'none')
      .on('selectstart', false);
  };

  //$("body").css("overflow", "hidden");
  $('body').disableSelection();



  var divs = $('.wrapper').find('div'),
    obj = {};
    var columns = 100;
    var rows = 56;
    var nRows = rows;
    var nColumn = 1;
    divs.each(function(i, el) {

      el.textContent = ''

      el.className = 'box ' + (i + 1)
      el.id = [nColumn,rows];

      if (nColumn == columns) {
        nColumn = 0;
        rows--;
      }

      nColumn++;

      var str = el.id;
      var res = str.split(",");
      var tempArr = [res[0], res[1]]

      obj[tempArr] = {}
      obj[tempArr].name = el.classList[1];
      obj[tempArr].isSet = false;
      obj[tempArr].isWaypoint = false;
      obj[tempArr].isMarked = false;
      obj[tempArr].isPath = false;  // not used
      obj[tempArr].isDestination = false;
      obj[tempArr].isLocated = false;
      obj[tempArr].locatedFrequency = 0;
      obj[tempArr].isBlacklisted = false;
      obj[tempArr].hasTried = 0;
        obj[tempArr].hasTriedCount = 0;
    })

var startId;
var targetId;
var wayPointsCount = 1;
var wayPoints = [];
  $('.wrapper').on('mouseover mousedown contextmenu', 'div', function(e) {
    e.preventDefault();

    if (!e.originalEvent.buttons) {return}

    if (e.originalEvent.button == 0 && obj[this.id].isDestination == false && e.shiftKey == true) {
          this.classList.toggle('set')

          if (obj[this.id].isWaypoint == false) {
              this.classList.add('set')
              obj[this.id].isSet = true;
                this.classList.add('waypoint')
              obj[this.id].isWaypoint = true;
              wayPoints.push(obj[this.id].name)
              wayPointsCount++;
          } else {
            this.classList.remove('set')
            obj[this.id].isSet = false;
              this.classList.remove('waypoint')
              obj[this.id].isWaypoint = false;
              var index = wayPoints.indexOf(obj[this.id].name);
              wayPoints.splice(index, 1);

              wayPointsCount--;
          }

          document.getElementById('wayPoints').innerHTML = 'wayPoints ';
          for(let i = 0; i< wayPoints.length; i++) {
              document.getElementById('wayPoints').innerHTML += '' + (i+1) + ':' + wayPoints[i] + ' '
          }
          console.log(this)

    }


    if (e.originalEvent.button == 0 && obj[this.id].isDestination == false && e.shiftKey == false) {


      if (obj[this.id].isSet == true || obj[this.id].isWaypoint == true) {
          this.classList.remove('waypoint')
        this.classList.remove('set')
        obj[this.id].isWaypoint = false;
        var index = wayPoints.indexOf(obj[this.id].name);
        wayPoints.splice(index, 1);
        document.getElementById('wayPoints').innerHTML = 'wayPoints ';
        for(let i = 0; i< wayPoints.length; i++) {
            document.getElementById('wayPoints').innerHTML += '' + (i+1) + ':' + wayPoints[i] + ' '
        }
        obj[this.id].isSet = false;
      } else {
        this.classList.add('set')
        obj[this.id].isSet = true;

      }
  }
  if (e.originalEvent.button == 2) {


      if (obj[this.id].isDestination == true) {

        if (startId == this.id) {
          startId = undefined
        } else if (targetId == this.id) {
          targetId = undefined
        }
        obj[this.id].isSet = false
        obj[this.id].isDestination = false
        this.classList.remove('set')
        this.classList.remove('destination')

      } else if (obj[this.id].isDestination == false && (startId == undefined || targetId == undefined ) ){

        if (startId == undefined ) {
          startId = this.id
          obj[this.id].isStart = true
        } else if (startId != undefined && targetId == undefined) {
          targetId = this.id
          obj[this.id].isTarget = true
        }


        obj[this.id].isSet = true
        obj[this.id].isDestination = true
        this.classList.add('set')
        this.classList.add('destination')
      }

  }
  // console.log(this)
  // console.log(obj[this.id])

  });

  $('#save').on('click', function() {

    for (let x in obj) {
      obj[x].isBlacklisted = false;
      obj[x].hasTried = 0
      obj[x].hasTriedCount = 0
    }

      var data = JSON.stringify(obj);

      document.getElementById('stepsTaken').textContent = 'saving...'

      $.ajax({
            type: "POST",
            dataType: "json",
            url: "savejson.php", //Relative or absolute path to response.php file
            data: {data: data},
            success: function(data) {
                document.getElementById('stepsTaken').textContent = 'saving... saved'
            }
          });
  });

  $('#load').on('click', function() {
      document.getElementById('stepsTaken').textContent = 'loading...'
    $.getJSON( "path.json", function( json ) {
       obj =  json
       for(let x in obj) {
            if (obj[x].isFork == true) {
            obj[x].isFork = false
          }
          if (obj[x].isMarked == true) {
           obj[x].isMarked = false
          }
          if(obj[x].isDestination == true) {
            document.getElementById(x).classList.add('destination')
            if (obj[x].isStart == true) { startId = x}
            if (obj[x].isTarget == true) { targetId = x}
          }
          if(obj[x].isSet == true) {
           document.getElementById(x).classList.add('set')
          }
        document.getElementById(x).style.border = 'none';
        }
          document.getElementById('stepsTaken').textContent = 'loading...loaded'

     });
  });


  $('.predef').on('click', function() {
    var thisButton = this.id;

    document.getElementById('stepsTaken').textContent = 'loading...'
  $.getJSON( "bak/" + thisButton + ".json", function( json ) {
     obj =  json
     for(let x in obj) {

        if (obj[x].isMarked == true) {
         obj[x].isMarked = false
        }
        if(obj[x].isDestination == true) {
          document.getElementById(x).classList.add('destination')
          if (obj[x].isStart == true) { startId = x}
          if (obj[x].isTarget == true) { targetId = x}
        }
        if(obj[x].isSet == true) {
         document.getElementById(x).classList.add('set')
        }
      document.getElementById(x).style.border = 'none';
      }
        document.getElementById('stepsTaken').textContent = 'loading...loaded'

   });



  });

  $('#reset').on('click', function() {
  var $reset = $('.dottedBorder');
    $reset.each(function(i,el) {
      obj[el.id].isSet = true;
      $(el).removeClass('dottedBorder')
    })
  })


  function _shuffle(a) { // shuffle array
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }



  var directionCount;

    var forkSquares = [];
  function findSolution(start, target, obj, wayPoints, solution, solutionArray, blacklistFinal) {

    if (!solution) { var solution = {newArr: [] }
      solution.newArr.length = 1000;
    }
    if(blacklistFinal.length > 0) {
       var blacklistCount = 0;
    }

    // var tempSolutionArray = [];
    // for (let i = 0; i < solutionArray.length; i++) {
    //   for (let x of solutionArray[i].newArr) {
    //     if (!tempSolutionArray.includes(x))
    //     tempSolutionArray.push(x)
    //   }
    // }
    // console.log(tempSolutionArray)
    var objVals;
    // if (param != true) {
    //   console.log('slower dirction count')
    //   directionCount++;
    //   if (directionCount == 24)  { directionCount = 0; }
    //
    // }

      let counter = 0;



    function find(current, num) {


        var nArray = num == undefined ? [] : num.split(',')
          //  console.log(nArray.length + ( Math.abs(current[0] - target[0]) ))
        //  console.log('steps: ' +  nArray[nArray.length -1])

          //console.log('steps: ' +  nArray[nArray.length -1])
        for (let i = 0; i < solutionArray.length; i++) {
          if ( solutionArray[i].newArr.indexOf(obj[current].name) != -1 && nArray.indexOf(obj[current].name) > solutionArray[i].newArr.indexOf(obj[current].name) ) {
            //console.log('index of ' + nArray[nArray.length -1] + ': ' + nArray.indexOf(obj[current].name) )
            // console.log(nArray[nArray.length -1])
            // console.log(obj[current].name)
          //  console.log ( 'index of ' + nArray[nArray.length -1] + ': ' + solution.newArr.indexOf(obj[current].name) + ' in solution')
        // console.log('opt out')
            return null;
          }
        }
      //  if ( obj[current].name == '825') {console.log('hello name')}
      // if(obj[current].isBlacklisted) { console.log('blacklisT!!!!'); console.log('blacklist ' + blacklistFinal[blacklistFinal.length -1]); return null;}
            // counter = 0;
            // if(  obj[[current[0] - 1, current[1]]].isMarked ) { counter++}
            // if(  obj[[current[0] + 1, current[1]]].isMarked ) { counter++}
            // if(  obj[[current[0], current[1] -1]].isMarked ) { counter++}
            // if(  obj[[current[0], current[1]  + 1]].isMarked ) { counter++}
            //     console.log(counter)
            // if (counter > 2) { return null}



        if (obj[current] == obj[target]) { // if destination has been reached - return obect with solution

           let nArray = num.split(',');

          if (nArray.length > solution.newArr.length) { return null; }
        //  console.time('f')

            for (let x in obj) {
              if (obj[x].isSet == true) {
                  obj[x].isMarked = false;
                if(nArray.includes(obj[x].name)) { // this number should not be 5 but the point in the solutionArray where thre length starts to flatten
                  obj[x].isPath = true;
                };
              };

            }
          //  console.timeEnd('f')


            // console.log(nArray.length)
            // console.log(solution.newArr.length)

          // for (let i = 0; i< wayPoints.length; i++) {
          //   if (nArray.indexOf(wayPoints[i]) == -1) { return null };
          //   if (wayPoints[i +1]) {
          //     if (nArray.indexOf(wayPoints[i]) > nArray.indexOf(wayPoints[i +1]) ) { return null };
          //   }
          // }

          return {
            newArr: nArray,
            obj: obj
          }
        } else if (nArray.length > solution.newArr.length) { return null;
        } else {
        obj[current].isMarked = true
        let toAdd = num + ',';
        if (num == undefined) {  num = ''; toAdd = ''}

        let left = [current[0] - 1, current[1]]
        let right = [current[0] + 1, current[1]]
        let up = [current[0], current[1] + 1]
        let down = [current[0], current[1] - 1]


        var orderArray = [right, left, down, up];
        let objVal_0 = false, objVal_1 = false, objVal_2 = false, objVal_3 = false;


        var direction = [

            [right, left, down, up],
            [right, left, up, down],
            [right, up, left, down],
            [right, up, down, left],
            [right, down, up, left],
            [right, down, left, up],

            [left, right, down, up],
            [left, right, up, down],
            [left, up, right, down],
            [left, up, down, right],
            [left, down, up, right],
            [left, down, right, up],

            [down, right, left, up],
            [down, right, up, left],
            [down, up, right, left],
            [down, up, left, right],
            [down, left, up, right],
            [down, left, right, up],

            [up, right, left, down],
            [up, right, down, left],
            [up, down, right, left],
            [up, down, left, right],
            [up, left, down, right],
            [up, left, right, down],

        ]
           if (obj[current].name == '765') { console.log('--------------------------------------' + obj[current].name); console.log(obj[current].hasTried)}

          orderArray = direction[obj[current].hasTried]


        if (obj[current].isBlacklisted) { console.log('blacklisted : ' + obj[current].name )}


       if ( obj[current].isLocated == true) { // this number should not be 5 but the point in the solutionArray where thre length starts to flatten
          obj[current].locatedFrequency = obj[current].locatedFrequency + 1
       } else {
         obj[current].isLocated = true;
       }


       let objVals = [objVal_0, objVal_1, objVal_2, objVal_3];

       var counter = 0;
       for (let i = 0;i < 4; i++ ) {

         if (obj[orderArray[i]] != undefined) {
           objVals[i] = obj[orderArray[i]].isMarked == true || obj[orderArray[i]].isBlacklisted == true || obj[orderArray[i]].isSet == false ? false : true


        //  if (nArray.length + ( Math.abs(obj[orderArray[i]][0] - target[0]) ) + ( Math.abs(obj[orderArray[i]][1] - target[1]) ) > solution.newArr.length) {
        //     console.log('too long');
        //    return null;
        //  }

           //
          //  if (nArray.length + ( Math.abs(current[0] - target[0]) ) + ( Math.abs(current[1] - target[1]) ) > solution.newArr.length) {
          //     console.log('too long');
          //    return null;
          //  }
           let step = orderArray[i];
           if(objVals[i]== true) {
             counter++
           }
          //  //console.log(step)
          //  let stepLeft = [step[0] -1, step[1]],
          //      stepRight = [step[0] +1, step[1]],
          //      stepUp = [step[0], step[1] +1],
          //      stepDown = [step[0], step[1] -1];
           //
          //  //console.log(obj[step[0] -1, step[1]])
          //  if(obj[stepLeft].isMarked && obj[stepLeft] != obj[current]) {  objVals[i] = false}
          //  if(obj[stepRight].isMarked && obj[stepRight] != obj[current]) {  objVals[i] = false}
          //  if(obj[stepUp].isMarked && obj[stepUp] != obj[current]) {  objVals[i] = false}
          //  if(obj[stepDown].isMarked && obj[stepDown] != obj[current]) {  objVals[i] = false}

         }

       }

       //
       // var directionNumbers = [0,6,12,18,
       //                 1,7,13,19,
       //                 2,8,14,20,
       //                 3,9,15,21,
       //                 4,10,16,22,
       //                 5,11,17,23];




       if (counter > 1) {
         //directionCount++;

         //  console.log('faster direction count')


          obj[current].isFork = true
             if (obj[current].hasTried == 23) { obj[current].hasTried = 0  }
             else {
                 obj[current].hasTried = obj[current].hasTried + 6;
             }



         obj[current].hasTriedCount++;;


          if (obj[current].hasTried > 23) { obj[current].hasTried = obj[current].hasTried - 23  }

          //directionCount = obj[current].hasTried;


        //  console.log(obj[current].name)

          if (!forkSquares.includes(obj[current].name)) {
            forkSquares.push(obj[current].name)
          }
         //console.log(forkSquares);


       }
         //if (directionCount == 24)  { directionCount = 0; }

        return (objVals[0] ? find(orderArray[0], toAdd + obj[orderArray[0]].name) : null)
               || (objVals[1] ? find(orderArray[1], toAdd + obj[orderArray[1]].name) : null)
               || (objVals[2]  ? find(orderArray[2], toAdd + obj[orderArray[2]].name) : null)
               || (objVals[3]  ? find(orderArray[3], toAdd + obj[orderArray[3]].name): null);

        // return find(down, toAdd + obj[down]) || find(left,   toAdd + obj[left])||
        // find(right, toAdd + obj[right]) || find(up, toAdd + obj[up]);
      }
    }
    return find(start);
  }

  //console.clear();





 var param;
  $('#calc').on('click', function() {


    var functionCalls = 0;
    var solution;
    forkSquares = [];

    var invalidCount = 0;
    var si = startId.split(',');
    var start = [Number(si[0]), Number(si[1])];
    var ei = targetId.split(',');
    ei = [Number(ei[0]), Number(ei[1])]

    var target = ei;
    var startTime = performance.now();
    var solutionArray = [];
    var stepsNotUsedCount = 0;
    directionCount = 0;
    var frequencyCut =2; // maybe eliminate the need for this
    var functionCounter = 15
    param = false;
    var blacklist = [];
    var blacklistFinal = [];



    for (let i = 0; ; i++) {

      let tempSolution = findSolution(start, target, obj, wayPoints, solution, solutionArray, blacklistFinal);

      // for (let x in obj) {
      //   obj[x].isMarked = false;
      // }

      if (tempSolution != null) {
        solutionArray.push(tempSolution)
        if (solution == undefined) {  solution = tempSolution }
        if (tempSolution.newArr.length < solution.newArr.length) {
          solution = tempSolution
        }
      } else {
        console.log('solution invalid') // never happens
        invalidCount++
        if(invalidCount > 50) break;
      }


      if (solutionArray.length > functionCounter) {


          var countEqual = 0;
          console.log('--------------------------------------------');
          console.log('new count')
          console.log('--------------------------------------------');
          var differences = [];
          for (let i = (solutionArray.length - functionCounter); i < solutionArray.length; i++) {
            if (solutionArray[i].newArr.length == solutionArray[i -1].newArr.length) {
              //  console.log('array diff: ' + _arrDiff(solutionArray[i].newArr, solutionArray[i -1].newArr))
                differences.push(_arrDiff(solutionArray[i].newArr, solutionArray[solutionArray.length -1].newArr))
                // console.log('arr length: ' + solutionArray[i].newArr.length)
                // console.log('arr previous length: ' + solutionArray[i -1].newArr.length)


              countEqual++;
            }
          }

          if (countEqual >= functionCounter) {
            var alternateRoutes = [];
            blacklist = [];
            for (let x of differences) {
              //console.log(x)
              if(x.length >0) {
                  for(let y of x) {
                    if (solutionArray[solutionArray.length -1].newArr.includes(y)) {
                      blacklist.push(y)
                    if( !blacklistFinal.includes(blacklist[0]) ) {blacklistFinal.unshift(blacklist[0]) };
                      //console.log(solutionArray[solutionArray.length -1].newArr)
                    }
                    if(!alternateRoutes.includes(y)){
                      alternateRoutes.push(y)
                    }
                  }

              }

            }

            // console.log('arrays that are different--------------------------------------------');
          console.log(blacklistFinal)
      ///    console.log('solution: ' + solutionArray[solutionArray.length -1].newArr)

         console.log(alternateRoutes);
            // console.log('--------------------------------------------');
            //   console.log('--------------------------------------------');
            //   console.log('The last ' + countEqual + ' solutions have an identical length. Proceed to cut items located less frequently(frequencyCut)')
            //   console.log('--------------------------------------------');
            //   console.log('--------------------------------------------');
                stepsNotUsedCount = 0;
                for (let x in obj) {
                    // if (blacklistFinal[0] == obj[x].name) { obj[x].isBlacklisted = true}
                    // else {
                    //   obj[x].isBlacklisted = false;
                    // }

                  // if (blacklistFinal[0] == obj[x].name) { obj[x].isBlacklisted = false}
                  if (obj[x].isDestination == false && obj[x].isPath == false && obj[x].isSet == true && obj[x].locatedFrequency < 5) {
                    console.log('hello')
                    //  stepsNotUsedCount++;

                      obj[x].isSet = false;
                      //obj[x].hasTried = 0;

                      frequencyCut = frequencyCut; // 5 is an arbitrary number - it is added to gradually allow more and more squares to be cut.

                    document.getElementById(x).classList.add('dottedBorder')
                //    console.log('hello ----- painting!!!')
                  }

               obj[x].locatedFrequency = 0;
               obj[x].isLocated = false; // squares that are located, but not necessarily part of solution path are reset to be located again.
                obj[x].isPath = false;   // squares that make up a solution path are reset to be found again
                }

                if (stepsNotUsedCount == 0 && param == true|| functionCalls > 100) {break;}
                else {
                  param = true;
                  functionCounter = functionCounter
                }

              //  functionCounter = functionCounter  // 20 is an arbitrary number - should be determined by the number of fork squares
           }

      };

      functionCalls++;


    }
    var endTime = performance.now();
    if (solution == undefined) { alert('Path not found!')}
    var time = endTime - startTime;
    console.log(solutionArray)


    document.getElementById('stepsTaken').innerHTML = 'Steps taken (recursive calls): ' + '<span>' + solution.stepsTaken + '</span>' ;
    document.getElementById('pathLength').innerHTML = 'Path length: ' + '<span>' + solution.newArr.length + '</span>';
    document.getElementById('additionalSteps').innerHTML = 'Additional steps taken : ' + '<span>' + (solution.stepsTaken - solution.newArr.length) + '</span>';
    document.getElementById('time').innerHTML = 'time to do ' + '<span>' + functionCalls + '</span>'+ ' function calls: ' + '<span>' + Math.floor(time * 100)/100 + '</span>' + ' ms';

    _animateSolution(solutionArray[solutionArray.length -1], 20);

    for (let x in obj) {
      obj[x].hasTried = 0;

      if (obj[x].isFork == true && obj[x].isSet == true) {
      //  console.log(obj[x].hasTriedCount)

      if(  obj[x].hasTriedCount  > 24) { document.getElementById(x).style.backgroundColor = 'green'; }
      obj[x].hasTriedCount = 0
}

      if (obj[x].isMarked == true) {
          obj[x].isMarked = false;
        };
      };


  });


  // Array.prototype.compare = function(testArr) {
  //     if (this.length != testArr.length) return false;
  //     for (var i = 0; i < testArr.length; i++) {
  //         if (this[i].compare) { //To test values in nested arrays
  //             if (!this[i].compare(testArr[i])) return false;
  //         }
  //         else if (this[i] !== testArr[i]) return false;
  //     }
  //     return true;
  // }
  // var arr1 = [1,2,3];
  // var arr2 = [1,2,3,4];


  function _arrDiff (a1, a2) {

      var a = [], diff = [];

      for (var i = 0; i < a1.length; i++) {
          a[a1[i]] = true;
      }

      for (var i = 0; i < a2.length; i++) {
          if (a[a2[i]]) {
              delete a[a2[i]];
          } else {
              a[a2[i]] = true;
          }
      }

      for (var k in a) {
          diff.push(k);
      }

      return diff;
  };


  function _animateSolution(result, speed) {

    var time = 0;

    for (let x in result.obj) {
        let el = document.getElementById(x)
      //  console.log(el)
      if (result.newArr.includes(result.obj[x].name)) {
          el.style.border = '2px solid red';
      }
      else if (el.style.border == '2px solid red') {
            el.style.border = 'none';
        $(el).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);

      }

    }
    for (let x of result.newArr) {
      let el = document.getElementsByClassName(x)[0]





      setTimeout(function() {
        $(el).stop(true, true).fadeOut(100).fadeIn(100);
      }, time)

      time = time + speed;
    }
  }

})
