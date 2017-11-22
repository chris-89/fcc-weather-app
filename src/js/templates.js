const template = {
    weather: function(context) {
        return `
        <div id='location'>
            <p id='place'>${context.name}</p>
            <p id='weather-disc'>${context.weather[0].description}</p>
        </div>
           <div id='icon-wrapper'>
            <div id='icon' class="${context.weather[0].main.toLowerCase()}"></div>
            </div>
            <div id='temp'>${context.main.temp.toFixed(1)}</div>
        <div id='unit-wrapper'>
            <div id='cels' class='active'>C°</div>
            <div id='fahr' class='inactive'>F°</div>
        </div>
        <div id='refresh'>
            <i class='fa fa-refresh'></i>
        </div>
        `
    }
}

export default template;
