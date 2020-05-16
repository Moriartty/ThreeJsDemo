import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';


var scene,camera,controls,renderer,mixers = [],mixer;
var WIDTH,HEIGHT;
var clock = new THREE.Clock();
//创建渲染器
function initRenderer(){
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        antialias:true,
    });
    renderer.setSize(WIDTH,HEIGHT);
    renderer.setPixelRatio(WIDTH/HEIGHT);
    document.querySelector('#canvasArea').appendChild(renderer.domElement);
 
}
//创建光源
function initLight(){
    // 方向光
    // var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // scene.add( directionalLight );
    var target = new THREE.Object3D();
    var pointColor = "#ffffff";
    var spotLight = new THREE.SpotLight(pointColor);
    spotLight.position.set(200, 0, -10);
    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 2;
    spotLight.shadowCameraFar = 200;
    spotLight.target = target;
    spotLight.distance = 0;
    spotLight.angle = 0.4;
    scene.add(spotLight);
    // 环境光
    scene.add( new THREE.AmbientLight( 0xffffff ,1) );
}
//创建场景
function initScene(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
}
function initControl(){
    controls = new TrackballControls( camera,renderer.domElement );
    controls.rotateSpeed = 1.0;// 旋转速度
    controls.zoomSpeed = 1.2;// 缩放速度
    controls.panSpeed = 0.8;// 平controls
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;// 静止移动，为 true 则没有惯性
    controls.dynamicDampingFactor = 0.3;// 阻尼系数 越小 则滑动越大
}
//创建相机
function initCamera(){
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);;
    camera.position.set(0,-400,800);
    camera.lookAt(0,0,0);
}


function initObject(){
    var loader = new GLTFLoader();
    loader.load('./modal/phoenix_bird/scene.gltf',function(gltf){
        console.log(gltf)
        gltf.scene.position.y = 0;
        gltf.scene.position.x = 200;
        scene.add(gltf.scene);
        
        mixer = new THREE.AnimationMixer( gltf.scene.children[0] ); 
        mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 4 ).play();
        mixers.push( mixer );

    },undefined,function(error){
        console.log(error);
    })
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}

function animation(){
    requestAnimationFrame(animation);
    renderer.render(scene,camera);
    controls.update();
    var time = clock.getDelta();
    // update 推进混合器时间并更新动画 
    if (mixer) {
        mixer.update(time);
    }
}

export function initModel2(){
    initRenderer();
    initScene();
    initLight();
    initCamera();
    initObject();
    initControl();
    animation();
}





