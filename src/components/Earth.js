import React, { Suspense, useEffect, useRef } from 'react';
import ThreeGlobe from "three-globe";
import {
  PerspectiveCamera,
  AmbientLight,
  HemisphereLight,
  DirectionalLight,
  PointLight,
  WebGLRenderer,
  Scene,
  Vector3,
  CatmullRomCurve3,
  TubeGeometry,
  Mesh,
  MeshToonMaterial,
  SphereGeometry,
  Group,
  Color
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import membersList from "../data/members.json";
import countries from "../data/globe-data-min.json";

//initialize member list
const randomizeConnectMembers = (arr) => {
  var randomized = [];
  while (arr.length) {
    randomized.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
  }
    
  randomized.forEach((e,i) => {
    e.endLat = (randomized.length - 1 == i ? randomized[0].startLat : randomized[i+1].startLat)
    e.endLng = (randomized.length - 1 == i ? randomized[0].startLng : randomized[i+1].startLng)
  })
  console.log(randomized)
  return randomized;
}
  
const members = randomizeConnectMembers(membersList)

//Initialize member country list
const memberCountries = []
members.forEach((e) => {
  memberCountries.push(e.country)
})
console.log(memberCountries)

//Initialize rings
const memberRings = []
members.forEach((e) => {
  var lat = e.startLat
  var lng = e.startLng
  memberRings.push({
   "lat": lat,
   "lng": lng,
   "maxR": Math.random() * e.skills,
   "propagationSpeed": -5,
   "repeatPeriod": 700})
})

console.log(memberRings)

export default function Earth()  {

  const globeRef = useRef(null);


  useEffect(() => {

    var renderer, camera, scene,globe, controls;
    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    // Initialize renderer
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    globeRef.current.appendChild(renderer.domElement);

    // Initialize scene, light
    scene = new Scene();
    scene.add(new AmbientLight(0xbbbbbb, 1));
    scene.background = new Color(0x999999);
  
    // Initialize camera, light
    camera = new PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  
    var dLight = new DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);
  
    var dLight1 = new DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);
  
    var dLight2 = new PointLight(0xffee88, 1, 100, 2);
    dLight2.position.set(-200, 500, 200);
    dLight2.castShadow = true
    camera.add(dLight2);
  
  
    camera.position.z = 1000;
    camera.position.x = 2200;
    camera.position.y = 0;
  
    scene.add(camera);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.minDistance = 500;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.1;
    controls.autoRotate = true;

    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("mousemove", onMouseMove);

    const light = new HemisphereLight();

  scene.add(light)

  // Initialize the Globe
  globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.4)
    .showGlobe(false)
    .showAtmosphere(true)
    .atmosphereColor("#1a1a1a")
    .atmosphereAltitude(.1)
    .hexPolygonColor((e) => {
      if (
        memberCountries.includes(
          e.properties.ISO_A3
        )
        )
      {
        return "rgba(255,255,255, 1)";
      } else return "rgba(255,255,255, .4)";
    })

    globe.rotateY(-Math.PI * (5 / 9));
    globe.rotateZ(-Math.PI / 6);

    scene.add(globe);

    setTimeout(() => {
      globe.arcsData(members)                                                                                                                                                         
        .arcColor((e) => {
          return "#ffffff";
        })
        .arcAltitude((e) => {
          return e.arcAlt;
        })
        .arcStroke((e) => {
          return e.status ? 0.5 : 0.3;
        })
        //.arcDashLength(0.9)                                                                                             
        //.arcDashGap(1)
        .arcDashAnimateTime(1000)
        //.arcsTransitionDuration(1000)
        .arcDashInitialGap((e) => e.skills)
        .labelsData(members.city)
        .labelColor(() => "#ffcb21")
        .labelDotOrientation((e) => {
          return e.text === "ALA" ? "top" : "right";
        })
        .labelDotRadius(0.3)
        .labelSize((e) => e.size)
        .labelText("city")
        .labelResolution(6)
        .labelAltitude(0.01)
        .ringsData(memberRings)
        .ringColor(() => t => `rgba(255,255,255,${1-t})`)
        .ringMaxRadius("maxR")
        .ringPropagationSpeed("propagationSpeed")
        .ringRepeatPeriod("repeatPeriod")
    }, 1000);

     // Logo
     const curve = new CatmullRomCurve3([new Vector3(-34.93264692010232, 7.544010915229777, 10.674249760821426),
      new Vector3(-32.055435152274345, 17.382671025772157, 5.561707700821428),
      new Vector3(-27.922420224716944, 31.366791626702104, 5.6775511578567645),
      new Vector3(-19.870055798776832, 44.40315110531533, 13.2570530837988),
      new Vector3(-8.34766899177155, 40.25505209065228, 7.288685502416017),
      new Vector3(-7.929160785561714, 23.991644887851646, 5.3358261722459474),
      new Vector3(-8.76592224984004, 2.2802285250104973, 10.058522240941613),
      new Vector3(5.4480538594432566, 1.873172339986901, 3.692795957391273),
      new Vector3(3.52438839831139, 13.4989958307298, -1.4099263513928676),
      new Vector3(-5.470593353523554, 20.992038158535203, 13.783099794307304),
      new Vector3(-27.13374361220889, 25.092633556734708, -1.736919710094928),
      new Vector3(-42.360385993398364, 30.238051933925976, 2.0830782682845836)
    ]);
    const material = new MeshToonMaterial( { color: '#535353' });
    const tube = new TubeGeometry( curve, 80, 3, 20, false, );
    const tubeObject = new Mesh( tube, material );
    
    var tubeStart = new SphereGeometry(3);
    const tubeStartObject = new Mesh(tubeStart, material)
    tubeStartObject.position.set(-34.93264692010232, 7.544010915229777, 10.674249760821426)
    
    var tubeEnd = new SphereGeometry(3);
    const tubeEndObject = new Mesh(tubeEnd, material)
    tubeEndObject.position.set(-42.360385993398364, 30.238051933925976, 2.0830782682845836)
    
    const logoGroup = new Group()
    logoGroup.add( tubeObject );
    logoGroup.add( tubeEndObject );
    logoGroup.add( tubeStartObject );
    
    //Resize, scale and rotate to fit
    logoGroup.position.set(10,-55,-50)
    logoGroup.scale.set(2.8,2.8,2.8)
    logoGroup.rotation.set(0, .9, 0)
    //scene.add( logoGroup )


    function onMouseMove(event) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
      // console.log("x: " + mouseX + " y: " + mouseY);
    }
    
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      windowHalfX = window.innerWidth / 1.5;
      windowHalfY = window.innerHeight / 1.5;
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function animate() {
      camera.position.x +=
        Math.abs(mouseX) <= windowHalfX / 2
          ? (mouseX / 2 - camera.position.x) * 0.005
          : 0;
      camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
      camera.lookAt(scene.position);
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // return () => globeRef.current.removeChild( renderer.domElement);
  }, [])

  return (
  
      <div 
      ref={globeRef}
      >
    </div>
  
);
}