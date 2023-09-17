import * as THREE from 'three'
import Objects from '../Components/Objects.js'
import Camera from '../Components/Camera.js'

export default class titlescene
{
    constructor( sizes, A )
    {
        //create scene
        this.scene = new THREE.Scene( );
        this.scene.background = new THREE.Color( 0.8, 0.8, 0.8 );
        //create objects
        this.O = new Objects( );
        this.O.objectsT( this.scene, sizes, A );
        //create camera
        this.C = new Camera( );
        this.C.createCameraT( sizes );
    }
    resize( sizes )
    {
        // Update camera
        this.C.resize( sizes );
        // Update uniforms
        this.O.resizeT( sizes );
    }
    tick( deltaTime, elapsedTime, A )
    {
        // uniforms
        this.O.tickT( A, deltaTime, elapsedTime );
    }
};