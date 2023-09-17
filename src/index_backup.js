import _ from 'lodash';
import './style.css';

import * as THREE from 'three'
import song1 from './assets/song1.mp3'
import song2 from './assets/song2.mp3'
import song3 from './assets/song3.mp3'
import song4 from './assets/song4.mp3'
import song5 from './assets/song5.mp3'
import AudioInstance from './Components/Audio.js'
import Renderer from './Components/Renderer.js' 
import Popup from './Components/Popup.js'
import scene1 from './Scenes/scene1.js'
import scene2 from './Scenes/scene2.js'
import scene3 from './Scenes/scene3.js'
import scene4 from './Scenes/scene4.js'
import scene5 from './Scenes/scene5.js'
import scene6 from './Scenes/scene6.js'
import pub2 from './assets/pub2.pdf'
import BVS from './shaders/backgroundVert.glsl'
import BFS from './shaders/backgroundFrag.glsl'

function createProj(_title, _description, _skills, _link = null, _linkText=null) {
  var p = document.createElement('div');
  var t = document.createElement('h3');
  t.innerText = _title;
  p.appendChild(t);
  var d = document.createElement('p');
  d.innerText = _description;
  p.appendChild(d);
  if (_link != null) {
    var l = document.createElement('a');
    l.innerText = _linkText;
    l.href = _link;
    p.appendChild(l);
  }
  var t = document.createElement('p');
  t.innerText = _skills;
  p.appendChild(t);
  return p;
}

function createPublication(_title, _text, _citation, _link, _download = 0) {
    var p = document.createElement( 'div' );
    p.classList.add('publication');
    //p1 - title
    var ptitle = document.createElement( 'h3' );
    ptitle.innerText = _title;
    p.appendChild( ptitle );
    //p1 - text
    var ptext = document.createElement( 'p' );
    ptext.innerText = _text;
    p.appendChild( ptext );
    //p1 - citation
    var pcitation = document.createElement( 'a' );
    pcitation.innerText = _citation;
    if (_download) {
      pcitation.download = _link;
    }
    else {
      pcitation.href = _link;
    }
    p.appendChild( pcitation );
    return p;
}

function createLink(url, txt) {
    var link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.innerText = txt;
    return link
}

