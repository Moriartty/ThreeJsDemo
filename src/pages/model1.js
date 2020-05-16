import * as THREE from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
var scene,camera,controls,renderer;
var WIDTH,HEIGHT;
var objects = [];
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
//创建场景
function initScene(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );
}
//创建相机
function initCamera(){
    camera = new THREE.PerspectiveCamera(50,WIDTH/HEIGHT,1,10000);
    camera.position.set(0,0,1000);
    camera.lookAt(0,0,0);
}
//创建光源
function initLight(){
    // 方向光
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );
    // 环境光
    scene.add( new THREE.AmbientLight( 0x505050 ) );
}
//创建对象
function initObject(){
    // var geometry = new THREE.BoxBufferGeometry( 40, 40, 40 );
    var geometry = new THREE.SphereGeometry(16, 20, 20);
 
    for ( var i = 0; i < 100; i ++ ) {
 
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
        //随机位置
        object.position.x = Math.random() * 1000 - 500;
        object.position.y = Math.random() * 600 - 300;
        object.position.z = Math.random() * 800 - 400;
        //随机角度
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        //随机大小
        object.scale.x = Math.random() * 2 + 1;
        object.scale.y = object.scale.x;
        object.scale.z = object.scale.x;
        //开启阴影
        object.castShadow = true;
        object.receiveShadow = true;
 
        scene.add( object );
        // 放入数组
        objects.push( object );
 
    }
 
}
//创建控制器
function initControls(){
    //	TrackballControls 轨迹球控件，最常用的控件，可以使用鼠标轻松的移动、平移，缩放场景。
    controls = new TrackballControls( camera,renderer.domElement );
    controls.rotateSpeed = 1.0;// 旋转速度
    controls.zoomSpeed = 1.2;// 缩放速度
    controls.panSpeed = 0.8;// 平controls
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;// 静止移动，为 true 则没有惯性
    controls.dynamicDampingFactor = 0.3;// 阻尼系数 越小 则滑动越大
    // DragControls 初始化拖拽控件
    var dragControls = new DragControls( objects, camera, renderer.domElement );
    // 开始拖拽
    dragControls.addEventListener( 'dragstart', function () {
 
        controls.enabled = false;
 
    } );
    // 拖拽结束
    dragControls.addEventListener( 'dragend', function () {
 
        controls.enabled = true;
 
    } );
 
}
 
export function initThree(){
    initRenderer();
    initScene();
    initCamera();
    initLight();
    initObject();
    initControls();
    animation();
}
//循环
function animation(){
    requestAnimationFrame(animation);
    renderer.render(scene,camera);
    // 更新控制器
    controls.update();
}

