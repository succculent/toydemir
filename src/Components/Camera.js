import * as THREE from 'three'

export default class Camera
{
    constructor( )
    {
        
    }
    createCamera1( diameter, sizes ) {
        //camera
        this.camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
        this.camera.position.set( diameter + 5, diameter + 5, diameter + 5 );
        this.camera.lookAt( 0, 0, 0 );

        //other variables
        this.flagNew = -1;
        this.cameraSpeed = 0.5;
        this.cameraAngularSpeed = Math.PI/8.0;
        this.secondsPerClip = 7.5;
        this.diameter = diameter;
    }
    resize( sizes )
    {
        this.camera.aspect = sizes.width / sizes.height;
        this.camera.updateProjectionMatrix( );
    }
    tick1( elapsedTime, deltaTime ) {
        this.moveCamera( elapsedTime, deltaTime );
    }
    moveCamera( elapsedTime, deltaTime )
    {
        var switchStatement = Math.floor( elapsedTime / this.secondsPerClip ) % 8 ;
        var flag = false;
        if (this.flagNew != switchStatement) flag = true;
        switch( switchStatement ) {
        //glitchy circlular motion about z-axis with radius of "diameter"
        case 0:
            if(flag) {
                this.camera.position.set( this.diameter, 0, 4 );
                this.camera.lookAt( 0, 0, 0 );
            }
            var theta = this.cameraAngularSpeed * deltaTime + Math.atan( this.camera.position.y / this.camera.position.x );
            this.camera.position.x = this.diameter * Math.cos( theta );
            this.camera.position.y = this.diameter * Math.sin( theta );
            this.camera.lookAt( 0, 0, 0 );
            break;
        //still looking at scene from a side and slightly above
        case 1:
            this.camera.position.set( 1.5 * this.diameter, 2, 0 );
            this.camera.lookAt( 0, 0, 0 );
            break;
        //straight line through the scene parallel to z-axis
        case 2:
            if(flag) {
                this.camera.position.set( 1, 2, -5);
                this.camera.lookAt( 0, 0, 0 );
            }
            this.camera.position.z += this.cameraSpeed * deltaTime;
            this.camera.lookAt( 0, 0, 0 );
            break;
        //zooming away from the center
        case 3:
            if(flag) {
                this.camera.position.set( 0.2, 0, 0.2 );
                this.camera.lookAt( 0, 0, 0 );
            }
            this.camera.position.x += this.cameraSpeed * Math.sqrt( 2 ) * deltaTime;
            this.camera.position.z += this.cameraSpeed * Math.sqrt( 2 ) * deltaTime;
            break;
        //birdseye view not changing
        case 4:
            this.camera.position.set( 0, 2 * this.diameter, 0 );
            this.camera.lookAt( 0, 0, 0 );
            break;
        //sprial motion about the x-axis
        case 5:
            if(flag) {
                this.camera.position.set( 1.5 * this.diameter, this.diameter, 0);
                this.camera.lookAt( 0, 0, 0 );
            }
            var theta = this.cameraAngularSpeed * deltaTime + Math.atan( this.camera.position.y / this.camera.position.z );
            this.camera.position.x -= this.cameraSpeed * deltaTime;
            this.camera.position.y = this.diameter * Math.sin( theta );
            this.camera.position.z = this.diameter * Math.cos( theta );
            this.camera.lookAt( 0, 0, 0 );
            break;
        //scrolling
        case 6:
            if(flag) {
                this.camera.position.set( -3, this.diameter, -3);
                this.camera.lookAt( 0, this.diameter, 0 );
            }
            this.camera.position.y -= this.cameraSpeed * deltaTime;
            break;
        //real circlular motion about y-axis with radius of "this.diameter"
        case 7:
            if(flag) {
                this.camera.position.set( this.diameter, 0, 0 );
                this.camera.lookAt( 0, 0, 0 );
            }
            var theta = this.cameraAngularSpeed * deltaTime + Math.atan( this.camera.position.z / this.camera.position.x );
            this.camera.position.z = this.diameter * Math.sin( theta );
            this.camera.position.x = this.diameter * Math.cos( theta );
            this.camera.lookAt( 0, 0, 0 );
            break;
        }
        this.flagNew = switchStatement;
    }
    createCamera2( sizes )
    {
        this.camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 1, 100 );
        this.camera.position.set( -50, -50, -50 );
        this.camera.lookAt( 0, 0, 0 );
    }
    createCamera3( sizes ) {
        this.camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
        this.camera.position.set( 0, 0, -20 );
        this.camera.lookAt( 0, 0, 0 );
    }
};