function component() {
    /*
     * Page Setup
     */
    const element = document.createElement( 'div' );

    var background_sizes = {
      width: window.innerWidth,
      height: window.innerHeight*0.15
    };

    var sizes = {
      width: window.innerWidth,
      height: window.innerHeight*0.85
    };

    //glsl background

    var background = document.createElement( 'canvas' );
    background.classList.add( 'webgl' );
    background.classList.add( 'background' );
    element.appendChild( background );
    const scene = new THREE.Scene()
    const material = new THREE.ShaderMaterial({
      vertexShader: BVS,
        fragmentShader: BFS,
        uniforms: {
            uTime: {value: 0.0},
            uResY: {value: background_sizes.height},
            uResX: {value: background_sizes.width},
        },
        side: THREE.DoubleSide,
    });
    material.needsUpdate = true;

    // const geometry = new THREE.PlaneGeometry(100,100);
    const geometry = new THREE.SphereGeometry(60);
    const plane = new THREE.Mesh(geometry, material);
    // plane.rotateY(-1.0*Math.PI/2.0);
    // plane.translateX(-50.0);
    // plane.translateY(-50.0);
    scene.add( plane );

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 11, 100)
    camera.lookAt(0,0,0)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = -20
    scene.add(camera)
    /*
    * Renderer
    */
    const renderer = new THREE.WebGLRenderer({
        canvas: background,
        alpha: true
    })
    renderer.setSize(background_sizes.width, background_sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearAlpha(0x000000, 0);


    //sections
    var d1 = document.createElement( 'div' );
    var d2 = document.createElement( 'div' );
    var d3 = document.createElement( 'div' );
    //subsections
    var s1 = document.createElement( 'div' );
    var s2 = document.createElement( 'div' );
    // var s3 = document.createElement( 'div' );

    // name - d1

    var name = document.createElement( 'h1' );
    name.classList.add( 'name' );
    name.innerText = "Ada Toydemir";
    d3.appendChild( name );

    // links - s1

    var _br = document.createElement( 'br' );

    // GitHub link
    var githubLink = createLink( 'https://github.com/your-github-username', 'GitHub' );
    s1.appendChild(githubLink);
    s1.appendChild(_br);
    // Instagram link
    var instagramLink = createLink( 'https://www.instagram.com/your-instagram-username', 'Instagram' );
    s1.appendChild(instagramLink);
    s1.appendChild(_br);
    // Twitter link
    var twitterLink = createLink( 'https://twitter.com/your-twitter-username', 'Twitter' );
    s1.appendChild(twitterLink);
    s1.appendChild(_br);
    // Resume link
    var resumeLink = createLink( 'path-to-your-resume-file.pdf', 'Resume' );
    s1.appendChild(resumeLink);
    s1.appendChild(_br);
    // Spotify link
    var spotifyLink = createLink( 'https://open.spotify.com/your-spotify-username', 'Spotify' );
    s1.appendChild(spotifyLink);
    s1.appendChild(_br);
    // SoundCloud link
    var soundcloudLink = createLink( 'https://soundcloud.com/your-soundcloud-username', 'SoundCloud' );
    s1.appendChild(soundcloudLink);

    // about - s2

    var about = document.createElement( 'p' );
    about.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim diam non orci pulvinar, quis fringilla nunc varius. Proin posuere lorem ac urna iaculis, nec mattis tellus tincidunt. Nunc lobortis volutpat aliquam. Vestibulum vitae ex et nulla sollicitudin scelerisque vel id velit. Morbi auctor nisl et lacus ultrices, eu tristique tellus laoreet. Suspendisse pulvinar arcu sed aliquet malesuada. Maecenas quis lorem consectetur, fringilla ipsum nec, tincidunt enim. Duis varius ipsum eget efficitur consequat. Pellentesque sit amet metus nec sapien efficitur volutpat vel ut nulla. Fus";
    s2.appendChild( about );

    // projects - d1

    let projectList = []

    //publications
    var pubs = document.createElement( 'div' );
    var pubs_title = document.createElement( 'h2' );
    pubs_title.innerText = "Publications";
    pubs.appendChild(pubs_title);
    var p1 = createPublication("Determining the Composition of a Mixed Material with Synthetic Data", "Contributions include (1) developing multiple input texture generation algorithm sampling layers of VGG-19 for loss (2) tuning generation for percentage sampling of material imaging for synthetic mixed data (3) testing and optimizing for similarity to real mixed material imaging data.", "C.Ly, C.A.Nizinski, A.Toydemir, C.Vachet, L.W.McDonald, and T.Tasdizen, \“Determining the Composition of a Mixed Material with Synthetic Data,\” Microscopy and Microanalysis, pp. 1–11, 2021.", "https://www.cambridge.org/core/services/aop-cambridge-core/content/view/54D1870F67F0285C85F054FF78D45A96/S1431927621012915a.pdf/determining_the_composition_of_a_mixed_material_with_synthetic_data.pdf");
    pubs.appendChild(p1);
    var p2 = createPublication("Sensitivity of Multimodal Representation Learning Frameworks for Different Input Representations", "While benchmarking multiple multimodal learning frameworks for sentiment analysis, training paradigms or multimodal fusion algorithms, the importance of input features such as different word representations obtained with different vector embedding techniques, or different audio signal processing techniques, have been overlooked when algorithmic superiority conclusions are made. We investigate the sensitivity of Modality-Invariant and -Specific Representations (MISA), Multimodal Transformer (MulT), MultiModal InfoMax (MMIM), Gradient Blending (GB), Early Fusion, Late Fusion, and Individual Modalities with respect to GloVe, BERT, RoBERTa, and DeBERTa text embeddings; HuBert and 2-layer LSTM acoustic embeddings; 2-layer LSTM visual embeddings with the CMU-MOSI and CMU-MOSEI datasets.", "E. Erturk, Y. U. Ciftci, A. Toydemir, P. Ahmandipour, Y. Yin, and M. Soleymani, \“Sensitivity of Multimodal Representation Learning Frameworks for Different Input Representations,\” (Manuscript in Preparation)", "./assets/pub2.pdf", 1);
    pubs.appendChild(p2);
    projectList.push(pubs)
    //tech art
    var pro = document.createElement( 'div' );
    var prof_title = document.createElement( 'h2' );
    prof_title.innerText = "Professional Experience";
    pro.appendChild(prof_title);
    var pr1 = createProj('Tech Artist - Blindsight: War of the Wardens', 'Blindsight: War of the Wardens is an action-adventure game where you play as Iggy Yin, a blind martial arts master with echolocation abilities. Join him as he retrieves a stolen family heirloom that could bring doom to the universe and threaten the lives of those he loves.',
    '3D Rendering · Unity · Shaders · Blender · Computer Graphics');
    pro.append(pr1);
    projectList.push(pro);

    var curProjInd = 0
    var curProj = projectList[curProjInd]
    projectList.forEach(CP => d1.appendChild(CP));

    //add classes

    var desc = document.createElement( 'p' );
    desc.innerText = 'press SPACE to play/pause music\nuse UP and DOWN arrows to cycle songs\nuse RIGHT and LEFT arrows to cycle visuals\n'
    d2.appendChild(desc)

    var canvas = document.createElement( 'canvas' );
    canvas.classList.add( 'webgl' );
    canvas.classList.add( 'AV' );
    d2.appendChild( canvas );

    var canvas = document.createElement( 'canvas' );
    canvas.classList.add( 'webgl' );
    canvas.classList.add( 'AV' );
    d2.appendChild( canvas );

    d3.classList.add( 'd3' )
    d2.classList.add( 'd2' )
    d1.classList.add( 'd1' )
    // s3.classList.add( 's3' )
    s2.classList.add( 's2' )
    s1.classList.add( 's1' )

    //append subsections
    d3.appendChild( s2 );
    // d3.appendChild( s3 );
    d3.appendChild( s1 );
    //append sections
    element.appendChild( d3 );
    element.appendChild( d1 );
    element.appendChild( d2 );

    let A = new AudioInstance( 2048 );
    let songs = [ song1, song2, song3, song4, song5 ]; //SONGS
    let songNames = [ [ "Love", "DEAN, Syd" ], [ "El", "Ricky Tinez" ], [ "Earth (Live Version)", "Lapalux" ], [ "Honda (feat. pa salieu", "FKA twigs, Pa Salieu" ], [ "Stately, Yes", "Efdemin" ] ];
    let curSongIndex = 0;
    A.loadTrack( songs[curSongIndex] );
    element.appendChild( A.audio );

    let scen1 = new scene1( sizes, A );
    let scen2 = new scene2( sizes, A );
    let scen3 = new scene3( sizes, A );
    let scen4 = new scene4( sizes, A );
    let scen5 = new scene5( sizes, A );
    let scen6 = new scene6( sizes, A );
    let scenes = [ scen1, scen2, scen3, scen6 ];
    let curSceneIndex = 0;
    let curScene = scenes[ curSceneIndex ];

    let songLabels = [];
    for (let i = 0; i < songNames.length; i++) {
      let p = new Popup( songNames[ i ][ 0 ], songNames[ i ][ 1 ] );
      element.appendChild( p.divv );
      songLabels.push(p);
    }
    songLabels[ curSceneIndex ].activate()

    let R = new Renderer( canvas, sizes );

    window.addEventListener( 'resize', ( ) =>
    {
        background_sizes.width = window.innerWidth;
        background_sizes.height = window.innerHeight * 0.15;
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight * 0.85;
        curScene.resize( sizes );

        material.uniforms.uResY.value = background_sizes.height;
        material.uniforms.uResX.value = background_sizes.width;
        // Update camera
        camera.aspect = background_sizes.width / background_sizes.height
        camera.updateProjectionMatrix()
        // Update renderer
        renderer.setSize(background_sizes.width, background_sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    });

    window.addEventListener( "keydown", function ( event ) {
        if ( event.defaultPrevented ) {
          return; // Do nothing if the event was already processed
        }
        switch ( event.key ) {
          case "ArrowDown":
            if ( songLabels[ curSongIndex ].countDown ) songLabels[ curSongIndex ].deactivate();
            if ( curSongIndex == 0 ) curSongIndex = songs.length - 1;
            else curSongIndex--;
            A.loadTrack( songs[curSongIndex] );
            songLabels[curSongIndex].activate();
            break;
          case "ArrowUp":
            if ( songLabels[ curSongIndex ].countDown ) songLabels[ curSongIndex ].deactivate();
            curSongIndex = ( curSongIndex + 1 ) % songs.length;
            A.loadTrack( songs[curSongIndex] );
            songLabels[curSongIndex].activate();
            break;
          case "ArrowLeft":
            if ( curSceneIndex == 0 ) curSceneIndex = scenes.length - 1;
            else curSceneIndex--;
            curScene = scenes[ curSceneIndex ];
            break;
          case "ArrowRight":
            curSceneIndex = ( curSceneIndex + 1 ) % scenes.length;
            curScene = scenes[ curSceneIndex ];
            break;
          case " ":
            A.toggleAudio( );
          default:
            return; // Quit when this doesn't handle the key event.
        }
      
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);

    const clock = new THREE.Clock( );
    const tick = ( ) =>
    {   
        var deltaTime = clock.getDelta( );
        var elapsedTime = clock.getElapsedTime( );
        songLabels.forEach( ( p ) => { p.update( deltaTime ); } );
        A.onTick( );
        R.render( curScene.scene, curScene.C.camera );
        curScene.tick( deltaTime, elapsedTime, A );

        material.uniforms.uTime.value = elapsedTime;
        renderer.render(scene, camera)

        window.requestAnimationFrame( tick );
    };
    tick( );

    return element;
}

document.body.appendChild( component() );