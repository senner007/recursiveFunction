export {
  eliminateSquares
};
// ES6 MODULE IMPORT/EXPORT
////////////////////////////

function eliminateSquares(obj) {

  //
  // var pathCounter = 0;
  // var forkCounter = 0;
  // var plazaCounter = 0;
  //
  // for (let x in obj) {
  //   if (obj[x].isFork == true) { // remove previous
  //     obj[x].isFork = false;
  //     obj[x].isPlaza = false;
  //     document.getElementById(x).classList.remove('fork')
  //     document.getElementById(x).classList.remove('plaza')
  //
  //   }
  //
  //   if (obj[x].isSet == true) {
  //     var val = x.split(',')
  //
  //     let left = [Number(val[0]) - 1, Number(val[1])]
  //     let right = [Number(val[0]) + 1, Number(val[1])]
  //     let up = [Number(val[0]), Number(val[1]) + 1]
  //     let down = [Number(val[0]), Number(val[1]) - 1]
  //
  //     let leftUp = [Number(val[0]) - 1, Number(val[1]) + 1]
  //     let leftDown = [Number(val[0]) - 1, Number(val[1]) - 1]
  //     let rightUp = [Number(val[0]) + 1, Number(val[1]) + 1]
  //     let rightDown = [Number(val[0]) + 1, Number(val[1]) - 1]
  //
  //
  //     let objDir = [left, right, up, down]
  //     let objDirDiag = [leftUp, leftDown, rightUp, rightDown]
  //     forkCounter = 0;
  //     plazaCounter = 0;
  //     for (let i = 0; i < 4; i++) {
  //       if (obj[objDir[i]] != undefined && obj[objDir[i]].isSet == true) {
  //         forkCounter++;
  //       }
  //     }
  //     for (let i = 0; i < 4; i++) {
  //       if (obj[objDirDiag[i]] != undefined && obj[objDirDiag[i]].isSet == true) {
  //         plazaCounter++;
  //       }
  //     }
  //
  //
  //
  //     if (forkCounter > 2 && forkCounter < 5 && obj[x].tobeUnforked != true) {
  //       obj[x].isFork = true;
  //       if (obj[x].isDestination == false) {
  //         document.getElementById(x).classList.add('fork')
  //       }
  //     }
  //     if (forkCounter + plazaCounter > 7) {
  //       obj[x].isFork = true;
  //       obj[x].isPlaza = true;
  //       if (obj[x].isDestination == false) {
  //         document.getElementById(x).classList.add('plaza')
  //       }
  //     }
  //
  //   };
  // }
  // // for (let x in obj) {
  // //   if(obj[x].isFork == true && obj[x].isPlaza != true) {
  // //     var val = x.split(',')
  // //     let left = [Number(val[0]) - 1, Number(val[1])]
  // //     let right = [Number(val[0]) + 1, Number(val[1])]
  // //     let up = [Number(val[0]), Number(val[1]) + 1]
  // //     let down = [Number(val[0]), Number(val[1]) - 1]
  // //
  // //     var objDir = [left,right,up,down]
  // //
  // //     pathCounter = 0;
  // //     for(let i = 0; i< 4; i++) {
  // //
  // //           if(obj[objDir[i]] != undefined) {
  // //             if(obj[objDir[i]].isFork == true) {  pathCounter++;  }
  // //             if(obj[objDir[i]].isSet  == true && obj[objDir[i]].isFork != true) {  pathCounter--;  }
  // //         }
  // //     }
  // // //    console.log('pathCounter :'  + pathCounter)
  // //     if (pathCounter == 3) { obj[x].isEdge = true;
  // //
  // //       document.getElementById(x).classList.add('plazaEdge')
  // //     }
  // //
  // //   }
  // // }
  // //
  // //
  // //
  // // for (let x in obj) {
  // //   if (obj[x].toBeUnForked) {
  // //     obj[x].isFork = false;
  // //     document.getElementById(x).classList.remove('fork')
  // //     obj[x].toBeUnForked = false;
  // //   }
  // // }
  //
  // for (let x in obj) {
  //   if (obj[x].isSet && obj[x].isFork != true ) {
  //     let val = x.split(',')
  //     let left = [Number(val[0]) - 1, Number(val[1])]
  //     let right = [Number(val[0]) + 1, Number(val[1])]
  //     let up = [Number(val[0]), Number(val[1]) + 1]
  //     let down = [Number(val[0]), Number(val[1]) - 1];
  //
  //     let leftUp = [Number(val[0]) - 1, Number(val[1]) + 1]
  //     let leftDown = [Number(val[0]) - 1, Number(val[1]) - 1]
  //     let rightUp = [Number(val[0]) + 1, Number(val[1]) + 1]
  //     let rightDown = [Number(val[0]) + 1, Number(val[1]) - 1]
  //
  //     let objDir = [left, right, up, down];
  //     let objDirDiag = [leftUp, leftDown, rightUp, rightDown]
  //
  //     let nextToSet = false;
  //     let acrossFromDisabled = 0;
  //     let betweenUnsetAndDisabled = false;
  //
  //     for (let i = 0; i < 4; i++) {
  //
  //       if (obj[objDir[i]] != undefined) {
  //
  //         if (obj[objDir[i]].isSet && obj[objDir[i]].isFork != true) {   // check if x is next to a set (blue element) and not a fork
  //           nextToSet = true;
  //         }
  //         if (obj[objDir[i]].isSet == false) {   // check if x is next to a set (blue element) and not a fork
  //           if ((obj[objDir[i -2]] != undefined && obj[objDir[i -2]].isSet == false) || (obj[objDir[i +2]] != undefined && obj[objDir[i +2]].isSet == false))
  //           betweenUnsetAndDisabled = true;
  //         }
  //
  //
  //       }
  //     }
  //
  //     for (let dirDiag of objDirDiag) {
  //
  //       if (obj[dirDiag] != undefined) {
  //
  //         if (obj[dirDiag].isDisabled == true) {
  //           acrossFromDisabled++;
  //           console.log('across')
  //
  //         }
  //       }
  //     }
  //
  //
  //     if (nextToSet == false && acrossFromDisabled < 3 && betweenUnsetAndDisabled == false) {
  //       obj[x].isDisabled = true;
  //       obj[x].isFork = false;
  //       obj[x].isSet = false;
  //       document.getElementById(x).classList.add('disabled')
  //     }
  //
  //
  //   }
  //
  //
  //
  //
  // }
  //
  // //
  // // for (let x in obj) {
  // //   if (obj[x].isFork == true) {
  // //
  // //     let val = x.split(',')
  // //     let left = [Number(val[0]) - 1, Number(val[1])]
  // //     let right = [Number(val[0]) + 1, Number(val[1])]
  // //     let up = [Number(val[0]), Number(val[1]) + 1]
  // //     let down = [Number(val[0]), Number(val[1]) - 1];
  // //           var objDir = [left,right,up,down];
  // //       let setCount = 0;
  // //       for(let i = 0; i< 4; i++) {
  // //
  // //           if(obj[objDir[i]] != undefined) {
  // //                 if (obj[objDir[i]].isSet == true && obj[objDir[i]].isFork != true) {  setCount++; }
  // //           }
  // //       }
  // //       if(setCount == 1) {
  // //         obj[x].tobeUnforked = true;
  // //         console.log(obj[x].name)
  // //         // obj[x].isPlaza = false;
  // //         // document.getElementById(x).classList.remove('plaza')
  // //
  // //
  // //       }
  // //     }
  // //   }
  // // for (let x in obj) {
  // //   if(obj[x].tobeUnforked == true) {
  // //
  // //     obj[x].isFork = false;
  // //  console.log('dsfdsfd;')
  // //     document.getElementById(x).classList.remove('fork')
  // //
  // //     obj[x].isSet = true;
  // //
  // //   }
  // //
  // // }
  //
  //
  //
  // for (let x in obj) {
  //
  //   if (obj[x].isPlaza == true) {
  //     let val = x.split(',')
  //     let left = [Number(val[0]) - 1, Number(val[1])]
  //     let right = [Number(val[0]) + 1, Number(val[1])]
  //     let up = [Number(val[0]), Number(val[1]) + 1]
  //     let down = [Number(val[0]), Number(val[1]) - 1];
  //     let objDir = [left, right, up, down];
  //     let plazaCount = 0;
  //
  //     for (let i = 0; i < 4; i++) {
  //
  //       if (obj[objDir[i]] != undefined) {
  //         if (obj[objDir[i]].isSet == true && obj[objDir[i]].isPlaza == true) {
  //           plazaCount++;
  //         }
  //       }
  //     }
  //     if (plazaCount == 0) {
  //       obj[x].isPlaza = false;
  //       obj[x].isFork = false;
  //       document.getElementById(x).classList.remove('plaza');
  //       document.getElementById(x).classList.remove('fork');
  //       obj[x].tobeUnforked = true
  //
  //     }
  //   }
  //   if (obj[x].isSet == true && obj[x].isFork != true) {   // check if x is next to a set (blue element) and not a fork
  //
  //     let val = x.split(',')
  //     let left = [Number(val[0]) - 1, Number(val[1])]
  //     let right = [Number(val[0]) + 1, Number(val[1])]
  //     let up = [Number(val[0]), Number(val[1]) + 1]
  //     let down = [Number(val[0]), Number(val[1]) - 1];
  //     let objDir = [left, right, up, down];
  //     let isSetAlone = true;
  //     let countUnset = 0;
  //     for (let i = 0; i < 4; i++) {
  //
  //       if (obj[objDir[i]] != undefined) {
  //         if (obj[objDir[i]].isSet != true && (obj[objDir[i +1]] != undefined &&  obj[objDir[i +1]].isSet != true) || (obj[objDir[i +1]] != undefined && obj[objDir[i +1]].isSet != true)) { countUnset++}
  //         if (obj[objDir[i]].isSet == true && obj[objDir[i]].isFork != true) {
  //
  //           isSetAlone = false;
  //         }
  //       }
  //     }
  //     if (  isSetAlone == true && countUnset > 1) {
  //         console.log('dsfdsfdsf')
  //       obj[x].isDisabled = true;
  //       obj[x].isFork = false;
  //       obj[x].isSet = false;
  //       document.getElementById(x).classList.add('disabled')
  //     }
  //
  //
  //   }
  //
  // }

console.time('f')

var SquaresToDisable = true;

//while (SquaresToDisable == true) {

    SquaresToDisable = false;
    var pathCounter = 0;


    for (let x in obj) {
      if (obj[x].isFork == true) { // remove previous
        obj[x].isFork = false;
        obj[x].isPlaza = false;
        document.getElementById(x).classList.remove('fork')
        document.getElementById(x).classList.remove('plaza')

      }

      if (obj[x].isSet == true) {
        var val = x.split(',')

        let left = [Number(val[0]) - 1, Number(val[1])]
        let right = [Number(val[0]) + 1, Number(val[1])]
        let up = [Number(val[0]), Number(val[1]) + 1]
        let down = [Number(val[0]), Number(val[1]) - 1]

        let leftUp = [Number(val[0]) - 1, Number(val[1]) + 1]
        let leftDown = [Number(val[0]) - 1, Number(val[1]) - 1]
        let rightUp = [Number(val[0]) + 1, Number(val[1]) + 1]
        let rightDown = [Number(val[0]) + 1, Number(val[1]) - 1]


        let objDir = [left, right, up, down]
        let objDirDiag = [leftUp, leftDown, rightUp, rightDown]
        let isSetCounter = 0;
        let plazaCounter = 0;
        for (let i = 0; i < 4; i++) {
          if (obj[objDir[i]] != undefined && obj[objDir[i]].isSet == true) {
            isSetCounter++;
          }
          if (obj[objDirDiag[i]] != undefined && obj[objDirDiag[i]].isSet == true) {
            plazaCounter++;
          }
        }



        if (isSetCounter > 2 && isSetCounter < 5 && obj[x].toBeUnforked != true) {
          obj[x].isFork = true;
          if (obj[x].isDestination == false) {
            document.getElementById(x).classList.add('fork')
          }
        }
        if (isSetCounter + plazaCounter > 7) {
          obj[x].isFork = true;
          obj[x].isPlaza = true;
          if (obj[x].isDestination == false) {
            document.getElementById(x).classList.add('plaza')
          }
        }

      };
    }

    for (let x in obj) {
      if (obj[x].isSet && obj[x].isFork != true && obj[x].isDestination != true  ) {
        let val = x.split(',')
        let left = [Number(val[0]) - 1, Number(val[1])]
        let right = [Number(val[0]) + 1, Number(val[1])]
        let up = [Number(val[0]), Number(val[1]) + 1]
        let down = [Number(val[0]), Number(val[1]) - 1];

        let leftUp = [Number(val[0]) - 1, Number(val[1]) + 1]
        let leftDown = [Number(val[0]) - 1, Number(val[1]) - 1]
        let rightUp = [Number(val[0]) + 1, Number(val[1]) + 1]
        let rightDown = [Number(val[0]) + 1, Number(val[1]) - 1]

        let objDir = [left, right, up, down];
        let objDirDiag = [leftDown, rightUp, rightDown, leftUp]

        let nextToSet = false;
        let nextToUnsetOrDisabledCount = 0;
        let isBetweenUnset = false;
        let isBetweenDisabled = false;
        let isAcrossDisabled = false;
        let nextToSetCount = 0;
        let nextToForkCount = 0;
        let nextToDisabledCount = 0;
        let isAcrossUnsetAndDisabled = false;
        let isAcrossUnset = false;
        let nextToUnset = false;
        let nextToPlazaCount = 0;





        for (let i = 0; i < 4; i++) {

          if (obj[objDir[i]] != undefined) {

            if (obj[objDir[i]].isSet && obj[objDir[i]].isFork != true ) {   // check if x is next to a set (blue element) and not a fork
              nextToSet = true;

            }
            if (obj[objDir[i]].isSet != true) {
              nextToUnsetOrDisabledCount++;
            }
            if (obj[objDir[i]].isSet != true && obj[objDir[i]].isDisabled != true) {
              nextToUnset++;
            }
            // if (obj[objDir[i]].isSet == true &&  obj[objDir[i]].isFork == true &&  obj[objDir[i]].isPlaza == true) {
            //   nextToForkCount++;
            // }
            if (obj[objDir[i]].isDisabled == true ) {
              nextToDisabledCount++;
            }
            if (obj[objDirDiag[i]] != undefined && obj[objDirDiag[i]].isPlaza == true ) {
              nextToPlazaCount++;
            }




          }
        }
        if (
          (obj[objDir[0]] != undefined && obj[objDir[1]] != undefined && obj[objDir[0]].isSet != true && obj[objDir[1]].isSet != true)  ||
          (obj[objDir[2]] != undefined && obj[objDir[3]] != undefined && obj[objDir[2]].isSet != true && obj[objDir[3]].isSet != true)
            // || (obj[objDirDiag[0]] != undefined && obj[objDirDiag[1]] != undefined && obj[objDirDiag[0]].isDisabled != true && obj[objDirDiag[1]].isDisabled != true) ||
            //   (obj[objDirDiag[2]] != undefined && obj[objDirDiag[3]] != undefined && obj[objDirDiag[2]].isDisabled != true && obj[objDirDiag[3]].isDisabled != true)

             ) {
              if (nextToUnsetOrDisabledCount != 3) {
                   isBetweenDisabled = true;
               }



         }

         if (
           (obj[objDir[0]] != undefined && obj[objDir[1]] != undefined && obj[objDir[0]].isSet != true && obj[objDir[0]].isDisabled != true && obj[objDir[1]].isSet != true && obj[objDir[1]].isDisabled != true)  ||
           (obj[objDir[2]] != undefined && obj[objDir[3]] != undefined && obj[objDir[2]].isSet != true && obj[objDir[2]].isDisabled != true && obj[objDir[3]].isSet != true && obj[objDir[3]].isDisabled != true)
             // || (obj[objDirDiag[0]] != undefined && obj[objDirDiag[1]] != undefined && obj[objDirDiag[0]].isDisabled != true && obj[objDirDiag[1]].isDisabled != true) ||
             //   (obj[objDirDiag[2]] != undefined && obj[objDirDiag[3]] != undefined && obj[objDirDiag[2]].isDisabled != true && obj[objDirDiag[3]].isDisabled != true)

              ) {

              //  isBetweenUnset = true;




          }

        if (
            (obj[objDirDiag[0]] != undefined && obj[objDirDiag[1]] != undefined && obj[objDirDiag[0]].isDisabled != true && obj[objDirDiag[1]].isDisabled != true)
            || (obj[objDirDiag[2]] != undefined && obj[objDirDiag[3]] != undefined && obj[objDirDiag[2]].isDisabled != true && obj[objDirDiag[3]].isDisabled != true)
            // ||  (obj[objDirDiag[0]] != undefined && obj[objDirDiag[1]] != undefined && obj[objDirDiag[0]].isSet != true && obj[objDirDiag[1]].isSet != true)
            // ||    (obj[objDirDiag[2]] != undefined && obj[objDirDiag[3]] != undefined && obj[objDirDiag[2]].isSet != true && obj[objDirDiag[3]].isSet != true)

            )
        {
         isAcrossDisabled = true;
      //    console.log('dsfdsf')
        }

        if (
               (obj[objDirDiag[0]] != undefined && obj[objDirDiag[1]] != undefined && obj[objDirDiag[0]].isSet != true && obj[objDirDiag[1]].isDisabled == true)
            || (obj[objDirDiag[2]] != undefined && obj[objDirDiag[3]] != undefined && obj[objDirDiag[2]].isSet != true && obj[objDirDiag[3]].isDisabled == true)
            || (obj[objDirDiag[0]] != undefined && obj[objDirDiag[1]] != undefined && obj[objDirDiag[0]].isDisabled == true && obj[objDirDiag[1]].isSet != true)
            || (obj[objDirDiag[2]] != undefined && obj[objDirDiag[3]] != undefined && obj[objDirDiag[2]].isDisabled == true && obj[objDirDiag[3]].isSet != true)
            // ||  (obj[objDirDiag[0]] != undefined && obj[objDirDiag[1]] != undefined && obj[objDirDiag[0]].isSet != true && obj[objDirDiag[1]].isSet != true)
            // ||    (obj[objDirDiag[2]] != undefined && obj[objDirDiag[3]] != undefined && obj[objDirDiag[2]].isSet != true && obj[objDirDiag[3]].isSet != true)

            )
        {
          if ((nextToUnset  == 2 || nextToDisabledCount == 2 ) && nextToPlazaCount == 0) { // don't paint
            isAcrossUnsetAndDisabled = true;
          //  console.log(obj[x].name)

          }

        }

        if (
               (obj[objDirDiag[0]] != undefined && obj[objDirDiag[1]] != undefined && obj[objDirDiag[0]].isSet != true && obj[objDirDiag[0]].isDisabled != true && obj[objDirDiag[1]].isSet != true && obj[objDirDiag[1]].isDisabled != true)
            || (obj[objDirDiag[2]] != undefined && obj[objDirDiag[3]] != undefined && obj[objDirDiag[2]].isSet != true && obj[objDirDiag[2]].isDisabled != true && obj[objDirDiag[3]].isSet != true && obj[objDirDiag[3]].isDisabled != true)

            // ||  (obj[objDirDiag[0]] != undefined && obj[objDirDiag[1]] != undefined && obj[objDirDiag[0]].isSet != true && obj[objDirDiag[1]].isSet != true)
            // ||    (obj[objDirDiag[2]] != undefined && obj[objDirDiag[3]] != undefined && obj[objDirDiag[2]].isSet != true && obj[objDirDiag[3]].isSet != true)

            )
        {

      // isAcrossUnset = true;
          //  console.log(obj[x].name)

        }







        if (
          (nextToSet == false || nextToUnsetOrDisabledCount > 2) && isBetweenDisabled != true  && isBetweenUnset != true && isAcrossUnsetAndDisabled != true
          )

          {

          SquaresToDisable = true;
          obj[x].isDisabled = true;
          obj[x].isFork = false;
          obj[x].isSet = false;
          document.getElementById(x).classList.add('disabled')
        }




      }
      if (obj[x].isFork == true) {

        let val = x.split(',')
        let left = [Number(val[0]) - 1, Number(val[1])]
        let right = [Number(val[0]) + 1, Number(val[1])]
        let up = [Number(val[0]), Number(val[1]) + 1]
        let down = [Number(val[0]), Number(val[1]) - 1];

        let leftUp = [Number(val[0]) - 1, Number(val[1]) + 1]
        let leftDown = [Number(val[0]) - 1, Number(val[1]) - 1]
        let rightUp = [Number(val[0]) + 1, Number(val[1]) + 1]
        let rightDown = [Number(val[0]) + 1, Number(val[1]) - 1]


        let objDirDiag = [leftDown, rightUp, rightDown, leftUp]

        let objDir = [left, right, up, down];
        let plazaAlone = true;
        let nextToPlazaCount = 0;
        let nextToDisabledCount = 0;
        let nextToSetCount = false;
        let isAcrossUnset = false;



          for (let i = 0; i < 4; i++) {

            if (obj[objDir[i]] != undefined) {

              if (obj[objDir[i]].isPlaza == true) {   // check if x is next to a set (blue element) and not a fork
                plazaAlone = false;
              }
              if (obj[x].isPlaza != true ) {
                  if (obj[objDir[i]].isPlaza != true) {
                    nextToPlazaCount++;

                  }
                  if (obj[objDir[i]].isDisabled == true) {
                    nextToDisabledCount++;

                  }




              }


            }
          }
          // if (
          //     (obj[objDirDiag[0]] != undefined && obj[objDirDiag[1]] != undefined && obj[objDirDiag[0]].isSet != true && obj[objDirDiag[1]].isSet != true) ||
          //     (obj[objDirDiag[2]] != undefined && obj[objDirDiag[3]] != undefined && obj[objDirDiag[2]].isSet != true && obj[objDirDiag[3]].isSet != true)
          //     )
          // {
          //   isAcrossUnset = true;
          //   console.log('dsfdsf')
          // }


        if ((plazaAlone && obj[x].isPlaza) || (nextToPlazaCount == 4 && nextToDisabledCount > 1) || isAcrossUnset == true) {
            obj[x].isFork = false;
            obj[x].isPlaza = false;
            document.getElementById(x).classList.remove('plaza')
            document.getElementById(x).classList.remove('fork')
              obj[x].toBeUnforked = true;
        }



      }




    }





//}





console.timeEnd('f')


}
