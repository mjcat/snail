<template lang="pug">
  #main
    header#header
      h1 VR Technologies
      p Security Chief &nbsp;&bull;&nbsp; Cyborg &nbsp;&bull;&nbsp; Never asked for this
      nav
        ul
          li
            a.icon.fa-twitter
              span.label Twitter
          li
            a.icon.fa-facebook
              span.label Facebook
          li
            a.icon.fa-dribble
              span.label Dribbble
          li
            a.icon.fa-github
              span.label Github
          li
            a.icon.fa-envelope-o
              span.label Email
</template>

<style scoped>
    ul {
    list-style: none;
  }

/* Basic */

  a {
    -moz-transition: border-color 0.2s ease-in-out;
    -webkit-transition: border-color 0.2s ease-in-out;
    -ms-transition: border-color 0.2s ease-in-out;
    transition: border-color 0.2s ease-in-out;
    border-bottom: dotted 1px;
    color: inherit;
    outline: 0;
    text-decoration: none;
  }

  a:hover {
    border-color: transparent;
  }

/* Icon */

  .icon {
    text-decoration: none;
    position: relative;
  }

  .icon:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
  }

  .icon > .label {
    display: none;
  }

  /* Main */

  #main {
    height: 100%;
    left: 0;
    /*position: fixed;*/
    top: 0;
    width: 100%;
  }

    #main:before {
      content: '';
      display: inline-block;
      height: 100%;
      margin-right: 0;
      vertical-align: middle;
      width: 1px;
    }

