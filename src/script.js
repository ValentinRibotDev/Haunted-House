import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()

/**
 * House
 */
// Create a group for house
const houseGroup = new THREE.Group()
scene.add(houseGroup)

// ------------------------- //
// Walls Texture
const wallColor = textureLoader.load('/wall/diffuse.jpg')
wallColor.colorSpace = THREE.SRGBColorSpace
const wallARM = textureLoader.load('/wall/arm.jpg')
const wallNormal = textureLoader.load('/wall/normal.webp')

// Walls Geometry
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColor,
        aoMap: wallARM,
        metalnessMap: wallARM,
        roughnessMap: wallARM,
        normalMap: wallNormal
    })
)
walls.position.y = 2.5 / 2

// Add walls to house group
houseGroup.add(walls)

// ------------------------- //
// Roof Texture
const roofColor = textureLoader.load('/roof/diffuse.jpg')
roofColor.colorSpace = THREE.SRGBColorSpace
roofColor.repeat.set(3,1)
roofColor.wrapS = THREE.RepeatWrapping

const roofARM = textureLoader.load('/roof/arm.jpg')
roofARM.repeat.set(3,1)
roofARM.wrapS = THREE.RepeatWrapping

const roofNormal = textureLoader.load('/roof/normal.webp')
roofNormal.repeat.set(3,1)
roofNormal.wrapS = THREE.RepeatWrapping

// Roof Geometry
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColor,
        aoMap: roofARM,
        metalnessMap: roofARM,
        roughnessMap: roofARM,
        normalMap: roofNormal
    })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI * 0.25

// Add Roof to house group
houseGroup.add(roof)

// ------------------------- //
// Door Texture
const doorColor = textureLoader.load('/door/diffuse.webp')
doorColor.colorSpace = THREE.SRGBColorSpace
const doorAlpha = textureLoader.load('/door/alpha.webp')
const doorAO = textureLoader.load('/door/ao.webp')
const doorMetalness = textureLoader.load('/door/metalness.webp')
const doorRoughness = textureLoader.load('/door/roughness.webp')
const doorNormal = textureLoader.load('/door/normal.jpg')
const doorDisplacement = textureLoader.load('/door/displacement.webp')

// Door Geometry
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map : doorColor,
        transparent: true,
        alphaMap: doorAlpha,
        metalnessMap: doorMetalness,
        metalness: 1,
        roughnessMap: doorRoughness,
        roughness: 1,
        aoMap: doorAO,
        aoMapIntensity: 1,
        normalMap: doorNormal,
        displacementMap: doorDisplacement,
        displacementScale: 0.15,
        displacementBias: -0.04
    })
)

door.position.set(0, 1, 2 + 0.001)

// Add door to house group
houseGroup.add(door)

// ------------------------- //
// Bushes Texture
const bushColor = textureLoader.load('/bush/diffuse.jpg')
bushColor.colorSpace = THREE.SRGBColorSpace
bushColor.repeat.set(2,1)
bushColor.wrapS = THREE.RepeatWrapping

const bushARM = textureLoader.load('/bush/arm.jpg')
bushARM.repeat.set(2,1)
bushARM.wrapS = THREE.RepeatWrapping

const bushNormal = textureLoader.load('/bush/normal.webp')
bushNormal.repeat.set(2,1)
bushNormal.wrapS = THREE.RepeatWrapping

const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColor,
    aoMap: bushARM,
    metalnessMap: bushARM,
    roughnessMap: bushARM,
    normalMap: bushNormal
})

// Bush Geometry
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)

