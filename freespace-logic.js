export {
  eliminateSquares
};
// ES6 MODULE IMPORT/EXPORT
////////////////////////////

function eliminateSquares(obj) {



var startTime = performance.now();

var SquaresToDisable = true;

while (SquaresToDisable == true) {

    SquaresToDisable = false;

    for (let x in obj) {
      if (obj[x].isFork == true) { // remove previous
        obj[x].isFork = false;
        obj[x].isPlaza = false;
        document.getElementById(x).classList.remove('fork', 'plaza')
      }


      if (obj[x].isSet == true) {

        if( obj[x].objDir == undefined) { // store the directions on the object property
          let val = x.split(',')

          let val0 = Number(val[0]);
          let val1 =  Number(val[1]);

          let rightRight = [val0 + 2, val1]
          let downDown = [val0, val1 - 2];

          let objLeft = obj[[val0 - 1, val1]];
          let objRight = obj[[val0 + 1, val1]];
          let objUp = obj[[val0, val1 + 1]];
          let objDown = obj[[val0, val1 - 1]];

          let objLeftDown = obj[[val0 - 1, val1 - 1]];
          let objRightUp = obj[[val0 + 1, val1 + 1]];
          let objRightDown = obj[[val0 + 1, val1 - 1]];
          let objLeftUp = obj[[val0 - 1, val1 + 1]];

          obj[x].objDir = [objLeft, objRight, objUp, objDown];

          obj[x].objDirDiag = [objLeftDown, objRightUp, objRightDown, objLeftUp]
        };

        let isSetCounter = 0;
        let plazaCounter = 0;
        for (let i = 0; i < 4; i++) {
          let dir = obj[x].objDir[i];
          let dirDiag = obj[x].objDirDiag[i];
          if (dir != undefined && dir.isSet == true) {
            isSetCounter++;
          }
          if (dirDiag != undefined && dirDiag.isSet == true) {
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
      let objX = obj[x];
      if (obj[x].isSet && obj[x].isFork != true && obj[x].isDestination != true  ) {
        let val = x.split(',')

        let val0 = Number(val[0]);
        let val1 =  Number(val[1]);

        let rightRight = [val0 + 2, val1]
        let downDown = [val0, val1 - 2];

        let objLeft = obj[[val0 - 1, val1]];
        let objRight = obj[[val0 + 1, val1]];
        let objUp = obj[[val0, val1 + 1]];
        let objDown = obj[[val0, val1 - 1]];

        let objLeftDown = obj[[val0 - 1, val1 - 1]];
        let objRightUp = obj[[val0 + 1, val1 + 1]];
        let objRightDown = obj[[val0 + 1, val1 - 1]];
        let objLeftUp = obj[[val0 - 1, val1 + 1]];


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
        let acrossPlazaCount = 0;
        let nextToDestination = false;
        let partOfDoubleToBeDisabled = false;
        let singleToBeDisabled = false;
        let acrossUnsetOrDisabledCount = 0;


        for (let i = 0; i < 4; i++) {
          let dir = obj[x].objDir[i];
          let dirDiag = obj[x].objDirDiag[i];

          if (dir != undefined) {

            if (dir.isSet && dir.isFork != true ) {   // check if x is next to a set (blue element) and not a fork
              nextToSet = true;

            }
            if (dir.isSet) {   // check if x is next to a set (blue element) and not a fork
              nextToSetCount++;

            }
            if (dir.isSet != true) {
              nextToUnsetOrDisabledCount++;
            }
            if (dir.isSet != true && dir.isDisabled != true) {
              nextToUnset++;
            }

            if (dir.isDisabled == true ) {
              nextToDisabledCount++;
            }

            if (dir != undefined && dir.isFork == true && dir.isPlaza != true) {
              nextToForkCount++;
            }
            if (dir.isDestination == true ) {
              nextToDestination = true;
            }
            if (dirDiag != undefined) {
              if (dirDiag.isSet != true ) {

                acrossUnsetOrDisabledCount++;

              }
              if (dirDiag != undefined && dirDiag.isPlaza == true ) {
                acrossPlazaCount++;
              }
            }

          }
        }
        if (
          (objLeft != undefined && objRight != undefined && objLeft.isSet != true && objRight.isSet != true)  ||
          (objUp != undefined && objDown != undefined && objUp.isSet != true && objDown.isSet != true)


             ) {
              if (nextToUnsetOrDisabledCount != 3) {
                   isBetweenDisabled = true;
               }

         }

         if (
           (objLeft != undefined && objRight != undefined && objLeft.isSet != true && objLeft.isDisabled != true && objRight.isSet != true && objRight.isDisabled != true)  ||
           (objUp != undefined && objDown != undefined && objUp.isSet != true && objUp.isDisabled != true && objDown.isSet != true && objDown.isDisabled != true)


              ) {

              //  isBetweenUnset = true;


          }

        if (
               (objLeftDown != undefined && objRightUp != undefined && objLeftDown.isDisabled != true && objRightUp.isDisabled != true)
            || (objRightDown != undefined && objLeftUp != undefined && objRightDown.isDisabled != true && objLeftUp.isDisabled != true)


            )
        {
         isAcrossDisabled = true;

        }

        if (
               (objLeftDown != undefined && objRightUp != undefined && (objLeftDown.isSet != true || (objLeft.isSet != true && objDown.isSet !=true))  && objRightUp.isDisabled == true)
            || (objRightDown != undefined && objLeftUp != undefined && (objRightDown.isSet != true || (objRight.isSet != true && objDown.isSet !=true))  && objLeftUp.isDisabled == true )
            || (objLeftDown != undefined && objRightUp != undefined && objLeftDown.isDisabled == true && (objRightUp.isSet != true || (objRight.isSet != true && objUp.isSet !=true)))
            || (objRightDown != undefined && objLeftUp != undefined && objRightDown.isDisabled == true && (objLeftUp.isSet != true || (objLeft.isSet != true && objUp.isSet !=true)))


            )
        {
          if ((nextToUnset  == 2 || (nextToDisabledCount > 0 && nextToUnsetOrDisabledCount  != 3  )) && acrossPlazaCount == 0) { // don't paint
            isAcrossUnsetAndDisabled = true;


          }

        }

        if (
               (objLeftDown != undefined && objRightUp != undefined && objLeftDown.isSet != true && objLeftDown.isDisabled != true && objRightUp.isSet != true && objRightUp.isDisabled != true)
            || (objRightDown != undefined && objLeftUp != undefined && objRightDown.isSet != true && objRightDown.isDisabled != true && objLeftUp.isSet != true && objLeftUp.isDisabled != true)


            )
        {
            if (acrossPlazaCount == 0 && nextToSetCount > 1 ) {
                isAcrossUnset = true;

            }



        }


        if (
            (
              objLeft != undefined && objRight != undefined && objUp != undefined && objDown != undefined // left of left -right below
              && objLeft.isSet != true && objRight.isSet == true && objRight.isFork != true && objUp.isFork == true && objRightUp.isFork == true && objDown.isSet !=true && obj[rightRight].isSet !=true
            )
            ||
            (
              objLeft != undefined && objRight != undefined && objUp != undefined && objDown != undefined // left of left -right above
              && objLeft.isSet != true && objRight.isSet == true && objRight.isFork != true && objDown.isFork == true && objRightDown.isFork == true && objUp.isSet !=true && obj[rightRight].isSet !=true && objRightUp.isSet !=true
            )
            ||
            (
              objLeft != undefined && objRight != undefined && objUp != undefined && objDown != undefined
              && objUp.isSet != true && objDown.isSet == true && objDown.isFork != true && objRight.isFork == true && objRightDown.isFork == true && obj[downDown].isSet !=true && objLeftDown.isSet !=true
            )
            ||
            (
              objLeft != undefined && objRight != undefined && objUp != undefined && objDown != undefined
              && objUp.isSet != true && objDown.isSet == true && objDown.isFork != true && objLeft.isFork == true && objLeftDown.isFork == true && obj[downDown].isSet !=true && objRightDown.isSet !=true
            )

          ) {  // if true - disable
          partOfDoubleToBeDisabled = true

         }

         if (objLeftUp != undefined && objLeftDown != undefined && objRightUp != undefined && objRightDown != undefined) {

           if (
              ( objRightDown.isSet == true && objLeftUp.isSet != true && objLeftDown.isSet != true && objRightUp.isSet != true)
                && (objRight.isFork && objRight.isPlaza != true && objDown.isFork && objDown.isPlaza != true)

              ||
              (objRightUp.isSet == true && objLeftUp.isSet != true && objLeftDown.isSet != true && objRightDown.isSet != true)
                && (objRight.isFork && objRight.isPlaza != true && objUp.isFork && objUp.isPlaza != true)

              ||
              ( objLeftUp.isSet == true && objLeftDown.isSet != true  && objRightDown.isSet != true && objRightUp.isSet != true)
                && (objLeft.isFork && objLeft.isPlaza != true && objUp.isFork && objUp.isPlaza != true)
              ||
              (  objLeftDown.isSet == true && objLeftUp.isSet != true && objRightUp.isSet != true && objRightDown.isSet != true)
                && (objLeft.isFork && objLeft.isPlaza != true && objDown.isFork && objDown.isPlaza != true)
              && (nextToUnsetOrDisabledCount == 2 && nextToSet == false && acrossUnsetOrDisabledCount == 3 && nextToForkCount == 2)
             )
             {  singleToBeDisabled = true }

         }

         //
        //  if (partOfDoubleToBeDisabled || singleToBeDisabled) {
        //    SquaresToDisable = true;
        //    obj[x].isDisabled = true;
        //    obj[x].isFork = false;
        //    obj[x].isSet = false;
        //    document.getElementById(x).classList.add('disabled')
         //
        //  }




        if (
            (nextToSet == false || nextToUnsetOrDisabledCount > 2) && isBetweenDisabled != true  && isBetweenUnset != true && isAcrossUnsetAndDisabled != true && nextToDestination != true
            && nextToForkCount <3 && isAcrossUnset == false || (partOfDoubleToBeDisabled || singleToBeDisabled)
           )
        {
          SquaresToDisable = true;
          obj[x].isDisabled = true;
          obj[x].isFork = false;
          obj[x].isSet = false;
          document.getElementById(x).classList.add('disabled');
        }

      }
      // if (obj[x].isFork == true) {
      //
      //   let val = x.split(',')
      //   let left = [Number(val[0]) - 1, Number(val[1])]
      //   let right = [Number(val[0]) + 1, Number(val[1])]
      //   let up = [Number(val[0]), Number(val[1]) + 1]
      //   let down = [Number(val[0]), Number(val[1]) - 1];
      //
      //   let leftUp = [Number(val[0]) - 1, Number(val[1]) + 1]
      //   let leftDown = [Number(val[0]) - 1, Number(val[1]) - 1]
      //   let rightUp = [Number(val[0]) + 1, Number(val[1]) + 1]
      //   let rightDown = [Number(val[0]) + 1, Number(val[1]) - 1]
      //
      //
      //   let objDirDiag = [leftDown, rightUp, rightDown, leftUp]
      //
      //   let objDir = [left, right, up, down];
      //   let plazaAlone = true;
      //   let acrossUnsetCount = 0;
      //
      //
      //
      //
      //     for (let i = 0; i < 4; i++) {
      //       let dir = obj[objDir[i]];
      //       let dirDiag = obj[objDirDiag[i]];
      //
      //
      //       if (dir != undefined && dir.isPlaza == true) {   // check if x is next to a set (blue element) and not a fork
      //         plazaAlone = false;
      //       }
      //       if (dirDiag != undefined && dirDiag.isSet != true) {   // check if x is next to a set (blue element) and not a fork
      //         acrossUnsetCount++;
      //       }
      //
      //
      //
      //     }
      //     console.log(acrossUnsetCount)
      //     // if (
      //     //     (objLeftDown != undefined && objRightUp != undefined && objLeftDown.isSet != true && objRightUp.isSet != true) ||
      //     //     (objRightDown != undefined && objLeftUp != undefined && objRightDown.isSet != true && objLeftUp.isSet != true)
      //     //     )
      //     // {
      //     //   isAcrossUnset = true;
      //     //   console.log('dsfdsf')
      //     // }
      //
      //
      //   if ( plazaAlone && obj[x].isPlaza && acrossUnsetCount < 2 ) {
      //       obj[x].isFork = false;
      //       obj[x].isPlaza = false;
      //       // document.getElementById(x).classList.remove('plaza')
      //       // document.getElementById(x).classList.remove('fork')
      //       obj[x].toBeUnforked = true;
      //
      //       // objLeft.isDisabled = true;
      //       // obj[objDir[0]].isFork = false;
      //       // obj[objDir[0]].isSet = false;
      //       // document.getElementById(objDir[0]).classList.add('disabled')
      //
      //   }
      //
      //
      //
      // } // end of if  - isFork


      // if (obj[x].isSet != true && obj[x].isDisabled != true  ) {
      //     delete obj[x]
      // }



    } // end of obj loop

    if (SquaresToDisable == false) {
        for (let x in obj) {

          if (obj[x].isSet && obj[x].isFork != true && obj[x].isDestination != true  ) {
            let val = x.split(',')

            let val0 = Number(val[0]);
            let val1 =  Number(val[1]);

            let objLeft = obj[[val0 - 1, val1]];
            let objRight = obj[[val0 + 1, val1]];
            let objUp = obj[[val0, val1 + 1]];
            let objDown = obj[[val0, val1 - 1]];

            let objDir = [objLeft, objRight, objUp, objDown];
            let isSetCount = 0;

            for (let i = 0; i < 4; i++) {
              let dir = objDir[i];


              if (dir != undefined) {


                if (dir.isSet == true) {   // check if x is next to a set (blue element) and not a fork
                  isSetCount++;
                }
              }

            }
            if(isSetCount == 3) {
              obj[x].isFork = true;

              document.getElementById(x).classList.add('fork')

            }

            if(isSetCount == 4) {
              obj[x].isFork = true;
              obj[x].isPlaza = true;
              document.getElementById(x).classList.add('plaza')
            }
          }

        }
    }



 }   // while loop end





var endTime = performance.now();
var time = endTime - startTime;
return time;


}
