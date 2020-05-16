import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

var scene,camera,controls,renderer,particles,stats,count=0,container;
var WIDTH,HEIGHT;
var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function initRenderer(){
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        antialias:true,
    });
    renderer.setSize(WIDTH,HEIGHT);
    renderer.setPixelRatio(WIDTH/HEIGHT);
    container.appendChild(renderer.domElement);
    // document.querySelector('#canvasArea').appendChild(renderer.domElement);
}

function initScene(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
}
function initCamera(){
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,10000);;
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.position.z = 1000;
    camera.lookAt( scene.position );
}
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
function onDocumentTouchMove( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
}
function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    var positions = particles.geometry.attributes.position.array;
    var scales = particles.geometry.attributes.scale.array;
    // var colors = particles.geometry.attributes.color.array;
    var i = 0, j = 0;
    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
            positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                            ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
            scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 8 +
                            ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 8;
            i += 3;
            j ++;
        }
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;
    // particles.geometry.attributes.color.needsUpdate = true;
    renderer.render( scene, camera );
    count += 0.1;
}
export function initModel4(){
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    initScene();
    initCamera();
    var numParticles = AMOUNTX*AMOUNTY;
    var positions = new Float32Array( numParticles * 3 );
    var scales = new Float32Array( numParticles );
    // var colors = new Float32Array( numParticles*3 );
    var i = 0, j = 0;
    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
            positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
            positions[ i + 1 ] = 0; // y
            positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z
            scales[ j ] = 1;
            // colors[ i ] = 65;
            // colors[ i+1 ] = 25;
            // colors[ i+2 ] = 0;
            i += 3;
            j ++;
        }
    }
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );
    // geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
    console.log(geometry)
    var material = new THREE.ShaderMaterial( {
        uniforms: {
            color: { value: new THREE.Color( 'rgb(51,91,247)' ) },
        },
        vertexShader: text1,
        fragmentShader: text2
    } );
    
    particles = new THREE.Points( geometry, material );
    scene.add( particles );
    initRenderer();
    stats = new Stats();
    container.appendChild( stats.dom );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    window.addEventListener( 'resize', onWindowResize, false );
    animate(); 
}
var text1 = `attribute float scale;

void main() {

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    gl_PointSize = scale * ( 300.0 / - mvPosition.z );

    gl_Position = projectionMatrix * mvPosition;

}`
var text2 = `uniform vec3 color;
void main() {

    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

    gl_FragColor = vec4( color, 1.0 );

}`