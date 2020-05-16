import * as THREE from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

var scene,camera,controls,renderer,cube;
var WIDTH,HEIGHT;
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
    camera.position.set(0,0,20);
    camera.lookAt(0,0,0);
}

function initObject(){
    var geometry = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial({color:0x00ff00});
    cube = new THREE.Mesh(geometry,material);
    scene.add(cube);

    var lineMaterial = new THREE.LineBasicMaterial({color:0x0000ff});
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(-10,0,0));
    lineGeometry.vertices.push(new THREE.Vector3(0,10,0));
    lineGeometry.vertices.push(new THREE.Vector3(10,0,0));
    var line = new THREE.Line(lineGeometry,lineMaterial);
    scene.add(line);

    var loader = new THREE.FontLoader();
    loader.load('./fonts/optimer_regular.typeface.json',function(font){
        var textGeometry = new THREE.TextGeometry('moriarty',{
            font: font,
            size: 5,
            height: 0,
            curveSegments: 1,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 0,
            bevelSegments: 1
        });
        var meshMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        var text = new THREE.Mesh(textGeometry,meshMaterial);
        text.position.z = -1;
        text.position.y = 0;
        text.position.x = -10
        scene.add(text); 
    })
}



function animation(){
    requestAnimationFrame(animation);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene,camera);
    controls.update();
}

export function initModel3(){
    initRenderer();
    initScene();
    initCamera();
    initObject();
    initControl();
    animation();
}