/* Header */

  @-moz-keyframes header {
    0% {
      -moz-transform: translate3d(0,1em,0);
      -webkit-transform: translate3d(0,1em,0);
      -ms-transform: translate3d(0,1em,0);
      transform: translate3d(0,1em,0);
      opacity: 0;
    }

    100% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }

  @-webkit-keyframes header {
    0% {
      -moz-transform: translate3d(0,1em,0);
      -webkit-transform: translate3d(0,1em,0);
      -ms-transform: translate3d(0,1em,0);
      transform: translate3d(0,1em,0);
      opacity: 0;
    }

    100% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }

  @-ms-keyframes header {
    0% {
      -moz-transform: translate3d(0,1em,0);
      -webkit-transform: translate3d(0,1em,0);
      -ms-transform: translate3d(0,1em,0);
      transform: translate3d(0,1em,0);
      opacity: 0;
    }

    100% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }

  @keyframes header {
    0% {
      -moz-transform: translate3d(0,1em,0);
      -webkit-transform: translate3d(0,1em,0);
      -ms-transform: translate3d(0,1em,0);
      transform: translate3d(0,1em,0);
      opacity: 0;
    }

    100% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }

  @-moz-keyframes nav-icons {
    0% {
      -moz-transform: translate3d(0,1em,0);
      -webkit-transform: translate3d(0,1em,0);
      -ms-transform: translate3d(0,1em,0);
      transform: translate3d(0,1em,0);
      opacity: 0;
    }

    100% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }

  @-webkit-keyframes nav-icons {
    0% {
      -moz-transform: translate3d(0,1em,0);
      -webkit-transform: translate3d(0,1em,0);
      -ms-transform: translate3d(0,1em,0);
      transform: translate3d(0,1em,0);
      opacity: 0;
    }

    100% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }

  @-ms-keyframes nav-icons {
    0% {
      -moz-transform: translate3d(0,1em,0);
      -webkit-transform: translate3d(0,1em,0);
      -ms-transform: translate3d(0,1em,0);
      transform: translate3d(0,1em,0);
      opacity: 0;
    }

    100% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }

  @keyframes nav-icons {
    0% {
      -moz-transform: translate3d(0,1em,0);
      -webkit-transform: translate3d(0,1em,0);
      -ms-transform: translate3d(0,1em,0);
      transform: translate3d(0,1em,0);
      opacity: 0;
    }

    100% {
      -moz-transform: translate3d(0,0,0);
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }

  #header {
    -moz-animation: header 1s 2.25s forwards;
    -webkit-animation: header 1s 2.25s forwards;
    -ms-animation: header 1s 2.25s forwards;
    animation: header 1s 2.25s forwards;
    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-transform: translate3d(0,0,0);
    -webkit-transform: translate3d(0,0,0);
    -ms-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    cursor: default;
    display: inline-block;
    opacity: 0;
    position: relative;
    vertical-align: middle;
  }

    #header h1 {
      font-size: 4.35em;
      font-weight: 900;
      letter-spacing: -0.035em;
      line-height: 1em;
    }

    #header p {
      font-size: 1.25em;
      margin: 0.75em 0 0.25em 0;
      opacity: 0.75;
    }

    #header nav {
      margin: 1.5em 0 0 0;
    }

      #header nav li {
        -moz-animation: nav-icons 0.5s ease-in-out forwards;
        -webkit-animation: nav-icons 0.5s ease-in-out forwards;
        -ms-animation: nav-icons 0.5s ease-in-out forwards;
        animation: nav-icons 0.5s ease-in-out forwards;
        -moz-backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
        -moz-transform: translate3d(0,0,0);
        -webkit-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
        display: inline-block;
        height: 5.35em;
        line-height: 5.885em;
        opacity: 0;
        position: relative;
        top: 0;
        width: 5.35em;
      }

        #header nav li:nth-child(1) {
          -moz-animation-delay: 2.5s;
          -webkit-animation-delay: 2.5s;
          -ms-animation-delay: 2.5s;
          animation-delay: 2.5s;
        }

        #header nav li:nth-child(2) {
          -moz-animation-delay: 2.75s;
          -webkit-animation-delay: 2.75s;
          -ms-animation-delay: 2.75s;
          animation-delay: 2.75s;
        }

        #header nav li:nth-child(3) {
          -moz-animation-delay: 3s;
          -webkit-animation-delay: 3s;
          -ms-animation-delay: 3s;
          animation-delay: 3s;
        }

        #header nav li:nth-child(4) {
          -moz-animation-delay: 3.25s;
          -webkit-animation-delay: 3.25s;
          -ms-animation-delay: 3.25s;
          animation-delay: 3.25s;
        }

        #header nav li:nth-child(5) {
          -moz-animation-delay: 3.5s;
          -webkit-animation-delay: 3.5s;
          -ms-animation-delay: 3.5s;
          animation-delay: 3.5s;
        }

        #header nav li:nth-child(6) {
          -moz-animation-delay: 3.75s;
          -webkit-animation-delay: 3.75s;
          -ms-animation-delay: 3.75s;
          animation-delay: 3.75s;
        }

        #header nav li:nth-child(7) {
          -moz-animation-delay: 4s;
          -webkit-animation-delay: 4s;
          -ms-animation-delay: 4s;
          animation-delay: 4s;
        }

        #header nav li:nth-child(8) {
          -moz-animation-delay: 4.25s;
          -webkit-animation-delay: 4.25s;
          -ms-animation-delay: 4.25s;
          animation-delay: 4.25s;
        }

        #header nav li:nth-child(9) {
          -moz-animation-delay: 4.5s;
          -webkit-animation-delay: 4.5s;
          -ms-animation-delay: 4.5s;
          animation-delay: 4.5s;
        }

        #header nav li:nth-child(10) {
          -moz-animation-delay: 4.75s;
          -webkit-animation-delay: 4.75s;
          -ms-animation-delay: 4.75s;
          animation-delay: 4.75s;
        }

      #header nav a {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        border: 0;
        display: inline-block;
      }

        #header nav a:before {
          -moz-transition: all 0.2s ease-in-out;
          -webkit-transition: all 0.2s ease-in-out;
          -ms-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
          border-radius: 100%;
          border: solid 1px #fff;
          display: block;
          font-size: 1.75em;
          height: 2.5em;
          line-height: 2.5em;
          position: relative;
          text-align: center;
          top: 0;
          width: 2.5em;
        }

        #header nav a:hover {
          font-size: 1.1em;
        }

          #header nav a:hover:before {
            background-color: rgba(255, 255, 255, 0.175);
            color: #fff;
          }

        #header nav a:active {
          font-size: 0.95em;
          background: none;
        }

          #header nav a:active:before {
            background-color: rgba(255, 255, 255, 0.35);
            color: #fff;
          }

        #header nav a span {
          display: none;
        }

  @media screen and (max-width: 736px) {
    /* Header */

    #header h1 {
      font-size: 2.5em;
    }

    #header p {
      font-size: 1em;
    }
  }
</style>
