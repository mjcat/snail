<template lang="pug">
#wrapper
  #bg
  #overlay
  slot
</template>

<style scoped>

/* Wrapper */

  @-moz-keyframes wrapper {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes wrapper {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes wrapper {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes wrapper {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  #wrapper {
    -moz-animation: wrapper 3s forwards;
    -webkit-animation: wrapper 3s forwards;
    -ms-animation: wrapper 3s forwards;
    animation: wrapper 3s forwards;
    opacity: 0;
  }
/* BG */

  #bg {
    -moz-animation: bg 60s linear infinite;
    -webkit-animation: bg 60s linear infinite;
    -ms-animation: bg 60s linear infinite;
    animation: bg 60s linear infinite;
    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-transform: translate3d(0,0,0);
    -webkit-transform: translate3d(0,0,0);
    -ms-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
  /* Set your background with this */

    background: #4E0569 url("../../assets/New-York-City-3.png") bottom left;
    background-repeat: repeat-x;
    height: 100%;
    left: 0;
    opacity: 1;
    position: fixed;
    top: 0;
  }

  @-moz-keyframes bg {
    0% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }

    100% {
      -moz-transform: translate3d(-2250px,0,0);
      -webkit-transform: translate3d(-2250px,0,0);
      -ms-transform: translate3d(-2250px,0,0);
      transform: translate3d(-2250px,0,0);
    }
  }

  @-webkit-keyframes bg {
    0% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }

    100% {
      -moz-transform: translate3d(-2250px,0,0);
      -webkit-transform: translate3d(-2250px,0,0);
      -ms-transform: translate3d(-2250px,0,0);
      transform: translate3d(-2250px,0,0);
    }
  }

  @-ms-keyframes bg {
    0% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }

    100% {
      -moz-transform: translate3d(-2250px,0,0);
      -webkit-transform: translate3d(-2250px,0,0);
      -ms-transform: translate3d(-2250px,0,0);
      transform: translate3d(-2250px,0,0);
    }
  }

  @keyframes bg {
    0% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }

    100% {
      -moz-transform: translate3d(-2250px,0,0);
      -webkit-transform: translate3d(-2250px,0,0);
      -ms-transform: translate3d(-2250px,0,0);
      transform: translate3d(-2250px,0,0);
    }
  }

  #bg {
    background-size: 2250px auto;
    width: 6750px;
  }

/* Overlay */

  @-moz-keyframes overlay {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes overlay {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes overlay {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes overlay {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  #overlay {
    -moz-animation: overlay 1.5s 1.5s forwards;
    -webkit-animation: overlay 1.5s 1.5s forwards;
    -ms-animation: overlay 1.5s 1.5s forwards;
    animation: overlay 1.5s 1.5s forwards;
    background-attachment: fixed, fixed;
    background-image: url("../../assets/overlay-pattern.png"), url("../../assets/overlay.svg");
    background-position: top left, center center;
    background-repeat: repeat, no-repeat;
    background-size: auto, cover;
    height: 100%;
    left: 0;
    opacity: 0;
    position: fixed;
    top: 0;
    width: 100%;
  }

/* Wide */

  @media screen and (max-width: 1680px) {

    /* BG */

      @-moz-keyframes bg {
        0% {
          -moz-transform: translate3d(0,0,0);
          -webkit-transform: translate3d(0,0,0);
          -ms-transform: translate3d(0,0,0);
          transform: translate3d(0,0,0);
        }

        100% {
          -moz-transform: translate3d(-1500px,0,0);
          -webkit-transform: translate3d(-1500px,0,0);
          -ms-transform: translate3d(-1500px,0,0);
          transform: translate3d(-1500px,0,0);
        }

  }

    @-webkit-keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-1500px,0,0);
        -webkit-transform: translate3d(-1500px,0,0);
        -ms-transform: translate3d(-1500px,0,0);
        transform: translate3d(-1500px,0,0);
      }
      }

    @-ms-keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-1500px,0,0);
        -webkit-transform: translate3d(-1500px,0,0);
        -ms-transform: translate3d(-1500px,0,0);
        transform: translate3d(-1500px,0,0);
      }
    }

    @keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-1500px,0,0);
        -webkit-transform: translate3d(-1500px,0,0);
        -ms-transform: translate3d(-1500px,0,0);
        transform: translate3d(-1500px,0,0);
      }
    }

    #bg {
      background-size: 1500px auto;
      width: 4500px;
    } }

