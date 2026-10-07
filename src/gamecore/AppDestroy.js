export function DestroyApp(app){
    app.ticker.stop();
    app.stage.removeChildren(); 
    app.destroy(true,
        {
        children: true,
        texture: true,
        baseTexture: true
    });
}