const bush1 = new THREE.Mesh( bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75
bush1.castShadow= true
bush1.receiveShadow= true

const bush2 = new THREE.Mesh( bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75
bush2.castShadow= true
bush2.receiveShadow= true

const bush3 = new THREE.Mesh( bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = -0.75
bush3.castShadow= true
bush3.receiveShadow= true

const bush4 = new THREE.Mesh( bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = -0.75
bush4.castShadow= true
bush4.receiveShadow= true

// Add bush to scene
houseGroup.add(bush1, bush2, bush3, bush4)

// ------------------------- //
// Create a group for graves
const gravesGroup = new THREE.Group()
scene.add(gravesGroup)

// Graves Texture
const graveColor = textureLoader.load('/grave/diffuse.webp')
graveColor.colorSpace = THREE.SRGBColorSpace
graveColor.repeat.set(0.3, 0.4)
graveColor.wrapS = THREE.RepeatWrapping
graveColor.wrapT = THREE.RepeatWrapping

const graveARM = textureLoader.load('/grave/arm.webp')
graveARM.repeat.set(0.3, 0.4)
graveARM.wrapS = THREE.RepeatWrapping
graveARM.wrapT = THREE.RepeatWrapping

const graveNormal = textureLoader.load('/grave/normal.webp')
graveNormal.repeat.set(0.3, 0.4)
graveNormal.wrapS = THREE.RepeatWrapping
graveNormal.wrapT = THREE.RepeatWrapping

const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColor,
    aoMap: graveARM,
    metalnessMap: graveARM,
    roughnessMap: graveARM,
    normalMap: graveNormal
})

// Graves Geometry
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)

for (let i = 0; i < 60; i++) {
    const angle = Math.random() * Math.PI * 2
    const x = Math.sin(angle)
    const z = Math.cos(angle)
    const radius = 3 + Math.random() * 4

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    grave.position.x = x * radius
    grave.position.y = Math.random() * 0.4
    grave.position.z = z * radius

    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4

    grave.castShadow=true
    grave.receiveShadow=true
    //Add grave to graves group
    gravesGroup.add(grave)
}

// ------------------------- //
// Floor Texture
const floorColor = textureLoader.load('/floor/diffuse.webp')
floorColor.repeat.set(8,8)
floorColor.wrapS = THREE.RepeatWrapping
floorColor.wrapT = THREE.RepeatWrapping
floorColor.colorSpace = THREE.SRGBColorSpace

const floorAlpha = textureLoader.load('/floor/alpha.jpg')

const floorNormal = textureLoader.load('/floor/normal.webp')
floorNormal.repeat.set(8,8)
floorNormal.wrapS = THREE.RepeatWrapping
floorNormal.wrapT = THREE.RepeatWrapping

const floorDisplacement = textureLoader.load('/floor/displacement.webp')
floorDisplacement.repeat.set(8,8)
floorDisplacement.wrapS = THREE.RepeatWrapping
floorDisplacement.wrapT = THREE.RepeatWrapping

const floorARM = textureLoader.load('/floor/arm.webp')
floorARM.repeat.set(8,8)
floorARM.wrapS = THREE.RepeatWrapping
floorARM.wrapT = THREE.RepeatWrapping

// Floor Geometry
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        map: floorColor,
        transparent: true,
        alphaMap: floorAlpha,
        aoMap: floorARM,
        metalnessMap: floorARM,
        roughnessMap: floorARM,
        normalMap: floorNormal,
        displacementMap: floorDisplacement,
        displacementScale: 0.3,
        displacementBias: -0.05
    })
)
floor.rotation.x = -(Math.PI * 0.5)

// Add floor to scene
scene.add(floor)

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)

scene.add(ghost1, ghost2, ghost3)
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

//PointLight
const pointLight = new THREE.PointLight('#ff7d46', 5)
pointLight.position.set(0, 2.2, 2.5)
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and Receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow =true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

/**
 * Mapping
 */

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.top = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.top = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.top = 10

/**
 * Sky
 */

const sky = new Sky()

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

sky.scale.set(100,100,100)

scene.add(sky)

/**
 * Fog
 */

scene.fog = new THREE.FogExp2('#02343f', 0.1)

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    //Ghost
    const ghost1Angle = elapsedTime * 0.5
    const radius1 = 4
    ghost1.position.x = Math.cos(ghost1Angle) * radius1
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)
    ghost1.position.z = Math.sin(ghost1Angle) * radius1

    const ghost2Angle = - elapsedTime * 0.38
    const radius2 = 5
    ghost2.position.x = Math.cos(ghost2Angle) * radius2
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)
    ghost2.position.z = Math.sin(ghost2Angle) * radius2

    const ghost3Angle = elapsedTime * 0.23
    const radius3 = 6
    ghost3.position.x = Math.cos(ghost3Angle) * radius3
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)
    ghost3.position.z = Math.sin(ghost3Angle) * radius3

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()