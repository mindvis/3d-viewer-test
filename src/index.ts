import {
    CoreEditorApp,
    addEditorPlugins,
    PresetLibraryPlugin,
    defaultPresets,
    AssetManagerPlugin,
    GBufferPlugin,
    timeout,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    BloomPlugin,
    TemporalAAPlugin,
    AnisotropyPlugin,
    GammaCorrectionPlugin,

    addBasePlugins,
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin, FileTransferPlugin, HierarchyUiPlugin,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "https://dist.pixotronics.com/webgi/runtime/bundle-0.9.1.mjs";
import "./styles.css";

async function setupViewer(){

    // Initialize the viewer
    const editor = new CoreEditorApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
    })

    // Add plugins individually.
    await editor.addPlugin(GBufferPlugin)
    // await viewer.addPlugin(new ProgressivePlugin(32))
    // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    // await viewer.addPlugin(GammaCorrectionPlugin)
    // await viewer.addPlugin(SSRPlugin)
    // await viewer.addPlugin(SSAOPlugin)
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    // await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)
    // and many more...

    await addEditorPlugins(editor, {
        caching: true,
        ground: true,
        bloom: true,
        depthTonemap: true,
        enableDrop: true,
        importPopup: false,
        debug: false
      });
      
    console.log(defaultPresets);
    
    // or use this to add all main ones at once.
   // await addBasePlugins(editor) // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.

    // Add a popup(in HTML) with download progress when any asset is downloading.
  //  await editor.addPlugin(AssetManagerBasicPopupPlugin)

    // Required for downloading files from the UI
    await editor.addPlugin(FileTransferPlugin)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await editor.addPlugin(CanvasSnipperPlugin)

    // Import and add a GLB file.
  //  await editor.load("./assets/classic-watch.glb")

    // Load an environment map if not set in the glb file
    await editor.setEnvironmentMap("./assets/environment.hdr");

    await editor.setupUi();

    // Add some UI for tweak and testing.
    const uiPlugin = await editor.addPlugin(TweakpaneUiPlugin)
    // Add plugins to the UI to see their settings.
    // uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin, HierarchyUiPlugin)

    const presets = { ...defaultPresets };
    for (const i of [...Object.keys(presets)]) {
      presets[i] = presets[i].slice(0, 2);
    }
  
    const presetLib = editor.getPlugin(PresetLibraryPlugin);
    await presetLib.loadPresetGroups(presets);
  
    

}

setupViewer()
