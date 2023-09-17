import _ from 'lodash';
import './style.css';
import * as THREE from 'three'

import gitIcon from './assets/github.png'
import instaIcon from './assets/insta.png'
import soundIcon from './assets/soundcloud.png'
import linkedIcon from './assets/linked.png'
import twitterIcon from './assets/twitter.png'
import spotifyIcon from './assets/spotify.png'
import AudioInstance from './Components/Audio.js'
import Experience from './Components/Experience.js'


function createLink(url, icon, alt) {
    var link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    var icon_ = document.createElement('img');
    icon_.src = icon;
    icon_.alt = alt;
    link.appendChild(icon_);
    return link;
}

function component() {

    const element = document.createElement( 'div' );

    //sizes 

    var sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    //canvas DOMs

    var canvas = document.createElement( 'canvas' );
    var tsCanvas = document.createElement( 'canvas' );

    // links

    var contact = document.createElement( 'div' );
    var email = document.createElement( 'p' );
    email.innerHTML = 'ada@toydemir.org';
    contact.appendChild( email );

    var links = document.createElement( 'div' );
    // Resume link
    var resume_link = document.createElement('a');
    resume_link.href = 'https://drive.proton.me/urls/5849QZJYBW#D3cnidASvm6N';
    resume_link.target = '_blank';
    resume_link.innerHTML = 'AT';
    resume_link.setAttribute('download', 'Ada Toydemir Resume.pdf');
    links.appendChild(resume_link);
    // Instagram link
    var instagramLink = createLink( 'https://www.instagram.com/simulacrum_._/', instaIcon, "Instagram");
    links.appendChild(instagramLink);
    // LinkedIn
    var linkedInLink = createLink( 'https://www.linkedin.com/in/ada-toydemir/', linkedIcon, "LinkedIn");
    links.appendChild(linkedInLink);
    // Twitter link
    var twitterLink = createLink( 'https://twitter.com/__simulacrum', twitterIcon, "Twitter");
    links.appendChild(twitterLink);
    // GitHub link
    var githubLink = createLink( 'https://github.com/succculent', gitIcon, "Github" );
    links.appendChild(githubLink);
    // SoundCloud link
    var soundcloudLink = createLink( 'https://soundcloud.com/music-simulacrum', soundIcon, "Soundcloud" );
    links.appendChild(soundcloudLink);
    // Spotify link
    var spotifyLink = createLink( 'https://open.spotify.com/user/1273607190?si=48a04ac4d7d047da', spotifyIcon, "Spotify" );
    links.appendChild(spotifyLink);


    // about (name)

    var about = document.createElement( 'p' );
    about.innerText = "Ada Toydemir";

    //inst

    var inst = document.createElement( 'div' );
    var desc1 = document.createElement( 'p' );
    desc1.innerText = 'TAP to play/pause music\n';
    
    var desc2 = document.createElement( 'p' );
    desc2.innerText = 'UP/DOWN to change songs\n';
    var desc3 = document.createElement( 'p' );
    desc3.innerText = 'RIGHT/LEFT to change visuals\n';
    inst.appendChild(desc1);
    inst.appendChild(desc2);
    inst.appendChild(desc3);

    //DOM classes

    canvas.classList.add( 'webgl' );
    canvas.classList.add( 'AV' );
    tsCanvas.classList.add( 'webgl' );
    tsCanvas.classList.add( 'tsCanvas' );
    inst.classList.add( 'box' );
    about.classList.add( 'box' );
    about.classList.add( 'hidden' );
    links.classList.add( 'links' );
    contact.classList.add( 'hidden' );
    desc1.classList.add( 'buton' );
    about.classList.add( 'buton' );

    //append DOM

    element.append( canvas );
    element.append( tsCanvas );
    element.append( inst );
    element.append( about );
    element.append( links );
    element.append( contact );

    //audio track

    let A = new AudioInstance( 2048 );
    element.appendChild( A.audio );

    //scene track
    let E = new Experience( sizes, A, canvas, tsCanvas );

    //resizing

    window.addEventListener( 'resize', ( ) =>
    {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        E.resize( sizes );
    });

    //play pause
    function clickEvent( ) {
      if (A.initFlag) A.init( );
      else A.toggleAudio( );
      if (!desc1.classList.contains('hidden')) desc1.classList.add('hidden');
    }
    desc1.onclick = clickEvent;
    about.onclick = clickEvent;

    //key listeners

    window.addEventListener( "keydown", function ( event ) {
        if ( event.defaultPrevented ) {
          return; // Do nothing if the event was already processed
        }
        switch ( event.key ) {
          case "ArrowDown":
            A.prevSong( );
            if (!desc2.classList.contains('hidden')) desc2.classList.add('hidden');
            break;
          case "ArrowUp":
            A.nextSong( );
            if (!desc2.classList.contains('hidden')) desc2.classList.add('hidden');
            break;
          case "ArrowLeft":
            E.prevScene( );
            if (!desc3.classList.contains('hidden')) desc3.classList.add('hidden');
            break;
          case "ArrowRight":
            E.nextScene( );
            if (!desc3.classList.contains('hidden')) desc3.classList.add('hidden');
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);

    //mobile swipe listener 

    var startX, startY, endX, endY;
    var minDistance = 25;

    window.addEventListener( "touchstart", function ( event ) {
      var touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    });

    window.addEventListener( "touchend", function ( event ) {
      var touch = event.changedTouches[0];
      endX = touch.clientX;
      endY = touch.clientY;
      var deltaX = endX - startX;
      var deltaY = endY - startY;
      if (!(Math.abs(deltaX) <= minDistance && Math.abs(deltaY) <= minDistance)) {
        if (Math.abs(deltaX) < Math.abs(deltaY)) {
          if (deltaY > 0) { //up
            A.nextSong();
            if (!desc2.classList.contains('hidden')) desc2.classList.add('hidden');
          } else { //down
            A.prevSong();
            if (!desc2.classList.contains('hidden')) desc2.classList.add('hidden');
          }
        } else {
          if (deltaX > 0) { //left
            E.prevScene();
            if (!desc3.classList.contains('hidden')) desc3.classList.add('hidden');
          } else { //right
            E.nextScene();
            if (!desc3.classList.contains('hidden')) desc3.classList.add('hidden');
          }
        }
      }
    });

    //render loop

    const clock = new THREE.Clock( );
    const tick = ( ) =>
    {   
        var deltaTime = clock.getDelta( );
        var elapsedTime = clock.getElapsedTime( );
        A.onTick( );
        E.tick( deltaTime, elapsedTime, A );

        if ( desc3.classList.contains('hidden') && desc2.classList.contains('hidden') && desc1.classList.contains('hidden') && about.classList.contains('hidden')) {
          about.classList.remove('hidden');
          about.classList.add('visible');
          contact.classList.remove('hidden');
          contact.classList.add('contact-visible');
        }

        window.requestAnimationFrame( tick );
    };
    tick( );

    return element;
}

document.body.appendChild( component() );