/* Normal */

  @media screen and (max-width: 1280px) {

    /* BG */

      @-moz-keyframes bg {
        0% {
          -moz-transform: translate3d(0,0,0);
          -webkit-transform: translate3d(0,0,0);
          -ms-transform: translate3d(0,0,0);
          transform: translate3d(0,0,0);
        }

        100% {
          -moz-transform: translate3d(-750px,0,0);
          -webkit-transform: translate3d(-750px,0,0);
          -ms-transform: translate3d(-750px,0,0);
          transform: translate3d(-750px,0,0);
        }

  }

    @-webkit-keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-750px,0,0);
        -webkit-transform: translate3d(-750px,0,0);
        -ms-transform: translate3d(-750px,0,0);
        transform: translate3d(-750px,0,0);
      }
      }

    @-ms-keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-750px,0,0);
        -webkit-transform: translate3d(-750px,0,0);
        -ms-transform: translate3d(-750px,0,0);
        transform: translate3d(-750px,0,0);
      }
    }

    @keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-750px,0,0);
        -webkit-transform: translate3d(-750px,0,0);
        -ms-transform: translate3d(-750px,0,0);
        transform: translate3d(-750px,0,0);
      }
    }

    #bg {
      background-size: 750px auto;
      width: 2250px;
    } }

/* Mobile */

  @media screen and (max-width: 736px) {

    /* Basic */

      /*body {
        min-width: 320px;
      }*/

    /* BG */

      @-moz-keyframes bg {
        0% {
          -moz-transform: translate3d(0,0,0);
          -webkit-transform: translate3d(0,0,0);
          -ms-transform: translate3d(0,0,0);
          transform: translate3d(0,0,0);
        }

        100% {
          -moz-transform: translate3d(-300px,0,0);
          -webkit-transform: translate3d(-300px,0,0);
          -ms-transform: translate3d(-300px,0,0);
          transform: translate3d(-300px,0,0);
        }

  }

    @-webkit-keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-300px,0,0);
        -webkit-transform: translate3d(-300px,0,0);
        -ms-transform: translate3d(-300px,0,0);
        transform: translate3d(-300px,0,0);
      }
      }

    @-ms-keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-300px,0,0);
        -webkit-transform: translate3d(-300px,0,0);
        -ms-transform: translate3d(-300px,0,0);
        transform: translate3d(-300px,0,0);
      }
    }

    @keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-300px,0,0);
        -webkit-transform: translate3d(-300px,0,0);
        -ms-transform: translate3d(-300px,0,0);
        transform: translate3d(-300px,0,0);
      }
    }

    #bg {
      background-size: 300px auto;
      width: 900px;
    }
}

/* Mobile (Portrait) */

  @media screen and (max-width: 480px) {

    /* BG */

      @-moz-keyframes bg {
        0% {
          -moz-transform: translate3d(0,0,0);
          -webkit-transform: translate3d(0,0,0);
          -ms-transform: translate3d(0,0,0);
          transform: translate3d(0,0,0);
        }

        100% {
          -moz-transform: translate3d(-412.5px,0,0);
          -webkit-transform: translate3d(-412.5px,0,0);
          -ms-transform: translate3d(-412.5px,0,0);
          transform: translate3d(-412.5px,0,0);
        }

  }

    @-webkit-keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-412.5px,0,0);
        -webkit-transform: translate3d(-412.5px,0,0);
        -ms-transform: translate3d(-412.5px,0,0);
        transform: translate3d(-412.5px,0,0);
      }
      }

    @-ms-keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-412.5px,0,0);
        -webkit-transform: translate3d(-412.5px,0,0);
        -ms-transform: translate3d(-412.5px,0,0);
        transform: translate3d(-412.5px,0,0);
      }
    }

    @keyframes bg {
      0% {
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
      }

      100% {
        -moz-transform: translate3d(-412.5px,0,0);
        -webkit-transform: translate3d(-412.5px,0,0);
        -ms-transform: translate3d(-412.5px,0,0);
        transform: translate3d(-412.5px,0,0);
      }
    }

    #bg {
      background-size: 412.5px auto;
      width: 1237.5px;
    }
 }
</style>
