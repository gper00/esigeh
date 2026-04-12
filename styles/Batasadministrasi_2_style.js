var style_Batasadministrasi_2 = function(feature, resolution){
    var labelText = feature.get("WADMKD") || "";
    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1.5}),
        fill: new ol.style.Fill({color: 'rgba(196,60,57,0.15)'}),
        text: labelText ? new ol.style.Text({
            font: 'bold 11px sans-serif',
            text: labelText,
            textAlign: 'center',
            textBaseline: 'middle',
            fill: new ol.style.Fill({color: '#ffffff'}),
            stroke: new ol.style.Stroke({color: '#333333', width: 2})
        }) : null
    })];
};
