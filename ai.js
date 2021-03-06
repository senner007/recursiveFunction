import {
  eliminateSquares
} from "./freespace-logic.js"


// ES6 MODULE IMPORT/EXPORT
////////////////////////////



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
    obj = {},
    objRef = {}
    var columns = 80;
    var rows = 45;
    var nRows = rows;
    var nColumn = 1;
    divs.each(function(i, el) {

  //el.textContent = i +1;

    //  el.className = 'box ' + (i + 1)
    //  el.id = [nColumn,rows];

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
      obj[tempArr].isFork = false;
      obj[tempArr].isPlaza = false;
      objRef[obj[tempArr].name] = { key :[Number(res[0]), Number(res[1])] }



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
        this.classList.remove('fork')
        this.classList.remove('plaza')
        obj[this.id].isWaypoint = false;
        var index = wayPoints.indexOf(obj[this.id].name);
        wayPoints.splice(index, 1);
        document.getElementById('wayPoints').innerHTML = 'wayPoints ';
        for(let i = 0; i< wayPoints.length; i++) {
            document.getElementById('wayPoints').innerHTML += '' + (i+1) + ':' + wayPoints[i] + ' '
        }
        obj[this.id].isSet = false;
        obj[this.id].isFork = false;
        obj[this.id].isPlaza = false;
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

         obj[x].toBeUnForked = false;
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
  $.getJSON( "bak_large/" + thisButton + ".json", function( json ) {
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
    //if (obj[x].isSet != true) {delete obj[x] }                                // delete the unused properties
      }
      document.getElementById('stepsTaken').textContent = 'loading...loaded'

   });



  });


  $('#reset').on('click', function() {
  var $reset = $('.disabled');
  document.getElementById('additionalSteps').innerHTML = 'Steps reactivated : ' + '<span>' +  $reset.length + '</span>';
    $reset.each(function(i,el) {
      obj[el.id].isSet = true;
      el.classList.remove('disabled')
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

  var _swapArrayElements = function(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  };



  var directionCount;
  // var forkSquares = [];
  var blcount = 0;
  var optOutCollection = [];


  function findSolution(start, target, obj, wayPoints, solution, solutionArray, functionCalls, countLength) {

    if (!solution) { var solution = {newArr: [] }
      solution.newArr.length = 1000;
    }
    // if(blacklistFinal.length > 0) {
    //    var blacklistCount = 0;
    // }


    var objVals;

    directionCount++;

    var enterOpen = undefined;

    var tempArray;



  if (directionCount == 24)  { directionCount = 0; }

      let counter = 0;



    function find(current, num) {


        var nArray = num == undefined ? [] : num.split(',')
        nArray.pop();
    //    console.log(nArray)

        if (nArray.length  > solution.newArr.length ) {   console.log('too long!'); return null; }

        for (let i = 0; i < solutionArray.length; i++) {
          if ( solutionArray[i].newArr.indexOf(obj[current].name) != -1 && nArray.indexOf(obj[current].name) > solutionArray[i].newArr.indexOf(obj[current].name) ) {
            // console.log(tempArray)
            // console.log(nArray)
        //    optOutCollection.push(nArray.join())
            console.log('opt out')
            return null;
          }
          // if ( solutionArray[i].newArr.indexOf(nArray[nArray.length - 5]) != -1 && nArray.indexOf(nArray[nArray.length - 5]) != -1 && solutionArray[i].newArr.indexOf(obj[current].name) != -1  ) {
          //   var equal = solutionArray[i].newArr.indexOf(nArray[nArray.length - 5]) == nArray.indexOf(nArray[nArray.length - 5])
          //    if (equal &&  (nArray.indexOf(obj[current].name) - nArray.indexOf(nArray[nArray.length - 5])    >  solutionArray[i].newArr.indexOf(obj[current].name) -  solutionArray[i].newArr.indexOf(nArray[nArray.length - 5]) ) ) {
          //
          //      console.log('opt out segment')
          //     return null;
          //   }
          // }
        }

        if (obj[current] == obj[target]) { // if destination has been reached - return obect with solution

          var differences;

            if (nArray.length == solution.newArr.length && countLength > 24 ) {
              //  console.log('array diff: ' + _arrDiff(solutionArray[i].newArr, solutionArray[i -1].newArr))
                differences = _arrDiff(nArray, solution.newArr)
                // console.log('arr length: ' + solutionArray[i].newArr.length)
                // console.log('arr previous length: ' + solutionArray[i -1].newArr.length)



            }

        //  console.log(differences)



          if (nArray.length > solution.newArr.length) { return null; }


        //  console.time('f')

          var plCount = 0;
          var pathCounter = 0;
          console.time('fd')
            for (let x in obj) {
              if (obj[x].isSet == true) {
                  obj[x].isMarked = false;
                  obj[x].isPath = false;
                  obj[x].isBlacklisted = false;

                // if(nArray.includes(obj[x].name)) { // this number should not be 5 but the point in the solutionArray where thre length starts to flatten
                //   obj[x].isPath = true;
                // };
                // if (differences != undefined && differences.includes(obj[x].name) && obj[x].isPath != true && obj[x].isFork != true && obj[x].isPlaza != true && obj[x].isEdge != true) {
                //     obj[x].isBlacklisted = true;
                //     console.log('blacklisting!!!!!!')
                // }


                // if (obj[x].isPath == false && functionCalls < 24) {
                //
                //     let r = Math.floor((Math.random() * 10) + 1);
                //      var val = x.split(',')
                //
                //   //   if (obj[x].isEdge == true && blcount == 0) {
                //   //       if (r < 4) {
                //   //         obj[x].isBlacklisted = true;
                //   //       }
                //   //   }
                //   //   if (obj[x].isPlaza == true) {
                //   //     if (r < 4) {
                //   //       obj[x].isBlacklisted = true;
                //   //     }
                //   //  }
                //     blcount++;
                //     if (blcount == 2 ) { blcount = 0}
                //
                // }
                // else if (obj[x].isPlaza == true && obj[x].isPath == false && functionCalls > 48) {
                //   var val = x.split(',')
                //
                //   let left = [Number(val[0]) - 1, Number(val[1])]
                //   let right = [Number(val[0]) + 1, Number(val[1])]
                //   let up = [Number(val[0]), Number(val[1]) + 1]
                //   let down = [Number(val[0]), Number(val[1]) - 1]
                //
                //   var objDir = [left,right,up,down]
                //
                //   let forkCounter = 0;
                //
                //   for(let i = 0; i< 4; i++) {
                //         if(obj[objDir[i]].isPath == true) {  forkCounter++;  }
                //   }
                //   if (forkCounter < 1) {  obj[x].isBlacklisted = true; }
                //
                //
                //
                // }





            //
            //     if(obj[x].isFork == true && obj[x].isPlaza != true && functionCalls > 47 && obj[x].isPath == false) {
            //       var val = x.split(',')
            //       let left = [Number(val[0]) - 1, Number(val[1])]
            //       let right = [Number(val[0]) + 1, Number(val[1])]
            //       let up = [Number(val[0]), Number(val[1]) + 1]
            //       let down = [Number(val[0]), Number(val[1]) - 1]
            //
            //       var objDir = [left,right,up,down]
            //
            //       pathCounter = 0;
            //       for(let i = 0; i< 4; i++) {
            //             if(obj[objDir[i]].isFork == true) {  pathCounter++;  }
            //             if(obj[objDir[i]].isSet  == true && obj[objDir[i]].isFork != true) {  pathCounter--;  }
            //       }
            // //      console.log('pathCounter :'  + pathCounter)
            //       if (pathCounter == 3) { console.log('blacklisting'); obj[x].isBlacklisted = true}
            //     }






                // obj[x].locatedFrequency = 0;
                // obj[x].isLocated = false;
              };

            }
            console.timeEnd('fd')


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

      }
      else if (nArray.length + ( Math.abs(current[0] - target[0]) ) + ( Math.abs(current[1] - target[1]) ) > solution.newArr.length) {
      //     console.log('too far away');
          return null;
           }

      else {
        obj[current].isMarked = true



        // if ( enterOpen == undefined &&  (obj[current].isPlaza == true || obj[current].isEdge == true )) {
        //     enterOpen = obj[current].name;
        //
        //
        // }
        // else if (enterOpen != undefined && obj[current].isPlaza != true && obj[current].isEdge !=true ) {
        //
        //   enterOpen = undefined;
        //
        // }
        // console.log('enter : ' + enterOpen)
        //
        //
        // console.log('position: ' + (nArray.indexOf(enterOpen)));


        let toAdd = num;
        if (num == undefined) {  num = ''; toAdd = ''}

        let left = [current[0] - 1, current[1]]
        let right = [current[0] + 1, current[1]]
        let up = [current[0], current[1] + 1]
        let down = [current[0], current[1] - 1]

        var orderArray = [left, right, up, down];

        let objVal_0 = false, objVal_1 = false, objVal_2 = false, objVal_3 = false;
        var objVals = [objVal_0, objVal_1, objVal_2, objVal_3];

        var direction = [



            [left, right, down, up],
            [left, right, up, down],
            [left, up, right, down],
            [left, up, down, right],
            [left, down, up, right],
            [left, down, right, up],

            [right, left, down, up],
            [right, left, up, down],
            [right, up, left, down],
            [right, up, down, left],
            [right, down, up, left],
            [right, down, left, up],

            [up, right, left, down],
            [up, right, down, left],
            [up, down, right, left],
            [up, down, left, right],
            [up, left, down, right],
            [up, left, right, down],

            [down, right, left, up],
            [down, right, up, left],
            [down, up, right, left],
            [down, up, left, right],
            [down, left, up, right],
            [down, left, right, up],



        ]


        orderArray = direction[directionCount]


        // if (obj[current].isBlacklisted) { console.log('blacklisted : ' + obj[current].name )}


      //  if ( obj[current].isLocated == true) { // this number should not be 5 but the point in the solutionArray where thre length starts to flatten
      //     obj[current].locatedFrequency++;
      //  } else {
      //    obj[current].isLocated = true;
      //  }

console.log('------------------------')

         var toBeCurrentArray = ['1','2','3','4'];
          var num2ArrayTotal = [];

       for (let i = 0;i < 4; i++ ) {
         let dir = obj[orderArray[i]];
         if (dir != undefined && nArray[nArray.length -2] == dir.name) { dir.isMarked = true}
         if (dir != undefined) {
            objVals[i] =  dir.isMarked == true || dir.isBlacklisted == true || dir.isSet == false ? false : true

            if (obj[current].storeObjectAll !== undefined && objVals[i] == true)  {

              if (dir.name in obj[current].storeObjectAll) {

                if (!nArray.includes(obj[current].storeObjectAll[dir.name].end)) {
                  objVals[i] = obj[current].storeObjectAll[dir.name].array;
                  toBeCurrentArray[i] = objRef[obj[current].storeObjectAll[dir.name].end].key;
                  num2ArrayTotal.push(dir.name);
                }

              }

            }

         }

       }

     var newObj = current
     var num0 = '';
     var num1 = '';
     var num2 = '';
     var num3 = '';
     var objValsArray = [num0,num1,num2,num3];
     var stackCount = 0;

     var inWhile = 0;


  console.log(objVals)
  console.log('name : ' + obj[current].name)
  console.log('direction : ' + directionCount)


   for(var y = 0; y < objVals.length; y++) {


      if (objVals[y] == false) { objValsArray[y] = false;}

      if (typeof objVals[y] == 'string') { objValsArray[y] = objVals[y];}


      if (objVals[y] === true && (obj[current].isFork || obj[current].isDestination)) {
        console.log('hello in while')
        inWhile++;
          var index = y;
          newObj = current;

          while (( obj[newObj].isFork == false  && obj[newObj].isDestination == false ) || newObj == current  ) {
             stackCount++;
             let new0 = newObj[0];
             let new1 = newObj[1];

             let left = [new0 - 1, new1]
             let right = [new0 + 1, new1]
             let up = [new0, new1 + 1]
             let down = [new0, new1 - 1]

             let direction = [

                 [left, right, down, up],
                 [left, right, up, down],
                 [left, up, right, down],
                 [left, up, down, right],
                 [left, down, up, right],
                 [left, down, right, up],

                 [right, left, down, up],
                 [right, left, up, down],
                 [right, up, left, down],
                 [right, up, down, left],
                 [right, down, up, left],
                 [right, down, left, up],

                 [up, right, left, down],
                 [up, right, down, left],
                 [up, down, right, left],
                 [up, down, left, right],
                 [up, left, down, right],
                 [up, left, right, down],

                 [down, right, left, up],
                 [down, right, up, left],
                 [down, up, right, left],
                 [down, up, left, right],
                 [down, left, up, right],
                 [down, left, right, up],

             ];
            //  console.log('in while')

              var orderArray2 = direction[directionCount];

              var count = 0;
              for (let i = 0;i < 4; i++ ) {
                  let objDir = obj[orderArray2[i]];
                  if (objDir != undefined) {

                     let n1 = Number(objDir.name) + 1;
                     let n2 = Number(objDir.name) - 1;
                     let n3 = Number(objDir.name) - 80;
                     let n4 = Number(objDir.name) + 80;
                     let newArray = [n1,n2,n3,n4]
                     var hairpinTurn = false;
                     for (let i = 0; i< newArray.length; i++) {
                       if (nArray.includes(newArray[i].toString()) && newArray[i] != Number(nArray[nArray.length -1]) ) {
                        // console.log('hello there hairpin')
                         hairpinTurn = true;
                        break;                                                    // break from loop when hairpin found - optimize!!!
                       }

                     }


                     if (hairpinTurn == false && objDir.isMarked != true && objDir.isSet == true  && objDir.isBlacklisted != true && !num2ArrayTotal.includes(objDir.name)) {
                        count++;
                        newObj = orderArray2[i];

                        var s = objValsArray[index].split(',')
                        if (!obj[newObj].isFork && !obj[newObj].isDestination || ( s.length < 2 ) ) {  num2ArrayTotal.push(obj[newObj].name);  }
                        objValsArray[index] +=  obj[newObj].name + ',';

                        break;
                     }
                  }
               }


               if (count == 0) {

                 if (obj[newObj].isFork == false && obj[newObj].isDestination == false)  {console.log('break: ' + index);  objValsArray[index] = false;}
                  break;
               }
               toBeCurrentArray[index] = newObj

               if(stackCount > 1000) { console.log('broke out'); break}
             }; // while end

            // if (  objValsArray[index] != false ) { // check if going to new fork will result in longer path than previous solution
            //    let tmp = objValsArray[index].split(',');
            //    tmp.pop();
            //    if (tmp.length + nArray.length > solution.newArr.length) { console.log('is false'); objValsArray[index] = false; }
            //    let conc = nArray.concat(tmp)  // check if going to new fork will result in an array in the optOutCollection, and therefore not valid
            //    console.log(conc)
            //    if (optOutCollection.length > 1 && optOutCollection.includes(conc.join() )) {
            //      console.log('opt out beforehand')
            //          objValsArray[index] = false;
            //    }
            //
            // }


        };


    }  // for end
 console.log(inWhile)
 console.log(objValsArray)

if (obj[current].name == 1165) {
  console.log( obj[[45,32]] )
  console.log(objValsArray)
  console.log('current: ' + obj[current].name)
  console.log('last in array '  + nArray)
  console.log(  obj[current].storeObject)
  console.log('direction :' + directionCount)
}

if (obj[current].storeObject == undefined ) { obj[current].storeObject = {}; }
if (obj[current].storeObjectAll == undefined ) { obj[current].storeObjectAll = {}; }

if (!(nArray.length in obj[current].storeObject) )  {  obj[current].storeObject[nArray.length] = {'arrays': []}; }

var newObjValsArray = [];
var indexes = [];
var arrayCount = -1;

for (let val of objValsArray) {

  arrayCount++;
  if (val != false) {

    let p = val.slice(0,-1);
    p = p.split(',');

    indexes.push(arrayCount); newObjValsArray.push(val);
    if (!obj[current].storeObject[nArray.length]['arrays'].includes(val)) {

          obj[current].storeObject[nArray.length]['arrays'].push(val)
    }
    if (obj[current].storeObjectAll[p[0]] == undefined && p.length > 1) {

          obj[current].storeObjectAll[p[0]] = {};
          obj[current].storeObjectAll[p[0]]['end'] = p[p.length -1];
          obj[current].storeObjectAll[p[0]]['array'] = val;

    }
  }
}

  obj[current].storeObject[nArray.length].forks =  obj[current].storeObject[nArray.length]['arrays'].length;

  var arrayLenghtMatch;

    for (var prop in obj[current].storeObject) {
        if (obj[current].storeObject.hasOwnProperty(prop)) {
          arrayLenghtMatch = obj[current].storeObject[prop]['arrays'].join() == newObjValsArray.join() ? prop : false;
          if(arrayLenghtMatch) {break;}

        }
    }

if (arrayLenghtMatch) {
  //console.log(arrayLenghtMatch)

 if (obj[current].name == 1492) { console.log(obj[current].storeObject[arrayLenghtMatch].swapFactor); console.log('same sequence of obj: ' + obj[current].name) }

    if (obj[current].storeObject[arrayLenghtMatch].swapFactor != undefined) {
        var swpFactor = obj[current].storeObject[arrayLenghtMatch].swapFactor;
        if (indexes.length > 1) {
          if (swpFactor == 1 && indexes.length == 2) {
            _swapArrayElements(objValsArray, indexes[0], indexes[indexes.length -1])
            _swapArrayElements(toBeCurrentArray, indexes[0], indexes[indexes.length -1])
        console.log('swapping'); console.log(objValsArray)

          }

          if (indexes.length == 3 && swpFactor < 2) {
            _swapArrayElements(objValsArray, indexes[0], indexes[indexes.length -(1 + swpFactor)])
            _swapArrayElements(toBeCurrentArray, indexes[0], indexes[indexes.length -(1+ swpFactor)])
         console.log('swapping'); console.log(objValsArray)
          }

          if (indexes.length == 4 && swpFactor < 3) {
            _swapArrayElements(objValsArray, indexes[0], indexes[indexes.length -(1 + swpFactor)])
            _swapArrayElements(toBeCurrentArray, indexes[0], indexes[indexes.length -(1+ swpFactor)])
         console.log('swopping'); console.log(objValsArray)
          }
        }

    };

    if(obj[current].storeObject[arrayLenghtMatch].swapFactor == undefined || obj[current].storeObject[arrayLenghtMatch].swapFactor == 3) {
        obj[current].storeObject[arrayLenghtMatch].swapFactor = 0
    }
    else {
        obj[current].storeObject[arrayLenghtMatch].swapFactor++;
    }


}
else {
//  console.log('new sequence')
}








  // if (  obj[current].isFork) {
  //
  //       if (obj[current].hasTried == 23) { obj[current].hasTried = 0  }
  //       else {
  //           obj[current].hasTried = obj[current].hasTried + 6;
  //       }
  //
  //
  //
  //
  //     if (obj[current].hasTried > 23) { obj[current].hasTried = obj[current].hasTried - 23  }
  //
  //
  //
  // }

    tempArray = nArray;

        return (objValsArray[0] ? find(toBeCurrentArray[0], toAdd + objValsArray[0]) : null)
               || (objValsArray[1] ? find(toBeCurrentArray[1], toAdd + objValsArray[1]) : null)
               || (objValsArray[2]  ? find(toBeCurrentArray[2], toAdd + objValsArray[2]) : null)
               || (objValsArray[3]  ? find(toBeCurrentArray[3], toAdd + objValsArray[3]): null);

      }
    }
    return find(start);
  }

  //console.clear();





 var param;
  $('#calc').on('click', function() {

 var timeToEliminate = eliminateSquares(obj);

   calculateRoute();

function calculateRoute() {


    var functionCalls = 0;
    var solution;
    // forkSquares = [];

    var invalidCount = 0;
    var si = startId.split(',');
    var start = [Number(si[0]), Number(si[1])];
    var ei = targetId.split(',');
    ei = [Number(ei[0]), Number(ei[1])]

    var target = ei;
    var startTime = performance.now();
    var solutionArray = [];
    var stepsNotUsedCount = 0;
    directionCount = -1;
    var frequencyCut =2; // maybe eliminate the need for this
    var functionCounter = 23
    param = false;
    var blacklist = [];
    var blacklistFinal = [];
    var countLength = 0;
    var countLengthPlusEqual = 0;



    for (let i = 0; ; i++) {

        let tempSolution = findSolution(start, target, obj, wayPoints, solution, solutionArray, functionCalls, countLength );


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


      if (solutionArray.length > 1) {



          console.log('--------------------------------------------');
          console.log('new count')
          console.log('--------------------------------------------');
          var differences = [];
          // for (let i = (solutionArray.length - functionCounter); i < solutionArray.length; i++) {
          //   if (solutionArray[i].newArr.length == solutionArray[i -1].newArr.length) {
          //     //  console.log('array diff: ' + _arrDiff(solutionArray[i].newArr, solutionArray[i -1].newArr))
          //       differences.push(_arrDiff(solutionArray[i].newArr, solutionArray[solutionArray.length -1].newArr))
          //       // console.log('arr length: ' + solutionArray[i].newArr.length)
          //       // console.log('arr previous length: ' + solutionArray[i -1].newArr.length)
          //
          //
          //     countEqual++;
          //   }
          // }
          if (solutionArray[solutionArray.length -1].newArr.length == solutionArray[solutionArray.length - 2].newArr.length)  {
              if (solutionArray[solutionArray.length -1].newArr.join() == solutionArray[solutionArray.length - 2].newArr.join()) {

                countLengthPlusEqual++;
              } else {
                countLengthPlusEqual = 0;
              }

            countLength++;
          } else {
            countLength = 0;
          }
          console.log(countLength)
          console.log('same and equal: ' + countLengthPlusEqual)
          if (countLength >= functionCounter || countLengthPlusEqual > 23) {
              break;

            // var alternateRoutes = [];
            // blacklist = [];
            // for (let x of differences) {
            //   //console.log(x)
            //   if(x.length >0) {
            //       for(let y of x) {
            //         if (solutionArray[solutionArray.length -1].newArr.includes(y)) {
            //           blacklist.push(y)
            //         if( !blacklistFinal.includes(blacklist[0]) ) {blacklistFinal.unshift(blacklist[0]) };
            //           //console.log(solutionArray[solutionArray.length -1].newArr)
            //         }
            //         if(!alternateRoutes.includes(y)){
            //           alternateRoutes.push(y)
            //         }
            //       }
            //
            //   }
            //
            // }

      //       // console.log('arrays that are different--------------------------------------------');
      //     console.log(blacklistFinal)
      // ///    console.log('solution: ' + solutionArray[solutionArray.length -1].newArr)
      //
      //    console.log(alternateRoutes);
      //       // console.log('--------------------------------------------');
      //       //   console.log('--------------------------------------------');
      //       //   console.log('The last ' + countEqual + ' solutions have an identical length. Proceed to cut items located less frequently(frequencyCut)')
      //       //   console.log('--------------------------------------------');
      //       //   console.log('--------------------------------------------');
              //   stepsNotUsedCount = 0;
              //   for (let x in obj) {
              //       // if (blacklistFinal[0] == obj[x].name) { obj[x].isBlacklisted = true}
              //       // else {
              //       //   obj[x].isBlacklisted = false;
              //       // }
               //
              //     // if (blacklistFinal[0] == obj[x].name) { obj[x].isBlacklisted = false}
              //     if (obj[x].isDestination == false && obj[x].isPath == false && obj[x].isSet == true && obj[x].locatedFrequency < 2) {
              //       console.log('hello')
              //       //  stepsNotUsedCount++;
               //
              //     //   obj[x].isSet = false;
              //     //    obj[x].hasTried = 0;
               //
              //       //  frequencyCut = frequencyCut; // 5 is an arbitrary number - it is added to gradually allow more and more squares to be cut.
               //
              //   //   document.getElementById(x).classList.add('dottedBorder')
              //   //    console.log('hello ----- painting!!!')
              //     }
               //
              //  obj[x].locatedFrequency = 0;
              //  obj[x].isLocated = false; // squares that are located, but not necessarily part of solution path are reset to be located again.
              //   obj[x].isPath = false;   // squares that make up a solution path are reset to be found again
              //  }


                // else {
                //
                //   functionCounter = functionCounter
                // }

              //  functionCounter = functionCounter  // 20 is an arbitrary number - should be determined by the number of fork squares
           }

      };

      functionCalls++;
      if (functionCalls > 200) {break;}


    }
    var endTime = performance.now();

    for (let x in obj) {
      obj[x].hasTried = 0;
      obj[x].isPath = false;
      obj[x].isBlacklisted = false;
      obj[x].locatedFrequency = 0;
      obj[x].isLocated = false;
      delete obj[x].objDir;
      delete obj[x].objDirDiag;
      obj[x].hasTriedCount = 0;
      delete obj[x].storeObject;
      delete obj[x].storeObjectAll;
      obj[x].isMarked = false;
      optOutCollection = [];

    };

    if (solution == undefined) { alert('Path not found!')}
    else {
        var time = endTime - startTime;
        console.log(solutionArray)


        document.getElementById('stepsTaken').innerHTML = 'Time to eliminate squares: ' + '<span>' + + Math.floor(timeToEliminate * 100)/100 + '</span>' + ' ms';
        document.getElementById('pathLength').innerHTML = 'Path length: ' + '<span>' + solution.newArr.length + '</span>';

        document.getElementById('time').innerHTML = 'Time to do ' + '<span>' + functionCalls + '</span>'+ ' function calls: ' + '<span>' + Math.floor(time * 100)/100 + '</span>' + ' ms';

        _animateSolution(solutionArray[solutionArray.length -1], 20);
    }

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
