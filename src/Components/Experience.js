import Renderer from './Renderer.js' 
import scene1 from '../Scenes/scene1.js'
import scene2 from '../Scenes/scene2.js'
import scene3 from '../Scenes/scene3.js'
import scene4 from '../Scenes/scene4.js'
import scene5 from '../Scenes/scene5.js'
import scene6 from '../Scenes/scene6.js'
import titlescene from '../Scenes/titlescene.js'

export default class Experience
{
    constructor( sizes, A, canvas, tsCanvas )
    {
      let scen1 = new scene1( sizes, A );
      let scen2 = new scene2( sizes, A );
      let scen3 = new scene3( sizes, A );
      let scen6 = new scene6( sizes, A );
      this.titc = new titlescene( sizes, A );
      this.scenes = [ scen1, scen2, scen3, scen6 ];
      this.curSceneIndex = 0;
      this.curScene = this.scenes[ this.curSceneIndex ];

      this.R = new Renderer( canvas, sizes );
      this.R2 = new Renderer( tsCanvas, sizes );
    }
    destructor( )
    {
    }
    nextScene( ) {
      this.curSceneIndex = ( this.curSceneIndex + 1 ) % this.scenes.length;
      this.curScene = this.scenes[ this.curSceneIndex ];
    }
    prevScene( ) {
      if ( this.curSceneIndex == 0 ) this.curSceneIndex = this.scenes.length - 1;
      else this.curSceneIndex--;
      this.curScene = this.scenes[ this.curSceneIndex ];
    }
    resize( sizes ) {
      this.curScene.resize( sizes );
      this.titc.resize( sizes );
    }
    tick( deltaTime, elapsedTime, A ) {
      this.R.render( this.curScene.scene, this.curScene.C.camera );
      this.R2.render( this.titc.scene, this.titc.C.camera );
      this.curScene.tick( deltaTime, elapsedTime, A );
      this.titc.tick( deltaTime, elapsedTime, A );
    }
};